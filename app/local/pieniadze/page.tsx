"use client";

import { useMoney } from "@/hooks/useLocal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

const TENDER_GRID = "minmax(200px,1.4fr) minmax(220px,1.6fr) 120px 110px 120px 110px";
const BENCH_GRID = "minmax(150px,1.3fr) repeat(4,minmax(100px,1fr))";

export default function MoneyPage() {
  const { data } = useMoney();
  if (!data) return null;

  const { spending, benchmarkColumns, benchmark, tenderColumns, tenders } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker="WYDATKI, PRZETARGI, BENCHMARK GUS"
        title="Ile wydaje gmina i jak wypada na tle podobnych"
        aside={
          <>
            grupa porównawcza z BDL: 12 gmin
            <br />
            dobór po liczbie ludności i dochodzie własnym
          </>
        }
      />

      <DataTable columns={tenderColumns} grid={TENDER_GRID} minWidth={1000} className="mb-[26px]">
        {tenders.map((tender) => (
          <DataRow key={tender.id} grid={TENDER_GRID} align="center">
            <div className="min-w-0 px-3 py-2.5">
              <div className="text-xs leading-[1.35]">{tender.id}</div>
              <div className="mt-0.5 text-[9.5px] text-ink/45">{tender.mode}</div>
            </div>
            <div className="min-w-0 px-3 py-2.5 text-[11.5px] leading-[1.45] text-ink/[.72]">
              {tender.subject}
            </div>
            <div className="px-3 py-2.5 text-[11.5px]">{tender.value}</div>
            <div className="px-3 py-2.5 text-[10.5px] text-ink/65">{tender.offers}</div>
            <div className="px-3 py-2.5 text-[11.5px] text-ink/70">{tender.winner}</div>
            <div className="px-3 py-2.5">
              <Chip tone={tender.tone}>{tender.flag}</Chip>
            </div>
          </DataRow>
        ))}
      </DataTable>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6">
        <div>
          <SectionRule title="Wydatki per dział" aside="I PÓŁROCZE 2026" />
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-[15px] py-3.5">
            {spending.map((line) => (
              <div key={line.label} className="mb-3">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[11.5px]">{line.label}</span>
                  <span className="text-[10.5px] text-ink/65">{line.value}</span>
                </div>
                <div className="relative h-[9px] bg-white/[.07]">
                  <div
                    className="h-[9px]"
                    style={{
                      width: `${line.share}%`,
                      background: line.share >= line.median ? "rgba(231,234,242,.45)" : "#7C5CFF",
                    }}
                  />
                  <div
                    title="mediana grupy"
                    className="absolute -top-[3px] -bottom-[3px] w-0.5 bg-white/[.05]"
                    style={{ left: `${line.median}%` }}
                  />
                </div>
                <div className="mt-1 text-[9px] text-ink/50">{line.vs}</div>
              </div>
            ))}
            <div className="border-t border-dashed border-white/[.16] pt-1.5 text-[9px] leading-[1.6] text-ink/50">
              Pionowa kreska to mediana grupy porównawczej z BDL. Kwoty przeliczone na mieszkańca.
            </div>
          </div>
        </div>

        <div>
          <SectionRule title="Benchmark z gminami podobnymi" aside="ŹRÓDŁO: GUS / BDL" />
          <DataTable columns={benchmarkColumns} grid={BENCH_GRID} minWidth={620}>
            {benchmark.map((row) => (
              <DataRow key={row.name} grid={BENCH_GRID} align="center" isSelected={row.isSelf}>
                <div className="min-w-0 px-3 py-2.5 text-xs">{row.name}</div>
                <div className="px-3 py-2.5 text-[11px]">{row.perCapita}</div>
                <div className="px-3 py-2.5 text-[11px]">{row.invest}</div>
                <div className="px-3 py-2.5 text-[11px]">{row.debt}</div>
                <div className="px-3 py-2.5 text-[11px]">{row.waste}</div>
              </DataRow>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}
