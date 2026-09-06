/**
 * Revoking a key for the public API.
 *
 * Irreversible by design: there is no route that shows a key again, so a revoked one is
 * gone rather than paused. The screen keeps the row — a key that was used and then
 * revoked is a fact about this account somebody may need to point at later.
 */
import { sendToBackend } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";

export async function DELETE(_request: Request, context: RouteContext<"/api/konto/api-keys/[id]">) {
  const { id } = await context.params;

  try {
    const revoked = await sendToBackend(`/api/v1/me/api-keys/${id}`, "DELETE");

    return jsonForScreen({ revoked: id }, [revoked]);
  } catch (cause) {
    return readableFailure(cause);
  }
}
