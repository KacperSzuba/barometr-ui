"use client";

import { useState } from "react";
import { useIntake } from "@/hooks/useEngine";
import { useLiveCounter } from "@/hooks/useLiveCounter";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { KpiStrip } from "@/components/ui/KpiStrip";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { SECTIONS } from "@/lib/sections";
import { formatNumber } from "@/lib/format";

const CONNECTOR_GRID = "minmax(200px,1.5fr) 110px 130px 110px 110px 90px 120px 100px";

const ALL = "Wszystkie";

export default function IntakePage() {
  const [filter, setFilter] = useState(ALL);
  const { data } = useIntake();
  const live = useLiveCounter(SECTIONS.engine.live);
  if (!data) return null;

  const { kpis, filters, columns, connectors, transcripts, limits, schedules } = data;
  const visible =
    filter === ALL ? connectors : connectors.filter((connector) => connector.group === filter);

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        titleSize="text-[31px]"
        kicker="POZYSKIWANIE · 12 KLAS KONEKTORÓW"
        title="Skąd bierzemy dane"
        aside={
          <>
            harmonogram per źródło · retry z backoffem
            <br />
            detekcja martwych źródeł poniżej 6 h
          </>
        }
      />

      <KpiStrip kpis={kpis} liveValue={formatNumber(live ?? 0)} />

      <SectionRule
        title="Rejestr konektorów"
        aside={
          <SegmentedControl
            segments={filters.map((group) => ({ value: group, label: group.toUpperCase() }))}
            value={filter}
            onChange={setFilter}
          />
        }
      />

      <DataTable columns={columns} grid={CONNECTOR_GRID} minWidth={1080} className="mb-6">
        {visible.map((connector) => (
          <DataRow key={connector.name} grid={CONNECTOR_GRID} align="center">
            <div className="min-w-0 px-3 py-[9px]">
              <div className="text-[12.5px] font-medium">{connector.name}</div>
              <div className="mt-0.5 text-[9.5px] text-ink/45">{connector.detail}</div>
            </div>
            <div className="px-3 py-[9px] text-[10px] text-ink/65">{connector.type}</div>
            <div className="px-3 py-[9px] text-[10px] text-ink/65">{connector.schedule}</div>
            <div className="px-3 py-[9px] text-[10px] text-ink/65">{connector.last}</div>
            <div className="px-3 py-[9px] text-[11px]">{connector.volume}</div>
            <div className="px-3 py-[9px] text-[10px] text-ink/60">{connector.retry}</div>
            <div className="px-3 py-[9px]">
              <Chip tone={connector.tdmTone}>{connector.tdm}</Chip>
            </div>
            <div className="px-3 py-[9px]">
              <Chip tone={connector.statusTone}>{connector.status}</Chip>
            </div>
          </DataRow>
        ))}
      </DataTable>

      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule
            title="Transkrypcje audio i wideo"
            aside="WHISPER large-v3 · DIARYZACJA MÓWCÓW"
          />
          <HairlineList>
            {transcripts.map((transcript) => (
              <HairlineItem
                key={transcript.name}
                className="grid grid-cols-[minmax(0,1fr)_96px_120px] items-center gap-3 px-[13px] py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-[12.5px] leading-[1.35]">{transcript.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{transcript.meta}</div>
                </div>
                <div className="text-[10.5px] text-ink/60">{transcript.length}</div>
                <div>
                  <Chip tone={transcript.tone}>{transcript.status}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          <div className="mt-[9px] text-[9.5px] leading-[1.6] text-ink/45">
            Transkrypt jest indeksowany po mówcy i minucie. Cytat w streszczeniu prowadzi do sekundy
            nagrania, nie do całości pliku.
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-4 py-[15px]">
            <div className="mb-[9px] text-[9px] tracking-[.14em] text-accent-soft">
              GRANICE POZYSKIWANIA
            </div>
            <div className="flex flex-col gap-2">
              {limits.map((limit) => (
                <div
                  key={limit.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2.5 border-b border-dotted border-white/[.16] pb-[7px]"
                >
                  <span className="text-[11.5px] leading-[1.45] text-pretty text-ink/[.78]">
                    {limit.label}
                  </span>
                  <Chip tone={limit.tone}>{limit.value}</Chip>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] bg-white/[.05] px-4 py-[15px] text-ink">
            <div className="mb-[9px] text-[9px] tracking-[.14em] text-ink/50">
              HARMONOGRAM ODŚWIEŻANIA
            </div>
            <div className="flex flex-col gap-[7px]">
              {schedules.map((schedule) => (
                <div key={schedule.every} className="flex items-center gap-2.5">
                  <span className="w-24 flex-none text-[10px] text-ink/60">{schedule.every}</span>
                  <span className="min-w-0 flex-1 text-[11.5px]">{schedule.what}</span>
                  <span className="flex-none text-[10px] text-amber">{schedule.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
