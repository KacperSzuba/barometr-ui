/**
 * Where the tokens live, and why they live there.
 *
 * The backend hands both tokens back in a response body and sets no cookies of its own,
 * deliberately: it does not assume a browser is on the other end. Turning them into
 * cookies is this application's job, and it is the whole reason there is a server layer
 * here at all — an access token in `localStorage` is one cross-site script away from
 * being somebody else's.
 *
 * These are set and read only in route handlers. Nothing under `app/**\/page.tsx`
 * imports this file, and nothing needs to: the token never reaches the browser, so no
 * component can have an opinion about it.
 */
import type { NextResponse } from "next/server";

export const ACCESS_COOKIE = "barometr_access";
export const REFRESH_COOKIE = "barometr_refresh";

/**
 * "Do not ask me for a code on this device for a month." Whoever holds it can sign in
 * with the password alone, so it is kept exactly where the refresh token is kept and
 * nowhere else.
 */
export const DEVICE_COOKIE = "barometr_device";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  /** Seconds, as the backend reports it. */
  expiresIn: number;
  deviceToken?: string | null;
}

/**
 * `sameSite: "lax"` rather than `"strict"`: a link from an e-mail into the application
 * has to arrive signed in, and every state-changing call is a POST from this origin's
 * own script, which `lax` already refuses to carry cross-site.
 *
 * `secure` off on plain HTTP, because a `Secure` cookie is silently dropped by the
 * browser on `http://localhost` and the symptom is a sign-in that appears to work and
 * then forgets itself.
 */
const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge,
});

/** Thirty days — what the backend gives a refresh token, and no longer. */
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

export function writeSession(response: NextResponse, tokens: TokenPair): NextResponse {
  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, cookieOptions(tokens.expiresIn));
  response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, cookieOptions(REFRESH_MAX_AGE));

  // Absent on every sign-in that did not ask to be remembered, and absent is not "clear
  // it": a second sign-in from a remembered device would otherwise throw the trust away.
  if (tokens.deviceToken) {
    response.cookies.set(DEVICE_COOKIE, tokens.deviceToken, cookieOptions(REFRESH_MAX_AGE));
  }

  return response;
}

/**
 * Ends the session in this browser. The device token stays: it says this machine
 * answered a second factor, which signing out does not undo.
 */
export function clearSession(response: NextResponse): NextResponse {
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
