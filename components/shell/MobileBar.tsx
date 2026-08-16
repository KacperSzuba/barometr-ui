"use client";

import { Menu } from "@/components/icons";

/** Hamburger bar shown instead of the sidebar below 900 px. */
export function MobileBar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[.06] bg-canvas/[.86] px-[18px] py-3 backdrop-blur-[18px]">
      <button
        type="button"
        onClick={onOpen}
        title="Otwórz nawigację"
        aria-label="Otwórz nawigację"
        className="flex rounded-xl border border-white/[.08] bg-white/[.05] p-[9px] text-ink"
      >
        <Menu size={18} strokeWidth={2.2} />
      </button>
      <div className="text-[15px] font-extrabold tracking-[-.02em]">Barometr</div>
      <div className="flex-1" />
      <span className="h-[7px] w-[7px] animate-glow rounded-full bg-emerald shadow-[0_0_12px_#22D3A5]" />
    </div>
  );
}
