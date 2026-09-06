/**
 * The second half of a sign-in: which challenge, and the code answering it.
 *
 * One field for both kinds of code, because that is the backend's contract and its
 * reasoning holds here too — an authenticator's six digits and a recovery code are told
 * apart by what they are, not by which box they were typed into.
 */
import { NextResponse } from "next/server";
import { callBackend } from "@/lib/server/backend";
import { writeSession, type TokenPair } from "@/lib/server/session";

interface Answer {
  challengeId?: string;
  code?: string;
  rememberDevice?: boolean;
}

export async function POST(request: Request) {
  const { challengeId, code, rememberDevice } = (await request.json()) as Answer;

  if (!challengeId || !code) {
    return NextResponse.json({ error: "Podaj kod." }, { status: 400 });
  }

  const response = await callBackend("/api/v1/auth/login/2fa", {
    method: "POST",
    // Never defaulted to true: remembering a device is a deliberate weakening of the
    // factor just answered, and a default nobody chose is not a choice.
    body: JSON.stringify({ challengeId, code, rememberDevice: rememberDevice === true }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Kod nie pasuje albo wygasł." }, { status: 401 });
  }

  const tokens = (await response.json()) as TokenPair;
  return writeSession(NextResponse.json({ status: "signed-in" }), tokens);
}
