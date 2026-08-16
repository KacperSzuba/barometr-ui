"use client";

import { useAnalysis } from "@/hooks/usePro";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { Note } from "@/components/ui/Note";
import { DiffBlock } from "@/components/ui/DiffBlock";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

/** Frame colour in the outlet comparison. */
const FRAME_COLOR: Record<string, string> = {
  "koszt życia": "#BDB0FF",
  "spór polityczny": "#F7C46C",
  "procedura legislacyjna": "#1F9C7C",
};
const FRAME_DEFAULT = "rgba(231,234,242,.4)";

const EXPORT_ACTIONS = ["PDF", "XLSX", "WYŚLIJ NA SLACK", "ŹRÓDŁA (41)"];

export default function AnalysisPage() {
  const { data } = useAnalysis();
  if (!data) return null;

  const { diff, diffComment, outlets, briefOptions, briefSelected, brief, saved } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker="ANALIZA · DRUK 412"
        title="Kto zmienił przepis i jak to opisano"
        aside={
          <>
            4 wersje projektu · 214 uwag
            <br />
            148 materiałów w 12 redakcjach
          </>
        }
      />

      <div className="mb-[26px] grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Diff wersji z autorstwem zmiany" aside="v3 → v4" />
          <div className="border border-white/[.13] bg-white/[.03]">
            <DiffBlock lines={diff} />

            <div className="rounded-[14px] border-t border-white/[.13] bg-white/[.035] px-[13px] py-3">
              <div className="mb-[7px] text-[9px] tracking-[.11em] text-accent-soft">
                UWAGA, KTÓRA WYWOŁAŁA ZMIANĘ
              </div>
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-2.5 gap-y-1.5 text-[11.5px] leading-[1.5] text-ink/[.78]">
                {diffComment.map((entry) => (
                  <div key={entry.label} className="contents">
                    <span className="text-[9.5px] text-ink/50">{entry.label}</span>
                    <span>{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionRule title="Ta sama sprawa w 12 redakcjach" aside="FRAMING DOMINUJĄCY" />
          <div className="border border-white/[.13] bg-white/[.03]">
            {outlets.map((outlet) => (
              <div
                key={outlet.name}
                className="grid grid-cols-[minmax(0,1fr)_118px_62px] items-center gap-2.5 border-b border-white/[.07] px-[13px] py-2"
              >
                <div className="min-w-0">
                  <div className="text-[11.5px] leading-[1.3]">{outlet.name}</div>
                  <div className="mt-0.5 text-[9px] text-ink/45">{outlet.kind}</div>
                </div>
                <div className="min-w-0">
                  <div className="h-1.5 bg-white/[.07]">
                    <div
                      className="h-1.5"
                      style={{
                        width: `${outlet.share}%`,
                        background: FRAME_COLOR[outlet.frame] ?? FRAME_DEFAULT,
                      }}
                    />
                  </div>
                  <div className="mt-[3px] text-[9px] text-ink/55">
                    {outlet.frame} · {outlet.share}%
                  </div>
                </div>
                <div className="text-right text-[10px] text-ink/60">{outlet.count} mat.</div>
              </div>
            ))}
            <Note className="px-[13px] py-2.5">
              Blokowanie konkretnych redakcji jest dostępne jako filtr roboczy w tym planie. Filtr
              nie zmienia agregatów w porównaniu framingu.
            </Note>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6">
        <div>
          <SectionRule title="Briefing na życzenie" />
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-[15px] py-3.5">
            <div className="mb-3 flex gap-px">
              <div className="flex-1 rounded-[14px] border border-white/[.15] bg-white/[.035] px-[11px] py-[9px] text-xs text-ink/80">
                streść 6 miesięcy tematu „taryfy energetyczne”
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[10px] tracking-[.08em] text-ink"
              >
                GENERUJ
              </button>
            </div>

            <div className="mb-[13px] flex flex-wrap gap-1.5">
              {briefOptions.map((option) => (
                <span
                  key={option}
                  className={cx(
                    "cursor-pointer border px-[9px] py-[5px] text-[9.5px] tracking-[.07em]",
                    briefSelected.includes(option)
                      ? "border-accent/50 bg-accent text-ink"
                      : "border-ink/[.18] text-ink/65",
                  )}
                >
                  {option}
                </span>
              ))}
            </div>

            <div className="rounded-[14px] border-l-[3px] border-accent/[.38] bg-white/[.035] px-[13px] py-3">
              <div className="mb-2 text-[9px] tracking-[.11em] text-accent-soft">
                WYNIK · 6 MIESIĘCY W 5 ZDANIACH · 41 ŹRÓDEŁ
              </div>
              <div className="text-[13.5px] leading-[1.6] text-pretty text-ink/85">{brief}</div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {EXPORT_ACTIONS.map((action) => (
                  <span
                    key={action}
                    className="cursor-pointer rounded-full border border-white/20 px-[9px] py-[5px] text-[9.5px]"
                  >
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionRule title="Archiwum i zapisane wyszukiwania" aside="PEŁNOTEKSTOWO OD 2019 R." />
          <div className="mb-3 flex gap-px">
            <div className="flex-1 rounded-[14px] border border-white/[.15] bg-white/[.035] px-[11px] py-[9px] text-[11px] text-ink/75">
              „odbiorca wrażliwy” AND (taryfa OR stawka) NOT ciepłownictwo
            </div>
            <button
              type="button"
              className="cursor-pointer rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[10px] tracking-[.08em] text-ink"
            >
              SZUKAJ
            </button>
          </div>

          <HairlineList>
            {saved.map((entry) => (
              <HairlineItem
                key={entry.name}
                className="grid grid-cols-[minmax(0,1fr)_86px_96px] items-center gap-2.5 px-[13px] py-2.5 hover:bg-white/[.04]"
              >
                <div className="min-w-0">
                  <div className="text-xs leading-[1.35]">{entry.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{entry.query}</div>
                </div>
                <div className="text-[10.5px] text-ink/60">{entry.hits}</div>
                <div>
                  <Chip tone={entry.tone}>{entry.mode}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
          <Note className="mt-[9px]">
            Zapisane wyszukiwanie można zamienić w regułę alertu jednym kliknięciem — z zachowaniem
            progu istotności i minimalnej liczby źródeł.
          </Note>
        </div>
      </div>
    </div>
  );
}
