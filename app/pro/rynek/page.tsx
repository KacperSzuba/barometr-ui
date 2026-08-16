"use client";

import Link from "next/link";
import { useMarket } from "@/hooks/usePro";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

const TENDER_GRID = "minmax(200px,1.4fr) minmax(220px,1.6fr) 120px 110px 110px 120px";

/** Tender-to-profile match thresholds — they drive the bar colour. */
const FIT_STRONG = 85;
const FIT_MEDIUM = 65;

const fitColor = (value: number) =>
  value > FIT_STRONG ? "#1F9C7C" : value > FIT_MEDIUM ? "#F5A524" : "rgba(231,234,242,.35)";

export default function MarketPage() {
  const { data } = useMarket();
  if (!data) return null;

  const { columns, tenders, thread, comments, shared, reports, integrations } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker="RYNEK, ZESPÓŁ, WYJŚCIA"
        title="Przetargi, praca zespołu i wyjścia z danych"
        aside={
          <>
            8 seatów · 3 wspólne obserwowane tematy
            <br />4 raporty cykliczne aktywne
          </>
        }
      />

      <SectionRule
        title="Przetargi jako sygnał sprzedażowy"
        aside="DOPASOWANIE DO PKD 35.14 I REGIONU"
      />
      <DataTable columns={columns} grid={TENDER_GRID} minWidth={1000} className="mb-[26px]">
        {tenders.map((tender) => (
          <DataRow key={tender.subject} grid={TENDER_GRID} align="center">
            <div className="min-w-0 px-3 py-2.5">
              <div className="text-xs leading-[1.35]">{tender.buyer}</div>
              <div className="mt-0.5 text-[9.5px] text-ink/45">{tender.place}</div>
            </div>
            <div className="min-w-0 px-3 py-2.5 text-[11.5px] leading-[1.45] text-ink/[.72]">
              {tender.subject}
            </div>
            <div className="px-3 py-2.5 text-[11.5px]">{tender.value}</div>
            <div className="px-3 py-2.5 text-[10.5px] text-ink/65">{tender.deadline}</div>
            <div className="px-3 py-2.5">
              <div className="h-1.5 bg-white/[.07]">
                <div
                  className="h-1.5"
                  style={{ width: `${tender.fitValue}%`, background: fitColor(tender.fitValue) }}
                />
              </div>
              <div className="mt-[3px] text-[9.5px] text-ink/55">{tender.fit}</div>
            </div>
            <div className="px-3 py-2.5">
              <Chip tone={tender.tone}>{tender.signal}</Chip>
            </div>
          </DataRow>
        ))}
      </DataTable>

      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Współpraca nad alertem" aside="ALERT #4128" />
          <div className="border border-white/[.13] bg-white/[.03]">
            <div className="border-b border-white/10 px-3.5 py-[13px]">
              <div className="mb-1.5 flex flex-wrap items-center gap-[9px]">
                <span className="rounded-full bg-accent/[.14] px-1.5 py-0.5 text-[9px] tracking-[.08em] text-accent-soft">
                  {thread.badge}
                </span>
                <span className="text-[9.5px] text-ink/50">{thread.meta}</span>
              </div>
              <div className="text-[15.5px] leading-[1.3] font-semibold text-pretty">
                {thread.title}
              </div>
            </div>

            {comments.map((comment) => (
              <div
                key={comment.when}
                className="grid grid-cols-[28px_minmax(0,1fr)] gap-2.5 border-b border-white/[.07] px-3.5 py-[11px]"
              >
                <div className="flex h-[26px] w-[26px] items-center justify-center bg-white/[.06] text-[9.5px] font-semibold text-ink/60">
                  {comment.initials}
                </div>
                <div className="min-w-0">
                  <div className="mb-[3px] flex items-baseline gap-2">
                    <span className="text-[11.5px] font-medium">{comment.who}</span>
                    <span className="text-[9px] text-ink/45">{comment.when}</span>
                  </div>
                  <div className="text-[11.5px] leading-[1.5] text-pretty text-ink/[.78]">
                    {comment.text}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-2 px-3.5 py-[11px]">
              <div className="min-w-[160px] flex-1 rounded-[10px] border border-white/[.15] bg-white/[.035] px-2.5 py-2 text-[11.5px] text-ink/45">
                dodaj komentarz, @wspomnij osobę…
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-[10px] bg-white/[.05] px-2.5 py-[7px] text-[9.5px] text-ink"
              >
                WYŚLIJ
              </button>
            </div>
          </div>

          <HairlineList className="mt-3">
            <HairlineItem className="bg-white/[.05] px-[13px] py-[9px] text-[9px] tracking-[.13em] text-ink/55">
              WSPÓLNE OBSERWOWANE TEMATY
            </HairlineItem>
            {shared.map((topic) => (
              <HairlineItem
                key={topic.name}
                className="grid grid-cols-[minmax(0,1fr)_120px_90px] items-center gap-2.5 px-[13px] py-2.5"
              >
                <div className="min-w-0 text-xs">{topic.name}</div>
                <div className="text-[9.5px] text-ink/50">{topic.people}</div>
                <div className="text-right text-[10px]">{topic.items}</div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div className="flex flex-col gap-[22px]">
          <div>
            <SectionRule title="Raporty cykliczne" />
            <HairlineList>
              {reports.map((report) => (
                <HairlineItem
                  key={report.name}
                  className="grid grid-cols-[minmax(0,1fr)_108px_74px] items-center gap-2.5 px-[13px] py-2.5"
                >
                  <div className="min-w-0">
                    <div className="text-xs leading-[1.35]">{report.name}</div>
                    <div className="mt-0.5 text-[9.5px] text-ink/45">{report.to}</div>
                  </div>
                  <div className="text-[9.5px] text-ink/60">{report.cadence}</div>
                  <div>
                    <Chip tone={report.tone}>{report.format}</Chip>
                  </div>
                </HairlineItem>
              ))}
            </HairlineList>
          </div>

          <div>
            <SectionRule
              title="Integracje i wyjścia"
              aside={
                <Link href="/konto/bezpieczenstwo" className="tracking-[.07em]">
                  KLUCZE API →
                </Link>
              }
            />
            <HairlineList columns="repeat(auto-fit,minmax(180px,1fr))">
              {integrations.map((integration) => (
                <HairlineItem key={integration.name} className="px-[13px] py-3">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-[10px] tracking-[.09em]">{integration.name}</span>
                    <Chip tone={integration.tone}>{integration.state}</Chip>
                  </div>
                  <div className="text-[11px] leading-[1.45] text-pretty text-ink/65">
                    {integration.note}
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
