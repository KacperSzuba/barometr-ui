"use client";

import { useLiveCounter } from "@/hooks/useLiveCounter";
import { formatNumber } from "@/lib/format";
import { cx } from "@/lib/cn";
import type { Section } from "@/lib/sections";

interface LiveBadgeProps {
  section: Section;
  isMini: boolean;
}

/** The live badge above the navigation — a ticking counter or static text. */
export function LiveBadge({ section, isMini }: LiveBadgeProps) {
  const value = useLiveCounter(section.live);
  const text =
    value !== null && section.live ? section.live.format(formatNumber(value)) : section.liveText;

  return (
    <div
      title={text}
      className={cx(
        "mb-5 flex items-center gap-2.5 overflow-hidden rounded-xl border border-emerald/20 bg-emerald/[.08] text-[11.5px] leading-[1.4] font-semibold text-emerald-soft",
        isMini ? "mx-[18px] justify-center px-0 py-2.5" : "mx-4 px-3 py-2.5",
      )}
    >
      <span className="h-[7px] w-[7px] flex-none animate-glow rounded-full bg-emerald shadow-[0_0_12px_#22D3A5]" />
      {/* no `whitespace-nowrap` — in the prototype the badge text wraps onto two lines */}
      {!isMini && <span className="min-w-0 overflow-hidden text-ellipsis">{text}</span>}
    </div>
  );
}
