"use client";

import { useState } from "react";
import { useAlerts } from "@/hooks/usePro";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { Chip } from "@/components/ui/Chip";
import { FieldRow } from "@/components/ui/FieldRow";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { pluralPl } from "@/lib/format";

const RULE_GRID = "minmax(200px,1.3fr) minmax(240px,1.7fr) 110px 120px minmax(140px,1fr) 90px";

export default function AlertsPage() {
  const [selected, setSelected] = useState(1);
  const { data } = useAlerts();
  if (!data) return null;

  const { columns, rules, fields, sentence, preview, channels, activity, previewNote, quietHours } =
    data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker={`ALERTY · ${pluralPl(rules.length, "REGUŁA", "REGUŁY", "REGUŁ")}`}
        title="Reguły, progi i co z nich wyszło"
        aside={activity.map((line) => (
          <div key={line}>{line}</div>
        ))}
      />

      <DataTable columns={columns} grid={RULE_GRID} minWidth={1040} className="mb-6">
        {rules.map((rule, index) => (
          <DataRow
            key={rule.id}
            grid={RULE_GRID}
            isSelected={index === selected}
            onSelect={() => setSelected(index)}
          >
            <div className="min-w-0 px-3 py-[11px]">
              <div className="text-[12.5px] leading-[1.35] font-medium">{rule.name}</div>
              <div className="mt-[3px] text-[9.5px] text-ink/45">{rule.scope}</div>
            </div>
            <div className="min-w-0 px-3 py-[11px] text-[10.5px] leading-[1.6] text-ink/[.72]">
              {rule.condition}
            </div>
            <div className="px-3 py-[11px] text-[10.5px]">{rule.threshold}</div>
            <div className="px-3 py-[11px] text-[10.5px] text-ink/65">{rule.sources}</div>
            <div className="px-3 py-[11px] text-[11.5px] leading-[1.45] text-ink/70">
              {rule.channels}
            </div>
            <div className="px-3 py-[11px]">
              <Chip tone={rule.tone}>{rule.state}</Chip>
            </div>
          </DataRow>
        ))}
      </DataTable>

      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        {/* Not "EDYTOR REGUŁY · NIEZAPISANE ZMIANY": nothing on this screen writes yet, and
            a panel claiming unsaved changes over a read-only form is the interface lying
            about what pressing something would do. What the fields describe is the
            account's delivery setup and the vocabulary a rule is written in. */}
        <div className="border border-accent/[.38] bg-white/[.035]">
          <div className="flex items-center justify-between rounded-[14px] bg-accent px-3.5 py-3 text-ink">
            <span className="text-[9.5px] tracking-[.12em]">DORĘCZANIE I PROGI</span>
            <span className="text-[9px] opacity-80">TYLKO ODCZYT</span>
          </div>

          <div className="px-[15px] py-3.5">
            <div className="mb-3.5 flex flex-col gap-2.5">
              {fields.map((field) => (
                <FieldRow
                  key={field.label}
                  label={field.label}
                  options={field.options}
                  selected={field.selected}
                />
              ))}
            </div>

            <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-3 py-[11px] text-[11px] leading-[1.7] whitespace-pre-line text-ink/80">
              {sentence}
            </div>
          </div>
        </div>

        <div>
          <SectionRule
            title="Co poszło i co nie"
            aside={pluralPl(preview.length, "POWIADOMIENIE", "POWIADOMIENIA", "POWIADOMIEŃ")}
          />
          <HairlineList>
            {preview.map((entry) => (
              <HairlineItem key={`${entry.when}-${entry.text}`} className="px-[13px] py-2.5">
                <div className="mb-1 flex items-center gap-2">
                  <Chip tone={entry.tone}>{entry.channel}</Chip>
                  <span className="text-[9.5px] text-ink/45">
                    {entry.when} · istotność {entry.score}
                  </span>
                </div>
                <div className="text-xs leading-[1.4] text-pretty text-ink/[.82]">{entry.text}</div>
              </HairlineItem>
            ))}
          </HairlineList>
          <div className="mt-2.5 rounded-[14px] border border-white/[.13] bg-white/[.05] px-[13px] py-[11px] text-[11.5px] leading-[1.55] text-pretty text-ink/70">
            {previewNote}
          </div>
        </div>
      </div>

      <SectionRule title="Kanały i tempo" aside={quietHours} />
      <HairlineList columns="repeat(auto-fit,minmax(190px,1fr))">
        {channels.map((channel) => (
          <HairlineItem key={channel.name} className="px-3.5 py-[13px]">
            <div className="mb-[7px] flex items-center justify-between gap-2">
              <span className="text-[10px] tracking-[.1em]">{channel.name}</span>
              <Chip tone={channel.tone}>{channel.state}</Chip>
            </div>
            <div className="mb-1.5 text-[11.5px] leading-[1.45] text-pretty text-ink/65">
              {channel.note}
            </div>
            <div className="text-[9.5px] text-ink/50">{channel.cadence}</div>
          </HairlineItem>
        ))}
      </HairlineList>
    </div>
  );
}
