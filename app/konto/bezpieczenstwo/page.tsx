"use client";

import { useSecurity } from "@/hooks/useAccount";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { ChipList } from "@/components/ui/ChipList";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

const KEY_GRID = "minmax(150px,1.2fr) minmax(150px,1.3fr) 110px 100px 90px";

export default function SecurityPage() {
  const { data } = useSecurity();
  if (!data) return null;

  const { compliance, keyColumns, keys, curlSample, webhooks, devTools } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="BEZPIECZEŃSTWO, ZGODNOŚĆ, API"
        title="Czym się da nas sprawdzić i jak nas podłączyć"
        aside={
          <>
            DPA podpisana 14 III 2026
            <br />
            ostatni eksport danych konta: 2 VII 2026
          </>
        }
      />

      <HairlineList columns="repeat(auto-fit,minmax(300px,1fr))" className="mb-[26px]">
        {compliance.map((block) => (
          <HairlineItem key={block.name} className="px-4 pt-[15px] pb-[17px]">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              <span className="text-[9px] tracking-[.14em] text-ink/50">{block.kicker}</span>
            </div>
            <div className="mb-2.5 text-[16.5px] font-semibold">{block.name}</div>
            <ChipList items={block.items} />
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule
            title="Klucze API"
            aside={
              <span className="cursor-pointer rounded-full bg-white/[.05] px-[9px] py-[5px] tracking-[.07em] text-ink">
                NOWY KLUCZ
              </span>
            }
          />
          <DataTable columns={keyColumns} grid={KEY_GRID} minWidth={640}>
            {keys.map((key) => (
              <DataRow key={key.prefix} grid={KEY_GRID} align="center">
                <div className="min-w-0 px-3 py-[9px]">
                  <div className="text-[11.5px]">{key.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{key.prefix}</div>
                </div>
                <div className="min-w-0 px-3 py-[9px] text-[9.5px] leading-[1.5] text-ink/65">
                  {key.scopes}
                </div>
                <div className="px-3 py-[9px] text-[10px] text-ink/60">{key.rate}</div>
                <div className="px-3 py-[9px] text-[10px] text-ink/60">{key.used}</div>
                <div className="px-3 py-[9px]">
                  <Chip tone={key.tone}>{key.env}</Chip>
                </div>
              </DataRow>
            ))}
          </DataTable>

          <pre className="m-0 mt-3 overflow-x-auto rounded-[14px] border border-white/[.13] bg-white/[.05] px-[15px] py-[13px] text-[10.5px] leading-[1.8] whitespace-pre-line text-ink">
            {curlSample}
          </pre>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <SectionRule title="Webhooki" />
            <HairlineList>
              {webhooks.map((webhook) => (
                <HairlineItem
                  key={webhook.url}
                  className="grid grid-cols-[minmax(0,1fr)_96px] items-center gap-[11px] px-[13px] py-2.5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[10.5px] text-ink/80">{webhook.url}</div>
                    <div className="mt-[3px] text-[10.5px] leading-[1.45] text-ink/50">
                      {webhook.note}
                    </div>
                  </div>
                  <div>
                    <Chip tone={webhook.tone}>{webhook.state}</Chip>
                  </div>
                </HairlineItem>
              ))}
            </HairlineList>
          </div>

          <div>
            <SectionRule title="Dla deweloperów" />
            <HairlineList columns="repeat(auto-fit,minmax(150px,1fr))">
              {devTools.map((tool) => (
                <HairlineItem key={tool.name} className="px-[13px] py-3">
                  <div className="mb-1.5 text-[9.5px] tracking-[.1em] text-accent-soft">
                    {tool.name}
                  </div>
                  <div className="text-[10.5px] leading-[1.45] text-pretty text-ink/65">
                    {tool.note}
                  </div>
                </HairlineItem>
              ))}
            </HairlineList>
          </div>
        </div>
      </div>
    </div>
  );
}
