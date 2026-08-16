"use client";

import { useImpact } from "@/hooks/usePro";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { BandBar } from "@/components/ui/Bar";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

const IMPACT_GRID = "minmax(220px,1.5fr) minmax(220px,1.6fr) 110px 130px 130px 110px";

/** Stakeholder bar colour — gain, loss, everything else neutral. */
const WEIGHT_COLOR = {
  emerald: "#1F9C7C",
  accent: "#7C5CFF",
  amber: "rgba(231,234,242,.35)",
  neutral: "rgba(231,234,242,.35)",
} as const;

export default function ImpactPage() {
  const { data } = useImpact();
  if (!data) return null;

  const { columns, rows, quarter, forecasts, stakeholders } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker="ROUTING WPŁYWU · PKD 35.14 · OBRÓT ENERGIĄ"
        title="Co dotyczy nas i do kiedy trzeba zdążyć"
        aside={
          <>
            18 aktów w toku dopasowanych do profilu
            <br />4 z terminem działania poniżej 14 dni
          </>
        }
      />

      <DataTable columns={columns} grid={IMPACT_GRID} minWidth={1060} className="mb-6">
        {rows.map((row) => (
          <DataRow key={row.id} grid={IMPACT_GRID}>
            <div className="min-w-0 px-3 py-[11px]">
              <div className="mb-[3px] text-[9.5px] text-accent-soft">{row.id}</div>
              <div className="text-[12.5px] leading-[1.35] font-medium text-pretty">
                {row.title}
              </div>
              <div className="mt-[3px] text-[9.5px] text-ink/45">{row.stage}</div>
            </div>
            <div className="min-w-0 px-3 py-[11px] text-[11.5px] leading-[1.5] text-pretty text-ink/[.72]">
              {row.change}
            </div>
            <div className="px-3 py-[11px]">
              <Chip tone={row.tone}>{row.level}</Chip>
            </div>
            <div className="px-3 py-[11px]">
              <div className="mb-[3px] text-[11.5px]">{row.deadline}</div>
              <div className="text-[9.5px] text-ink/50">{row.deadlineNote}</div>
            </div>
            <div className="px-3 py-[11px] text-[11.5px] leading-[1.4] text-ink/70">
              {row.owner}
            </div>
            <div className="cursor-pointer px-3 py-[11px] text-[9.5px] text-accent-soft">
              {row.action}
            </div>
          </DataRow>
        ))}
      </DataTable>

      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Kwartał do przodu" aside="DECYZJE, KTÓRE ZAPADNĄ" />
          <HairlineList>
            {quarter.map((event) => (
              <HairlineItem
                key={event.what}
                className="grid grid-cols-[74px_minmax(0,1fr)_96px] items-center gap-3 px-[13px] py-[11px]"
              >
                <div className="text-[10px] text-ink/55">{event.when}</div>
                <div className="min-w-0">
                  <div className="text-[12.5px] leading-[1.35]">{event.what}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{event.who}</div>
                </div>
                <div>
                  <Chip tone={event.tone}>{event.tag}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <HairlineList className="mt-3.5">
            <HairlineItem className="bg-white/[.05] px-[13px] py-[9px] text-[9px] tracking-[.13em] text-ink/55">
              PROGNOZY Z PASMEM NIEPEWNOŚCI
            </HairlineItem>
            {forecasts.map((forecast) => (
              <HairlineItem key={forecast.question} className="px-[13px] py-2.5">
                <div className="mb-1.5 flex items-baseline justify-between gap-2.5">
                  <span className="min-w-0 text-xs leading-[1.35]">{forecast.question}</span>
                  <span className="flex-none text-[13px]">{forecast.probability}</span>
                </div>
                <BandBar low={forecast.low} high={forecast.high} point={forecast.probability} />
                <div className="mt-1 text-[9.5px] text-ink/50">
                  pasmo {forecast.band} · {forecast.horizon}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div>
          <SectionRule title="Mapa interesariuszy" aside="DRUK 412 · KTO ZYSKUJE, KTO TRACI" />
          <HairlineList>
            {stakeholders.map((entry) => (
              <HairlineItem key={entry.who} className="px-[13px] py-[11px]">
                <div className="mb-[5px] flex items-center gap-[9px]">
                  <Chip tone={entry.tone}>{entry.side}</Chip>
                  <span className="min-w-0 flex-1 text-[12.5px] font-medium">{entry.who}</span>
                  <span className="text-[9.5px] text-ink/50">siła {entry.power}</span>
                </div>
                <div className="mb-[5px] text-[11.5px] leading-[1.5] text-pretty text-ink/[.68]">
                  {entry.why}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-white/[.07]">
                    <div
                      className="h-1.5"
                      style={{
                        width: `${entry.weight}%`,
                        background: WEIGHT_COLOR[entry.tone],
                      }}
                    />
                  </div>
                  <span className={cx("flex-none text-[9px] text-ink/45")}>{entry.evidence}</span>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          <Note className="mt-[9px]">
            Pozycje interesariuszy wynikają wyłącznie z dokumentów: uwag w konsultacjach, stanowisk,
            głosowań i wypowiedzi publicznych. Każdy wpis ma źródło.
          </Note>
        </div>
      </div>
    </div>
  );
}
