"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Tab } from "@/lib/sections";
import { cx } from "@/lib/cn";

/** Section tabs as links — every tab owns a route. */
export function TabBar({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();

  if (tabs.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 rounded-[14px] border border-white/[.07] bg-white/[.04] p-1.5">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cx(
              "rounded-[10px] px-[18px] py-2.5 text-[13px] font-semibold whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-[linear-gradient(135deg,#8B72FF,#5B3CE0)] text-white shadow-[0_12px_26px_-14px_rgba(124,92,255,.95)]"
                : "text-ink/55",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
