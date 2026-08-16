"use client";

import Link from "next/link";
import { useStoryTracker } from "@/hooks/useGov";
import { SectionRule } from "@/components/ui/SectionRule";
import type { CheckKind } from "@/lib/data/types";

/** Verification marker: confirmed green, refuted indigo, open amber. */
const CHECK: Record<CheckKind, { mark: string; background: string }> = {
  confirmed: { mark: "✓", background: "#1F9C7C" },
  refuted: { mark: "✕", background: "#7C5CFF" },
  pending: { mark: "?", background: "#F5A524" },
};

const FRAMING_GRID = "1.5fr 1fr 1.2fr 76px";

/** Upper bound of the volume chart scale. */
const SPREAD_SCALE = 130;

export default function StoryTrackerPage() {
  const { data } = useStoryTracker();
  if (!data) return null;

  const {
    badge,
    meta,
    title,
    lead,
    spread,
    spreadPeak,
    framings,
    checks,
    parliamentary,
    briefingNote,
    useLimits,
  } = data;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <Link
        href="/gov/briefing"
        className="mb-3.5 inline-flex items-center gap-1.5 text-[10px] tracking-[.08em] text-ink/50 hover:text-accent-soft"
      >
        ← BACK TO BRIEFING
      </Link>

      <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-[26px]">
        <div>
          <div className="mb-[9px] flex items-center gap-2">
            <span className="rounded-full bg-amber px-[7px] py-[3px] text-[9px] tracking-[.1em] text-ink">
              {badge}
            </span>
            <span className="text-[9.5px] text-ink/50">{meta}</span>
          </div>

          <h1 className="m-0 text-[34px] leading-[1.1] font-bold tracking-[-.02em] text-pretty">
            {title}
          </h1>
          <p className="mt-3 mb-0 max-w-[64ch] text-[13.5px] leading-[1.65] text-pretty text-ink/[.72]">
            {lead}
          </p>

          <div className="mt-6">
            <SectionRule title="Spread, last 36 hours" aside="items / hour" />
          </div>
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-3.5 pt-4 pb-2.5">
            <div className="flex h-[132px] items-end gap-[3px]">
              {spread.map((hour, index) => (
                <div key={index} className="flex h-full flex-1 flex-col justify-end gap-px">
                  <div
                    style={{
                      height: `${(hour.social / SPREAD_SCALE) * 100}%`,
                      background: "#b5734f",
                    }}
                  />
                  <div
                    style={{
                      height: `${(hour.press / SPREAD_SCALE) * 100}%`,
                      background: "rgba(255,255,255,.05)",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-[7px] flex justify-between text-[9px] text-ink/45">
              <span>21:00 Mon</span>
              <span>04:00</span>
              <span>12:00</span>
              <span>21:00</span>
              <span>07:00 Tue</span>
            </div>

            <div className="mt-2.5 flex gap-4 border-t border-white/10 pt-[9px] text-[9.5px] text-ink/60">
              <span className="flex items-center gap-1.5">
                <span className="h-[9px] w-[9px] bg-white/[.05]" />
                press &amp; broadcast
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-[9px] w-[9px] bg-[#b5734f]" />
                social platforms
              </span>
              <span className="ml-auto">{spreadPeak}</span>
            </div>
          </div>

          <div className="mt-6">
            <SectionRule title="How outlets are framing it" />
          </div>
          <div className="border border-white/[.13]">
            <div
              className="grid gap-2.5 rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[8.5px] tracking-[.12em] text-ink/50"
              style={{ gridTemplateColumns: FRAMING_GRID }}
            >
              <span>OUTLET</span>
              <span>FRAME</span>
              <span>KEY PHRASE</span>
              <span className="text-right">TONE</span>
            </div>
            {framings.map((framing) => (
              <div
                key={framing.outlet}
                className="grid items-center gap-2.5 rounded-[14px] border-t border-white/10 bg-white/[.03] px-[13px] py-[11px]"
                style={{ gridTemplateColumns: FRAMING_GRID }}
              >
                <div>
                  <div className="text-[12.5px] font-medium">{framing.outlet}</div>
                  <div className="mt-0.5 text-[9px] text-ink/45">{framing.type}</div>
                </div>
                <div className="text-[11.5px] text-ink/70">{framing.frame}</div>
                <div className="text-[12.5px] text-ink/75 italic">“{framing.phrase}”</div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px]">{framing.tone}</span>
                  <div className="h-[5px] w-full bg-white/[.08]">
                    <div className="h-full bg-accent" style={{ width: `${framing.toneValue}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-white/[.14] bg-white/[.035]">
            <div className="border-b border-white/[.12] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/45">
              VERIFICATION LEDGER
            </div>
            {checks.map((check) => (
              <div
                key={check.claim}
                className="flex items-start gap-2.5 border-b border-white/[.08] px-[13px] py-[11px]"
              >
                <span
                  className="flex h-[18px] w-[18px] flex-none items-center justify-center text-xs text-ink"
                  style={{ background: CHECK[check.kind].background }}
                >
                  {CHECK[check.kind].mark}
                </span>
                <div>
                  <div className="text-[11.5px] leading-[1.45] text-ink/80">{check.claim}</div>
                  <div className="mt-1 text-[9px] text-ink/45">{check.status}</div>
                </div>
              </div>
            ))}
            <div className="px-[13px] py-[11px] text-[10.5px] leading-[1.5] text-ink/60">
              Ledger is maintained by the analysis desk, not by the model. Unverified rows may never
              be quoted in public statements.
            </div>
          </div>

          <div className="border border-white/[.14] bg-white/[.03]">
            <div className="border-b border-white/[.12] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/45">
              PARLIAMENTARY CONTEXT
            </div>
            <div className="flex flex-col gap-2.5 px-[13px] py-3">
              {parliamentary.map((item) => (
                <div key={item.title}>
                  <div className="text-[11.5px] font-medium">{item.title}</div>
                  <div className="mt-[3px] text-[9.5px] text-ink/50">{item.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/[.14] bg-white/[.03]">
            <div className="border-b border-white/[.12] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/45">
              BRIEFING NOTE (INTERNAL)
            </div>
            <div className="px-[13px] py-3 text-[11.5px] leading-[1.6] text-pretty text-ink/[.72]">
              {briefingNote}
            </div>
            <div className="flex gap-[7px] px-[13px] pb-[13px]">
              <button
                type="button"
                className="cursor-pointer rounded-[10px] bg-white/[.05] px-[11px] py-[7px] text-[9.5px] tracking-[.07em] text-ink"
              >
                ADD TO DAILY PACK
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-[10px] border border-white/25 px-[11px] py-[7px] text-[9.5px] tracking-[.07em]"
              >
                REQUEST FACT-CHECK
              </button>
            </div>
          </div>

          <div className="rounded-[14px] border border-accent/20 bg-accent/[.07] px-[13px] py-[11px] text-[10.5px] leading-[1.55] text-ink/[.72]">
            <b className="text-[9px] tracking-[.12em] text-accent-soft">USE LIMITS</b>
            <br />
            {useLimits}
          </div>
        </div>
      </div>
    </div>
  );
}
