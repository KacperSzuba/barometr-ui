"use client";

import Link from "next/link";
import { useGeo } from "@/hooks/useLocal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { FieldRow } from "@/components/ui/FieldRow";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

export default function GeoPage() {
  const { data } = useGeo();
  if (!data) return null;

  const { fields, sentence, watched, hits, calendar, pressPerks } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker="ALERTY GEOGRAFICZNE"
        title="Wszystko, co dzieje się w twoim promieniu"
        aside={
          <>
            3 punkty obserwowane · 6 działek
            <br />2 obręby ewidencyjne
          </>
        }
      />

      <div className="mb-[26px] grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6">
        <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-4 py-[15px]">
          <div className="mb-[11px] text-[9px] tracking-[.13em] text-ink/50">DEFINICJA OBSZARU</div>

          <div className="mb-3.5 flex flex-col gap-[11px]">
            {fields.map((field) => (
              <FieldRow
                key={field.label}
                layout="stacked"
                label={field.label}
                options={field.options}
                selected={field.selected}
              />
            ))}
          </div>

          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-3 py-[11px] text-[10.5px] leading-[1.7] whitespace-pre-line text-ink/[.78]">
            {sentence}
          </div>

          <div className="mt-3 flex flex-col gap-px bg-white/[.12]">
            {watched.map((place) => (
              <div
                key={place.name}
                className="flex items-center justify-between gap-2.5 rounded-[14px] bg-white/[.03] px-[11px] py-[9px]"
              >
                <div className="min-w-0">
                  <div className="text-[11.5px]">{place.name}</div>
                  <div className="mt-0.5 text-[9px] text-ink/45">{place.detail}</div>
                </div>
                <Chip tone={place.tone}>{place.hits}</Chip>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionRule title="Trafienia w obszarze" aside="OSTATNIE 30 DNI" />
          <HairlineList>
            {hits.map((hit) => (
              <HairlineItem
                key={hit.title}
                className="grid grid-cols-[minmax(0,1fr)_92px_100px] items-start gap-[11px] px-[13px] py-[11px] hover:bg-white/[.04]"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-[7px]">
                    <Chip tone={hit.tone}>{hit.type}</Chip>
                    <span className="text-[9.5px] text-ink/45">{hit.where}</span>
                  </div>
                  <div className="mb-[3px] text-[12.5px] leading-[1.4] text-pretty">
                    {hit.title}
                  </div>
                  <div className="text-[11px] leading-[1.45] text-pretty text-ink/60">
                    {hit.note}
                  </div>
                </div>
                <div className="text-[9.5px] leading-[1.6] text-ink/55">
                  {hit.distance}
                  <br />
                  {hit.date}
                </div>
                <div className="cursor-pointer text-[9.5px] text-accent-soft">{hit.action}</div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule
            title="Kalendarz sesji i komisji"
            aside={
              <span className="cursor-pointer rounded-full border border-white/20 px-[7px] py-[3px] tracking-[.08em]">
                ICS →
              </span>
            }
          />
          <HairlineList>
            {calendar.map((event) => (
              <HairlineItem
                key={event.when}
                className="grid grid-cols-[88px_minmax(0,1fr)_92px] items-center gap-[11px] px-[13px] py-2.5"
              >
                <div className="text-[10px] text-ink/55">{event.when}</div>
                <div className="min-w-0">
                  <div className="text-xs leading-[1.35]">{event.what}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{event.unit}</div>
                </div>
                <div>
                  <Chip tone={event.tone}>{event.tag}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div className="rounded-[14px] bg-white/[.05] px-5 pt-[18px] pb-5 text-ink">
          <div className="mb-2.5 text-[9px] tracking-[.15em] text-ink/50">
            PANEL DLA LOKALNEJ REDAKCJI
          </div>
          <div className="mb-3 text-[21px] leading-[1.25] font-semibold">
            Dla redakcji powiatowej — bezpłatnie albo symbolicznie
          </div>
          <div className="mb-4 text-xs leading-[1.6] text-pretty text-ink/75">
            Jeśli monitorujesz gminy zawodowo i publikujesz lokalnie, panel jest darmowy dla
            redakcji do trzech osób. Weryfikacja raz w roku, bez zobowiązania i bez ekskluzywności
            materiałów.
          </div>

          <div className="mb-4 flex flex-col gap-2">
            {pressPerks.map((perk) => (
              <div key={perk} className="flex items-start gap-[9px]">
                <span className="flex-none pt-0.5 text-[10px] text-amber">—</span>
                <span className="text-xs leading-[1.5] text-pretty text-ink/[.88]">{perk}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-[10px] bg-white/[.045] px-3 py-2 text-[9.5px] tracking-[.08em] text-ink"
            >
              ZŁÓŻ WNIOSEK REDAKCYJNY
            </button>
            <Link
              href="/wolny/dane"
              className="rounded-[10px] border border-white/30 px-3 py-2 text-[9.5px] tracking-[.08em] text-ink hover:bg-white/[.12] hover:text-ink"
            >
              WIDGETY I OTWARTE DANE →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
