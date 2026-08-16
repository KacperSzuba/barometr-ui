"use client";

import { useGovSettings } from "@/hooks/useGov";
import { cx } from "@/lib/cn";

const INVOICE_GRID = "110px minmax(110px,1fr) 128px 104px 96px";

/** Past this utilisation the usage meter turns amber. */
const USAGE_WARN = 80;

export default function GovBillingPage() {
  const { data } = useGovSettings();
  if (!data) return null;

  const {
    plan,
    price,
    priceNote,
    usage,
    paymentTitle,
    paymentDetail,
    paymentNote,
    invoices,
    invoiceNote,
  } = data.billing;

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[18px]">
        <div className="border border-white/[.14] bg-white/[.035]">
          <div className="border-b border-white/[.12] px-[15px] py-3 text-[9px] tracking-[.14em] text-ink/45">
            CONTRACT &amp; PLAN
          </div>

          {plan.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[150px_minmax(0,1fr)] items-baseline gap-3 border-b border-white/[.08] px-[15px] py-2.5"
            >
              <span className="text-[8.5px] tracking-[.11em] text-ink/45">{row.label}</span>
              <span className="text-xs text-ink/80">{row.value}</span>
            </div>
          ))}

          <div className="flex items-baseline gap-2.5 px-[15px] py-[13px]">
            <span className="text-[26px] font-medium tracking-[-.02em]">{price}</span>
            <span className="text-[10.5px] text-ink/55">{priceNote}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div className="rounded-[14px] border border-white/[.14] bg-white/[.03] p-[15px]">
            <div className="mb-3 text-[9px] tracking-[.14em] text-ink/45">USAGE THIS PERIOD</div>
            {usage.map((meter) => (
              <div key={meter.label} className="mb-2.5">
                <div className="mb-1 flex justify-between text-[11.5px]">
                  <span>{meter.label}</span>
                  <span className="text-ink/55">{meter.value}</span>
                </div>
                <div className="h-1.5 bg-white/[.08]">
                  <div
                    className={cx("h-full", meter.pct > USAGE_WARN ? "bg-amber" : "bg-ink/75")}
                    style={{ width: `${meter.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[14px] border border-white/[.14] bg-white/[.03] p-[15px]">
            <div className="mb-[11px] text-[9px] tracking-[.14em] text-ink/45">PAYMENT METHOD</div>
            <div className="flex items-center gap-3">
              <div className="flex h-[30px] w-11 items-center justify-center border border-white/20 bg-white/[.05] text-[8px] text-ink/50">
                BANK
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px]">{paymentTitle}</div>
                <div className="mt-[3px] text-[9.5px] text-ink/50">{paymentDetail}</div>
              </div>
              <button
                type="button"
                className="cursor-pointer text-[9.5px] tracking-[.07em] text-accent-soft hover:text-accent-link-hover"
              >
                CHANGE
              </button>
            </div>
            <div className="mt-[11px] border-t border-dashed border-white/[.18] pt-2.5 text-[11px] leading-[1.55] text-pretty text-ink/60">
              {paymentNote}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-white/[.14]">
        <div
          className="grid min-w-[600px] gap-3 rounded-[14px] bg-white/[.05] px-[15px] py-2.5 text-[8.5px] tracking-[.11em] text-ink/50"
          style={{ gridTemplateColumns: INVOICE_GRID }}
        >
          <span>INVOICE</span>
          <span>PERIOD</span>
          <span className="text-right">AMOUNT (NET)</span>
          <span className="text-right">STATUS</span>
          <span className="text-right">DATE</span>
        </div>

        {invoices.map((invoice) => (
          <div
            key={invoice.no}
            className="grid min-w-[600px] items-center gap-3 rounded-[14px] border-t border-white/10 bg-white/[.03] px-[15px] py-2.5"
            style={{ gridTemplateColumns: INVOICE_GRID }}
          >
            <span className="text-[11px]">{invoice.no}</span>
            <span className="text-xs text-ink/75">{invoice.period}</span>
            <span className="text-right text-[11.5px]">{invoice.amount}</span>
            <span className="text-right">
              <span
                className={cx(
                  "px-1.5 py-0.5 text-[8.5px] tracking-[.09em]",
                  invoice.isPaid ? "bg-emerald/[.16] text-emerald-soft" : "bg-ink/10 text-ink/60",
                )}
              >
                {invoice.status}
              </span>
            </span>
            <span className="text-right text-[10px] text-ink/55">{invoice.date}</span>
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-[9px] rounded-[14px] border-t border-white/10 bg-white/[.035] px-[15px] py-[11px]">
          <button
            type="button"
            className="cursor-pointer rounded-[10px] border border-white/25 px-3 py-2 text-[9.5px] tracking-[.08em] hover:bg-white/[.06]"
          >
            DOWNLOAD ALL · PDF
          </button>
          <span className="text-[11px] text-ink/60">{invoiceNote}</span>
        </div>
      </div>
    </div>
  );
}
