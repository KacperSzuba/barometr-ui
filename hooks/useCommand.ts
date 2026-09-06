"use client";

import { useCallback, useState } from "react";

/**
 * Running one change, and living with the fact that it can fail.
 *
 * Three things every button on these screens needs and none of them had: something to
 * disable itself with while the request is out, somewhere for a refusal to be read, and
 * a re-read afterwards so the list the reader is looking at shows what they just did.
 *
 * The re-read goes through the screen's own resource rather than patching a row in
 * place. Guessing what the server did to a row is how a list drifts from the thing it
 * is a list of — and the read is one request the reader is already paying for.
 *
 * [pending] holds the key of the row being changed, not a boolean, so a table can
 * disable the one button that is working without freezing the other rows.
 */
export function useCommand(refetch: () => void) {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (key: string, command: () => Promise<void>) => {
      setPending(key);
      setError(null);

      try {
        await command();
        refetch();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : String(cause));
      } finally {
        setPending(null);
      }
    },
    [refetch],
  );

  return { run, pending, error };
}
