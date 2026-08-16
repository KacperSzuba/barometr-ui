import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

/** Footnote under a section — the smallest size used in the consoles. */
export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("text-[9px] leading-[1.6] text-ink/[.42]", className)}>{children}</div>;
}
