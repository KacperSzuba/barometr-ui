"use client";

import { useGovSettings } from "@/hooks/useGov";
import { cx } from "@/lib/cn";

const TEAM_GRID = "minmax(0,1.3fr) minmax(0,1.2fr) 70px 130px";

export default function GovTeamPage() {
  const { data } = useGovSettings();
  if (!data) return null;

  const { members, inviteNote } = data.team;

  return (
    <div className="border border-white/[.14]">
      <div
        className="grid gap-3 rounded-[14px] bg-white/[.05] px-[13px] py-2.5 text-[8.5px] tracking-[.11em] text-ink/50"
        style={{ gridTemplateColumns: TEAM_GRID }}
      >
        <span>MEMBER</span>
        <span>ROLE</span>
        <span className="text-center">CLEAR.</span>
        <span className="text-right">LAST ACTIVE</span>
      </div>

      {members.map((member) => (
        <div
          key={member.name}
          className={cx(
            "grid items-center gap-3 border-t border-ink/10 px-[13px] py-2.5",
            member.isPending ? "bg-amber/[.08]" : "bg-white/[.03]",
          )}
          style={{ gridTemplateColumns: TEAM_GRID }}
        >
          <span className="text-[12.5px] font-medium">{member.name}</span>
          <span className="text-[11.5px] text-ink/70">{member.role}</span>
          <span className="bg-ink/[.07] py-0.5 text-center text-[10px] text-ink/65">
            {member.clearance}
          </span>
          <span className="text-right text-[10px] text-ink/55">{member.last}</span>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-[9px] rounded-[14px] border-t border-white/10 bg-white/[.035] px-[13px] py-3">
        <button
          type="button"
          className="cursor-pointer rounded-[10px] bg-white/[.05] px-3 py-2 text-[9.5px] tracking-[.08em] text-ink hover:bg-white/[.08]"
        >
          INVITE TO A SEAT
        </button>
        <span className="text-[11px] text-pretty text-ink/[.62]">{inviteNote}</span>
      </div>
    </div>
  );
}
