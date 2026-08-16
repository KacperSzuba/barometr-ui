import type { ReactNode } from "react";
import type { Tone } from "@/lib/data/types";
import { CHIP_TONE } from "./tones";
import { cx } from "@/lib/cn";

/** Equivalent of `chip(kind)` from the console prototypes — square, no radius. */
export function Chip({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-block px-1.5 py-0.5 text-[9px] tracking-[.08em] whitespace-nowrap",
        CHIP_TONE[tone],
      )}
    >
      {children}
    </span>
  );
}
