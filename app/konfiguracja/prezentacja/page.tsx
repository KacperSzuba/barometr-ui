"use client";

import { usePresentation } from "@/hooks/useConfiguration";
import { useFieldSelections } from "@/hooks/useFieldSelections";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { FieldRow } from "@/components/ui/FieldRow";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

/** Fields whose values pick the summary preview variant. */
const LENGTH_FIELD = "DŁUGOŚĆ STRESZCZEŃ";
const JARGON_FIELD = "POZIOM ŻARGONU PRAWNICZEGO";

const PREVIEW_FOOT =
  "Model streszczeń: streszczenia-l · każde zdanie klikalne do źródła · pasmo błędu klasyfikacji ±4 pkt · próba: 148 materiałów";

export default function PresentationPage() {
  const { valueOf, select } = useFieldSelections();
  const { data } = usePresentation();
  if (!data) return null;

  const { fields, previews, modules, dashboards } = data;

  const lengthField = fields.find((field) => field.label === LENGTH_FIELD);
  const jargonField = fields.find((field) => field.label === JARGON_FIELD);
  const length = lengthField ? valueOf(lengthField) : "";
  const jargon = jargonField ? valueOf(jargonField) : "";
  const preview = previews[length]?.[jargon] ?? "";

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="PREZENTACJA TREŚCI"
        title="Jak długo, jak dosłownie, jak gęsto"
        aside={
          <>
            pasma błędu i wielkość próby: zawsze widoczne
            <br />
            ustawienie zablokowane polityką organizacji
          </>
        }
      />

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6">
        <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-4 py-[15px]">
          <div className="flex flex-col gap-3.5">
            {fields.map((field) => (
              <FieldRow
                key={field.label}
                layout="stacked"
                label={field.label}
                hint={field.hint}
                options={field.options}
                selected={valueOf(field)}
                onSelect={(value) => select(field.label, value)}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionRule title="Podgląd streszczenia" aside={`${length} · ŻARGON ${jargon}`} />
          <div className="mb-3.5 rounded-[14px] border border-white/[.13] bg-white/[.035] px-4 py-[15px]">
            <div className="mb-[9px] text-[9px] tracking-[.11em] text-accent-soft">
              DRUK 412 · ART. 12 UST. 3
            </div>
            <div className="text-[14.5px] leading-[1.6] text-pretty text-ink/[.88]">{preview}</div>
            <div className="mt-[11px] border-t border-dashed border-white/[.16] pt-[9px] text-[9.5px] leading-[1.6] text-ink/50">
              {PREVIEW_FOOT}
            </div>
          </div>

          <HairlineList>
            <HairlineItem className="flex items-baseline justify-between bg-white/[.05] px-[13px] py-[9px]">
              <span className="text-[9px] tracking-[.13em] text-ink/55">
                KOLEJNOŚĆ I WIDOCZNOŚĆ MODUŁÓW
              </span>
              <span className="text-[9px] text-ink/45">PRZECIĄGNIJ, ABY ZMIENIĆ</span>
            </HairlineItem>
            {modules.map((module) => (
              <HairlineItem
                key={module.name}
                className="grid cursor-grab grid-cols-[20px_minmax(0,1fr)_96px] items-center gap-2.5 px-[13px] py-[9px]"
              >
                <span className="text-[11px] text-ink/30">⋮⋮</span>
                <span className="min-w-0 text-xs">{module.name}</span>
                <Chip tone={module.tone}>{module.state}</Chip>
              </HairlineItem>
            ))}
          </HairlineList>

          <HairlineList className="mt-3">
            <HairlineItem className="bg-white/[.05] px-[13px] py-[9px] text-[9px] tracking-[.13em] text-ink/55">
              WŁASNE DASHBOARDY I WIDOKI ZAPISANE
            </HairlineItem>
            {dashboards.map((dashboard) => (
              <HairlineItem
                key={dashboard.name}
                className="grid grid-cols-[minmax(0,1fr)_116px_84px] items-center gap-2.5 px-[13px] py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-xs">{dashboard.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{dashboard.modules}</div>
                </div>
                <div className="text-[9.5px] text-ink/50">{dashboard.owner}</div>
                <div>
                  <Chip tone={dashboard.tone}>{dashboard.scope}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>
    </div>
  );
}
