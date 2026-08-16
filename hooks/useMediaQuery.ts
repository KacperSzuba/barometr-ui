"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a media query. Returns `false` before hydration — like the prototypes,
 * which start from `isMobile: false` and correct it after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const sync = () => setMatches(list.matches);

    sync();
    list.addEventListener("change", sync);
    return () => list.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
