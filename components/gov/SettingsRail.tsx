"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOV_SETTINGS_TABS } from "@/lib/gov";
import { cx } from "@/lib/cn";

/** Vertical list of settings tabs — the active one carries an indigo left edge. */
export function SettingsRail() {
  const pathname = usePathname();

  return (
    <div className="border border-white/[.14] bg-white/[.03]">
      {GOV_SETTINGS_TABS.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cx(
              "block border-l-[3px] px-[13px] py-[9px] text-[12.5px] text-ink hover:bg-white/[.04] hover:text-ink",
              isActive
                ? "border-accent/50 bg-white/[.06] font-semibold"
                : "border-transparent bg-transparent font-normal",
            )}
          >
            {tab.label}
          </Link>
        );
      })}

      <div className="border-t border-white/[.12] px-[13px] py-[11px] text-[9px] leading-[1.6] text-ink/45">
        Changes to clearance, seats or scope require a second signature and appear in the audit log.
      </div>
    </div>
  );
}
