import type { ReactNode } from "react";
import { cx } from "@/lib/cn";

/**
 * Console page header: kicker, title and a right-hand block, separated by a
 * heavier rule — the pattern shared by every tab.
 */
export function PageHeader({
  kicker,
  title,
  aside,
  titleSize = "text-[33px]",
  className,
}: {
  kicker: string;
  title: string;
  aside?: ReactNode;
  /** The prototypes vary the title size between tabs. */
  titleSize?: string;
  className?: string;
}) {
  return (
    <div className={cx("flex items-end gap-4 border-b-2 border-white/[.14] pb-3.5", className)}>
      <div>
        <div className="mb-1.5 text-[9.5px] tracking-[.16em] text-accent-soft">{kicker}</div>
        <h1 className={cx("m-0 leading-[1.05] font-bold tracking-[-.02em]", titleSize)}>{title}</h1>
      </div>
      <div className="flex-1" />
      {aside && (
        <div className="flex-none text-right text-[10px] leading-[1.6] text-ink/50">{aside}</div>
      )}
    </div>
  );
}
