import type { Tone } from "@/lib/data/types";

/**
 * The prototypes use four semantic tones at several intensities. Each map below
 * corresponds to one place in the design — the alpha values are transcribed 1:1,
 * because the differences between them are deliberate.
 */

/** Square console chip — `chip(kind)`. No border, no radius. */
export const CHIP_TONE: Record<Tone, string> = {
  emerald: "bg-emerald/[.16] text-emerald-soft",
  amber: "bg-amber/[.22] text-amber-soft",
  accent: "bg-accent/[.14] text-accent-soft",
  neutral: "bg-ink/[.07] text-ink/60",
};

/** Badge in the console tab bar — background .10, border .24. */
export const BADGE_TONE: Record<Tone, string> = {
  emerald: "border-emerald/[.24] bg-emerald/[.1] text-emerald-soft",
  accent: "border-accent/[.24] bg-accent/[.1] text-accent-soft",
  amber: "border-amber/[.24] bg-amber/[.1] text-amber-soft",
  neutral: "border-white/[.09] bg-white/[.05] text-ink/70",
};

/** The same badge on the landing page — softer emerald, stronger indigo. */
export const BADGE_TONE_MAP: Record<Tone, string> = {
  emerald: "border-emerald/20 bg-emerald/[.08] text-emerald-soft",
  accent: "border-accent/[.28] bg-accent/[.12] text-accent-soft",
  amber: "border-amber/20 bg-amber/[.08] text-amber-soft",
  neutral: "border-white/[.09] bg-white/[.05] text-ink/70",
};

/** Value badge in the trust centre — background .12, border .26. */
export const VALUE_TONE: Record<Tone, string> = {
  emerald: "border-emerald/[.26] bg-emerald/[.12] text-emerald-soft",
  amber: "border-amber/[.28] bg-amber/[.12] text-amber-soft",
  accent: "border-accent/[.26] bg-accent/[.12] text-accent-soft",
  neutral: "border-white/[.09] bg-white/[.05] text-ink/60",
};

/** Text colour only — used where the tone carries urgency rather than a fill. */
export const TEXT_TONE: Record<Tone, string> = {
  emerald: "text-emerald-soft",
  amber: "text-amber-soft",
  accent: "text-accent-soft",
  neutral: "text-ink/60",
};

/** Fill colour of a bar or meter. */
export const FILL_TONE: Record<Tone, string> = {
  emerald: "bg-emerald",
  amber: "bg-amber",
  accent: "bg-accent",
  neutral: "bg-ink/45",
};
