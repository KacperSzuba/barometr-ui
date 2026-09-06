/**
 * Switching one alert rule on or off.
 *
 * **The backend states a rule whole rather than patching it**, deliberately: narrowing
 * what a rule watches is expressed by sending fewer stages, so a `PUT` carrying only
 * `enabled` would not mean "leave the rest alone" — it would mean "watch every stage,
 * at normal urgency, with no significance floor", and silently widen a rule somebody
 * had narrowed on purpose.
 *
 * So the client sends the whole rule back, and this handler passes it on unchanged. The
 * fields it needs are the ones the alerts screen already carries on every row for
 * exactly this reason.
 */
import { NextResponse } from "next/server";
import { sendToBackend } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";

interface RuleUpdate {
  enabled?: unknown;
  stages?: unknown;
  urgency?: unknown;
  minimumSignificance?: unknown;
}

export async function PUT(request: Request, context: RouteContext<"/api/pro/alerts/rules/[id]">) {
  const { id } = await context.params;
  const rule = (await request.json()) as RuleUpdate;

  // All four, and no defaults. Filling a missing `stages` in with `[]` here would be
  // this layer quietly performing the widening it exists to prevent: a caller that
  // forgot the field would get "every stage" and a `200`, which is the failure nobody
  // would notice until an alert arrived about something they had excluded.
  if (
    typeof rule.enabled !== "boolean" ||
    !Array.isArray(rule.stages) ||
    typeof rule.urgency !== "string" ||
    typeof rule.minimumSignificance !== "number"
  ) {
    return NextResponse.json(
      {
        error:
          "Reguła stwierdza się w całości: podaj enabled, stages, urgency i minimumSignificance.",
      },
      { status: 400 },
    );
  }

  try {
    const updated = await sendToBackend(`/api/v1/alerts/rules/${id}`, "PUT", {
      enabled: rule.enabled,
      stages: rule.stages,
      urgency: rule.urgency,
      minimumSignificance: rule.minimumSignificance,
    });

    return jsonForScreen({ updated: id }, [updated]);
  } catch (cause) {
    return readableFailure(cause);
  }
}
