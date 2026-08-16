"use client";

import { useSignalSettings } from "@/hooks/useConfiguration";
import { useFieldSelections } from "@/hooks/useFieldSelections";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { FieldRow } from "@/components/ui/FieldRow";
import { Bar } from "@/components/ui/Bar";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

/** Label of the field whose value drives the impact preview. */
const THRESHOLD_FIELD = "MINIMALNY PRÓG ISTOTNOŚCI";

/** Bar baseline: hits and notifications at the lowest threshold. */
const MAX_HITS = 214;
const MAX_ALERTS = 100;
/** Merged items stay constant regardless of the threshold. */
const MERGED = 118;
const MERGED_SHARE = 55;

export default function SignalPage() {
  const { valueOf, select } = useFieldSelections();
  const { data } = useSignalSettings();
  if (!data) return null;

  const { fields, thresholdImpact, rules } = data;

  const thresholdField = fields.find((field) => field.label === THRESHOLD_FIELD);
  const threshold = thresholdField ? valueOf(thresholdField) : "";
  const [hits, alerts] = thresholdImpact[threshold] ?? [0, 0];

  const impact = [
    {
      label: "TRAFIENIA",
      value: String(hits),
      share: Math.max(4, Math.round((hits / MAX_HITS) * 100)),
    },
    {
      label: "POWIADOMIENIA",
      value: String(alerts),
      share: Math.max(4, Math.round((alerts / MAX_ALERTS) * 100)),
    },
    { label: "SCALONE", value: String(MERGED), share: MERGED_SHARE },
    {
      label: "ODRZUCONE",
      value: String(MAX_HITS - hits),
      share: Math.round(((MAX_HITS - hits) / MAX_HITS) * 100),
    },
  ];

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="SYGNAŁ I PRÓG"
        title="Ile hałasu przepuszczamy"
        aside={
          <>
            przy obecnych progach: 6 powiadomień / 7 dni
            <br />
            przy „wszystko”: 214 / 7 dni
          </>
        }
      />

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
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

          <div className="mt-4 border-t border-dashed border-white/[.16] pt-[13px]">
            <div className="mb-[9px] text-[9px] tracking-[.12em] text-accent-soft">
              SKUTEK ZMIANY PROGU · OSTATNIE 7 DNI
            </div>
            <div className="flex flex-col gap-2">
              {impact.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[90px_minmax(0,1fr)_60px] items-center gap-2.5"
                >
                  <span className="text-[9.5px] text-ink/55">{row.label}</span>
                  <Bar value={row.share} height={9} />
                  <span className="text-right text-[10px]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionRule
            title="Reguły warunkowe"
            aside={<span className="cursor-pointer text-accent-soft">+ NOWA REGUŁA</span>}
          />
          <HairlineList>
            {rules.map((rule) => (
              <HairlineItem key={rule.name} className="px-[13px] py-[11px]">
                <div className="mb-1.5 flex items-center justify-between gap-2.5">
                  <span className="min-w-0 text-xs font-medium">{rule.name}</span>
                  <Chip tone={rule.tone}>{rule.state}</Chip>
                </div>
                <div className="text-[10px] leading-[1.65] whitespace-pre-line text-ink/70">
                  {rule.logic}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          <div className="mt-2.5 rounded-[14px] border border-white/[.13] bg-white/[.035] px-[13px] py-[11px] text-[11.5px] leading-[1.55] text-pretty text-ink/[.72]">
            Każda reguła ma podgląd „co byś dostał” na danych z ostatnich 7 dni. Bez podglądu nie da
            się jej zapisać — to celowe utrudnienie, żeby nie budować lawiny powiadomień.
          </div>
        </div>
      </div>
    </div>
  );
}
