"use client";

import type { ReactNode } from "react";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { useSidebar } from "@/hooks/useSidebar";
import { cx } from "@/lib/cn";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MINI, Sidebar } from "./Sidebar";
import { MobileBar } from "./MobileBar";
import { TabBar } from "./TabBar";
import { HeadBadges } from "./HeadBadges";

interface AppShellProps {
  section: SectionId;
  children: ReactNode;
}

/**
 * Application frame shared by every section: sidebar, background glows, tab bar
 * and badges. Mirrors `shellVals()` from the prototypes — the only thing that
 * differs between pages is the section id.
 */
export function AppShell({ section, children }: AppShellProps) {
  const sidebar = useSidebar();
  const { isMobile, isMini, isOpen, openNav, closeNav } = sidebar;
  const { tabs, badges, badgeScale } = SECTIONS[section];

  return (
    <div className="min-h-screen bg-canvas">
      {isMobile && isOpen && (
        <div
          onClick={closeNav}
          aria-hidden
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[4px]"
        />
      )}

      <Sidebar active={section} sidebar={sidebar} />

      <div
        style={{
          paddingLeft: isMobile ? 0 : isMini ? SIDEBAR_WIDTH_MINI : SIDEBAR_WIDTH,
          transition: "padding-left .22s ease",
        }}
        className="relative min-h-screen overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-[320px] -left-[100px] h-[900px] w-[900px] bg-[radial-gradient(circle,rgba(124,92,255,.16),rgba(124,92,255,0)_62%)]" />
        <div className="pointer-events-none absolute -top-[260px] -right-[220px] h-[820px] w-[820px] bg-[radial-gradient(circle,rgba(34,211,165,.1),rgba(34,211,165,0)_60%)]" />

        <div className="relative">
          {isMobile && <MobileBar onOpen={openNav} />}

          <div
            className={cx(
              "flex flex-wrap items-center gap-4 pt-[22px] pb-1",
              isMobile ? "px-[18px]" : "px-8",
            )}
          >
            <TabBar tabs={tabs} />
            <div className="flex-1" />
            <HeadBadges badges={badges} scale={badgeScale} />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
