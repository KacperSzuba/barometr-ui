import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

/** Pill above the page header — indigo or emerald variant. */
export function Kicker({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "emerald";
}) {
  return (
    <div
      className={cx(
        "mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-[7px] text-[11.5px] font-bold",
        tone === "accent"
          ? "border-accent/[.28] bg-accent/[.14] text-accent-strong"
          : "border-emerald/[.28] bg-emerald/[.12] text-emerald-soft",
      )}
    >
      {children}
    </div>
  );
}
