"use client";

import { useState } from "react";
import { useProcessing } from "@/hooks/useEngine";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { DiffBlock } from "@/components/ui/DiffBlock";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import type { EntityKind } from "@/lib/data/types";
import { cx } from "@/lib/cn";

const MODEL_GRID = "minmax(150px,1.3fr) minmax(120px,1fr) 100px 90px 90px";

/** Node label colour in the entity graph. */
const ENTITY_KIND: Record<EntityKind, string> = {
  osoba: "bg-accent/[.12] text-accent-soft",
  instytucja: "bg-white/[.09] text-ink/75",
  spolka: "bg-amber/20 text-amber-soft",
  akt: "bg-emerald/[.16] text-emerald-soft",
  temat: "bg-white/[.05] text-ink/60",
};

export default function ProcessingPage() {
  /** Summary sentence whose source is expanded. */
  const [openSentence, setOpenSentence] = useState<number | null>(null);
  const { data } = useProcessing();
  if (!data) return null;

  const { stages, modelColumns, models, edges, provenance, diff, anomalies, framing } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="PRZETWARZANIE · OSTATNIE 24 H"
        title="Od 41 820 pozycji do 18 rzeczy, które są nowe"
        aside={
          <>
            koszt cyklu: 41,20 €
            <br />
            opóźnienie medianowe: 4 min 12 s
          </>
        }
      />

      <HairlineList className="mb-[26px]">
        {stages.map((stage) => (
          <HairlineItem
            key={stage.n}
            className="grid grid-cols-[30px_minmax(0,1.5fr)_minmax(120px,1fr)_130px] items-center gap-3.5 px-3.5 py-3 hover:bg-white/[.04]"
          >
            <div className="text-[10px] text-ink/35">{stage.n}</div>
            <div className="min-w-0">
              <div className="mb-[3px] text-[13px] font-medium">{stage.name}</div>
              <div className="text-[11px] leading-[1.45] text-pretty text-ink/60">{stage.desc}</div>
            </div>
            <div className="min-w-0">
              <div className="mb-[5px] h-2 bg-white/[.07]">
                <div className="h-2 bg-accent" style={{ width: `${stage.share}%` }} />
              </div>
              <div className="text-[9.5px] text-ink/50">{stage.flow}</div>
            </div>
            <div className="text-[10px] leading-[1.5] text-ink/60">{stage.tech}</div>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="mb-[26px] grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Kaskada modeli" aside="DUŻY MODEL TYLKO DO TOP-N" />
          <DataTable columns={modelColumns} grid={MODEL_GRID} minWidth={520}>
            {models.map((model) => (
              <DataRow key={model.name} grid={MODEL_GRID} align="center">
                <div className="px-3 py-[9px] text-[11px]">{model.name}</div>
                <div className="px-3 py-[9px] text-[11.5px] leading-[1.35] text-ink/70">
                  {model.role}
                </div>
                <div className="px-3 py-[9px] text-[10.5px]">{model.calls}</div>
                <div className="px-3 py-[9px] text-[10.5px]">{model.cost}</div>
                <div className="px-3 py-[9px] text-[10.5px] text-ink/60">{model.latency}</div>
              </DataRow>
            ))}
          </DataTable>
          <div className="mt-[9px] text-[9.5px] leading-[1.6] text-ink/45">
            Wersja i wynik walidacji każdego modelu są jawne w Trust Center. Zmiana modelu trafia do
            publicznego dziennika zmian.
          </div>
        </div>

        <div>
          <SectionRule title="Graf encji" aside="OSOBA ↔ INSTYTUCJA ↔ SPÓŁKA ↔ AKT ↔ TEMAT" />
          <HairlineList>
            {edges.map((edge) => (
              <HairlineItem
                key={`${edge.from}${edge.to}`}
                className="grid grid-cols-[minmax(0,1fr)_120px_60px] items-center gap-2.5 px-3 py-[9px]"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-[7px]">
                  <span
                    className={cx(
                      "px-1.5 py-0.5 text-[10px] whitespace-nowrap",
                      ENTITY_KIND[edge.fromKind],
                    )}
                  >
                    {edge.from}
                  </span>
                  <span className="text-[9.5px] text-ink/40">{edge.relation}</span>
                  <span
                    className={cx(
                      "px-1.5 py-0.5 text-[10px] whitespace-nowrap",
                      ENTITY_KIND[edge.toKind],
                    )}
                  >
                    {edge.to}
                  </span>
                </div>
                <div className="text-[9.5px] text-ink/50">{edge.source}</div>
                <div className="text-right text-[10px]">{edge.confidence}</div>
              </HairlineItem>
            ))}
          </HairlineList>
          <div className="mt-[9px] rounded-[14px] border border-white/[.13] bg-white/[.035] px-3 py-2.5 text-[11px] leading-[1.55] text-pretty text-ink/[.68]">
            Graf łączy wyłącznie role publiczne: funkcję, mandat, reprezentację spółki, autorstwo
            uwagi w konsultacjach. Nie zawiera powiązań prywatnych ani wnioskowanych.
          </div>
        </div>
      </div>

      <div className="mb-[26px] grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Streszczenie z proweniencją" aside="KAŻDE ZDANIE KLIKALNE" />
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-4 pt-3.5 pb-2">
            <div className="mb-[9px] text-[9.5px] tracking-[.1em] text-accent-soft">
              WĄTEK · TARYFY ENERGETYCZNE · DRUK 412
            </div>
            {provenance.map((sentence, index) => (
              <div
                key={sentence.kind}
                onClick={() => setOpenSentence(openSentence === index ? null : index)}
                className={cx(
                  "mb-1.5 cursor-pointer border-l-[3px] px-3 py-[11px]",
                  openSentence === index
                    ? "border-accent/50 bg-white"
                    : "border-ink/[.14] bg-transparent hover:bg-white",
                )}
              >
                <div className="mb-[5px] text-[14.5px] leading-[1.5] text-pretty">
                  {sentence.text}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/[.07] px-1.5 py-0.5 text-[9px] tracking-[.08em] text-ink/60">
                    {sentence.kind}
                  </span>
                  <span className="text-[9.5px] text-ink/50">{sentence.source}</span>
                  <span className="flex-1" />
                  <span className="text-[9.5px] text-accent-soft">{sentence.cta}</span>
                </div>
              </div>
            ))}
          </div>

          {openSentence !== null && (
            <div className="mt-px rounded-[14px] border border-accent/[.38] bg-white/[.03] px-[15px] py-[13px]">
              <div className="mb-[7px] text-[9px] tracking-[.12em] text-accent-soft">
                ŹRÓDŁO ZDANIA {openSentence + 1}
              </div>
              <div className="text-[11px] leading-[1.7] whitespace-pre-line text-ink/80">
                {provenance[openSentence].raw}
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionRule title="Diff wersji aktu" aside="v3 → v4 · PO KONSULTACJACH" />
          <div className="border border-white/[.13] bg-white/[.03]">
            <DiffBlock lines={diff} markWidth={22} />
            <div className="rounded-[14px] border-t border-white/[.13] bg-white/[.035] px-[13px] py-[11px]">
              <div className="mb-1.5 text-[9px] tracking-[.11em] text-accent-soft">
                POWIĄZANIE ZMIANY
              </div>
              <div className="text-[11.5px] leading-[1.55] text-pretty text-ink/75">
                Skreślenie ust. 3 odpowiada uwadze nr 118 z konsultacji publicznych, zgłoszonej 14
                VI 2026 przez izbę branżową reprezentującą 41 spółek obrotu. Uwaga i autor są jawne
                w rejestrze konsultacji.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Anomalie i nowość" />
          <HairlineList>
            {anomalies.map((anomaly) => (
              <HairlineItem key={anomaly.text} className="px-[13px] py-[11px]">
                <div className="mb-[5px] flex items-center gap-2">
                  <Chip tone={anomaly.tone}>{anomaly.tag}</Chip>
                  <span className="text-[9.5px] text-ink/45">{anomaly.meta}</span>
                </div>
                <div className="text-[12.5px] leading-[1.45] text-pretty text-ink/[.82]">
                  {anomaly.text}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div>
          <SectionRule title="Framing i ton — wobec sprawy" aside="NIE WOBEC OSOBY" />
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-[15px] py-3.5">
            {framing.map((frame) => (
              <div key={frame.label} className="mb-3">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-xs font-medium">{frame.label}</span>
                  <span className="text-[10px] text-ink/55">{frame.share}</span>
                </div>
                <div className="h-[9px] bg-white/[.07]">
                  <div
                    className="h-[9px]"
                    style={{ width: `${frame.value}%`, background: frame.color }}
                  />
                </div>
                <div className="mt-1 text-[10.5px] leading-[1.4] text-ink/55">{frame.note}</div>
              </div>
            ))}
            <div className="border-t border-dashed border-white/[.16] pt-2 text-[9.5px] leading-[1.6] text-ink/50">
              Klasyfikator framingu: v4.2, macro-F1 0,79 na zbiorze walidacyjnym PL, błąd ±4 pkt.
              Klasa „ton wobec osoby” jest wyłączona w kodzie.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
