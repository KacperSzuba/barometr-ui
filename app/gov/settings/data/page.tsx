"use client";

import { useGovSettings } from "@/hooks/useGov";

export default function GovDataPage() {
  const { data } = useGovSettings();
  if (!data) return null;

  const { items, scopeNote } = data.data;

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="border border-white/[.14] bg-white/[.035]">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[220px_minmax(0,1fr)] items-baseline gap-3.5 border-b border-white/[.08] px-[15px] py-3"
          >
            <span className="text-[9px] tracking-[.12em] text-ink/45">{item.label}</span>
            <span className="text-[12.5px] leading-[1.55] text-pretty text-ink/80">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-[9px]">
        <button
          type="button"
          className="cursor-pointer rounded-[14px] bg-white/[.05] px-[13px] py-[9px] text-[9.5px] tracking-[.08em] text-ink hover:bg-white/[.08]"
        >
          DOWNLOAD MY AUDIT TRAIL · CSV
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-[14px] border border-white/25 px-[13px] py-[9px] text-[9.5px] tracking-[.08em] hover:bg-white/[.06]"
        >
          REQUEST SCOPE CHANGE
        </button>
      </div>

      <div className="rounded-[14px] border border-accent/20 bg-accent/[.06] p-3.5 text-[11.5px] leading-[1.6] text-pretty text-ink/[.72]">
        {scopeNote}
      </div>
    </div>
  );
}
