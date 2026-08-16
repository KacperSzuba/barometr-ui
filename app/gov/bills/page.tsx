"use client";

import { useState } from "react";
import { useLegislativePulse } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import type { Salience } from "@/lib/data/types";
import { cx } from "@/lib/cn";

const BILL_GRID = "78px minmax(140px,1.7fr) 108px minmax(120px,1.5fr) 74px 62px";

const SALIENCE: Record<Salience, string> = {
  HIGH: "bg-ink/85 text-ink",
  MEDIUM: "bg-ink/[.14]",
  LOW: "bg-ink/[.06] text-ink/55",
};

export default function LegislativePulsePage() {
  const [code, setCode] = useState("DRUK 412");
  const { data } = useLegislativePulse();
  if (!data) return null;

  const { bills, details, fallback, unawareNote } = data;
  const selected = bills.find((bill) => bill.code === code) ?? bills[0];
  const detail = details[selected.code] ?? fallback;
  const gap = detail.informed - selected.support;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="LEGISLATIVE PULSE · 6 ACTIVE BILLS"
        title="Opinion, bill by bill"
        aside={
          <>
            Raw opinion vs. informed opinion
            <br />
            Deliberative sample, weighted to census
          </>
        }
      />

      <div className="mt-[18px] grid grid-cols-[minmax(0,1fr)_348px] items-start gap-6">
        <div className="overflow-x-auto border border-white/[.14]">
          <div
            className="grid min-w-[800px] gap-[11px] rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[8.5px] tracking-[.11em] text-ink/50"
            style={{ gridTemplateColumns: BILL_GRID }}
          >
            <span>PAPER</span>
            <span>BILL</span>
            <span>STAGE</span>
            <span>SUPPORT / OPPOSE / UNAWARE</span>
            <span>SALIENCE</span>
            <span className="text-right">7D</span>
          </div>

          {bills.map((bill) => (
            <button
              key={bill.code}
              type="button"
              onClick={() => setCode(bill.code)}
              className={cx(
                "grid w-full min-w-[800px] cursor-pointer items-center gap-[11px] border-t border-ink/10 px-[13px] py-[11px] text-left",
                bill.code === selected.code
                  ? "bg-white/[.06] shadow-[inset_3px_0_0_#7C5CFF]"
                  : "bg-white/[.03]",
              )}
              style={{ gridTemplateColumns: BILL_GRID }}
            >
              <span className="text-[10px] text-ink/55">{bill.code}</span>
              <div>
                <div className="text-[14.5px] leading-[1.25] font-semibold text-pretty">
                  {bill.title}
                </div>
                <div className="mt-[3px] text-[9px] text-ink/45">{bill.next}</div>
              </div>
              <span className="text-[11px] text-ink/65">{bill.stage}</span>
              <div>
                <div className="flex h-[9px] w-full">
                  <div style={{ width: `${bill.support}%`, background: "#1F9C7C" }} />
                  <div style={{ width: `${bill.oppose}%`, background: "#7C5CFF" }} />
                  <div style={{ width: `${bill.unaware}%`, background: "rgba(231,234,242,.16)" }} />
                </div>
                <div className="mt-1 flex justify-between text-[9px] text-ink/45">
                  <span>{bill.support}%</span>
                  <span>{bill.oppose}%</span>
                  <span>{bill.unaware}% unaware</span>
                </div>
              </div>
              <span
                className={cx(
                  "px-1.5 py-0.5 text-center text-[8.5px] tracking-[.09em]",
                  SALIENCE[bill.salience],
                )}
              >
                {bill.salience}
              </span>
              <span
                className={cx(
                  "text-right text-[11px]",
                  bill.delta.startsWith("−")
                    ? "text-accent-soft"
                    : bill.delta === "0"
                      ? "text-ink/40"
                      : "text-emerald-soft",
                )}
              >
                {bill.delta}
              </span>
            </button>
          ))}

          <div className="rounded-[14px] border-t border-white/10 bg-white/[.035] px-[13px] py-[11px] text-[11px] leading-[1.55] text-pretty text-ink/[.62]">
            {unawareNote}
          </div>
        </div>

        <div className="border border-white/[.14] bg-white/[.035]">
          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-1.5 text-[9px] tracking-[.14em] text-ink/45">
              {selected.code} · {selected.stage}
            </div>
            <div className="text-[19px] leading-[1.2] font-bold text-pretty">{selected.title}</div>
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2.5 text-[9px] tracking-[.14em] text-ink/45">
              RAW vs INFORMED SUPPORT
            </div>
            <div className="mb-[7px] flex items-center gap-[9px]">
              <span className="w-16 text-[9.5px] text-ink/50">RAW</span>
              <div className="h-[9px] flex-1 bg-white/[.08]">
                <div className="h-full bg-ink/30" style={{ width: `${selected.support}%` }} />
              </div>
              <span className="w-8 text-right text-[11px]">{selected.support}</span>
            </div>
            <div className="flex items-center gap-[9px]">
              <span className="w-16 text-[9.5px] text-ink/50">INFORMED</span>
              <div className="h-[9px] flex-1 bg-white/[.08]">
                <div className="h-full bg-[#1F9C7C]" style={{ width: `${detail.informed}%` }} />
              </div>
              <span className="w-8 text-right text-[11px]">{detail.informed}</span>
            </div>
            <div className="mt-2 text-[9.5px] text-ink/55">
              {gap >= 0 ? "+" : ""}
              {gap} pt after a neutral briefing
            </div>
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2.5 text-[9px] tracking-[.14em] text-amber">
              WHAT PEOPLE WRONGLY BELIEVE
            </div>
            {detail.misconceptions.map(([label, pct]) => (
              <div key={label} className="mb-[9px]">
                <div className="mb-1 flex justify-between gap-2 text-[11.5px] leading-[1.35]">
                  <span>{label}</span>
                  <span className="text-ink/55">{pct}%</span>
                </div>
                <div className="h-[5px] bg-white/[.08]">
                  <div className="h-full bg-amber" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2.5 text-[9px] tracking-[.14em] text-ink/45">MAIN OBJECTIONS</div>
            {detail.objections.map(([label, pct]) => (
              <div key={label} className="mb-[9px]">
                <div className="mb-1 flex justify-between gap-2 text-[11.5px] leading-[1.35]">
                  <span>{label}</span>
                  <span className="text-ink/55">{pct}%</span>
                </div>
                <div className="h-[5px] bg-white/[.08]">
                  <div className="h-full bg-ink/75" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-white/[.12] px-3.5 py-[13px]">
            <div className="mb-2 text-[9px] tracking-[.14em] text-ink/45">READING</div>
            <div className="text-xs leading-[1.6] text-pretty text-ink/75">{detail.note}</div>
          </div>

          <div className="px-3.5 py-3 text-[9.5px] leading-[1.6] text-ink/50">
            {detail.evidence}
          </div>
        </div>
      </div>
    </div>
  );
}
