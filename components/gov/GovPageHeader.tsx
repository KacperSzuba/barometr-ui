import type { ReactNode } from "react";

/**
 * Gov console screen header — the same grid as the Polish consoles, but with no
 * size modifier: every Gov screen uses 33 px.
 */
export function GovPageHeader({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-end gap-4 border-b-2 border-white/[.14] pb-3.5">
      <div>
        <div className="mb-[5px] text-[9.5px] tracking-[.16em] text-accent-soft">{kicker}</div>
        <h1 className="m-0 text-[33px] leading-[1.05] font-bold tracking-[-.02em]">{title}</h1>
      </div>
      <div className="flex-1" />
      {aside && (
        <div className="flex-none text-right text-[10px] leading-[1.6] text-ink/50">{aside}</div>
      )}
    </div>
  );
}
