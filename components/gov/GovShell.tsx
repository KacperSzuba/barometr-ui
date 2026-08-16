"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOV_BADGES, GOV_GUARANTEES, GOV_NAV, govHref } from "@/lib/gov";
import { BADGE_TONE } from "@/components/ui/tones";
import { cx } from "@/lib/cn";
import { GovUserMenu } from "./GovUserMenu";

/**
 * Inner frame of the Gov console: its own 232 px navigation on the left, the
 * governance card at the bottom, and a scrollable content area topped with the
 * guardrail badges.
 */
export function GovShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen min-h-0">
      <div className="flex w-[232px] flex-none flex-col rounded-[14px] border-r border-white/[.12] bg-white/[.05] py-3.5">
        <nav className="min-h-0 flex-1 overflow-y-auto">
          {GOV_NAV.map((group) => (
            <div key={group.label}>
              <div className="px-3.5 pt-[9px] pb-[5px] text-[8.5px] tracking-[.16em] text-ink/[.38]">
                {group.label}
              </div>
              {group.items.map((item) => {
                const href = govHref(item.segment);
                const isActive = pathname === href;

                return (
                  <Link
                    key={item.segment}
                    href={href}
                    className={cx(
                      "flex items-center gap-[9px] py-1.5 text-xs leading-[1.3] hover:bg-white/[.055]",
                      isActive
                        ? "border-l-[3px] border-accent/[.38] bg-white/[.03] pr-3.5 pl-[11px] font-semibold text-ink"
                        : "border-l-[3px] border-transparent px-3.5 text-ink/[.72]",
                    )}
                  >
                    <span
                      className={cx(
                        "h-[5px] w-[5px] flex-none rotate-45",
                        isActive ? "bg-accent" : "bg-ink/25",
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cx(
                          "px-[5px] py-px text-[9px]",
                          item.badge === "!" ? "bg-[#d9534f] text-white" : "bg-ink/10 text-ink/60",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="mx-3 mb-2.5 rounded-[14px] border border-white/[.12] bg-white/[.03] px-[11px] py-2.5">
          <div className="mb-[7px] text-[8.5px] tracking-[.14em] text-ink/45">GOVERNANCE</div>
          <div className="flex flex-col gap-1.5 text-[10.5px] leading-[1.4] text-ink/[.68]">
            {GOV_GUARANTEES.map((line) => (
              <div key={line} className="flex gap-1.5">
                <span className="text-emerald">✓</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
          <div className="mt-[9px] border-t border-dashed border-white/[.16] pt-2 text-[9px] leading-[1.5] text-ink/[.42]">
            Last export: 27 Jul, 18:04
            <br />
            Reviewed by: Ethics Board
          </div>
        </div>

        <div className="px-3.5 text-[8.5px] leading-[1.5] text-ink/35">
          SYNTHETIC DEMO DATA
          <br />
          Not real polling or coverage
        </div>
      </div>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="flex flex-wrap items-center gap-2 px-[26px] pt-[18px]">
          {GOV_BADGES.map((badge) => (
            <span
              key={badge.label}
              className={cx(
                "inline-flex items-center gap-[7px] rounded-full border px-[13px] py-[7px] text-[11.5px] font-semibold",
                BADGE_TONE[badge.tone],
              )}
            >
              {badge.label}
            </span>
          ))}

          <GovUserMenu />
        </div>

        {children}
      </div>
    </div>
  );
}
