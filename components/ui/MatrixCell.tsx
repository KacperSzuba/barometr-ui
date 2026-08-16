import type { PlanCell } from "@/lib/data/types";
import { cx } from "@/lib/cn";

const BASE = "border-l border-ink/[.08] px-3 py-[9px] text-[11.5px] leading-[1.4]";

/**
 * Cell of the permission and notification-channel matrices in the account panel.
 * Mirrors the `cell()` helper — a vertical rule separates the columns.
 */
export function MatrixCell({ cell }: { cell: PlanCell }) {
  switch (cell.kind) {
    case "yes":
      return <div className={cx(BASE, "text-[13px] text-emerald-soft")}>✓</div>;
    case "no":
      return <div className={cx(BASE, "text-ink/30")}>—</div>;
    case "never":
      return <div className={cx(BASE, "text-[10px] text-ink/[.68]")}>{cell.text}</div>;
    default:
      return <div className={cx(BASE, "text-[10px] text-ink/[.68]")}>{cell.text}</div>;
  }
}
