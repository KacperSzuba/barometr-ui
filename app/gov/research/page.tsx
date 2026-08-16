"use client";

import { useDeliberation } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { cx } from "@/lib/cn";

/** Outside this band around the census share the reach bar turns amber. */
const REACH_TOLERANCE = 15;
/** Bar scale divisor — 130% fills the whole track. */
const REACH_SCALE = 1.3;

const isUnderOrOverReached = (value: number) =>
  value < 100 - REACH_TOLERANCE || value > 100 + REACH_TOLERANCE;

export default function DeliberationPage() {
  const { data } = useDeliberation();
  if (!data) return null;

  const { themes, sessions, reach, reachNote, methodNote } = data;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="DELIBERATION DESK · QUALITATIVE"
        title="Why people think what they think"
        aside={
          <>
            4 sessions · 680 participants
            <br />
            Consent recorded · transcripts anonymised
          </>
        }
      />

      <div className="mt-[18px] grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-6">
        <div>
          <SectionRule title="Themes across sessions" />
          <div className="border border-white/[.14]">
            {themes.map((theme) => (
              <div
                key={theme.theme}
                className="rounded-[14px] border-b border-white/10 bg-white/[.03] p-3.5"
              >
                <div className="mb-[7px] flex items-center gap-2">
                  <span
                    className={cx(
                      "px-1.5 py-0.5 text-[8.5px] tracking-[.09em]",
                      theme.strength === "STRONG"
                        ? "bg-ink/85 text-ink"
                        : "bg-ink/[.12] text-ink/65",
                    )}
                  >
                    {theme.strength}
                  </span>
                  <span className="text-[9px] text-ink/45">{theme.where}</span>
                </div>

                <div className="text-[17px] leading-[1.25] font-semibold tracking-[-.01em] text-pretty">
                  {theme.theme}
                </div>

                <div className="mt-2 border-l-2 border-accent/35 pl-3 text-[13px] leading-[1.5] text-pretty text-ink/75 italic">
                  “{theme.quote}”
                </div>
              </div>
            ))}

            <div className="rounded-[14px] bg-white/[.035] px-3.5 py-3 text-[11px] leading-[1.6] text-pretty text-ink/[.62]">
              {methodNote}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div>
            <SectionRule title="Sessions" />
            <div className="border border-white/[.14]">
              {sessions.map((session) => (
                <div
                  key={session.type}
                  className="rounded-[14px] border-b border-white/10 bg-white/[.03] px-[13px] py-[11px]"
                >
                  <div className="flex items-baseline justify-between gap-2.5">
                    <span className="text-[12.5px] font-semibold">{session.type}</span>
                    <span className="text-[10px] text-ink/55">n = {session.n}</span>
                  </div>
                  <div className="mt-[3px] text-[9.5px] text-ink/50">
                    {session.place} · {session.date} · {session.method}
                  </div>
                  <div className="mt-[5px] text-[10.5px] text-accent-soft">
                    {session.representativeness}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-white/[.14] bg-white/[.035] p-3.5">
            <div className="mb-3 text-[9px] tracking-[.14em] text-ink/45">
              WHO WE ACTUALLY REACHED (100% = CENSUS SHARE)
            </div>
            {reach.map((bar) => (
              <div key={bar.label} className="mb-[9px]">
                <div className="mb-1 flex justify-between text-[11px]">
                  <span>{bar.label}</span>
                  <span className="text-ink/55">{bar.value}%</span>
                </div>
                <div className="h-1.5 bg-white/[.08]">
                  <div
                    className={cx(
                      "h-full",
                      isUnderOrOverReached(bar.value) ? "bg-amber" : "bg-ink/75",
                    )}
                    style={{ width: `${Math.min(100, bar.value / REACH_SCALE)}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-2.5 text-[10.5px] leading-[1.55] text-ink/60">{reachNote}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
