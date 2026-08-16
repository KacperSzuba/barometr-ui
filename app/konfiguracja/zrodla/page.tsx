"use client";

import { useSources } from "@/hooks/useConfiguration";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { ChipList } from "@/components/ui/ChipList";
import { Chip } from "@/components/ui/Chip";
import { Bar } from "@/components/ui/Bar";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { GUARD_LAYER } from "@/lib/configuration";

export default function SourcesPage() {
  const { data } = useSources();
  if (!data) return null;

  const { types, blocked, limits } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker={`ŹRÓDŁA · KONTEKST: ${GUARD_LAYER.toUpperCase()}`}
        title="Typy źródeł, wagi i granice"
        aside={
          <>
            1 284 źródła aktywne
            <br />
            waga wpływa na scoring istotności, nie na widoczność
          </>
        }
      />

      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Typy źródeł i wagi" />
          <HairlineList>
            {types.map((type) => (
              <HairlineItem
                key={type.name}
                className="grid grid-cols-[minmax(0,1fr)_150px_76px] items-center gap-3 px-[13px] py-[11px]"
              >
                <div className="min-w-0">
                  <div className="text-[12.5px]">{type.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{type.count}</div>
                </div>
                <div>
                  <Bar value={type.share} height={8} />
                  <div className="mt-[3px] text-[9px] text-ink/50">waga {type.weight}</div>
                </div>
                <div>
                  <Chip tone={type.tone}>{type.state}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="mt-3.5 rounded-[14px] border border-white/[.13] bg-white/[.035] px-[15px] py-3.5">
            <div className="mb-[9px] text-[9px] tracking-[.13em] text-accent-soft">
              DODAJ WŁASNE ŹRÓDŁO
            </div>
            <div className="mb-[9px] flex gap-px">
              <div className="flex-1 rounded-[14px] border border-white/[.15] bg-white/[.03] px-[11px] py-[9px] text-[11px] text-ink/50">
                https://… adres kanału RSS albo BIP-u gminy
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[10px] tracking-[.08em] text-ink"
              >
                SPRAWDŹ
              </button>
            </div>
            <div className="text-[11.5px] leading-[1.55] text-pretty text-ink/70">
              Sprawdzamy robots.txt i zastrzeżenia TDM przed dodaniem. Jeśli źródło ich nie
              dopuszcza, nie da się go dodać — także na wyraźne życzenie użytkownika.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* the blocklist exists in the Pro tier; in Gov it has no UI at all */}
          <div className="rounded-[14px] border border-ink/[.13] bg-white/[.03] px-4 pt-[15px] pb-[17px]">
            <div className="mb-2.5 flex items-center gap-[9px]">
              <span className="text-[9px] tracking-[.13em] text-[rgba(23,24,26,.5)]">
                BLOKOWANIE KONKRETNYCH REDAKCJI
              </span>
              <span className="flex-1" />
              <Chip tone="emerald">DOSTĘPNE W PRO</Chip>
            </div>
            <div className="mb-[9px] text-[17px] leading-[1.3] font-semibold text-pretty">
              Filtr redakcji jako narzędzie robocze, nie jako zasłona
            </div>
            <div className="mb-3 text-[11.5px] leading-[1.6] text-pretty text-ink/[.72]">
              Wyciszenie źródła zmniejsza jego wagę w twoich alertach, ale nie usuwa go z agregatów
              w porównaniu framingu ani z danych publicznych. Wyciszenia wygasają same, żeby lista
              nie rosła po cichu latami.
            </div>

            <HairlineList>
              {blocked.map((source) => (
                <HairlineItem
                  key={source.name}
                  className="flex items-center justify-between gap-2.5 px-3 py-[9px]"
                >
                  <div className="min-w-0">
                    <div className="text-[11.5px]">{source.name}</div>
                    <div className="mt-0.5 text-[9px] text-ink/45">{source.note}</div>
                  </div>
                  <span className="flex-none cursor-pointer text-[9.5px] text-accent-soft">
                    USUŃ
                  </span>
                </HairlineItem>
              ))}
            </HairlineList>
          </div>

          <div>
            <SectionRule title="Granice pozyskiwania" />
            <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-4 py-[15px]">
              <ChipList items={limits} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
