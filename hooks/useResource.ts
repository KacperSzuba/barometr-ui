"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Awaitable } from "@/lib/data/types";

export interface Resource<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
  /** Re-reads from the source. */
  refetch: () => void;
}

/**
 * Read key — the scalar the result depends on (billing cycle, selected
 * municipality, …). When a resource depends on several values, the caller joins
 * them into a single string.
 */
export type ResourceKey = string | number | boolean | null | undefined;

interface Settled<T> {
  /** The promise this result belongs to — guards against a response race. */
  source: Promise<T>;
  data?: T;
  error?: Error;
}

const isPromise = <T>(value: Awaitable<T>): value is Promise<T> =>
  typeof (value as Promise<T>)?.then === "function";

const toError = (cause: unknown) => (cause instanceof Error ? cause : new Error(String(cause)));

/**
 * The common base of every data hook.
 *
 * `load` is called during render rather than in an effect, so a synchronous
 * source (the mock) yields data on the very first render and immediately after
 * `key` changes — no frame of stale content and no loading state. An
 * asynchronous source (HTTP) falls back to the usual `isLoading → data | error`
 * cycle.
 *
 * This is the single place to swap in SWR or React Query.
 */
export function useResource<T>(load: () => Awaitable<T>, key?: ResourceKey): Resource<T> {
  const [nonce, setNonce] = useState(0);
  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  // `load` is a closure recreated on every render; re-reading is driven solely
  // by `key` (plus a manual `refetch`).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => load(), [key, nonce]);

  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    if (!isPromise(result)) return;

    let active = true;
    result.then(
      (data) => active && setSettled({ source: result, data }),
      (cause) => active && setSettled({ source: result, error: toError(cause) }),
    );

    return () => {
      active = false;
    };
  }, [result]);

  if (!isPromise(result)) {
    return { data: result, isLoading: false, error: undefined, refetch };
  }

  const current = settled?.source === result ? settled : null;
  return {
    data: current?.data,
    error: current?.error,
    isLoading: current === null,
    refetch,
  };
}
