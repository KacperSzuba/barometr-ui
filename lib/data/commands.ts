import type { AlertRuleSettings } from "./types";

/**
 * The writes.
 *
 * Kept apart from `BarometrSource` on purpose: that interface is the contract for
 * *reading* a screen, it has one mock implementation and one HTTP one, and widening it
 * with mutations would mean inventing what a mock write does to a frozen fixture. A
 * command instead calls this application's own route handler and returns; the screen
 * that issued it re-reads through the source it already has, so the list a reader is
 * looking at is refreshed by the same code path that drew it.
 *
 * In mock mode nothing is sent and every command succeeds. That is not pretending the
 * write happened — the screen re-reads and shows the fixture unchanged — it is keeping
 * a demo that has no backend from throwing at somebody clicking around it.
 */
const LIVE = Boolean(process.env.BAROMETR_LIVE);

/** Ends one signed-in session. The current one is refused by the backend, not hidden here. */
export function endSession(id: string): Promise<void> {
  return send(`/api/konto/sessions/${id}`, "DELETE");
}

/** Revokes a key for the public API. There is no route that un-revokes one. */
export function revokeApiKey(id: string): Promise<void> {
  return send(`/api/konto/api-keys/${id}`, "DELETE");
}

/**
 * The whole rule, not just the switch.
 *
 * The backend states a rule whole: a `PUT` carrying only `enabled` would reset what it
 * watches to "every stage, normal urgency, no floor". Everything the rule already said
 * therefore travels back with the change.
 */
export function setAlertRuleEnabled(id: string, rule: AlertRuleSettings): Promise<void> {
  return send(`/api/pro/alerts/rules/${id}`, "PUT", rule);
}

async function send(path: string, method: string, payload?: unknown): Promise<void> {
  if (!LIVE) return;

  const response = await fetch(path, {
    method,
    headers: payload === undefined ? {} : { "content-type": "application/json" },
    credentials: "same-origin",
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });

  if (response.ok) return;

  // The same two refusals a read can meet, and the same reading of them: a gone session
  // sends the reader to the form, and anything else carries a sentence worth showing.
  if (response.status === 401) {
    window.location.assign(`/logowanie?cel=${encodeURIComponent(window.location.pathname)}`);
    throw new Error("Sesja wygasła");
  }

  const refusal = await response.json().catch(() => null);
  throw new Error(refusal?.error ?? `Barometr API ${response.status} przy ${path}`);
}
