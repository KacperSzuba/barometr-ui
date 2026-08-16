"use client";

import { useState } from "react";
import Link from "next/link";
import { useCrisisView } from "@/hooks/useGov";
import type { TimelineKind } from "@/lib/data/types";
import { cx } from "@/lib/cn";

/**
 * Crisis mode uses its own lighter panel (`#1f2125`) instead of translucent
 * tiles — a visual signal that this view is out of the ordinary.
 */
const PANEL = "#1f2125";

const TIMELINE_TAG: Record<TimelineKind, string> = {
  mutation: "bg-accent text-ink",
  truth: "bg-[#1F9C7C] text-ink",
  pickup: "bg-[rgba(224,160,79,.2)] text-[#e0a04f]",
  impact: "bg-[rgba(224,160,79,.2)] text-[#e0a04f]",
  origin: "bg-[rgba(224,160,79,.2)] text-[#e0a04f]",
  pending: "bg-white/[.12] text-ink/70",
};

export default function CrisisViewPage() {
  const { data } = useCrisisView();
  const [done, setDone] = useState<Record<number, boolean> | null>(null);
  if (!data) return null;

  const { title, kpis, timeline, hotRegions, steps, groundTruth, groundTruthMeta, escalationGate } =
    data;

  const isDone = (index: number) => done?.[index] ?? steps[index].isDone;
  const toggle = (index: number) =>
    setDone((current) => ({
      ...(current ?? Object.fromEntries(steps.map((step, i) => [i, step.isDone]))),
      [index]: !isDone(index),
    }));

  return (
    <div className="min-h-full rounded-[14px] bg-white/[.05] px-[26px] pt-[22px] pb-10 text-ink">
      <div className="mb-5 flex items-center gap-3 border-b border-white/20 pb-[13px]">
        <span className="h-2 w-2 animate-bpulse rounded-full bg-[#d9534f]" />
        <span className="text-[9.5px] tracking-[.18em] text-[#d9534f]">
          CRISIS VIEW · ESCALATION LEVEL 2 OF 4
        </span>
        <div className="flex-1" />
        <span className="text-[10px] text-ink/50">opened 04:22 · 6 staff watching</span>
        <Link
          href="/gov/briefing"
          className="rounded-[10px] border border-white/30 px-[11px] py-1.5 text-[9.5px] tracking-[.08em] text-ink hover:bg-white/[.12] hover:text-ink"
        >
          EXIT
        </Link>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_330px] items-start gap-[26px]">
        <div>
          <h1 className="m-0 max-w-[26ch] text-[32px] leading-[1.15] font-bold tracking-[-.02em] text-pretty">
            {title}
          </h1>

          <div className="mt-3.5 grid grid-cols-[repeat(4,minmax(0,1fr))] gap-px border border-white/[.16] bg-white/[.16]">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="min-w-0 rounded-[14px] px-3.5 py-[13px]"
                style={{ background: PANEL }}
              >
                <div className="mb-2 text-[8.5px] tracking-[.13em] text-ink/50">{kpi.label}</div>
                <div
                  className="text-[clamp(17px,1.9vw,24px)] font-medium tracking-[-.03em] whitespace-nowrap"
                  style={{ color: kpi.color }}
                >
                  {kpi.value}
                </div>
                <div className="mt-1.5 text-[10px] leading-[1.4] text-ink/55">{kpi.note}</div>
              </div>
            ))}
          </div>

          <div className="mt-[22px] mb-[11px] text-[9px] tracking-[.14em] text-ink/50">
            PROPAGATION TIMELINE
          </div>
          <div className="flex flex-col gap-px border border-white/[.14] bg-white/[.14]">
            {timeline.map((entry) => (
              <div
                key={entry.time}
                className="grid grid-cols-[66px_1fr_96px] items-center gap-3 rounded-[14px] px-3.5 py-[11px]"
                style={{ background: PANEL }}
              >
                <span className="text-[11px] text-ink/60">{entry.time}</span>
                <div>
                  <div className="text-[12.5px] leading-[1.4]">{entry.event}</div>
                  <div className="mt-[3px] text-[9px] text-ink/45">{entry.source}</div>
                </div>
                <span
                  className={cx(
                    "px-1.5 py-0.5 text-center text-[8.5px] tracking-[.1em]",
                    TIMELINE_TAG[entry.kind],
                  )}
                >
                  {entry.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[22px] mb-[11px] text-[9px] tracking-[.14em] text-ink/50">
            WHERE IT IS LANDING
          </div>
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-2">
            {hotRegions.map((region) => (
              <div
                key={region.name}
                className="min-w-0 rounded-[14px] border border-white/[.14] px-3 py-[11px]"
                style={{ background: PANEL }}
              >
                <div className="text-[11.5px] font-medium">{region.name}</div>
                <div className="mt-1.5 text-[19px] text-[#e0a04f]">{region.multiplier}</div>
                <div className="mt-1 text-[9px] text-ink/45">vs baseline</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-white/[.18]" style={{ background: PANEL }}>
            <div className="border-b border-white/[.14] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/50">
              RESPONSE CHECKLIST
            </div>
            {steps.map((step, index) => (
              <button
                key={step.label}
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-start gap-2.5 border-b border-white/[.09] px-[13px] py-[11px] text-left hover:bg-white/[.05]"
              >
                <span
                  className={cx(
                    "mt-px flex h-4 w-4 flex-none items-center justify-center text-[10px]",
                    isDone(index) ? "bg-[#1F9C7C] text-ink" : "border border-white/40",
                  )}
                >
                  {isDone(index) ? "✓" : ""}
                </span>
                <div>
                  <div
                    className={cx(
                      "text-xs leading-[1.45]",
                      isDone(index) ? "text-ink/50 line-through" : "text-ink",
                    )}
                  >
                    {step.label}
                  </div>
                  <div className="mt-[3px] text-[9px] text-ink/[.42]">{step.owner}</div>
                </div>
              </button>
            ))}
            <div className="px-[13px] py-[11px] text-[10.5px] leading-[1.5] text-ink/55">
              Every step is factual correction or service information. The tool offers no option to
              amplify, boost, or counter-message.
            </div>
          </div>

          <div className="border border-white/[.18]" style={{ background: PANEL }}>
            <div className="border-b border-white/[.14] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/50">
              GROUND TRUTH
            </div>
            <div className="px-[13px] py-3 text-[11.5px] leading-[1.6] text-pretty text-ink/75">
              {groundTruth}
            </div>
            <div className="px-[13px] pb-[13px] text-[9px] leading-[1.6] whitespace-pre-line text-ink/45">
              {groundTruthMeta}
            </div>
          </div>

          <div className="rounded-[14px] border border-[rgba(217,83,79,.35)] bg-[rgba(217,83,79,.1)] px-[13px] py-[11px] text-[10.5px] leading-[1.55] text-ink/75">
            <b className="text-[9px] tracking-[.12em] text-[#e08b87]">ESCALATION GATE</b>
            <br />
            {escalationGate}
          </div>
        </div>
      </div>
    </div>
  );
}
