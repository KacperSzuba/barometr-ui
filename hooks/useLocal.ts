"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Public-register documents, municipality KPIs, zoning plans and the budget. */
export function useBip() {
  return useResource(() => source.getBip());
}

/** Session transcript, speaker index, calendar and councillor cards. */
export function useSessions() {
  return useResource(() => source.getSessions());
}

/** Spending per resident, municipality benchmark and tenders. */
export function useMoney() {
  return useResource(() => source.getMoney());
}

/** Geographic alerts, watched locations and the newsroom panel. */
export function useGeo() {
  return useResource(() => source.getGeo());
}
