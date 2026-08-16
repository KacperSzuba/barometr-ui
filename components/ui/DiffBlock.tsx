import type { DiffKind, DiffLine } from "@/lib/data/types";
import { cx } from "@/lib/cn";

/** Diff row: removed in indigo with a strikethrough, added in emerald. */
const KIND: Record<DiffKind, string> = {
  removed: "bg-accent/[.07] text-accent-soft line-through decoration-[rgba(124,92,255,.4)]",
  added: "bg-emerald/[.09] text-emerald-soft",
  same: "text-ink/70",
};

/** Bill version comparison — shared by the Pro console and the engine. */
export function DiffBlock({
  lines,
  markWidth = 20,
}: {
  lines: DiffLine[];
  /** Width of the +/− marker column — the prototypes differ by 2 px. */
  markWidth?: number;
}) {
  return (
    <>
      {lines.map((line) => (
        <div
          key={line.text}
          className={cx("flex gap-2 border-b border-ink/[.07] px-3 py-2", KIND[line.kind])}
        >
          <span className="flex-none text-[10px] text-ink/35" style={{ width: markWidth }}>
            {line.mark}
          </span>
          <span className="min-w-0 text-[11px] leading-[1.55]">{line.text}</span>
        </div>
      ))}
    </>
  );
}
