"use client";

import Link from "next/link";
import { useOnboarding } from "@/hooks/useAccount";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT_NARROW } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

/** The last wizard step is rendered as the active one. */
const ACTIVE_STEP = 2;

export default function OnboardingPage() {
  const { data } = useOnboarding();
  if (!data) return null;

  const { wizard, routing, support } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT_NARROW}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="ONBOARDING · NIP → PKD → ROUTING"
        title="Konfiguracja z jednego numeru"
        aside={
          <>
            średni czas do pierwszego alertu: 4 min
            <br />
            bez klikania przez kreator
          </>
        }
      />

      <HairlineList columns="repeat(auto-fit,minmax(280px,1fr))" className="mb-6">
        {wizard.map((step, index) => (
          <HairlineItem
            key={step.n}
            className={cx("px-4 pt-[15px] pb-[17px]", index === ACTIVE_STEP && "bg-white/[.065]")}
          >
            <div className="mb-2.5 flex items-center gap-[9px]">
              <span className="text-[10px] text-accent-soft">{step.n}</span>
              <span className="text-[9px] tracking-[.13em] text-ink/50">{step.kicker}</span>
              <span className="flex-1" />
              <Chip tone={step.tone}>{step.state}</Chip>
            </div>
            <div className="mb-[9px] text-[17px] font-semibold">{step.title}</div>
            <div className="flex flex-col gap-[7px]">
              {step.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-2.5"
                >
                  <span className="text-[9px] tracking-[.07em] text-ink/45">{row.label}</span>
                  <span className="text-[11.5px] leading-[1.5] text-pretty text-ink/80">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule
            title="Routing wygenerowany z PKD"
            aside={
              <Link href="/konfiguracja" className="tracking-[.07em]">
                DOSTRÓJ →
              </Link>
            }
          />
          <HairlineList>
            {routing.map((row) => (
              <HairlineItem
                key={row.pkd}
                className="grid grid-cols-[88px_minmax(0,1fr)_100px] items-center gap-[11px] px-[13px] py-2.5"
              >
                <div className="text-[10px] text-accent-soft">{row.pkd}</div>
                <div className="min-w-0">
                  <div className="text-xs leading-[1.35]">{row.area}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{row.source}</div>
                </div>
                <div className="text-right text-[10px] text-ink/60">{row.items}</div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="mt-3 rounded-[14px] border border-white/[.13] bg-white/[.035] px-[15px] py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.13em] text-accent-soft">
              IMPORT LISTY OBSERWOWANYCH PODMIOTÓW
            </div>
            <div className="mb-2.5 text-[11.5px] leading-[1.55] text-pretty text-ink/[.72]">
              Wgraj CSV z NIP-ami, nazwami spółek, numerami druków albo kodami TERYT gmin.
              Rozpoznajemy kolumny automatycznie i pokazujemy podgląd dopasowania przed zapisem.
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-[10px] bg-white/[.05] px-2.5 py-1.5 text-[9.5px] text-ink"
              >
                WGRAJ CSV
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-[10px] border border-white/20 px-2.5 py-1.5 text-[9.5px]"
              >
                POBIERZ SZABLON
              </button>
            </div>
          </div>
        </div>

        <div>
          <SectionRule title="Wsparcie i jawność" />
          <HairlineList>
            {support.map((item) => (
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
      </div>
    </div>
  );
}
