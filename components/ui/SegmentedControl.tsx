"use client";

import { cx } from "@/lib/cn";

export interface Segment<T extends string> {
  value: T;
  label: string;
}

/**
 * Row of selector buttons in the consoles: the active one on solid indigo, the
 * rest outlined. The prototypes use two sizes — the smaller next to section
 * headers, the larger next to page headers.
 */
export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  size = "md",
}: {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
}) {
  const small = size === "sm";

  return (
    <div className={cx("flex", small ? "gap-1" : "gap-[5px]")}>
      {segments.map((segment) => {
        const isActive = segment.value === value;

        return (
          <button
            key={segment.value}
            type="button"
            onClick={() => onChange(segment.value)}
            className={cx(
              "cursor-pointer border",
              small
                ? "px-2 py-[5px] text-[9px] tracking-[.07em]"
                : "px-2.5 py-1.5 text-[9.5px] tracking-[.08em]",
              isActive
                ? "border-accent/50 bg-accent text-ink"
                : cx("text-ink/60", small ? "border-ink/[.18]" : "border-ink/20"),
            )}
          >
            {segment.label}
          </button>
        );
      })}
    </div>
  );
}
