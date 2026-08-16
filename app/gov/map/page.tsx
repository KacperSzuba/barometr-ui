"use client";

import { useState } from "react";
import { useRegionalMap } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { GovChip } from "@/components/gov/GovChip";
import { moodColor, moodText } from "@/lib/gov-scale";
import { cx } from "@/lib/cn";

/** Below this sample size a voivodeship is flagged as low confidence. */
const RELIABILITY_FLOOR = 400;

export default function RegionalMapPage() {
  const [region, setRegion] = useState("MAZ");
  const [topic, setTopic] = useState("Energy prices");
  const [active, setActive] = useState<Record<string, boolean>>({
    press: true,
    social: true,
    polls: true,
    contacts: true,
  });

  const { data } = useRegionalMap();
  if (!data) return null;

  const { regions, details, fallback, topics, sources, national, nationalMoe } = data;
  const selected = regions.find((row) => row.abbr === region) ?? regions[6];
  const detail = details[selected.abbr] ?? fallback;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="SENTIMENT · 16 VOIVODESHIPS"
        title="Regional opinion map"
        aside={
          <>
            Grid cartogram · equal-area tiles
            <br />
            Weighted poll + coverage + contact blend
          </>
        }
      />

      <div className="mt-[18px] mb-[18px] flex flex-wrap items-center gap-2">
        <span className="text-[9px] tracking-[.13em] text-ink/45">TOPIC</span>
        {topics.map((name) => (
          <GovChip key={name} isActive={name === topic} onClick={() => setTopic(name)}>
            {name}
          </GovChip>
        ))}

        <div className="mx-1 h-5 w-px bg-white/[.14]" />

        <span className="text-[9px] tracking-[.13em] text-ink/45">SOURCES</span>
        {sources.map((source) => {
          const on = active[source.key];

          return (
            <button
              key={source.key}
              type="button"
              onClick={() => setActive((current) => ({ ...current, [source.key]: !on }))}
              className={cx(
                "cursor-pointer border px-[9px] py-1 text-[9.5px] tracking-[.06em]",
                on ? "border-ink/35 text-ink/80" : "border-ink/15 text-ink/35",
              )}
            >
              {on ? "■" : "□"} {source.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_340px] items-start gap-6">
        <div>
          <div className="grid auto-rows-[88px] grid-cols-[repeat(4,minmax(0,1fr))] gap-[5px]">
            {regions.map((row) => {
              const isSelected = row.abbr === region;

              return (
                <button
                  key={row.abbr}
                  type="button"
                  onClick={() => setRegion(row.abbr)}
                  className="flex min-w-0 cursor-pointer flex-col justify-between gap-1 overflow-hidden px-2.5 py-[9px] text-left"
                  style={{
                    background: moodColor(row.value),
                    color: moodText(row.value),
                    gridColumn: row.col,
                    gridRow: row.row,
                    outline: isSelected
                      ? "2.5px solid rgba(255,255,255,.06)"
                      : "1px solid rgba(23,24,26,.14)",
                    outlineOffset: isSelected ? "-2.5px" : "-1px",
                  }}
                >
                  <div className="text-[9px] tracking-[.07em] opacity-75">{row.abbr}</div>
                  <div className="text-[23px] leading-none font-medium tracking-[-.02em]">
                    {row.value.toFixed(1)}
                  </div>
                  <div className="text-[8.5px] leading-[1.15] break-words opacity-80">
                    {row.name}
                  </div>
                  {row.n < RELIABILITY_FLOOR && (
                    <div className="text-[8px] tracking-[.08em] opacity-85">⚠ LOW n</div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-3.5">
            <div className="flex flex-1 items-center gap-2 text-[9.5px] text-ink/50">
              <span>28</span>
              <div className="h-[9px] flex-1 bg-[linear-gradient(90deg,#7C5CFF,#c98d7a,rgba(255,255,255,.06),#8bb5a4,#1F9C7C)]" />
              <span>72</span>
              <span className="ml-1.5 tracking-[.1em]">MOOD INDEX</span>
            </div>
            <div className="text-[9.5px] text-ink/50">
              national {national} · ±{nationalMoe}
            </div>
          </div>

          <div className="mt-3.5 rounded-[14px] border border-white/[.13] bg-white/[.035] px-[13px] py-[11px] text-[11px] leading-[1.55] text-pretty text-ink/65">
            <b className="text-[9px] tracking-[.12em] text-accent-soft">READ THIS CAREFULLY</b> —
            Tiles are equal-area, not geographic: they show relative position only, so no region
            looks more important because it is physically larger. Two voivodeships fall below the n
            = 400 reliability floor this week and are flagged; do not brief on them without a
            follow-up survey.
          </div>
        </div>

        <div className="border border-white/[.14] bg-white/[.035]">
          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-1.5 text-[9px] tracking-[.14em] text-ink/45">SELECTED REGION</div>
            <div className="text-[21px] font-bold tracking-[-.01em]">{selected.name}</div>
            <div className="mt-2 flex items-baseline gap-[9px]">
              <span className="text-[30px] font-medium tracking-[-.02em]">
                {selected.value.toFixed(1)}
              </span>
              <span
                className={cx(
                  "text-[13px]",
                  selected.delta.startsWith("−") ? "text-accent-soft" : "text-emerald-soft",
                )}
              >
                {selected.delta}
              </span>
              <span className="text-[10px] text-ink/50">
                n = {selected.n} · ±{selected.moe}
              </span>
            </div>
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2.5 text-[9px] tracking-[.14em] text-ink/45">TOP CONCERNS</div>
            {detail.issues.map(([label, pct]) => (
              <div key={label} className="mb-2.5">
                <div className="mb-1 flex justify-between text-[11.5px]">
                  <span>{label}</span>
                  <span className="text-ink/55">{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/[.08]">
                  <div className="h-full bg-white/[.05]" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.14em] text-ink/45">WHAT MOVED IT</div>
            <div className="text-[11.5px] leading-[1.55] text-pretty text-ink/[.72]">
              {detail.driver}
            </div>
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.14em] text-ink/45">REPRESENTATIVE VOICE</div>
            <div className="text-sm leading-[1.45] text-pretty text-ink/85 italic">
              “{detail.quote}”
            </div>
            <div className="mt-[7px] text-[9px] text-ink/45">{detail.quoteSource}</div>
          </div>

          <div className="flex items-start gap-[9px] rounded-[14px] bg-amber/10 px-3.5 py-3">
            <span className="mt-[5px] h-1.5 w-1.5 flex-none rotate-45 bg-amber" />
            <div className="text-[10.5px] leading-[1.5] text-ink/70">
              Regional figures are for understanding needs and briefing policy. Exporting them into
              campaign targeting tools is blocked by policy and logged.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
