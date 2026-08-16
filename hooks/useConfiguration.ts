"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Industry and geography scope, watchlist, mutes. */
export function useInterestProfile() {
  return useResource(() => source.getInterestProfile());
}

/** Sensitivity, relevance threshold with an impact preview, conditional rules. */
export function useSignalSettings() {
  return useResource(() => source.getSignalSettings());
}

/** Summary length and jargon level, view modules, dashboards. */
export function usePresentation() {
  return useResource(() => source.getPresentation());
}

/** Source-class weights, muted services and intake limits. */
export function useSources() {
  return useResource(() => source.getSources());
}

/** Team defaults, export, report templates and branding. */
export function useTeamSettings() {
  return useResource(() => source.getTeamSettings());
}

/** Guards, the signature path and the audit log. */
export function useGuards() {
  return useResource(() => source.getGuards());
}
