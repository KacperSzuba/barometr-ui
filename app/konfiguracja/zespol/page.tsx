"use client";

import { useTeamSettings } from "@/hooks/useConfiguration";
import { useFieldSelections } from "@/hooks/useFieldSelections";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { FieldRow } from "@/components/ui/FieldRow";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

const TEMPLATE_GRID = "minmax(220px,1.6fr) 130px minmax(180px,1.2fr) 100px";

export default function TeamSettingsPage() {
  const { valueOf, select } = useFieldSelections();
  const { data } = useTeamSettings();
  if (!data) return null;

  const { defaults, exportFields, templateColumns, templates, branding } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="ZESPÓŁ, EKSPORT, RAPORTY"
        title="Ustawienia domyślne i wyjścia z danych"
        aside={
          <>
            polityka organizacji nadpisuje ustawienie indywidualne
            <br />
            użytkownik widzi, co jest wymuszone i przez kogo
          </>
        }
      />

      <div className="mb-6 grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Domyślne dla zespołu" />
          <HairlineList>
            {defaults.map((item) => (
              <HairlineItem
                key={item.name}
                className="flex items-center justify-between gap-3 px-[13px] py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-xs">{item.name}</div>
                  <div className="mt-0.5 text-[9.5px] leading-[1.45] text-ink/45">{item.note}</div>
                </div>
                <Chip tone={item.tone}>{item.state}</Chip>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div>
          <SectionRule title="Eksport i formaty" />
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-4 py-[15px]">
            <div className="flex flex-col gap-3.5">
              {exportFields.map((field) => (
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

          <div className="mt-3.5 rounded-[14px] border border-white/[.13] bg-white/[.035] px-4 py-[15px]">
            <div className="mb-[9px] text-[9px] tracking-[.13em] text-accent-soft">
              BRANDING I WHITE-LABEL
            </div>
            <div className="flex flex-col gap-2">
              {branding.map((entry) => (
                <div
                  key={entry.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2.5 border-b border-dotted border-white/[.16] pb-[7px]"
                >
                  <span className="text-[11.5px] leading-[1.45] text-pretty text-ink/[.78]">
                    {entry.label}
                  </span>
                  <span className="text-[9.5px] tracking-[.07em] text-ink/60">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionRule title="Szablony raportów cyklicznych" aside="HARMONOGRAM I ODBIORCY" />
      <DataTable columns={templateColumns} grid={TEMPLATE_GRID} minWidth={780}>
        {templates.map((template) => (
          <DataRow key={template.name} grid={TEMPLATE_GRID} align="center">
            <div className="min-w-0 px-3 py-2.5">
              <div className="text-xs">{template.name}</div>
              <div className="mt-0.5 text-[9.5px] text-ink/45">{template.sections}</div>
            </div>
            <div className="px-3 py-2.5 text-[9.5px] text-ink/60">{template.cadence}</div>
            <div className="px-3 py-2.5 text-[11px] text-ink/70">{template.to}</div>
            <div className="px-3 py-2.5">
              <Chip tone={template.tone}>{template.format}</Chip>
            </div>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
