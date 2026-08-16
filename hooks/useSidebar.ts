"use client";

import { useCallback, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

/** Breakpoint below which the sidebar becomes a drawer — from `shellVals()`. */
const MOBILE_QUERY = "(max-width: 899px)";

export interface SidebarState {
  isMobile: boolean;
  /** Sidebar collapsed to an icon rail (desktop only). */
  isMini: boolean;
  /** Drawer open (mobile only). */
  isOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  /** Closes the drawer on mobile, toggles the collapse on desktop. */
  toggle: () => void;
  toggleTitle: string;
}

export function useSidebar(): SidebarState {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Crossing the breakpoint always closes the drawer — the behaviour of the
  // prototypes' `componentDidMount`. Adjusted during render rather than in an
  // effect, to avoid an extra pass with stale state.
  const [lastBreakpoint, setLastBreakpoint] = useState(isMobile);
  if (lastBreakpoint !== isMobile) {
    setLastBreakpoint(isMobile);
    setOpen(false);
  }

  const openNav = useCallback(() => setOpen(true), []);
  const closeNav = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => {
    if (isMobile) setOpen(false);
    else setCollapsed((value) => !value);
  }, [isMobile]);

  const isMini = !isMobile && collapsed;

  return {
    isMobile,
    isMini,
    isOpen,
    openNav,
    closeNav,
    toggle,
    toggleTitle: isMobile ? "Zamknij" : isMini ? "Rozwiń panel" : "Zwiń panel",
  };
}
