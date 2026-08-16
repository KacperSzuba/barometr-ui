"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GOV_AUDIT_SHORTCUT, GOV_USER, GOV_USER_MENU, type GovUserMenuEntry } from "@/lib/gov";
import { cx } from "@/lib/cn";

/**
 * Account dropdown for the Gov console — the only way into `/gov/settings`.
 * The prototype computes these entries but never renders them, so the trigger
 * is placed at the end of the guardrail badge row, where there is free space.
 */
export function GovUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /*
   * Navigating away is an implicit dismissal — including browser back/forward,
   * which fires no pointer event. Adjusting during render rather than in an
   * effect avoids a second render pass with a stale open panel.
   * https://react.dev/reference/react/useState#storing-information-from-previous-renders
   */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative ml-auto">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        /*
         * Height is pinned to the guardrail badges next to it (30.5 px); a taller
         * trigger would push every screen's content down by the difference.
         */
        className={cx(
          "flex h-[30.5px] cursor-pointer items-center gap-2 rounded-full border pr-3 pl-[4px] text-left transition-colors",
          isOpen ? "border-white/25 bg-white/[.08]" : "border-white/[.14] bg-white/[.04]",
        )}
      >
        <span className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-[linear-gradient(140deg,#8B72FF,#5B3CE0)] text-[9px] font-bold text-white">
          {GOV_USER.initials}
        </span>
        <span className="text-[11px] font-semibold whitespace-nowrap">{GOV_USER.name}</span>
        <span className={cx("text-[8px] text-ink/45 transition-transform", isOpen && "rotate-180")}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Account"
          className="absolute top-[calc(100%+8px)] right-0 z-40 w-[286px] overflow-hidden rounded-[14px] border border-white/[.16] bg-canvas shadow-[0_18px_44px_rgba(0,0,0,.75)]"
        >
          <div className="border-b border-white/[.12] px-3.5 py-3">
            <div className="text-[12.5px] font-semibold">{GOV_USER.name}</div>
            <div className="mt-[3px] text-[9.5px] text-ink/50">{GOV_USER.role}</div>
          </div>

          {GOV_USER_MENU.map((entry) => (
            <MenuLink key={entry.href} entry={entry} />
          ))}

          <div className="border-t border-white/[.12]">
            <MenuLink entry={GOV_AUDIT_SHORTCUT} />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({ entry }: { entry: GovUserMenuEntry }) {
  return (
    <Link
      role="menuitem"
      href={entry.href}
      className="block border-b border-white/[.07] px-3.5 py-2.5 text-ink last:border-b-0 hover:bg-white/[.05] hover:text-ink"
    >
      <div className="text-[11.5px] font-medium">{entry.label}</div>
      <div className="mt-0.5 text-[9.5px] text-ink/45">{entry.hint}</div>
    </Link>
  );
}
