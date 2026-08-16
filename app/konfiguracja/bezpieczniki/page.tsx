"use client";

import Link from "next/link";
import { useGuards } from "@/hooks/useConfiguration";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT_NARROW } from "@/components/ui/layout";
import { GUARD_AUTHORITY, GUARD_LAYER, GUARD_MODE } from "@/lib/configuration";

const GUARD_GRID = "minmax(200px,1.2fr) 130px minmax(240px,1.6fr) 150px";

/** The outlet blocklist is the one guard set by plan rather than by procedure. */
const PLAN_LEVEL_GUARD = "Blocklist redakcji";

export default function GuardsPage() {
  const { data } = useGuards();
  if (!data) return null;

  const { columns, guards, signatures, audit } = data;
  const authority = GUARD_AUTHORITY[GUARD_LAYER];

  return (
    <div className={CONSOLE_PADDING_TIGHT_NARROW}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="BEZPIECZNIKI NADZOROWANE · NIE PRZEŁĄCZANE"
        title="Czego nie zmienia się suwakiem"
        aside={
          <>
            kontekst: {GUARD_LAYER.toUpperCase()}
            <br />
            {GUARD_MODE[GUARD_LAYER]}
          </>
        }
      />

      <DataTable columns={columns} grid={GUARD_GRID} minWidth={720} className="mb-6">
        {guards.map((guard) => {
          const isPlanLevel = guard.name === PLAN_LEVEL_GUARD && GUARD_LAYER === "Pro";

          return (
            <DataRow key={guard.name} grid={GUARD_GRID} align="center">
              <div className="min-w-0 px-3 py-[11px]">
                <div className="text-[12.5px] font-medium">{guard.name}</div>
                <div className="mt-0.5 text-[9.5px] text-ink/45">{guard.scope}</div>
              </div>
              <div className="px-3 py-[11px] text-xs">{guard.value[GUARD_LAYER]}</div>
              <div className="min-w-0 px-3 py-[11px] text-[11.5px] leading-[1.5] text-pretty text-ink/70">
                {guard.why[GUARD_LAYER]}
              </div>
              <div className="px-3 py-[11px]">
                <Chip tone={isPlanLevel ? "amber" : authority.tone}>
                  {isPlanLevel ? "USTAWIENIE PLANU" : authority.label}
                </Chip>
              </div>
            </DataRow>
          );
        })}
      </DataTable>

      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Wniosek o zmianę w toku" aside="WYMAGA DRUGIEGO PODPISU" />
          <div className="border border-accent/[.38] bg-white/[.035]">
            <div className="border-b border-white/[.12] px-[15px] py-[13px]">
              <div className="mb-1.5 text-[9px] tracking-[.11em] text-accent-soft">
                WNIOSEK 2026/041 · ZŁOŻONY 27 VII, 11:14
              </div>
              <div className="mb-[7px] text-base leading-[1.3] font-semibold text-pretty">
                Obniżenie progu agregacji k z 50 do 30 dla klastrów skrzynki obywatelskiej w
                powiatach poniżej 40 tys. mieszkańców
              </div>
              <div className="text-[11.5px] leading-[1.55] text-pretty text-ink/[.72]">
                Uzasadnienie wnioskodawcy: w małych powiatach próg k ≥ 50 blokuje 61% klastrów,
                przez co sygnał z terenów wiejskich nie dociera. Wniosek dotyczy wyłącznie klastrów
                tematycznych, bez ujawniania treści pojedynczych wiadomości.
              </div>
            </div>

            {signatures.map((signature) => (
              <div
                key={signature.who}
                className="grid grid-cols-[minmax(0,1fr)_130px] items-center gap-[11px] border-b border-white/[.08] px-[15px] py-[11px]"
              >
                <div className="min-w-0">
                  <div className="text-xs">{signature.who}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{signature.role}</div>
                </div>
                <div className="text-right">
                  <Chip tone={signature.tone}>{signature.state}</Chip>
                </div>
              </div>
            ))}

            <div className="rounded-[14px] bg-white/[.05] px-[15px] py-3 text-[9.5px] leading-[1.6] text-ink/60">
              Do wdrożenia potrzebne są dwa podpisy i opinia niezależnego monitora. Każdy krok
              procedury trafia do logu audytowego typu append-only.
            </div>
          </div>
        </div>

        <div>
          <SectionRule
            title="Ostatnie wpisy audytowe"
            aside={
              <Link href="/gov" className="tracking-[.07em]">
                PEŁNY LOG →
              </Link>
            }
          />
          <HairlineList>
            {audit.map((entry) => (
              <HairlineItem
                key={entry.when}
                className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-[11px] px-[13px] py-2.5"
              >
                <div className="text-[9.5px] text-ink/50">{entry.when}</div>
                <div className="min-w-0">
                  <div className="text-[11.5px] leading-[1.45] text-pretty text-ink/[.82]">
                    {entry.what.replace("{layer}", GUARD_LAYER)}
                  </div>
                  <div className="mt-[3px] text-[9px] tracking-[.07em] text-ink/45">
                    {entry.who}
                  </div>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>
    </div>
  );
}
