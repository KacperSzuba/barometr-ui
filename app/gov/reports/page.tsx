"use client";

import { useState } from "react";
import { usePackBuilder } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { GovChip } from "@/components/gov/GovChip";
import type { PackBlock } from "@/lib/data/types";
import { cx } from "@/lib/cn";

export default function DailyPackPage() {
  const { data } = usePackBuilder();
  const [audienceLabel, setAudienceLabel] = useState("Principal · 1 page");
  const [included, setIncluded] = useState<Record<string, boolean>>({});
  if (!data) return null;

  const { blocks, audiences, meta } = data;
  const audience = audiences.find((a) => a.label === audienceLabel) ?? audiences[0];

  const isIncluded = ({ label, isIncluded: byDefault }: PackBlock) => included[label] ?? byDefault;
  const toggle = (block: PackBlock) =>
    setIncluded((current) => ({ ...current, [block.label]: !isIncluded(block) }));

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="DAILY PACK BUILDER"
        title="Assemble the briefing"
        aside={
          <>
            Redaction follows the audience
            <br />
            Every pack is watermarked and logged
          </>
        }
      />

      <div className="mt-[18px] mb-[18px] flex flex-wrap items-center gap-2">
        <span className="text-[9px] tracking-[.13em] text-ink/45">AUDIENCE</span>
        {audiences.map((option) => (
          <GovChip
            key={option.label}
            isActive={option.label === audience.label}
            onClick={() => setAudienceLabel(option.label)}
          >
            {option.label.toUpperCase()}
          </GovChip>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] items-start gap-[22px]">
        <div className="border border-white/[.14] bg-white/[.03]">
          <div className="border-b border-white/[.12] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/45">
            BLOCKS
          </div>
          {blocks.map((block) => (
            <button
              key={block.label}
              type="button"
              onClick={() => toggle(block)}
              className={cx(
                "flex w-full cursor-pointer items-center gap-2.5 border-b border-ink/[.08] px-3 py-[9px] text-left text-xs hover:bg-white/[.04]",
                isIncluded(block) ? "text-ink/85" : "text-ink/50",
              )}
            >
              <span
                className={cx(
                  "flex h-4 w-4 flex-none items-center justify-center text-[10px]",
                  isIncluded(block) ? "bg-white/[.05] text-ink" : "border border-ink/30",
                )}
              >
                {isIncluded(block) ? "✓" : ""}
              </span>
              <span>{block.label}</span>
            </button>
          ))}
        </div>

        {/*
         * The pack preview is a white sheet inside a dark console. `on-paper`
         * re-points the ink/accent tokens for this subtree, so the same
         * `text-ink/*` utilities used everywhere else resolve to dark values.
         */}
        <div className="on-paper relative min-h-[420px] overflow-hidden rounded-[14px] border border-ink/[.16] bg-white px-8 py-[30px] shadow-[0_2px_10px_rgba(0,0,0,.75)]">
          <div className="absolute top-11 -right-[46px] rotate-[35deg] text-[11px] tracking-[.3em] whitespace-nowrap text-accent-soft/25">
            INTERNAL · M. KOWALCZYK · EXPIRES 11 AUG
          </div>

          <div className="text-[9px] tracking-[.16em] text-accent-soft">
            DAILY PACK · 28 JULY 2026
          </div>
          <div className="mt-3 text-[30px] leading-[1.1] font-bold tracking-[-.02em]">
            Public opinion &amp; media briefing
          </div>
          <div className="mt-1.5 text-[10px] text-ink/50">
            {audience.label} · generated 07:12 · 428 sources
          </div>

          <div className="mt-[22px] h-px bg-ink/15" />

          <div className="mt-[18px] flex flex-col gap-[13px]">
            {blocks.filter(isIncluded).map((block) => (
              <div
                key={block.label}
                className="grid grid-cols-[16px_minmax(0,1fr)] items-baseline gap-2.5"
              >
                <span className="text-[9px] text-ink/40">§</span>
                <div>
                  <div className="text-[15px] font-semibold">{block.label}</div>
                  <div className="mt-[5px] h-[5px] bg-ink/[.14]" />
                  <div className="mt-1 h-[5px] w-[82%] bg-ink/[.09]" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[26px] border-t border-ink/15 pt-3 text-[9px] leading-[1.7] text-ink/45">
            Every figure in this pack carries its sample size and error band on the page it appears.
            <br />
            Cells below the aggregation floor are suppressed and marked, never estimated.
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[14px] border border-white/[.14] bg-white/[.035] p-3.5">
            <div className="mb-[11px] text-[9px] tracking-[.14em] text-ink/45">
              REDACTION RULES APPLIED
            </div>
            {audience.rules.map((rule) => (
              <div
                key={rule}
                className="flex gap-[9px] py-[5px] text-[11.5px] leading-[1.5] text-ink/[.72]"
              >
                <span className="text-accent-soft">·</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>

          <div className="border border-white/[.14] bg-white/[.03]">
            {[{ label: "RECIPIENTS", value: audience.recipients }, ...meta].map((row) => (
              <div key={row.label} className="border-b border-white/[.08] px-[13px] py-2.5">
                <div className="text-[8.5px] tracking-[.13em] text-ink/45">{row.label}</div>
                <div className="mt-[3px] text-[11.5px] text-ink/[.78]">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 cursor-pointer rounded-[14px] bg-white/[.05] p-2.5 text-center text-[10px] tracking-[.08em] text-ink hover:bg-white/[.08]"
            >
              GENERATE PACK
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-[14px] border border-white/25 px-3 py-2.5 text-[10px] tracking-[.08em] hover:bg-white/[.06]"
            >
              PREVIEW
            </button>
          </div>

          <div className="text-[9px] leading-[1.6] text-ink/45">
            Generation writes an entry to the audit log with recipient, purpose and expiry.
            Forwarding a pack outside its recipient list breaks the watermark check.
          </div>
        </div>
      </div>
    </div>
  );
}
