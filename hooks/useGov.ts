"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Product principles, pipeline, roles and guards of the institutional console. */
export function useConcept() {
  return useResource(() => source.getConcept());
}

/** Morning briefing: KPIs, stories, cartogram and constituent inbox. */
export function useBriefing() {
  return useResource(() => source.getBriefing());
}

/** Mood cartogram, topic and source filters, voivodeship detail. */
export function useRegionalMap() {
  return useResource(() => source.getRegionalMap());
}

/** A single story: spread, outlet framing, verification ledger. */
export function useStoryTracker() {
  return useResource(() => source.getStoryTracker());
}

/** Poll aggregate, house effects and the history of the average. */
export function usePolls() {
  return useResource(() => source.getPolls());
}

/** Outlet comparison: tone, framing, ownership and correction rate. */
export function useCoverage() {
  return useResource(() => source.getCoverage());
}

/** Crisis mode: propagation of a false claim and the response checklist. */
export function useCrisisView() {
  return useResource(() => source.getCrisisView());
}

/** Constituent inbox: contact clusters gated at k ≥ 50. */
export function useConstituentInbox() {
  return useResource(() => source.getConstituentInbox());
}

/** Opinion per bill: raw vs briefed, misconceptions and objections. */
export function useLegislativePulse() {
  return useResource(() => source.getLegislativePulse());
}

/** Deliberation desk: qualitative themes, sessions and reach against census. */
export function useDeliberation() {
  return useResource(() => source.getDeliberation());
}

/** Claim ledger including the office's own corrections. */
export function useVerificationDesk() {
  return useResource(() => source.getVerificationDesk());
}

/** Briefing pack builder with per-audience redaction rules. */
export function usePackBuilder() {
  return useResource(() => source.getPackBuilder());
}

/** Audit log, retention timers and the independent monitor's findings. */
export function useAuditTrail() {
  return useResource(() => source.getAuditTrail());
}

/** The console's public mirror — the same figures, no login. */
export function usePublicMirror() {
  return useResource(() => source.getPublicMirror());
}

/** Companion app content — three cards and a tab bar. */
export function useMobileCompanion() {
  return useResource(() => source.getMobileCompanion());
}

/** Account settings in the Gov console — six tabs share one resource. */
export function useGovSettings() {
  return useResource(() => source.getGovSettings());
}
