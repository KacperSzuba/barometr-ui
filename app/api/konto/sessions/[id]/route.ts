/**
 * Ending one signed-in session from the account screen.
 *
 * **The backend will end the caller's own session too**, and that is worth stating
 * because it is the opposite of what the neighbouring route does: `DELETE
 * /api/v1/sessions` — "sign out everywhere else" — deliberately keeps the session it
 * was called on, but `DELETE /api/v1/sessions/{id}` takes an identifier and revokes
 * whichever family it names. Tried against one's own, it answers `200`.
 *
 * What follows is not a clean sign-out either: the refresh family is revoked at once,
 * while the access token already issued keeps working for up to fifteen minutes — the
 * backend's stated trade for not reading the database on every request. So the reader
 * carries on for a quarter of an hour and is then dropped for no visible reason.
 *
 * Which is why the screen offers no button on that row. The rule lives there rather
 * than here because it is about what a device list means, not about who may do what:
 * signing out of the tab you are in belongs to the sign-out button, and this one is for
 * the device you no longer recognise.
 */
import { sendToBackend } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";

export async function DELETE(_request: Request, context: RouteContext<"/api/konto/sessions/[id]">) {
  const { id } = await context.params;

  try {
    const ended = await sendToBackend(`/api/v1/sessions/${id}`, "DELETE");

    return jsonForScreen({ ended: id }, [ended]);
  } catch (cause) {
    return readableFailure(cause);
  }
}
