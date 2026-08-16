"use client";

import { useGovSettings } from "@/hooks/useGov";
import { cx } from "@/lib/cn";

const NOTIF_GRID = "minmax(0,1fr) 74px 74px 74px";

function Cell({ isOn }: { isOn: boolean }) {
  return (
    <span className={cx("text-center text-xs", isOn ? "text-emerald-soft" : "text-ink/[.28]")}>
      {isOn ? "●" : "○"}
    </span>
  );
}

export default function GovNotificationsPage() {
  const { data } = useGovSettings();
  if (!data) return null;

  const { rows, quietHours } = data.notifications;

  return (
    <div className="border border-white/[.14]">
      <div
        className="grid gap-2.5 rounded-[14px] bg-white/[.05] px-[15px] py-2.5 text-[8.5px] tracking-[.11em] text-ink/50"
        style={{ gridTemplateColumns: NOTIF_GRID }}
      >
        <span>EVENT</span>
        <span className="text-center">EMAIL</span>
        <span className="text-center">PUSH</span>
        <span className="text-center">SMS</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.event}
          className="grid items-center gap-2.5 rounded-[14px] border-t border-white/10 bg-white/[.03] px-[15px] py-[11px]"
          style={{ gridTemplateColumns: NOTIF_GRID }}
        >
          <span className="text-[12.5px]">{row.event}</span>
          <Cell isOn={row.email} />
          <Cell isOn={row.push} />
          <Cell isOn={row.sms} />
        </div>
      ))}

      <div className="grid grid-cols-[190px_minmax(0,1fr)] gap-3.5 rounded-[14px] border-t border-white/10 bg-white/[.035] px-[15px] py-3">
        <span className="text-[9px] tracking-[.12em] text-ink/45">QUIET HOURS</span>
        <span className="text-[12.5px] text-ink/80">{quietHours}</span>
      </div>
    </div>
  );
}
