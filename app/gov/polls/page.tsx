"use client";

import { useState } from "react";
import { usePolls } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { GovChip } from "@/components/gov/GovChip";
import { PollChart } from "@/components/gov/PollChart";
import { SectionRule } from "@/components/ui/SectionRule";
import { cx } from "@/lib/cn";

const HISTORY_GRID = "118px 78px 62px 78px 82px minmax(0,1fr)";
const POLL_GRID = "minmax(0,1.3fr) 96px 64px 70px minmax(0,1fr) 74px 66px";

/** A spread above this means houses differ by more than sampling error. */
const SPREAD_ALERT = 6;
/** House effects above this absolute value are highlighted. */
const HOUSE_EFFECT_ALERT = 2;

/** Reading bar scale — the 40–55 pt range maps onto the full width. */
const READING_MIN = 40;
const READING_SPAN = 15;

export default function PollsPage() {
  const [range, setRange] = useState("6 months");
  const { data } = usePolls();
  if (!data) return null;

  const { ranges, series, pointsPerRange, xLabels, history, rows, warnings } = data;

  const points = pointsPerRange[range];
  const visible = series.map((one) => ({ ...one, values: one.values.slice(-points) }));

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="POLLS &amp; METHOD · 6 IN FIELD WINDOW"
        title="The average, and why it lies"
        aside={
          <>
            Aggregate 47.2 · ±2.1
            <br />
            House effects estimated over 24 months
          </>
        }
      />

      <div className="mt-[18px]">
        <SectionRule
          title="Polling average — history"
          aside={
            <span className="flex gap-[5px]">
              {ranges.map((name) => (
                <GovChip key={name} isActive={name === range} onClick={() => setRange(name)}>
                  {name.toUpperCase()}
                </GovChip>
              ))}
            </span>
          }
        />
      </div>

      <div className="mb-3.5 rounded-[14px] border border-white/[.14] bg-white/[.035] px-4 pt-4 pb-3">
        <PollChart series={visible} xLabels={xLabels[range]} />
      </div>

      <div className="mb-[22px] border border-white/[.14]">
        <div
          className="grid gap-2.5 rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[8.5px] tracking-[.11em] text-ink/50"
          style={{ gridTemplateColumns: HISTORY_GRID }}
        >
          <span>WEEK ENDING</span>
          <span className="text-right">AVERAGE</span>
          <span className="text-right">Δ</span>
          <span className="text-right">POLLS</span>
          <span className="text-right">SPREAD</span>
          <span>WHAT MOVED IT</span>
        </div>
        {history.map((row) => (
          <div
            key={row.date}
            className="grid items-center gap-2.5 rounded-[14px] border-t border-white/10 bg-white/[.03] px-[13px] py-[9px]"
            style={{ gridTemplateColumns: HISTORY_GRID }}
          >
            <span className="text-[10.5px] text-ink/60">{row.date}</span>
            <span className="text-right text-[13px]">{row.avg}</span>
            <span
              className={cx(
                "text-right text-[11px]",
                row.delta.startsWith("−") ? "text-accent-soft" : "text-emerald-soft",
              )}
            >
              {row.delta}
            </span>
            <span className="text-right text-[10.5px] text-ink/55">{row.polls}</span>
            <span
              className={cx(
                "text-right text-[10.5px]",
                parseFloat(row.spread) > SPREAD_ALERT ? "text-amber-soft" : "text-ink/55",
              )}
            >
              {row.spread}
            </span>
            <span className="text-[11px] text-ink/60">{row.note}</span>
          </div>
        ))}
        <div className="rounded-[14px] border-t border-white/10 bg-white/[.035] px-[13px] py-2.5 text-[11px] leading-[1.55] text-pretty text-ink/[.62]">
          Spread is the distance between the highest and lowest poll in the window. When it exceeds
          6 points, the houses disagree by more than sampling error allows and the average should be
          quoted with that caveat, not as a single number.
        </div>
      </div>

      <SectionRule title="Individual polls in the window" />
      <div className="mb-5 border border-white/[.14]">
        <div
          className="grid gap-2.5 rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[8.5px] tracking-[.11em] text-ink/50"
          style={{ gridTemplateColumns: POLL_GRID }}
        >
          <span>HOUSE</span>
          <span>FIELD DATES</span>
          <span>n</span>
          <span>MODE</span>
          <span>READING</span>
          <span className="text-right">HOUSE EFF.</span>
          <span className="text-right">VALUE</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.house}
            className={cx(
              "grid items-center gap-2.5 border-t border-ink/10 px-[13px] py-2.5",
              row.isFlagged ? "bg-amber/[.09]" : "bg-white/[.03]",
            )}
            style={{ gridTemplateColumns: POLL_GRID }}
          >
            <div>
              <div className="text-[12.5px] font-medium">{row.house}</div>
              <div className="mt-0.5 text-[9px] text-ink/45">for {row.client}</div>
            </div>
            <span className="text-[10px] text-ink/60">{row.field}</span>
            <span className="text-[10px] text-ink/60">{row.n}</span>
            <span className="text-[10px] text-ink/60">{row.mode}</span>
            <div className="h-2 bg-white/[.08]">
              <div
                className="h-full bg-ink/75"
                style={{ width: `${((row.value - READING_MIN) / READING_SPAN) * 100}%` }}
              />
            </div>
            <span
              className={cx(
                "text-right text-[11px]",
                Math.abs(parseFloat(row.effect)) > HOUSE_EFFECT_ALERT
                  ? "text-amber-soft"
                  : "text-ink/60",
              )}
            >
              {row.effect}
            </span>
            <span className="text-right text-sm">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5">
        <div className="rounded-[14px] border border-amber/40 bg-amber/[.08] p-[15px]">
          <div className="mb-3 text-[9px] tracking-[.14em] text-[#8a6d12]">
            BEFORE YOU QUOTE ANY OF THIS
          </div>
          {warnings.map((warning) => (
            <div
              key={warning}
              className="flex gap-2.5 py-[7px] text-xs leading-[1.55] text-pretty text-ink/[.78]"
            >
              <span className="mt-1.5 h-[5px] w-[5px] flex-none rotate-45 bg-amber" />
              <span>{warning}</span>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-white/[.14] bg-white/[.03] p-[15px]">
          <div className="mb-3 text-[9px] tracking-[.14em] text-ink/45">
            HOW THE AGGREGATE IS BUILT
          </div>
          <div className="text-xs leading-[1.65] text-pretty text-ink/[.72]">
            Each poll is corrected by its estimated house effect, weighted by sample size and
            recency, and pooled with a 14-day half-life. The published error band widens
            automatically when houses disagree more than sampling error allows — as they do this
            week.
            <br />
            <br />
            The office’s own field team is included and is <b>not</b> given extra weight. Its house
            effect is estimated by the same method as everyone else’s, and it is published.
          </div>
          <div className="mt-3 flex gap-5 border-t border-dashed border-white/[.18] pt-[11px] text-[9.5px] text-ink/55">
            <span>MODEL: pooled, 14-day half-life</span>
            <span>DISAGREEMENT: 1.9× sampling error</span>
          </div>
        </div>
      </div>
    </div>
  );
}
