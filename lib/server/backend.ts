/**
 * The one place that talks to the Kotlin backend.
 *
 * Everything a caller would otherwise have to remember lives here: where the backend is,
 * that the access token goes in an `Authorization` header rather than a cookie, and that
 * a `401` is usually not a signed-out reader but a fifteen-minute token that has just
 * expired.
 *
 * Route handlers import this. Nothing else can — it reads cookies, which only exists on
 * the server.
 */
import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE, type TokenPair } from "./session";

const BASE = process.env.BAROMETR_API_URL ?? "http://localhost:8080";

/** Thrown when the reader has to sign in again, and nothing this layer does will help. */
export class NotSignedIn extends Error {
  constructor() {
    super("Sesja wygasła");
    this.name = "NotSignedIn";
  }
}

/**
 * Thrown when the caller's workspace insists on a second factor they have not set up.
 *
 * Not an authorisation failure to route around. The backend signs such a person in
 * deliberately — refusing the sign-in outright would leave them, including the
 * administrator who has just turned the policy on, with no way to comply — and then
 * lets them reach the enrolment routes and nothing else. Every screen therefore has to
 * be able to say so, and a screen that reported it as a fault would send somebody to
 * look for an outage that is a policy.
 */
export class SecondFactorRequired extends Error {
  constructor() {
    super("Twoja organizacja wymaga drugiego składnika. Skonfiguruj go, żeby wejść dalej.");
    this.name = "SecondFactorRequired";
  }
}

/** Thrown when the backend answered, and answered with a failure. */
export class BackendError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`Barometr API ${status} przy ${path}`);
    this.name = "BackendError";
  }
}

export function backendUrl(path: string): string {
  return `${BASE}${path}`;
}

/** A call that carries no session: signing in, refreshing, signing out. */
export function callBackend(path: string, init: RequestInit): Promise<Response> {
  return fetch(backendUrl(path), {
    ...init,
    headers: { "content-type": "application/json", accept: "application/json", ...init.headers },
    // The backend is the source of truth and every one of these reads is per-reader.
    cache: "no-store",
  });
}

/**
 * Reads a signed-in endpoint, refreshing once if the access token has expired.
 *
 * The retry is the point. An access token lives fifteen minutes — that is what stands in
 * for a revocation list — so a reader with a tab open for an afternoon meets a `401` on
 * almost every screen, and one that logged them out each time would make the short
 * lifetime unusable.
 *
 * **The rotated refresh token is returned rather than written here.** Cookies can only
 * be set on a response, and this function does not build one; the handler that called it
 * does. Losing that token would sign the reader out fifteen minutes later for no visible
 * reason, so it is returned as a value rather than left to a side effect somebody has to
 * remember.
 *
 * Several reads on one screen refresh in parallel and present the same refresh token
 * twice. That is a race, not theft, and the backend's fifteen-second grace window says
 * so — see `app.jwt.refresh-grace`. Serialising here would be a second, worse
 * implementation of a decision already made on the other side.
 */
export async function readFromBackend<T>(path: string): Promise<Read<T>> {
  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;
  const refresh = jar.get(REFRESH_COOKIE)?.value;

  if (!access && !refresh) throw new NotSignedIn();

  if (access) {
    const response = await get(path, access);
    if (response.status !== 401) return { data: await body<T>(response, path) };
  }

  if (!refresh) throw new NotSignedIn();

  const renewed = await refreshWith(refresh);
  const response = await get(path, renewed.accessToken);

  // A second 401 on a token minted seconds ago is not an expiry. The session is gone —
  // signed out elsewhere, or its family revoked because a token was replayed.
  if (response.status === 401) throw new NotSignedIn();

  return { data: await body<T>(response, path), tokens: renewed };
}

/**
 * What a read produced, and — when the token had to be renewed to get it — the pair the
 * caller must write back.
 */
export interface Read<T> {
  data: T;
  tokens?: TokenPair;
}

export async function refreshWith(refreshToken: string): Promise<TokenPair> {
  const response = await callBackend("/api/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new NotSignedIn();

  return (await response.json()) as TokenPair;
}

function get(path: string, accessToken: string): Promise<Response> {
  return callBackend(path, {
    method: "GET",
    headers: { authorization: `Bearer ${accessToken}` },
  });
}

async function body<T>(response: Response, path: string): Promise<T> {
  if (response.status === 403 && (await isEnrolmentGate(response)))
    throw new SecondFactorRequired();
  if (!response.ok) throw new BackendError(response.status, path);
  return (await response.json()) as T;
}

/**
 * The backend distinguishes this refusal from every other by its code, which is the
 * only reason it can be told apart here: a bare `403` is "not yours to read", and this
 * one is "not yet, and here is what to do about it".
 */
async function isEnrolmentGate(response: Response): Promise<boolean> {
  const refusal = await response.text().catch(() => "");
  return refusal.includes("two_factor_setup_required");
}
