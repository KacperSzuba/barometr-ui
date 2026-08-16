"use client";

import { useAuditTrail } from "@/hooks/useGov";
import { GovPageHeader } from "@/components/gov/GovPageHeader";
import type { AuditResult } from "@/lib/data/types";
import { cx } from "@/lib/cn";

const LOG_GRID = "72px minmax(0,1fr) 150px";

/** A system refusal reads indigo, a monitor read-through reads green. */
const RESULT_TONE: Record<AuditResult, string> = {
  ok: "bg-ink/[.07] text-ink/60",
  blocked: "bg-accent text-ink",
  monitor: "bg-emerald/[.16] text-emerald-soft",
};

/** Past this share of the retention window the bar turns indigo. */
const PURGE_SOON = 75;

export default function AuditPage() {
  const { data } = useAuditTrail();
  if (!data) return null;

  const { log, refusalNote, retention, retentionNote, monitorNotes, monitorFooter } = data;

  return (
    <div className="px-[26px] pt-[22px] pb-10">
      <GovPageHeader
        kicker="AUDIT & ACCESS · APPEND-ONLY"
        title="Who did what, and what was refused"
        aside={
          <>
            Readable by the independent monitor at any time
            <br />
            Retained 7 years, tamper-evident
          </>
        }
      />

      <div className="mt-[18px] grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-6">
        <div className="border border-white/[.14]">
          <div
            className="grid gap-3 rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[8.5px] tracking-[.11em] text-ink/50"
            style={{ gridTemplateColumns: LOG_GRID }}
          >
            <span>TIME</span>
            <span>ACTOR &amp; ACTION</span>
            <span className="text-right">RESULT</span>
          </div>

          {log.map((entry) => (
            <div
              key={entry.time}
              className="grid items-center gap-3 rounded-[14px] border-t border-white/10 bg-white/[.03] px-[13px] py-[11px]"
              style={{ gridTemplateColumns: LOG_GRID }}
            >
              <span className="text-[10px] text-ink/55">{entry.time}</span>
              <div>
                <div className="text-xs">{entry.action}</div>
                <div className="mt-[3px] text-[9px] text-ink/45">
                  {entry.user} · {entry.scope}
                </div>
              </div>
              <div className="text-right">
                <span className={cx("px-[7px] py-0.5 text-[9.5px]", RESULT_TONE[entry.kind])}>
                  {entry.result}
                </span>
              </div>
            </div>
          ))}

          <div className="rounded-[14px] border-t border-white/10 bg-white/[.035] px-[13px] py-3 text-[11px] leading-[1.6] text-pretty text-ink/[.62]">
            {refusalNote}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[14px] border border-white/[.14] bg-white/[.035] p-3.5">
            <div className="mb-3 text-[9px] tracking-[.14em] text-ink/45">RETENTION TIMERS</div>
            {retention.map((timer) => (
              <div key={timer.label} className="mb-2.5">
                <div className="mb-1 flex justify-between text-[11.5px]">
                  <span>{timer.label}</span>
                  <span className="text-[10px] text-ink/55">{timer.left}</span>
                </div>
                <div className="h-1.5 bg-white/[.08]">
                  <div
                    className={cx("h-full", timer.pct > PURGE_SOON ? "bg-accent" : "bg-ink/70")}
                    style={{ width: `${timer.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-2 text-[10.5px] leading-[1.5] text-ink/60">{retentionNote}</div>
          </div>

          <div className="border border-white/[.14] bg-white/[.03]">
            <div className="border-b border-white/[.12] px-[13px] py-3 text-[9px] tracking-[.14em] text-ink/45">
              INDEPENDENT MONITOR — FINDINGS
            </div>
            {monitorNotes.map((note) => (
              <div key={note.date} className="border-b border-white/[.08] px-[13px] py-[11px]">
                <div className="text-[9.5px] text-accent-soft">{note.date}</div>
                <div className="mt-1 text-[11.5px] leading-[1.55] text-pretty text-ink/75">
                  {note.text}
                </div>
              </div>
            ))}
            <div className="px-[13px] py-[11px] text-[9px] leading-[1.6] text-ink/50">
              {monitorFooter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
