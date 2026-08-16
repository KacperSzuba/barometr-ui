"use client";

import { cx } from "@/lib/cn";

interface FieldRowProps {
  label: string;
  /** Note under the label — used by the signal configuration. */
  hint?: string;
  options: string[];
  selected: string;
  /** When provided, the options become clickable and change the selection. */
  onSelect?: (value: string) => void;
  /** `inline` puts the label beside the options (rule editor); `stacked` above. */
  layout?: "inline" | "stacked";
  /** Width of the label column in the `inline` layout. */
  labelWidth?: number;
}

/**
 * A settings row: label plus a row of options. The prototypes' `seg()` pattern —
 * it recurs in the rule editor, the geo alerts and throughout configuration.
 */
export function FieldRow({
  label,
  hint,
  options,
  selected,
  onSelect,
  layout = "inline",
  labelWidth = 132,
}: FieldRowProps) {
  const choices = (
    <div className="flex min-w-0 flex-wrap gap-[5px]">
      {options.map((option) => {
        const className = cx(
          "cursor-pointer border px-[9px] py-[5px] text-[9.5px] tracking-[.07em]",
          option === selected
            ? "border-accent/50 bg-accent text-ink"
            : "border-ink/[.18] text-ink/65",
        );

        return onSelect ? (
          <button key={option} type="button" onClick={() => onSelect(option)} className={className}>
            {option}
          </button>
        ) : (
          <span key={option} className={className}>
            {option}
          </span>
        );
      })}
    </div>
  );

  if (layout === "stacked") {
    return (
      <div>
        {/* label on the left, note pushed to the card's right edge */}
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-[9.5px] tracking-[.08em] text-ink/50">{label}</span>
          {hint && <span className="text-[9.5px] text-ink/45">{hint}</span>}
        </div>
        {choices}
      </div>
    );
  }

  return (
    <div
      className="grid items-center gap-3"
      style={{ gridTemplateColumns: `${labelWidth}px minmax(0,1fr)` }}
    >
      <span className="text-[9.5px] tracking-[.08em] text-ink/50">{label}</span>
      {choices}
    </div>
  );
}
