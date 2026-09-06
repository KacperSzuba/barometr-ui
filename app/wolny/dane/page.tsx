"use client";

import { useOpenData } from "@/hooks/useFreeTier";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { CONSOLE_PADDING } from "@/components/ui/layout";

export default function OpenDataPage() {
  const { data } = useOpenData();
  if (!data) return null;

  const { terms, exports, embedCode, widgetKinds, corrections, correctionsNote, publicPromises } =
    data;

  return (
    <div className={CONSOLE_PADDING}>
      <PageHeader
        className="mb-5"
        kicker="OTWARTE DANE I ROZLICZALNOŚĆ"
        title="Weź nasze dane i sprawdź nas"
        aside={terms.map((line) => (
          <div key={line}>{line}</div>
        ))}
      />

      <HairlineList columns="repeat(auto-fit,minmax(250px,1fr))" className="mb-[26px]">
        {exports.map((channel) => (
          <HairlineItem key={channel.kind} className="px-4 pt-[15px] pb-[17px]">
            <div className="mb-2 text-[9px] tracking-[.14em] text-accent-soft">{channel.kind}</div>
            <div className="mb-1.5 text-base font-semibold">{channel.name}</div>
            <div className="mb-[11px] text-[11.5px] leading-[1.5] text-pretty text-ink/65">
              {channel.desc}
            </div>
            <button
              type="button"
              className="inline-block cursor-pointer rounded-[10px] border border-white/20 px-2.5 py-1.5 text-[9.5px] tracking-[.07em] hover:bg-white/[.05] hover:text-ink"
            >
              {channel.cta}
            </button>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="mb-[26px] grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[26px]">
        <div>
          <SectionRule title="Zapytanie do wklejenia" aside="DZIAŁA BEZ KONTA" />
          <pre className="m-0 overflow-x-auto rounded-[14px] border border-white/[.13] bg-white/[.05] px-[15px] py-3.5 text-[10.5px] leading-[1.8] whitespace-pre-line text-ink">
            {embedCode}
          </pre>
          {/* Empty while no widget exists; the box above holds a request that runs. */}
          <div className="mt-2.5 flex flex-wrap gap-2">
            {widgetKinds.map((kind) => (
              <span
                key={kind}
                className="cursor-pointer rounded-full border border-white/20 px-[9px] py-[5px] text-[9.5px] tracking-[.07em] hover:bg-white/[.05]"
              >
                {kind}
              </span>
            ))}
          </div>
          <Note className="mt-[11px]">
            Zapytanie jest publiczne i nie wymaga klucza. Limit i atrybucja są w nagłówkach
            odpowiedzi — atrybucję trzeba pokazać przy publikacji.
          </Note>
        </div>

        <div>
          <SectionRule
            title="Rejestr korekt i błędów"
            aside={corrections.length === 0 ? "NIE ISTNIEJE" : `${corrections.length} WPISÓW`}
          />
          <HairlineList>
            {corrections.map((correction) => (
              <HairlineItem
                key={correction.date}
                className="grid grid-cols-[70px_minmax(0,1fr)_96px] items-start gap-[11px] px-[13px] py-[11px]"
              >
                <div className="pt-0.5 text-[9.5px] text-ink/50">{correction.date}</div>
                <div className="min-w-0">
                  <div className="mb-[3px] text-xs leading-[1.45] text-pretty text-ink/85">
                    {correction.what}
                  </div>
                  <div className="text-[9.5px] leading-[1.5] text-ink/50">{correction.how}</div>
                </div>
                <div>
                  <Chip>{correction.kind}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          {/* The promise the mock made — "każda korekta zostaje na stałe" — describes a
              register that does not exist. What the screen can honestly say is why. */}
          <Note className="mt-[9px]">{correctionsNote}</Note>
        </div>
      </div>

      <HairlineList columns="repeat(auto-fit,minmax(280px,1fr))">
        {publicPromises.map((entry) => (
          <HairlineItem key={entry.label} className="bg-white/[.035] px-4 pt-[15px] pb-[17px]">
            <div className="mb-2 text-[9px] tracking-[.14em] text-accent-soft">{entry.label}</div>
            <div className="text-xs leading-[1.6] text-pretty text-ink/75">{entry.value}</div>
          </HairlineItem>
        ))}
      </HairlineList>
    </div>
  );
}
