import type { GuardLayer } from "@/lib/data/types";

/**
 * The tier whose context the sources and guards are shown in.
 *
 * The prototype keeps a `layer` state with a Pro/Gov switch but never renders
 * the switch itself, so it stays on "Pro". Kept as a single constant so that
 * wiring up a real switch is a matter of replacing it with state.
 */
export const GUARD_LAYER: GuardLayer = "Pro";

/** How guards may be changed — depends on the tier. */
export const GUARD_MODE: Record<GuardLayer, string> = {
  Pro: "część wartości ustawia admin organizacji",
  Gov: "zmiana wyłącznie procedurą z drugim podpisem",
};

/** Who may change a guard — Gov requires a second-signature procedure. */
export const GUARD_AUTHORITY: Record<GuardLayer, { label: string; tone: "amber" | "accent" }> = {
  Pro: { label: "ADMIN ORGANIZACJI", tone: "amber" },
  Gov: { label: "PROCEDURA + 2 PODPISY", tone: "accent" },
};
