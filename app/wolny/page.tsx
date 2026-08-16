"use client";

import { useState } from "react";
import { useDailyDigest } from "@/hooks/useFreeTier";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { CONSOLE_PADDING } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

export default function DigestPage() {
  /** Index of the item whose error-report form is open. */
  const [reported, setReported] = useState<number | null>(null);
  const { data } = useDailyDigest();
  if (!data) return null;

  const { items, silence, feeds } = data;

  return (
    <div className={CONSOLE_PADDING}>
      <PageHeader
        className="mb-5"
        titleSize="text-[35px]"
        kicker="DESTYLAT DNIA · ŚRODA, 29 LIPCA 2026 · 06:40"
        title="Dziesięć rzeczy, które faktycznie się wydarzyły w instytucjach"
        aside={
          <>
            z 41 820 pozycji · 1 284 źródła
            <br />
            recykling odsiany: 12 460 pozycji
          </>
        }
      />

      <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-7">
        <div>
          <HairlineList edges="y" className="mb-4">
            {items.map((item, index) => (
              <HairlineItem
                key={item.title}
                className="grid grid-cols-[34px_minmax(0,1fr)_118px] items-start gap-3 pt-[13px] pb-3.5"
              >
                <div className="pt-[3px] text-right text-[11px] text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <div className="mb-[5px] flex flex-wrap items-center gap-[7px]">
                    <Chip>{item.tag}</Chip>
                    <span className="text-[9.5px] text-ink/45">{item.institution}</span>
                  </div>
                  <div className="text-base leading-[1.3] font-semibold tracking-[-.01em] text-pretty">
                    {item.title}
                  </div>
                  <div className="mt-[5px] text-[11.5px] leading-[1.5] text-pretty text-ink/[.62]">
                    {item.what}
                  </div>
                  <div className="mt-[7px] flex flex-wrap items-center gap-2.5">
                    <a href="#" className="text-[9.5px] tracking-[.07em]">
                      {item.sourceLabel} →
                    </a>
                    <button
                      type="button"
                      onClick={() => setReported(reported === index ? null : index)}
                      className="cursor-pointer text-[9.5px] tracking-[.07em] text-ink/45 hover:text-accent-soft"
                    >
                      ZGŁOŚ BŁĄD W DANYCH
                    </button>
                  </div>
                </div>

                <div className="pt-[3px] text-[9.5px] leading-[1.6] text-ink/50">
                  {item.time}
                  <br />
                  {item.novelty}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          {reported !== null && (
            <div className="mb-4 rounded-[14px] border border-accent/[.38] bg-white/[.035] px-[15px] py-[13px]">
              <div className="mb-[7px] text-[9px] tracking-[.12em] text-accent-soft">
                ZGŁOSZENIE BŁĘDU · POZYCJA {String(reported + 1).padStart(2, "0")}
              </div>
              <div className="mb-2.5 text-xs leading-[1.55] text-pretty text-ink/75">
                Zgłoszenie trafia do dyżurnego redaktora danych. Jeśli błąd potwierdzimy, korekta
                pojawia się przy pozycji i w publicznym rejestrze korekt — z datą i opisem, co było
                źle.
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="cursor-pointer rounded-[10px] bg-accent px-2.5 py-1.5 text-[9.5px] text-ink"
                >
                  WYŚLIJ ZGŁOSZENIE
                </button>
                <button
                  type="button"
                  onClick={() => setReported(null)}
                  className="cursor-pointer rounded-[10px] border border-white/20 px-2.5 py-1.5 text-[9.5px]"
                >
                  ANULUJ
                </button>
                <span className="text-[9.5px] text-ink/45">
                  SLA korekty: 5 dni roboczych w warstwie wolnej
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[22px]">
          <div>
            <SectionRule title="Radar ciszy" aside="CO PRZESZŁO BEZ ROZGŁOSU" />
            <HairlineList>
              {silence.map((entry) => (
                <HairlineItem key={entry.title} className="px-[13px] py-[11px]">
                  <div className="mb-[5px] flex items-center gap-[7px]">
                    <Chip tone={entry.tone}>{entry.tag}</Chip>
                    <span className="text-[9.5px] text-ink/45">{entry.meta}</span>
                  </div>
                  <div className="mb-1 text-sm leading-[1.35] font-semibold text-pretty">
                    {entry.title}
                  </div>
                  <div className="text-[11px] leading-[1.5] text-pretty text-ink/60">
                    {entry.why}
                  </div>
                </HairlineItem>
              ))}
            </HairlineList>
            <Note className="mt-2">
              Radar pokazuje pozycje o wysokiej wadze instytucjonalnej i zerowym albo minimalnym
              pokryciu medialnym. Nie ocenia intencji.
            </Note>
          </div>

          <div className="rounded-[14px] bg-white/[.05] px-4 py-[15px] text-ink">
            <div className="mb-[9px] text-[9px] tracking-[.14em] text-ink/50">
              DOSTAŃ TO CODZIENNIE
            </div>
            <div className="mb-2.5 text-lg leading-[1.3] font-semibold">
              Newsletter o 07:00, bez konta
            </div>
            <div className="mb-2.5 flex gap-px">
              <div className="flex-1 rounded-[14px] bg-white/[.03] px-[11px] py-[9px] text-xs text-ink/45">
                adres e-mail
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-[14px] bg-accent px-[13px] py-[9px] text-[10px] tracking-[.08em] text-ink"
              >
                ZAPISZ
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {feeds.map((feed) => (
                <span
                  key={feed}
                  className={cx(
                    "cursor-pointer rounded-full border border-white/25 px-[7px] py-[3px]",
                    "text-[9px] tracking-[.08em] text-ink/80",
                  )}
                >
                  {feed}
                </span>
              ))}
            </div>
            <div className="mt-[11px] text-[9px] leading-[1.6] text-ink/50">
              Konto jest opcjonalne. Służy do zapisania obserwowanych tematów — nie jest warunkiem
              czytania.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
