"use client";

import { useState } from "react";
import { useBip } from "@/hooks/useLocal";
import { useLiveCounter } from "@/hooks/useLiveCounter";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Chip } from "@/components/ui/Chip";
import { Bar } from "@/components/ui/Bar";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { SECTIONS } from "@/lib/sections";
import { formatNumber } from "@/lib/format";

/** Unit shown in the kicker — the unit picker is inert in the prototype. */
const ACTIVE_UNIT = "Gliwice";

const ALL = "Wszystko";

export default function BipPage() {
  const [filter, setFilter] = useState(ALL);
  const documents = useBip().data;
  const live = useLiveCounter(SECTIONS.localTier.live);
  if (!documents) return null;

  const { kpis, documentGroups, zoning, budget } = documents;
  const visible =
    filter === ALL
      ? documents.documents
      : documents.documents.filter((doc) => doc.group === filter);

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        titleSize="text-[32px]"
        kicker={`AGREGACJA BIP · ${ACTIVE_UNIT.toUpperCase()}`}
        title="Uchwały, protokoły, budżety, MPZP"
        aside={
          <>
            BIP odświeżany co 60 min
            <br />
            parser PDF + OCR załączników
          </>
        }
      />

      <KpiStrip kpis={kpis} liveValue={formatNumber(live ?? 0)} />

      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule
            title="Nowe dokumenty w BIP"
            aside={
              <SegmentedControl
                size="sm"
                segments={documentGroups.map((group) => ({
                  value: group,
                  label: group.toUpperCase(),
                }))}
                value={filter}
                onChange={setFilter}
              />
            }
          />
          <HairlineList>
            {visible.map((doc) => (
              <HairlineItem
                key={doc.id}
                className="grid grid-cols-[minmax(0,1fr)_96px_104px] items-start gap-[11px] px-[13px] py-[11px] hover:bg-white/[.04]"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-[7px]">
                    <Chip tone={doc.typeTone}>{doc.type}</Chip>
                    <span className="text-[9.5px] text-ink/45">{doc.id}</span>
                  </div>
                  <div className="mb-[3px] text-[12.5px] leading-[1.4] text-pretty">
                    {doc.title}
                  </div>
                  <div className="text-[11px] leading-[1.45] text-pretty text-ink/60">
                    {doc.note}
                  </div>
                </div>
                <div className="text-[9.5px] leading-[1.6] text-ink/55">
                  {doc.date}
                  <br />
                  {doc.pages}
                </div>
                <div>
                  <Chip tone={doc.stateTone}>{doc.state}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <SectionRule title="Plany miejscowe w toku" />
            <HairlineList>
              {zoning.map((plan) => (
                <HairlineItem key={plan.area} className="px-[13px] py-[11px]">
                  <div className="mb-[5px] flex items-center justify-between gap-[9px]">
                    <span className="min-w-0 text-[12.5px] font-medium">{plan.area}</span>
                    <Chip tone={plan.tone}>{plan.stage}</Chip>
                  </div>
                  <div className="mb-1.5 text-[11px] leading-[1.45] text-pretty text-ink/[.62]">
                    {plan.what}
                  </div>
                  <div className="flex justify-between text-[9.5px] text-ink/50">
                    <span>{plan.size}</span>
                    <span>{plan.deadline}</span>
                  </div>
                </HairlineItem>
              ))}
            </HairlineList>
          </div>

          <div>
            <SectionRule title="Budżet w skrócie" aside="2026 · PO ZMIANACH" />
            <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-[15px] py-3.5">
              {budget.map((line) => (
                <div key={line.label} className="mb-[11px]">
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="text-[11.5px]">{line.label}</span>
                    <span className="text-[10.5px] text-ink/65">{line.value}</span>
                  </div>
                  <Bar value={line.share} height={8} />
                </div>
              ))}
              <div className="border-t border-dashed border-white/[.16] pt-2 text-[9.5px] leading-[1.6] text-ink/50">
                Zmiany w budżecie w tym roku: 14 uchwał. Ostatnia przesuwa 4,2 mln zł z rezerwy
                inwestycyjnej na remonty szkół.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
