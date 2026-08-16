"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Content of the "Mapa produktu" tab. */
export function useProductMap() {
  return useResource(() => source.getProductMap());
}
