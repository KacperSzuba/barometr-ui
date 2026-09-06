/**
 * Answering a screen, and not losing the session on the way.
 *
 * A route handler that reads several endpoints may have renewed the access token on any
 * of them, and the rotated pair only survives if it is written onto the response. That
 * cannot be a side effect inside the read — cookies are set on a response, and the read
 * does not build one — so every handler has to remember to do it. This is the place it
 * is remembered once.
 */
import { NextResponse } from "next/server";
import { BackendUnreachable, NotSignedIn, SecondFactorRequired } from "./backend";
import { writeSession, type TokenPair } from "./session";

interface Renewable {
  tokens?: TokenPair;
}

/**
 * The last renewal wins, and that is correct rather than arbitrary: rotation spends
 * every earlier token in the chain, so an older pair written afterwards would sign the
 * reader out on their next read.
 */
export function jsonForScreen<T>(payload: T, reads: Renewable[]): NextResponse {
  const response = NextResponse.json(payload);
  const pairs = reads.map((read) => read.tokens).filter((pair): pair is TokenPair => !!pair);

  return pairs.length > 0 ? writeSession(response, pairs[pairs.length - 1]) : response;
}

/**
 * The failures a screen route answers rather than throws, because each is something a
 * reader can be told and, in two of the three cases, act on.
 *
 * A gone session becomes a `401` the client turns into the sign-in form. A workspace
 * that insists on a second factor becomes a `403` carrying the reason, because the
 * reader is signed in perfectly well and there is something they can do about it. A
 * backend that is not answering becomes a `503` saying so — "Barometr API 500" names
 * this application when the fault is one layer further in.
 *
 * Anything else is a fault, and a fault that returned `200` with half a screen would be
 * worse than a stack trace.
 */
export function readableFailure(cause: unknown): NextResponse {
  if (cause instanceof NotSignedIn) {
    return NextResponse.json({ error: cause.message }, { status: 401 });
  }

  if (cause instanceof SecondFactorRequired) {
    return NextResponse.json(
      { error: cause.message, code: "second_factor_required" },
      { status: 403 },
    );
  }

  if (cause instanceof BackendUnreachable) {
    return NextResponse.json({ error: cause.message }, { status: 503 });
  }

  throw cause;
}
