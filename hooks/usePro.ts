"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Bills matched to the profile, the quarter's calendar and the stakeholder map. */
export function useImpact() {
  return useResource(() => source.getImpact());
}

/** Alert rules, the rule editor and notification channels. */
export function useAlerts() {
  return useResource(() => source.getAlerts());
}

/** Bill diff, framing comparison, brief and saved searches. */
export function useAnalysis() {
  return useResource(() => source.getAnalysis());
}

/** Tenders, team collaboration, reports and integrations. */
export function useMarket() {
  return useResource(() => source.getMarket());
}
