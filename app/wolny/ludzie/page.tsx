"use client";

import { useState } from "react";
import Link from "next/link";
import { usePeople } from "@/hooks/useFreeTier";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { Bar } from "@/components/ui/Bar";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { CONSOLE_PADDING } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

/** MP table grid — six columns with fixed proportions. */
const MP_GRID = "grid grid-cols-[minmax(190px,1.4fr)_120px_110px_130px_110px_minmax(150px,1fr)]";

/** Below these thresholds the bar switches to the warning colour. */
const ATTENDANCE_ALERT = 80;
const LOYALTY_ALERT = 75;

export default function PeoplePage() {
  const { data } = usePeople();
  const [city, setCity] = useState<string | null>(null);
  if (!data) return null;

  const { columns, deputies, promises, councils } = data;
  const cities = Object.keys(councils);
  const activeCity = city ?? cities[0];

  return (
    <div className={CONSOLE_PADDING}>
      <PageHeader
        className="mb-5"
        kicker="KARTY POSŁÓW I REJESTR OBIETNIC"
        title="Głosowania, frekwencja, obietnice"
        aside={
          <>
            460 kart · dane z API Sejmu
            <br />
            aktualizacja po każdym głosowaniu
          </>
        }
      />

      <div className="mb-[26px] overflow-x-auto border border-white/[.13]">
        <div className="min-w-[940px]">
          <div className={cx(MP_GRID, "border-b border-white/[.13] bg-white/[.05]")}>
            {columns.map((column) => (
              <div key={column} className="px-3 py-[9px] text-[9px] tracking-[.13em] text-ink/50">
                {column}
              </div>
            ))}
          </div>

          {deputies.map((deputy) => (
            <div
              key={deputy.name}
              className={cx(
                MP_GRID,
                "items-center border-b border-white/[.08] bg-white/[.03] transition-colors hover:bg-white/[.04]",
              )}
            >
              <div className="min-w-0 px-3 py-2.5">
                <div className="text-[12.5px] font-medium">{deputy.name}</div>
                <div className="mt-0.5 text-[9.5px] text-ink/45">{deputy.district}</div>
              </div>
              <div className="px-3 py-2.5 text-[11.5px] text-ink/70">{deputy.club}</div>

              <div className="px-3 py-2.5">
                <div className="mb-1 text-[11px]">{deputy.attendance}</div>
                <Bar
                  value={deputy.attendanceValue}
                  tone={deputy.attendanceValue < ATTENDANCE_ALERT ? "accent" : "neutral"}
                />
              </div>

              <div className="px-3 py-2.5">
                <div className="mb-1 text-[11px]">{deputy.loyalty}</div>
                <Bar
                  value={deputy.loyaltyValue}
                  tone={deputy.loyaltyValue < LOYALTY_ALERT ? "amber" : "neutral"}
                />
              </div>

              <div className="px-3 py-2.5 text-[11px]">{deputy.interpellations}</div>
              <div className="px-3 py-2.5 text-[11px] leading-[1.4] text-ink/65">
                {deputy.lastVote}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[26px]">
        <div>
          <SectionRule title="Obietnica vs. głosowanie" aside="CYTAT → ZAPIS Z GŁOSOWANIA" />
          <HairlineList>
            {promises.map((entry) => (
              <HairlineItem key={entry.who} className="px-3.5 py-[13px]">
                <div className="mb-[7px] flex items-center gap-2">
                  <Chip tone={entry.tone}>{entry.verdict}</Chip>
                  <span className="text-[9.5px] text-ink/45">{entry.who}</span>
                </div>
                <div className="mb-[7px] text-[14.5px] leading-[1.45] text-pretty text-ink/85 italic">
                  „{entry.quote}”
                </div>
                <div className="mb-[7px] text-[9.5px] text-ink/50">{entry.quoteSource}</div>
                <div className="rounded-[14px] border-l-[3px] border-white/20 bg-white/[.035] px-[11px] py-[9px]">
                  <div className="text-[11.5px] leading-[1.5] text-pretty text-ink/[.78]">
                    {entry.vote}
                  </div>
                  <a href="#" className="mt-[5px] inline-block text-[9.5px] tracking-[.07em]">
                    ZAPIS GŁOSOWANIA →
                  </a>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          <Note className="mt-[9px]">
            Rejestr zestawia wyłącznie wypowiedzi publiczne z zapisem głosowania. Nie interpretuje
            motywów i nie ocenia osób.
          </Note>
        </div>

        <div>
          <SectionRule
            title="Co uchwaliła moja rada"
            aside={
              <SegmentedControl
                size="sm"
                segments={cities.map((name) => ({ value: name, label: name.toUpperCase() }))}
                value={activeCity}
                onChange={setCity}
              />
            }
          />
          <HairlineList>
            {councils[activeCity].map((item) => (
              <HairlineItem key={item.id} className="px-[13px] py-[11px]">
                <div className="mb-[5px] flex items-center gap-2">
                  <span className="rounded-full bg-white/[.07] px-1.5 py-0.5 text-[9px] tracking-[.08em] text-ink/60">
                    {item.id}
                  </span>
                  <span className="text-[9.5px] text-ink/45">{item.vote}</span>
                </div>
                <div className="mb-1 text-[12.5px] leading-[1.4] text-pretty">{item.title}</div>
                <div className="text-[11px] leading-[1.45] text-pretty text-ink/60">
                  {item.effect}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="mt-[11px] rounded-[14px] bg-white/[.05] px-3.5 py-3 text-ink">
            <div className="mb-[7px] text-[9px] tracking-[.13em] text-ink/50">
              POTRZEBUJESZ WIĘCEJ NIŻ TYGODNIA?
            </div>
            <div className="mb-2.5 text-xs leading-[1.55] text-pretty text-ink/85">
              Transkrypcje sesji z indeksem mówców, MPZP, budżety i alerty na promień od adresu są w
              warstwie Local.
            </div>
            <Link
              href="/local"
              className="inline-flex rounded-[10px] border border-white/30 px-[11px] py-[7px] text-[9.5px] tracking-[.08em] text-ink hover:bg-white/[.045] hover:text-ink"
            >
              ZOBACZ WARSTWĘ LOCAL →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
