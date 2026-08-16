"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Connector registry, transcripts and intake limits. */
export function useIntake() {
  return useResource(() => source.getIntake());
}

/** Pipeline stages, model cascade, entity graph and provenance. */
export function useProcessing() {
  return useResource(() => source.getProcessing());
}

/** Dead sources, lag, incidents and the change log. */
export function useHealth() {
  return useResource(() => source.getHealth());
}
