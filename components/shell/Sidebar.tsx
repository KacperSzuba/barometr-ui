"use client";

import { Activity, LifeBuoy, LogOut, PanelLeft, Settings } from "@/components/icons";
import { NAV_LAYERS, NAV_SYSTEM, SECTIONS, type SectionId } from "@/lib/sections";
import type { SidebarState } from "@/hooks/useSidebar";
import { cx } from "@/lib/cn";
import { LiveBadge } from "./LiveBadge";
import { SidebarNavLink, SidebarSectionLabel } from "./SidebarNav";

export const SIDEBAR_WIDTH = 264;
export const SIDEBAR_WIDTH_MINI = 76;

interface SidebarProps {
  active: SectionId;
  sidebar: SidebarState;
}

export function Sidebar({ active, sidebar }: SidebarProps) {
  const { isMobile, isMini, isOpen, closeNav, toggle, toggleTitle } = sidebar;
  const section = SECTIONS[active];

  return (
    <aside
      style={{
        width: isMini ? SIDEBAR_WIDTH_MINI : SIDEBAR_WIDTH,
        transition: "width .22s ease, transform .26s ease",
        transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)",
        boxShadow: isMobile && isOpen ? "0 0 60px rgba(0,0,0,.7)" : "none",
      }}
      className="fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-white/[.06] bg-rail"
    >
      <div
        className={cx(
          "flex items-center",
          isMini ? "flex-col gap-2.5 px-3.5 py-5" : "gap-3 px-5 py-5",
        )}
      >
        <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(140deg,#8B72FF,#5B3CE0)] shadow-[0_8px_24px_-8px_rgba(124,92,255,.9)]">
          <Activity size={20} strokeWidth={2.2} stroke="#fff" />
        </div>

        {!isMini && (
          <div className="min-w-0">
            <div className="text-base leading-[1.1] font-extrabold tracking-[-.02em]">Barometr</div>
            <div className="truncate text-[11px] leading-[1.3] font-medium text-ink/[.42]">
              {section.subtitle}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          title={toggleTitle}
          className={cx(
            "flex rounded-[9px] p-[7px] text-ink/45 transition-all duration-[180ms] hover:bg-white/[.09] hover:text-ink",
            isMini ? "mx-auto" : "ml-auto",
          )}
        >
          <PanelLeft size={16} strokeWidth={2} />
        </button>
      </div>

      <LiveBadge section={section} isMini={isMini} />

      <nav className="flex-1 overflow-x-hidden overflow-y-auto px-3">
        <SidebarSectionLabel isMini={isMini}>WARSTWY</SidebarSectionLabel>
        <div className="flex flex-col gap-1">
          {NAV_LAYERS.map((id) => (
            <SidebarNavLink
              key={id}
              href={SECTIONS[id].href}
              label={SECTIONS[id].label}
              icon={SECTIONS[id].icon}
              isActive={id === active}
              isMini={isMini}
              onNavigate={closeNav}
            />
          ))}
        </div>

        <SidebarSectionLabel isMini={isMini} spaced>
          SYSTEM
        </SidebarSectionLabel>
        <div className="flex flex-col gap-1">
          {NAV_SYSTEM.map((id) => (
            <SidebarNavLink
              key={id}
              href={SECTIONS[id].href}
              label={SECTIONS[id].label}
              icon={SECTIONS[id].icon}
              isActive={id === active}
              isMini={isMini}
              onNavigate={closeNav}
            />
          ))}
        </div>
      </nav>

      <div className="mt-4 border-t border-white/[.06] p-3">
        <div className="mb-2 flex flex-col gap-1">
          <SidebarNavLink
            href="/konfiguracja"
            label="Ustawienia"
            icon={Settings}
            isMini={isMini}
            onNavigate={closeNav}
          />
          <SidebarNavLink
            href="/konto"
            label="Pomoc i support"
            icon={LifeBuoy}
            isMini={isMini}
            onNavigate={closeNav}
          />
        </div>

        <div
          className={cx(
            "flex items-center gap-3 overflow-hidden rounded-xl border border-white/[.06] bg-white/[.035]",
            isMini ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
          )}
        >
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-[linear-gradient(140deg,#8B72FF,#5B3CE0)] text-[12.5px] font-extrabold text-white">
            MK
          </div>

          {!isMini && (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-semibold">Marta Kowalska</div>
                <div className="truncate text-[11px] text-ink/40">Plan Pro · analityk</div>
              </div>
              <button
                type="button"
                title="Wyloguj"
                className="flex rounded-lg p-1.5 text-ink/45 transition-all duration-[180ms] hover:bg-white/[.07] hover:text-rose-soft"
              >
                <LogOut size={16} strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
