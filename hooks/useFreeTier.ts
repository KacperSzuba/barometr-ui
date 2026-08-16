"use client";

import { source } from "@/lib/data/source";
import { useResource } from "./useResource";

/** Daily digest, silence radar and subscription channels. */
export function useDailyDigest() {
  return useResource(() => source.getDailyDigest());
}

/** Legislative tracker, consultation calendar and forecasts. */
export function useLegislation() {
  return useResource(() => source.getLegislation());
}

/** MP cards, the promise register and council resolutions. */
export function usePeople() {
  return useResource(() => source.getPeople());
}

/** Exports, widgets and the corrections register. */
export function useOpenData() {
  return useResource(() => source.getOpenData());
}
