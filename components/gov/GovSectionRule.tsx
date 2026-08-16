import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

/**
 * Section header inside the Gov console. Differs from the Polish consoles in a
 * heavier weight and a lighter rule; the prototype uses two title sizes.
 */
export function GovSectionRule({
  title,
  aside,
  size = "md",
}: {
  title: string;
  aside?: ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <h2
        className={cx("m-0 font-bold", size === "md" ? "text-[22px] tracking-[-.01em]" : "text-xl")}
      >
        {title}
      </h2>
      <div className="h-px flex-1 bg-white/[.16]" />
      {aside && <span className="text-[9.5px] text-ink/45">{aside}</span>}
    </div>
  );
}
