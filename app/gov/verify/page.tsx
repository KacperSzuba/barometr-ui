"use client";

import { useState } from "react";
import { useVerificationDesk } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { VERACITY_TONE } from "@/lib/gov";
import { cx } from "@/lib/cn";

const BADGE = "px-1.5 py-0.5 text-[8.5px] tracking-[.1em]";

export default function ClaimLedgerPage() {
  const [index, setIndex] = useState(0);
  const { data } = useVerificationDesk();
  if (!data) return null;

  const { claims, standards, ownRecord, ledgerNote } = data;
  const selected = claims[index] ?? claims[0];

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="VERIFICATION DESK · 7 IN QUEUE"
        title="Claim ledger"
        aside={
          <>
            Median time to verdict 3 h 40 m
            <br />
            Our own claims are in the same queue
          </>
        }
      />

      <div className="mt-[18px] grid grid-cols-[minmax(0,1fr)_344px] items-start gap-6">
        <div className="border border-white/[.14]">
          {claims.map((claim, i) => (
            <button
              key={claim.claim}
              type="button"
              onClick={() => setIndex(i)}
              className={cx(
                "w-full cursor-pointer border-t border-ink/10 px-[13px] py-[11px] text-left",
                i === index ? "bg-white/[.06] shadow-[inset_3px_0_0_#7C5CFF]" : "bg-white/[.03]",
              )}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className={cx(BADGE, VERACITY_TONE[claim.kind])}>{claim.status}</span>
                <span className="text-[9px] text-ink/45">
                  {claim.origin} · open {claim.age}
                </span>
              </div>
              <div className="text-[15.5px] leading-[1.3] font-semibold text-pretty">
                {claim.claim}
              </div>
              <div className="mt-[5px] text-[9.5px] text-ink/50">{claim.checker}</div>
            </button>
          ))}

          <div className="rounded-[14px] border-t border-white/10 bg-white/[.035] px-3.5 py-3 text-[11px] leading-[1.6] text-pretty text-ink/[.62]">
            {ledgerNote}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-white/[.14] bg-white/[.035]">
            <div className="border-b border-white/[.12] px-3.5 py-[13px]">
              <span className={cx(BADGE, VERACITY_TONE[selected.kind])}>{selected.status}</span>
              <div className="mt-[9px] text-[17px] leading-[1.3] font-semibold text-pretty">
                {selected.claim}
              </div>
            </div>

            <div className="border-b border-white/[.12] px-3.5 py-[13px]">
              <div className="mb-2.5 text-[9px] tracking-[.14em] text-ink/45">EVIDENCE CHAIN</div>
              {selected.evidence.map((step) => (
                <div
                  key={step}
                  className="flex gap-[9px] py-[5px] text-[11.5px] leading-[1.5] text-ink/75"
                >
                  <span className="text-ink/35">—</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="px-3.5 py-3 text-[9.5px] leading-[1.6] text-ink/55">
              {selected.impact}
              <br />
              {selected.checker}
            </div>
          </div>

          <div className="rounded-[14px] border border-white/[.14] bg-white/[.03] p-3.5">
            <div className="mb-[11px] text-[9px] tracking-[.14em] text-ink/45">DESK STANDARDS</div>
            {standards.map((standard) => (
              <div
                key={standard}
                className="flex gap-[9px] py-[5px] text-[11.5px] leading-[1.5] text-ink/[.72]"
              >
                <span className="mt-1.5 h-[5px] w-[5px] flex-none rotate-45 bg-[#1F9C7C]" />
                <span>{standard}</span>
              </div>
            ))}
          </div>

          <div className="border border-white/[.14] bg-white/[.03]">
            <div className="border-b border-white/[.12] px-3.5 py-3 text-[9px] tracking-[.14em] text-ink/45">
              OUR OWN CORRECTION RECORD
            </div>
            {ownRecord.map((entry) => (
              <div key={entry.date} className="border-b border-white/[.08] px-3.5 py-[11px]">
                <div className="text-[9.5px] text-ink/45">{entry.date}</div>
                <div className="mt-[3px] text-[11.5px] leading-[1.45] text-ink/80">
                  {entry.what}
                </div>
                <div className="mt-[3px] text-[10.5px] text-emerald-soft">{entry.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
