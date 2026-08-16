"use client";

import { useSessions } from "@/hooks/useLocal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { DataRow, DataTable } from "@/components/ui/DataTable";
import { Bar } from "@/components/ui/Bar";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

const COUNCIL_GRID = "minmax(180px,1.3fr) 130px 110px 110px 110px minmax(180px,1.2fr)";

/** Below this threshold a councillor's attendance is highlighted. */
const ATTENDANCE_ALERT = 85;

export default function SessionsPage() {
  const { data } = useSessions();
  if (!data) return null;

  const { transcript, speakers, upcoming, columns, councillors } = data;
  const longestSpeech = Math.max(...speakers.map((speaker) => speaker.minutes));

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[32px]"
        kicker="TRANSKRYPCJA SESJI · GLIWICE · LXII SESJA, 28 VII 2026"
        title="Kto co powiedział i w której minucie"
        aside={
          <>
            3 h 42 m · 11 mówców zidentyfikowanych
            <br />
            pewność transkrypcji: 0,94
          </>
        }
      />

      <div className="mb-[26px] grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-6">
        <div>
          <div className="mb-3 flex gap-px">
            <div className="flex-1 rounded-[14px] border border-white/[.15] bg-white/[.035] px-[11px] py-[9px] text-[11px] text-ink/75">
              „opłata za odpady” — 6 trafień w tej sesji
            </div>
            <button
              type="button"
              className="cursor-pointer rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[10px] tracking-[.08em] text-ink"
            >
              SZUKAJ W TRANSKRYPCIE
            </button>
          </div>

          <div className="border border-white/[.13] bg-white/[.03]">
            {transcript.map((line) => (
              <div
                key={line.time}
                className={cx(
                  "flex gap-2.5 border-b border-ink/[.07] px-[13px] py-[11px]",
                  line.isHit && "bg-white/[.035] shadow-[inset_3px_0_0_rgba(0,0,0,.75)]",
                )}
              >
                <div className="w-[62px] flex-none cursor-pointer pt-0.5 text-[9.5px] text-accent-soft">
                  {line.time}
                </div>
                <div className="min-w-0">
                  <div className="mb-[3px] flex items-center gap-2">
                    <span className="text-[11.5px] font-semibold">{line.who}</span>
                    <span className="text-[9px] text-ink/45">{line.role}</span>
                  </div>
                  <div className="text-[13.5px] leading-[1.55] text-pretty text-ink/85">
                    {line.text}
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-[14px] bg-white/[.05] px-[13px] py-2.5 text-[9.5px] leading-[1.6] text-ink/50">
              Fragmenty oznaczone kolorem to trafienia wyszukiwania. Kliknięcie w znacznik czasu
              otwiera nagranie od tej sekundy.
            </div>
          </div>
        </div>

        <div>
          <SectionRule title="Indeks mówców" aside="CZAS ANTENOWY" />
          <HairlineList>
            {speakers.map((speaker) => (
              <HairlineItem
                key={speaker.name}
                className="grid grid-cols-[minmax(0,1fr)_96px_52px] items-center gap-2.5 px-[13px] py-[9px]"
              >
                <div className="min-w-0">
                  <div className="text-[11.5px]">{speaker.name}</div>
                  <div className="mt-0.5 text-[9px] text-ink/45">{speaker.role}</div>
                </div>
                <Bar value={Math.round((speaker.minutes / longestSpeech) * 100)} height={6} />
                <div className="text-right text-[10px] text-ink/60">{speaker.time}</div>
              </HairlineItem>
            ))}
          </HairlineList>

          <div className="mt-3 rounded-[14px] bg-white/[.05] px-3.5 py-3 text-ink">
            <div className="mb-2 text-[9px] tracking-[.13em] text-ink/50">
              NAJBLIŻSZE POSIEDZENIA
            </div>
            <div className="flex flex-col gap-[7px]">
              {upcoming.map((entry) => (
                <div key={entry.when} className="flex items-baseline gap-2.5">
                  <span className="w-[62px] flex-none text-[10px] text-amber">{entry.when}</span>
                  <span className="min-w-0 flex-1 text-[11.5px]">{entry.what}</span>
                </div>
              ))}
            </div>
            <div className="mt-[11px] text-[9px] text-ink/50">
              SUBSKRYBUJ ICS · POWIADOMIENIE 24 H PRZED
            </div>
          </div>
        </div>
      </div>

      <SectionRule title="Rejestr głosowań radnych" aside="KADENCJA 2024–2029 · 25 RADNYCH" />
      <DataTable columns={columns} grid={COUNCIL_GRID} minWidth={980}>
        {councillors.map((councillor) => (
          <DataRow key={councillor.name} grid={COUNCIL_GRID} align="center">
            <div className="min-w-0 px-3 py-2.5 text-xs">{councillor.name}</div>
            <div className="px-3 py-2.5 text-[11.5px] text-ink/70">{councillor.club}</div>
            <div className="px-3 py-2.5">
              <div className="mb-1 text-[11px]">{councillor.attendance}</div>
              <Bar
                value={councillor.attendanceValue}
                tone={councillor.attendanceValue < ATTENDANCE_ALERT ? "accent" : "neutral"}
              />
            </div>
            <div className="px-3 py-2.5 text-[11px] text-ink/70">{councillor.forAgainst}</div>
            <div className="px-3 py-2.5 text-[11px]">{councillor.interpellations}</div>
            <div className="px-3 py-2.5 text-[11px] leading-[1.4] text-ink/65">
              {councillor.lastVote}
            </div>
          </DataRow>
        ))}
      </DataTable>
    </div>
  );
}
