"use client";

import { useConstituentInbox } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import type { ClusterStatus } from "@/lib/data/types";
import { cx } from "@/lib/cn";

/** Cluster routing status — green when routed, indigo when tied to an alert. */
const STATUS: Record<ClusterStatus, string> = {
  routed: "bg-[#1F9C7C] text-ink",
  flagged: "bg-amber text-ink",
  rumour: "bg-accent text-ink",
  analysis: "bg-ink/[.08] text-ink/60",
};

const FLAG = {
  coordinated: "bg-amber/[.22] text-amber-soft",
  rumour: "bg-accent/[.18] text-accent-soft",
} as const;

export default function ConstituentInboxPage() {
  const { data } = useConstituentInbox();
  if (!data) return null;

  const { intake, clusters, coordinationNote, separationNote, heldBackNote } = data;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="CONSTITUENT INBOX · CLUSTERED"
        title="What people wrote to us"
        aside={
          <>
            Individuals are never searchable
            <br />
            Clusters appear at k ≥ 50 only
          </>
        }
      />

      <HairlineList columns="repeat(4,minmax(0,1fr))" className="mt-[18px] mb-5">
        {intake.map((stat) => (
          <HairlineItem key={stat.label} className="min-w-0 px-[15px] py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.13em] text-ink/50">{stat.label}</div>
            <div className="text-2xl font-medium tracking-[-.02em]">{stat.value}</div>
            <div className="mt-[7px] text-[10.5px] leading-[1.4] text-ink/55">{stat.note}</div>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-6">
        <div className="border border-white/[.14]">
          {clusters.map((cluster) => (
            <div
              key={cluster.topic}
              className="rounded-[14px] border-b border-white/10 bg-white/[.03] px-3.5 py-[13px] hover:bg-white/[.04]"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_88px] items-start gap-3.5">
                <div>
                  <div className="mb-1.5 flex flex-wrap items-center gap-[7px]">
                    <span
                      className={cx(
                        "px-1.5 py-0.5 text-[8.5px] tracking-[.1em]",
                        STATUS[cluster.statusKind],
                      )}
                    >
                      {cluster.status}
                    </span>
                    {cluster.flag && cluster.flagKind && (
                      <span
                        className={cx(
                          "px-1.5 py-0.5 text-[8.5px] tracking-[.1em]",
                          FLAG[cluster.flagKind],
                        )}
                      >
                        {cluster.flag}
                      </span>
                    )}
                    <span className="text-[9px] text-ink/45">{cluster.mix}</span>
                  </div>

                  <div className="text-[15.5px] leading-[1.25] font-semibold text-pretty">
                    {cluster.topic}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.45] text-pretty text-ink/70 italic">
                    “{cluster.paraphrase}”
                  </div>
                  <div className="mt-1.5 text-[9px] text-ink/45">{cluster.region}</div>
                </div>

                <div className="text-right">
                  <div className="text-[22px] font-medium tracking-[-.02em]">{cluster.count}</div>
                  <div className="mt-0.5 text-[9px] text-ink/45">contacts</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[14px] border border-white/[.14] bg-white/[.035] p-3.5">
            <div className="mb-2.5 text-[9px] tracking-[.14em] text-ink/45">
              COORDINATION, DISCLOSED NOT DISCOUNTED
            </div>
            <div className="text-[11.5px] leading-[1.6] text-pretty text-ink/[.72]">
              {coordinationNote}
            </div>
          </div>

          <div className="rounded-[14px] border border-white/[.14] bg-white/[.03] p-3.5">
            <div className="mb-2.5 text-[9px] tracking-[.14em] text-ink/45">
              TWO SEPARATE SYSTEMS
            </div>
            <div className="text-[11.5px] leading-[1.6] text-pretty text-ink/[.72]">
              {separationNote}
            </div>
          </div>

          <div className="rounded-[14px] border border-accent/20 bg-accent/[.06] p-3.5 text-[11px] leading-[1.6] text-ink/[.72]">
            <b className="text-[9px] tracking-[.12em] text-accent-soft">146 CONTACTS HELD BACK</b>
            <br />
            {heldBackNote}
          </div>
        </div>
      </div>
    </div>
  );
}
