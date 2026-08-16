"use client";

import { useState } from "react";
import { useLegislation } from "@/hooks/useFreeTier";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { BandBar } from "@/components/ui/Bar";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { CONSOLE_PADDING } from "@/components/ui/layout";
import { TEXT_TONE } from "@/components/ui/tones";
import { cx } from "@/lib/cn";

export default function LegislationPage() {
  const [selected, setSelected] = useState(0);
  const { data } = useLegislation();
  if (!data) return null;

  const { bills, consultations, forecasts, resolved } = data;
  const bill = bills[selected];

  return (
    <div className={CONSOLE_PADDING}>
      <PageHeader
        className="mb-5"
        kicker="TRACKER LEGISLACYJNY"
        title="Gdzie jest ustawa, co dalej i kiedy"
        aside={
          <SegmentedControl
            segments={bills.map((option) => ({ value: option.id, label: option.id }))}
            value={bill.id}
            onChange={(id) => setSelected(bills.findIndex((option) => option.id === id))}
          />
        }
      />

      <div className="mb-6 rounded-[14px] border border-white/[.13] bg-white/[.035] px-5 pt-[18px] pb-5">
        <div className="mb-[18px] flex flex-wrap items-start gap-5">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 text-[9.5px] tracking-[.12em] text-accent-soft">
              {bill.id} · {bill.author}
            </div>
            <div className="mb-[7px] text-[23px] leading-[1.2] font-bold tracking-[-.02em] text-pretty">
              {bill.title}
            </div>
            <div className="max-w-[720px] text-[12.5px] leading-[1.6] text-pretty text-ink/70">
              {bill.summary}
            </div>
          </div>
          <div className="flex-none text-right text-[10px] leading-[1.7] text-ink/55">
            {bill.filed}
            <br />
            {bill.versions}
            <br />
            {bill.comments}
          </div>
        </div>

        <div className="mb-2 flex items-stretch gap-0.5 overflow-x-auto">
          {bill.steps.map((step, index) => (
            <div
              key={step.label}
              className={cx(
                "min-w-[96px] flex-1 px-2.5 pt-2.5 pb-[11px]",
                index < bill.current && "bg-white/[.05] text-ink/60",
                index === bill.current && "bg-accent text-ink",
                index > bill.current &&
                  "border border-dashed border-ink/[.18] bg-white/[.03] text-ink/[.38]",
              )}
            >
              <div className="mb-1 text-[8.5px] tracking-[.08em] opacity-75">{step.date}</div>
              <div className="text-[11px] leading-[1.25] font-medium">{step.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex justify-between text-[9px] text-ink/45">
          <span>ZŁOŻENIE</span>
          <span>ETAP BIEŻĄCY</span>
          <span>WEJŚCIE W ŻYCIE</span>
        </div>

        <HairlineList columns="repeat(auto-fit,minmax(230px,1fr))">
          {bill.next.map((entry) => (
            <HairlineItem key={entry.label} className="px-3.5 py-[13px]">
              <div className="mb-[7px] text-[9px] tracking-[.13em] text-ink/45">{entry.label}</div>
              <div className="text-[12.5px] leading-[1.5] text-pretty text-ink/[.82]">
                {entry.value}
              </div>
            </HairlineItem>
          ))}
        </HairlineList>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[26px]">
        <div>
          <SectionRule
            title="Kalendarz konsultacji"
            aside={
              <span className="cursor-pointer rounded-full border border-white/20 px-[7px] py-[3px] tracking-[.08em]">
                ICS →
              </span>
            }
          />
          <HairlineList>
            {consultations.map((entry) => (
              <HairlineItem
                key={entry.title}
                className="grid grid-cols-[minmax(0,1fr)_92px] items-center gap-3 px-[13px] py-[11px]"
              >
                <div className="min-w-0">
                  <div className="mb-[3px] text-[12.5px] leading-[1.35]">{entry.title}</div>
                  <div className="text-[9.5px] text-ink/45">
                    {entry.who} · do {entry.deadline}
                  </div>
                </div>
                <div className={cx("text-right text-[11px]", TEXT_TONE[entry.tone])}>
                  {entry.left}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          <Note className="mt-[9px]">
            Kalendarz obejmuje konsultacje rządowe, sejmowe wysłuchania publiczne i konsultacje
            samorządowe z monitorowanych BIP-ów.
          </Note>
        </div>

        <div>
          <SectionRule title="Prognozy przejścia" aside="Z PASMEM NIEPEWNOŚCI" />
          <HairlineList className="mb-4">
            {forecasts.map((forecast) => (
              <HairlineItem key={forecast.question} className="px-[13px] py-[11px]">
                <div className="mb-1.5 flex items-baseline justify-between gap-2.5">
                  <span className="min-w-0 text-[12.5px] leading-[1.35]">{forecast.question}</span>
                  <span className="flex-none text-sm">{forecast.probability}</span>
                </div>
                <BandBar low={forecast.low} high={forecast.high} point={forecast.probability} />
                <div className="mt-[5px] text-[9.5px] text-ink/50">
                  pasmo {forecast.band} · horyzont {forecast.horizon}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="border border-white/[.13] bg-white/[.03]">
            <div className="flex items-baseline justify-between rounded-[14px] border-b border-white/[.12] bg-white/[.05] px-[13px] py-[11px]">
              <span className="text-[9px] tracking-[.13em] text-ink/55">
                PUBLICZNY REJESTR TRAFNOŚCI
              </span>
              <span className="text-[10px]">214 prognoz · 78% w pasmie</span>
            </div>
            {resolved.map((entry) => (
              <div
                key={entry.question}
                className="grid grid-cols-[minmax(0,1fr)_74px_84px] items-center gap-2.5 border-b border-white/[.07] px-[13px] py-[9px]"
              >
                <div className="min-w-0 text-[11.5px] leading-[1.35]">{entry.question}</div>
                <div className="text-[10px] text-ink/55">{entry.said}</div>
                <div>
                  <Chip tone={entry.tone}>{entry.result}</Chip>
                </div>
              </div>
            ))}
            <div className="px-[13px] py-[9px] text-[9px] text-ink/45">
              PEŁNA HISTORIA DO POBRANIA: CSV · JSON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
