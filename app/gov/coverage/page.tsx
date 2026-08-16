"use client";

import { useCoverage } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import { cx } from "@/lib/cn";

const OUTLET_GRID = "1.6fr 92px 1.5fr 1.1fr 1fr 82px";

/** Share-of-voice bar scale — 34% fills just short of the full track. */
const SHARE_SCALE = 2.6;

export default function CoveragePage() {
  const { data } = useCoverage();
  if (!data) return null;

  const { outlets, shareOfVoice } = data;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="MEDIA LANDSCAPE · 7 DAYS"
        title="Coverage comparison"
        aside={
          <>
            12 outlets · 1 907 items
            <br />
            Ownership &amp; funding disclosed per row
          </>
        }
      />

      <div className="mt-[18px] border border-white/[.14]">
        <div
          className="grid gap-3 rounded-[14px] bg-white/[.05] px-3.5 py-2.5 text-[8.5px] tracking-[.12em] text-ink/50"
          style={{ gridTemplateColumns: OUTLET_GRID }}
        >
          <span>OUTLET</span>
          <span className="text-right">ITEMS</span>
          <span>TONE DISTRIBUTION</span>
          <span>DOMINANT FRAME</span>
          <span>OWNERSHIP</span>
          <span className="text-right">CORR. RATE</span>
        </div>

        {outlets.map((outlet) => (
          <div
            key={outlet.name}
            className="grid items-center gap-3 rounded-[14px] border-t border-white/10 bg-white/[.03] px-3.5 py-3 hover:bg-white/[.04]"
            style={{ gridTemplateColumns: OUTLET_GRID }}
          >
            <div>
              <div className="text-[14.5px] font-semibold">{outlet.name}</div>
              <div className="mt-[3px] text-[9px] text-ink/45">
                {outlet.type} · reach {outlet.reach}
              </div>
            </div>

            <div className="text-right text-sm">{outlet.items}</div>

            <div>
              <div className="flex h-[11px] w-full">
                <div style={{ width: `${outlet.negative}%`, background: "#7C5CFF" }} />
                <div style={{ width: `${outlet.neutral}%`, background: "rgba(231,234,242,.16)" }} />
                <div style={{ width: `${outlet.positive}%`, background: "#1F9C7C" }} />
              </div>
              <div className="mt-1 flex justify-between text-[9px] text-ink/45">
                <span>{outlet.negative}% crit.</span>
                <span>{outlet.neutral}% neutral</span>
                <span>{outlet.positive}% fav.</span>
              </div>
            </div>

            <div className="text-[11.5px] leading-[1.4] text-ink/70">{outlet.frame}</div>
            <div className="text-[9.5px] leading-[1.45] text-ink/60">{outlet.owner}</div>

            <div className="text-right">
              <span
                className={cx(
                  "px-1.5 py-0.5 text-[11px] text-ink/75",
                  outlet.isCorrectionHigh ? "bg-amber/[.22]" : "bg-ink/[.06]",
                )}
              >
                {outlet.correction}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] p-3.5">
          <div className="mb-[11px] text-[9px] tracking-[.14em] text-ink/45">
            SHARE OF VOICE BY ISSUE
          </div>
          {shareOfVoice.map(([label, pct]) => (
            <div key={label} className="mb-[11px]">
              <div className="mb-1 flex justify-between text-[11.5px]">
                <span>{label}</span>
                <span className="text-ink/55">{pct}%</span>
              </div>
              <div className="h-2 bg-white/[.08]">
                <div className="h-full bg-white/[.05]" style={{ width: `${pct * SHARE_SCALE}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] p-3.5">
          <div className="mb-[11px] text-[9px] tracking-[.14em] text-ink/45">
            METHOD &amp; BIAS DISCLOSURE
          </div>
          <div className="text-[11.5px] leading-[1.65] text-pretty text-ink/70">
            Tone is measured toward the <i>policy</i> under discussion, never toward a party or a
            person — outlet-level scores are deliberately not aggregated into a friend/foe ranking,
            because that is the point at which monitoring turns into pressure.
            <br />
            <br />
            Correction rate is the share of items an outlet itself corrected within 72 hours: high
            is a sign of accountability, not unreliability. Sampling covers national and regional
            press, four broadcast transcripts, and public social posts; paywalled long-form is
            under-represented.
          </div>
          <div className="mt-3 border-t border-dashed border-white/[.18] pt-[11px] text-[9.5px] leading-[1.6] text-ink/50">
            Journalist-level tracking: DISABLED
            <br />
            Outlet blocklists: NOT SUPPORTED
          </div>
        </div>
      </div>
    </div>
  );
}
