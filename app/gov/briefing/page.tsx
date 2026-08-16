"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBriefing } from "@/hooks/useGov";
import { Sparkline } from "@/components/gov/Sparkline";
import { MoodLegend, RegionGrid } from "@/components/gov/RegionGrid";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { GovChip } from "@/components/gov/GovChip";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { VERACITY_TONE } from "@/lib/gov";
import { cx } from "@/lib/cn";

/** Velocity above which a story qualifies for the "Rising" filter. */
const RISING_THRESHOLD = 2.5;

export default function BriefingPage() {
  const [filter, setFilter] = useState("All");
  const [region, setRegion] = useState("MAZ");
  const router = useRouter();
  const { data } = useBriefing();
  if (!data) return null;

  const { kpis, filters, stories, inbox, provenance, regions } = data;

  const shown = stories.filter((story) => {
    if (filter === "All") return true;
    if (filter === "Verified") return story.veracityKind === "verified";
    if (filter === "Disputed") return story.veracityKind !== "verified";
    return parseFloat(story.velocity) >= RISING_THRESHOLD;
  });

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="MORNING BRIEFING · 06:40"
        title="What changed overnight"
        aside={
          <>
            3 140 items reviewed · 428 sources
            <br />
            12 outlets · 4 broadcast transcripts · 2 polls
          </>
        }
      />

      <div className="mb-[22px] grid grid-cols-4 gap-px border border-t-0 border-white/[.12] bg-white/[.12]">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-[14px] bg-white/[.03] px-[15px] pt-3.5 pb-[13px]">
            <div className="mb-[9px] text-[9px] tracking-[.13em] text-ink/50">{kpi.label}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-[26px] font-medium tracking-[-.02em]">{kpi.value}</div>
              <div
                className={cx(
                  "text-xs",
                  kpi.direction === "down" ? "text-accent-soft" : "text-emerald-soft",
                )}
              >
                {kpi.delta}
              </div>
            </div>
            <div className="mt-[9px]">
              <Sparkline values={kpi.spark} color={kpi.sparkColor} />
            </div>
            <div className="mt-2 text-[10px] leading-[1.35] text-ink/50">{kpi.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule
            title="Stories moving now"
            aside={
              <span className="flex gap-[5px]">
                {filters.map((name) => (
                  <GovChip key={name} isActive={name === filter} onClick={() => setFilter(name)}>
                    {name.toUpperCase()}
                  </GovChip>
                ))}
              </span>
            }
          />

          <HairlineList edges="y">
            {shown.map((story, index) => (
              <HairlineItem
                key={story.title}
                className="grid cursor-pointer grid-cols-[34px_minmax(0,1fr)_132px] items-start gap-3 pt-[13px] pr-1 pb-3.5 hover:bg-white/[.04]"
              >
                <div className="pt-0.5 text-right text-[11px] text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="mb-[5px] flex items-center gap-[7px]">
                    <span
                      className={cx(
                        "px-1.5 py-0.5 text-[8.5px] tracking-[.1em]",
                        VERACITY_TONE[story.veracityKind],
                      )}
                    >
                      {story.veracity}
                    </span>
                    <span className="text-[9.5px] tracking-[.06em] text-ink/45">{story.meta}</span>
                  </div>
                  <div className="text-[16.5px] leading-[1.25] font-semibold tracking-[-.01em] text-pretty">
                    {story.title}
                  </div>
                  <div className="mt-[5px] text-[11.5px] leading-[1.45] text-pretty text-ink/60">
                    {story.summary}
                  </div>
                  <div className="mt-[7px] flex flex-wrap gap-[5px]">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[.06] px-1.5 py-0.5 text-[9px] tracking-[.06em] text-ink/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-0.5">
                  <div className="mb-1 flex justify-between text-[9px] text-ink/45">
                    <span>SENTIMENT</span>
                    <span>{story.sentimentLabel}</span>
                  </div>
                  <div className="flex h-[7px] w-full bg-white/[.07]">
                    <div style={{ width: `${story.negative}%`, background: "#7C5CFF" }} />
                    <div
                      style={{ width: `${story.neutral}%`, background: "rgba(231,234,242,.18)" }}
                    />
                    <div style={{ width: `${story.positive}%`, background: "#1F9C7C" }} />
                  </div>
                  <div className="mt-2 text-[10px] leading-[1.55] text-ink/60">
                    reach {story.reach}
                    <br />
                    velocity {story.velocity}
                  </div>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="mt-3.5 flex items-start gap-3 rounded-[14px] border border-white/[.13] bg-white/[.035] px-[13px] py-[11px]">
            <span className="pt-px text-[9px] tracking-[.12em] text-accent-soft">PROVENANCE</span>
            <div className="text-[11px] leading-[1.55] text-pretty text-ink/65">{provenance}</div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <SectionRule
              title="Regional mood"
              aside={
                <Link href="/gov/map" className="tracking-[.08em]">
                  FULL MAP →
                </Link>
              }
            />
            <RegionGrid
              regions={regions}
              selected={region}
              onSelect={(abbr) => {
                setRegion(abbr);
                router.push("/gov/map");
              }}
            />
            <MoodLegend />
          </div>

          <div>
            <SectionRule title="Constituent inbox" aside="1 284 / 24h" />
            <HairlineList>
              {inbox.map((cluster) => (
                <HairlineItem key={cluster.text} className="px-3 py-2.5">
                  <div className="mb-[5px] flex items-center gap-[7px]">
                    <Chip tone={cluster.tone}>{cluster.channel}</Chip>
                    <span className="text-[9.5px] text-ink/45">
                      {cluster.place} · {cluster.count} similar
                    </span>
                  </div>
                  <div className="text-[13px] leading-[1.4] text-pretty text-ink/85">
                    “{cluster.text}”
                  </div>
                </HairlineItem>
              ))}
            </HairlineList>
            <div className="mt-[7px] text-[9px] leading-[1.5] text-ink/[.42]">
              Quotes are paraphrased clusters. Individual messages are not attributable and not
              searchable by name.
            </div>
          </div>

          <div className="rounded-[14px] bg-white/[.05] px-[13px] py-3 text-ink">
            <div className="mb-[9px] text-[9px] tracking-[.14em] text-ink/50">OPEN ALERT</div>
            <div className="mb-[7px] text-base leading-[1.3] font-semibold">
              Unverified claim about hospital closures spreading in Podkarpackie
            </div>
            <div className="mb-[11px] text-[11px] leading-[1.5] text-ink/60">
              Velocity 6.4× baseline · first seen 04:18 · 3 fact-checks pending
            </div>
            <Link
              href="/gov/alert"
              className="inline-block rounded-[10px] border border-white/35 px-3 py-[7px] text-[10px] tracking-[.08em] text-ink hover:bg-white/[.12] hover:text-ink"
            >
              OPEN CRISIS VIEW →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
