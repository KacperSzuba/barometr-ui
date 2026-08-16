import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

/**
 * A hairline-separated list: the container carries a light background and the
 * 1 px gap between tiles exposes it as a line. The pattern recurs in every
 * console.
 */
export function HairlineList({
  children,
  columns,
  edges = "all",
  className,
}: {
  children: ReactNode;
  /** When provided, the tiles lay out on a grid with this column definition. */
  columns?: string;
  /** `y` keeps only the top and bottom rules — the daily-digest variant. */
  edges?: "all" | "y";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "gap-px bg-white/[.12]",
        edges === "all" ? "border border-white/[.12]" : "border-y border-white/[.12]",
        columns ? "grid" : "flex flex-col",
        className,
      )}
      style={columns ? { gridTemplateColumns: columns } : undefined}
    >
      {children}
    </div>
  );
}

/** A single list tile — its background covers the container's rule. */
export function HairlineItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-[14px] bg-white/[.03]", className)}>{children}</div>;
}
