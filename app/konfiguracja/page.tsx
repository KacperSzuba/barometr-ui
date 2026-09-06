"use client";

import { useState } from "react";
import { useInterestProfile } from "@/hooks/useConfiguration";
import { useFieldSelections } from "@/hooks/useFieldSelections";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { FieldRow } from "@/components/ui/FieldRow";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { ScreenState } from "@/components/ui/ScreenState";
import { pluralPl } from "@/lib/format";

const MUTE_GRID = "110px minmax(220px,1.5fr) minmax(200px,1.2fr) 120px 110px";

export default function InterestProfilePage() {
  const [profile, setProfile] = useState<string | null>(null);
  const { valueOf, select } = useFieldSelections();
  const interestProfile = useInterestProfile(profile ?? undefined);
  if (!interestProfile.data) return <ScreenState resource={interestProfile} />;

  const { profiles, fields, sentence, watched, muteColumns, mutes } = interestProfile.data;
  const activeProfile = profile ?? profiles[0];

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker={`PROFIL ZAINTERESOWAŃ · ${pluralPl(profiles.length, "PROFIL", "PROFILE", "PROFILI")} W KONCIE`}
        title="Co obserwujemy i gdzie"
        aside={
          <SegmentedControl
            size="sm"
            segments={profiles.map((name) => ({ value: name, label: name.toUpperCase() }))}
            value={activeProfile}
            onChange={setProfile}
          />
        }
      />

      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Co ten profil znaczy" />
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-4 py-[15px]">
            <div className="flex flex-col gap-[13px]">
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
            <div className="mt-3.5 rounded-[14px] border border-white/[.13] bg-white/[.035] px-3 py-[11px] text-[10.5px] leading-[1.7] whitespace-pre-line text-ink/[.78]">
              {sentence}
            </div>
          </div>
        </div>

        <div>
          <SectionRule
            title="Obserwowane"
            aside={<span className="cursor-pointer text-accent-soft">+ DODAJ</span>}
          />
          <HairlineList>
            {watched.map((group) => (
              <HairlineItem key={group.kind} className="px-[13px] py-[11px]">
                <div className="mb-1.5 flex items-center justify-between gap-2.5">
                  <span className="text-[9px] tracking-[.12em] text-ink/50">{group.kind}</span>
                  <span className="text-[10px] text-ink/60">{group.count}</span>
                </div>
                <div className="flex flex-wrap gap-[5px]">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/[.07] px-[7px] py-[3px] text-[9.5px] text-ink/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>

      {/* No "wygasają same": an exclusion is part of the profile and lives until somebody
          removes it. The engine has no timer on one, and a header promising otherwise
          would be the screen contradicting the row underneath it. */}
      <SectionRule title="Wykluczenia" aside="CZĘŚĆ PROFILU · OBOWIĄZUJĄ DO USUNIĘCIA" />
      <DataTable columns={muteColumns} grid={MUTE_GRID} minWidth={820}>
        {mutes.map((mute) => (
          <DataRow key={mute.what} grid={MUTE_GRID} align="center">
            <div className="px-3 py-[9px]">
              <Chip tone={mute.tone}>{mute.type}</Chip>
            </div>
            <div className="min-w-0 px-3 py-[9px] text-xs">{mute.what}</div>
            <div className="min-w-0 px-3 py-[9px] text-[11px] leading-[1.4] text-ink/[.62]">
              {mute.why}
            </div>
            <div className="px-3 py-[9px] text-[10px] text-ink/60">{mute.until}</div>
            <div className="cursor-pointer px-3 py-[9px] text-[9.5px] text-accent-soft">
              {mute.action}
            </div>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
