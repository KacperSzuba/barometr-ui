"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Content of the "Zgodność i zaufanie" tab. */
export function useTrustCenter() {
  return useResource(() => source.getTrustCenter());
}
