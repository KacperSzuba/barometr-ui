"use client";

import { useBilling } from "@/hooks/useAccount";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { ChipList } from "@/components/ui/ChipList";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

const INVOICE_GRID =
  "minmax(160px,1.2fr) 110px 100px 100px minmax(140px,1fr) minmax(150px,1fr) 130px";

/** Past this threshold the usage bar switches to the warning colour. */
const USAGE_ALERT = 70;

export default function BillingPage() {
  const { data } = useBilling();
  if (!data) return null;

  const { usage, methods, proforma, taxRows, dunning, invoiceColumns, invoices, cards } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="PŁATNOŚCI I FAKTURY"
        title="Karta, BLIK, przelew z fakturą pro forma"
        aside={
          <>
            najbliższa faktura: 1 VIII 2026 · 5 664 zł netto
            <br />
            rozliczenie roczne · rabat 17% naliczony
          </>
        }
      />

      <HairlineList columns="repeat(auto-fit,minmax(200px,1fr))" className="mb-6">
        {usage.map((meter) => (
          <HairlineItem key={meter.label} className="px-[15px] py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.13em] text-ink/50">{meter.label}</div>
            <div className="mb-2 text-xl font-medium tracking-[-.02em]">{meter.value}</div>
            <div className="mb-1.5 h-[7px] bg-white/[.07]">
              <div
                className="h-[7px]"
                style={{
                  width: `${meter.percent}%`,
                  background: meter.percent > USAGE_ALERT ? "#F5A524" : "rgba(231,234,242,.45)",
                }}
              />
            </div>
            <div className="text-[10.5px] leading-[1.4] text-ink/50">{meter.note}</div>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Metody płatności" />
          <HairlineList>
            {methods.map((method) => (
              <HairlineItem
                key={method.name}
                className="grid grid-cols-[minmax(0,1fr)_118px_80px] items-center gap-[11px] px-[13px] py-[11px]"
              >
                <div className="min-w-0">
                  <div className="text-[12.5px]">{method.name}</div>
                  <div className="mt-0.5 text-[9.5px] leading-[1.45] text-ink/45">
                    {method.note}
                  </div>
                </div>
                <div>
                  <Chip tone={method.tone}>{method.state}</Chip>
                </div>
                <div className="cursor-pointer text-right text-[9.5px] text-accent-soft">
                  {method.action}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="mt-3.5 rounded-[14px] bg-white/[.05] px-[15px] py-3.5 text-ink">
            <div className="mb-[9px] text-[9px] tracking-[.14em] text-ink/50">
              ŚCIEŻKA INSTYTUCJONALNA
            </div>
            <div className="mb-2.5 text-lg leading-[1.3] font-semibold">
              Wygeneruj fakturę pro forma i zapłać przelewem
            </div>
            <div className="mb-[13px] flex flex-col gap-2">
              {proforma.map((entry) => (
                <div
                  key={entry.label}
                  className="grid grid-cols-[112px_minmax(0,1fr)] items-baseline gap-[11px]"
                >
                  <span className="text-[9.5px] text-ink/55">{entry.label}</span>
                  <span className="text-[11.5px] leading-[1.5] text-pretty text-ink/90">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-[10px] bg-white/[.045] px-3 py-2 text-[9.5px] tracking-[.08em] text-ink"
              >
                GENERUJ PRO FORMA
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-[10px] border border-white/30 px-3 py-2 text-[9.5px] tracking-[.08em] text-ink"
              >
                POBIERZ PAKIET DO POSTĘPOWANIA
              </button>
            </div>
          </div>
        </div>

        <div>
          <SectionRule
            title="Dane do faktury"
            aside={<span className="cursor-pointer text-accent-soft">EDYTUJ</span>}
          />
          <HairlineList className="mb-3.5">
            {taxRows.map((row) => (
              <HairlineItem
                key={row.label}
                className="grid grid-cols-[150px_minmax(0,1fr)] items-baseline gap-3 px-[13px] py-[9px]"
              >
                <div className="text-[9.5px] tracking-[.07em] text-ink/50">{row.label}</div>
                <div className="text-[11.5px] leading-[1.5] text-pretty text-ink/80">
                  {row.value}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-[15px] py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.13em] text-accent-soft">STAN ROZLICZEŃ</div>
            <ChipList items={dunning} />
          </div>
        </div>
      </div>

      <SectionRule title="Historia faktur" aside="POBIERZ CAŁOŚĆ: CSV · ZIP PDF" />
      <DataTable columns={invoiceColumns} grid={INVOICE_GRID} minWidth={1000} className="mb-6">
        {invoices.map((invoice) => (
          <DataRow key={invoice.id} grid={INVOICE_GRID} align="center">
            <div className="px-3 py-2.5 text-[11px]">{invoice.id}</div>
            <div className="px-3 py-2.5 text-[10.5px] text-ink/65">{invoice.date}</div>
            <div className="px-3 py-2.5 text-[11px]">{invoice.net}</div>
            <div className="px-3 py-2.5 text-[11px] text-ink/70">{invoice.vat}</div>
            <div className="px-3 py-2.5 text-[10.5px] text-ink/65">{invoice.po}</div>
            <div className="px-3 py-2.5 text-[11px] text-ink/70">{invoice.method}</div>
            <div className="px-3 py-2.5">
              <Chip tone={invoice.tone}>{invoice.state}</Chip>
            </div>
          </DataRow>
        ))}
      </DataTable>

      <HairlineList columns="repeat(auto-fit,minmax(280px,1fr))">
        {cards.map((card) => (
          <HairlineItem key={card.label} className="px-4 pt-[15px] pb-[17px]">
            <div className="mb-2 text-[9px] tracking-[.14em] text-accent-soft">{card.label}</div>
            <div className="mb-3 text-xs leading-[1.6] text-pretty text-ink/75">{card.value}</div>
            <button
              type="button"
              className="cursor-pointer rounded-[10px] border border-white/20 px-2.5 py-1.5 text-[9.5px] tracking-[.07em] hover:bg-white/[.05] hover:text-ink"
            >
              {card.cta}
            </button>
          </HairlineItem>
        ))}
      </HairlineList>
    </div>
  );
}
