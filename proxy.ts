/**
 * Keeps signed-out readers out of the screens that have nothing to show them.
 *
 * `proxy.ts`, not `middleware.ts`: the file convention was renamed in Next.js 16 and the
 * old name is deprecated.
 *
 * This is a redirect, not an authorisation check, and the distinction matters. All it
 * reads is whether a refresh cookie exists — it cannot tell a valid token from an
 * expired one, and it deliberately makes no network call to find out. What actually
 * refuses a request is the backend, on every call; a cookie somebody forged gets them a
 * rendered shell and a `401` from every read inside it.
 *
 * The point is the reader who is simply not signed in: sending them to the form beats
 * an empty console that never explains itself.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REFRESH_COOKIE } from "@/lib/server/session";

/**
 * The sections that need an account.
 *
 * `/wolny` is absent on purpose — the free tier is the part of this product that works
 * without one — and so is `(mapa)`, which is the public description of the thing.
 */
const SIGNED_IN_SECTIONS = ["/konto", "/konfiguracja", "/pro", "/gov", "/silnik", "/local"];

export const SIGN_IN_PATH = "/logowanie";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const needsAccount = SIGNED_IN_SECTIONS.some(
    (section) => pathname === section || pathname.startsWith(`${section}/`),
  );

  if (!needsAccount) return NextResponse.next();
  if (request.cookies.has(REFRESH_COOKIE)) return NextResponse.next();

  const signIn = new URL(SIGN_IN_PATH, request.url);
  // Where they were going, so signing in lands them there rather than on a home page
  // they did not ask for.
  signIn.searchParams.set("cel", `${pathname}${search}`);

  return NextResponse.redirect(signIn);
}

export const config = {
  // Without a matcher this runs on every static asset too, and a redirect that catches
  // stylesheets is a sign-in page with no styles on it.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
