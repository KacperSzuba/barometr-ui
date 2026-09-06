/**
 * Signing out here and on the backend, in that order of importance.
 *
 * The cookies are cleared whatever the backend says. A refresh token this browser can no
 * longer produce is a token nobody can use from here, and a reader who pressed "wyloguj"
 * and stayed signed in because a network call failed would be right to distrust the
 * button. The backend's own copy is revoked on a best-effort basis, and its short access
 * token expires on its own either way.
 */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { callBackend } from "@/lib/server/backend";
import { REFRESH_COOKIE, clearSession } from "@/lib/server/session";

export async function POST() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE)?.value;

  if (refreshToken) {
    await callBackend("/api/v1/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined);
  }

  return clearSession(NextResponse.json({ status: "signed-out" }));
}
