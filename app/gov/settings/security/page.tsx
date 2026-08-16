"use client";

import { useGovSettings } from "@/hooks/useGov";

export default function GovSecurityPage() {
  const { data } = useGovSettings();
  if (!data) return null;

  const { items, sessions } = data.security;

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="border border-white/[.14] bg-white/[.035]">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[190px_minmax(0,1fr)_96px] items-center gap-3.5 border-b border-white/[.08] px-[15px] py-[11px]"
          >
            <span className="text-[9px] tracking-[.12em] text-ink/45">{item.label}</span>
            <span className="text-[12.5px] text-ink/80">{item.value}</span>
            <span className="text-right text-[9px] tracking-[.09em] text-emerald-soft">
              {item.state}
            </span>
          </div>
        ))}
      </div>

      <div className="border border-white/[.14] bg-white/[.03]">
        <div className="border-b border-white/[.12] px-[15px] py-3 text-[9px] tracking-[.14em] text-ink/45">
          ACTIVE SESSIONS
        </div>

        {sessions.map((session) => (
          <div
            key={session.device}
            className="flex items-center gap-3.5 border-b border-white/[.08] px-[15px] py-[11px]"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-medium">{session.device}</div>
              <div className="mt-[3px] text-[9.5px] text-ink/50">{session.detail}</div>
            </div>
            <span className="text-[10px] text-ink/55">{session.when}</span>
            <button
              type="button"
              className="cursor-pointer text-[9.5px] tracking-[.07em] text-accent-soft hover:text-accent-link-hover"
            >
              REVOKE
            </button>
          </div>
        ))}

        <button
          type="button"
          className="block cursor-pointer px-[15px] py-[11px] text-[9.5px] tracking-[.07em] text-accent-soft hover:text-accent-link-hover"
        >
          SIGN OUT OF ALL DEVICES
        </button>
      </div>
    </div>
  );
}
