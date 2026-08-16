"use client";

import Link from "next/link";
import type { IconComponent } from "@/components/icons";
import { cx } from "@/lib/cn";

/** Icon stroke colours — hard-coded in the prototypes, not inherited from text. */
const ICON_IDLE = "rgba(231,234,242,.42)";
const ICON_ACTIVE = "#A99BFF";

interface SidebarNavLinkProps {
  href: string;
  label: string;
  icon: IconComponent;
  isActive?: boolean;
  isMini: boolean;
  onNavigate: () => void;
}

export function SidebarNavLink({
  href,
  label,
  icon: Icon,
  isActive = false,
  isMini,
  onNavigate,
}: SidebarNavLinkProps) {
  return (
    <Link
      href={href}
      title={label}
      onClick={onNavigate}
      className={cx(
        "flex items-center gap-3 overflow-hidden rounded-xl text-[13px] whitespace-nowrap transition-all duration-[180ms]",
        isMini ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
        isActive
          ? "bg-accent/[.16] font-semibold text-accent-strong shadow-[inset_0_0_0_1px_rgba(124,92,255,.25)]"
          : "font-medium text-ink/55 hover:bg-white/[.06] hover:text-ink",
      )}
    >
      <Icon
        size={17}
        strokeWidth={2}
        stroke={isActive ? ICON_ACTIVE : ICON_IDLE}
        className="flex-none"
      />
      {!isMini && <span className="min-w-0 overflow-hidden text-ellipsis">{label}</span>}
    </Link>
  );
}

interface SidebarSectionLabelProps {
  children: string;
  isMini: boolean;
  /** The second and later groups get extra space above. */
  spaced?: boolean;
}

/**
 * Navigation group header. When the sidebar collapses it turns into a thin rule —
 * exactly as `sectionStyle` / `sectionStyleTop` do in the prototypes.
 */
export function SidebarSectionLabel({ children, isMini, spaced }: SidebarSectionLabelProps) {
  if (isMini) {
    return (
      <div
        aria-hidden
        className={cx("mx-3 mb-2.5 h-px bg-white/[.07]", spaced ? "mt-[18px]" : "mt-0")}
      />
    );
  }

  return (
    <div
      className={cx(
        "px-3 pb-2 text-[10.5px] font-extrabold tracking-[.14em] text-ink/30",
        spaced ? "pt-6" : "pt-0",
      )}
    >
      {children}
    </div>
  );
}
