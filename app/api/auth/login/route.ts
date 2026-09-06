/**
 * Signing in. The one route where a password crosses this application.
 *
 * The backend answers a correct password two ways, and the difference is the whole point
 * of having a second factor: `200` with tokens, or `202` with a challenge that is not
 * usable for anything on its own. This handler keeps them apart — a `202` sets no cookie,
 * so there is no state in which a reader is half signed in.
 */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { callBackend } from "@/lib/server/backend";
import { DEVICE_COOKIE, writeSession, type TokenPair } from "@/lib/server/session";

interface Credentials {
  email?: string;
  password?: string;
}

interface Challenge {
  challengeId: string;
  expiresIn: number;
}

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as Credentials;

  if (!email || !password) {
    return NextResponse.json({ error: "Podaj adres i hasło." }, { status: 400 });
  }

  // Sent when this browser has answered a second factor within the last month. The
  // backend ignores it for an account with no factor, so it is never conditional here.
  const deviceToken = (await cookies()).get(DEVICE_COOKIE)?.value ?? null;

  const response = await callBackend("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, deviceToken }),
  });

  if (response.status === 202) {
    const challenge = (await response.json()) as Challenge;
    return NextResponse.json({ status: "two-factor", ...challenge });
  }

  if (!response.ok) {
    // Deliberately one message for a wrong password and an address with no account:
    // telling them apart is how somebody works out which addresses are registered here.
    return NextResponse.json({ error: "Nieprawidłowy adres lub hasło." }, { status: 401 });
  }

  const tokens = (await response.json()) as TokenPair;
  return writeSession(NextResponse.json({ status: "signed-in" }), tokens);
}
