"use client";

import { useEffect, useState } from "react";
import type { LiveCounter } from "@/lib/sections";

/**
 * Item counter ticking in the sidebar badge — a port of `pageDidMount()` from
 * the prototypes. It starts from a deterministic value (identical on server and
 * client); random increments only begin after mount.
 */
export function useLiveCounter(counter: LiveCounter | undefined): number | null {
  const [value, setValue] = useState(counter?.start ?? null);

  useEffect(() => {
    if (!counter) return;

    const { min, spread, intervalMs } = counter;
    const id = setInterval(
      () => setValue((n) => (n ?? counter.start) + min + Math.floor(Math.random() * spread)),
      intervalMs,
    );

    return () => clearInterval(id);
  }, [counter]);

  return value;
}
