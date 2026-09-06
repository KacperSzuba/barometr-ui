"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/**
 * One profile's watchlist and exclusions.
 *
 * The name doubles as the read key, so picking another profile in the switcher re-reads
 * rather than relabelling what is already on screen.
 */
export function useInterestProfile(profile?: string) {
  return useResource(() => source.getInterestProfile(profile), profile);
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
