"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

/**
 * Equivalent of the Gov prototype's `chip(label, on, onClick)` helper — a
 * filter/range/audience toggle. A different primitive from `ui/Chip`, which is
 * the non-interactive console badge.
 */
export function GovChip({
  isActive,
  onClick,
  className,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "cursor-pointer border px-[9px] py-1 text-[9.5px] tracking-[.05em]",
        isActive
          ? "border-white/[.14] bg-white/[.06] text-ink"
          : "border-ink/20 bg-transparent text-ink/65",
        className,
      )}
    >
      {children}
    </button>
  );
}
