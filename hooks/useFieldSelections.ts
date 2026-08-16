"use client";

import { useCallback, useState } from "react";
import type { RuleField } from "@/lib/data/types";

/**
 * User selections in settings rows. Stores overrides only — the default stays in
 * the data, so the hook works before the data arrives and never needs to sync
 * state with the source.
 */
export function useFieldSelections() {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const select = useCallback(
    (label: string, value: string) => setOverrides((current) => ({ ...current, [label]: value })),
    [],
  );

  const valueOf = useCallback(
    (field: RuleField) => overrides[field.label] ?? field.selected,
    [overrides],
  );

  return { valueOf, select };
}
