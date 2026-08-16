"use client";

import type { BillingCycle } from "@/lib/data/types";
import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Pricing for the selected billing cycle — prices depend on `cycle`. */
export function usePricing(cycle: BillingCycle) {
  return useResource(() => source.getPricing(cycle), cycle);
}
