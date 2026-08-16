"use client";

import { useGovSettings } from "@/hooks/useGov";

export default function GovProfilePage() {
  const { data } = useGovSettings();
  if (!data) return null;

  const { initials, name, meta, fields, clearanceNote } = data.profile;

  return (
    <div className="border border-white/[.14] bg-white/[.035]">
      <div className="flex items-center gap-3.5 border-b border-white/[.12] p-[15px]">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/[.05] text-[17px] font-semibold text-ink">
          {initials}
        </div>
        <div>
          <div className="text-xl font-bold">{name}</div>
          <div className="mt-[3px] text-[10px] text-ink/55">{meta}</div>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          className="cursor-pointer rounded-[10px] border border-white/25 px-3 py-[7px] text-[9.5px] tracking-[.07em] hover:bg-white/[.04]"
        >
          EDIT
        </button>
      </div>

      {fields.map((field) => (
        <div
          key={field.label}
          className="grid grid-cols-[190px_minmax(0,1fr)] items-baseline gap-3.5 border-b border-white/[.08] px-[15px] py-[11px]"
        >
          <span className="text-[9px] tracking-[.12em] text-ink/45">{field.label}</span>
          <span className="text-[12.5px] text-ink/80">{field.value}</span>
        </div>
      ))}

      <div className="px-[15px] py-3 text-[11px] leading-[1.6] text-pretty text-ink/60">
        {clearanceNote}
      </div>
    </div>
  );
}
