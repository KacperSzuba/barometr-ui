import type { Tone } from "@/lib/data/types";
import { FILL_TONE } from "./tones";
import { cx } from "@/lib/cn";

/** Horizontal progress bar on a dimmed track — the MP-card and budget pattern. */
export function Bar({
  value,
  tone = "neutral",
  height = 5,
}: {
  /** Fill, as a percentage. */
  value: number;
  tone?: Tone;
  height?: number;
}) {
  return (
    <div className="bg-white/[.08]" style={{ height }}>
      <div className={cx(FILL_TONE[tone])} style={{ height, width: `${value}%` }} />
    </div>
  );
}

/**
 * Forecast bar: track, uncertainty band and a vertical marker for the point
 * estimate.
 */
export function BandBar({
  low,
  high,
  point,
}: {
  low: number;
  high: number;
  /** Point estimate as a percentage, e.g. `82%`. */
  point: string;
}) {
  return (
    <div className="relative h-2 bg-white/[.07]">
      <div
        className="absolute inset-y-0 bg-accent/[.22]"
        style={{ left: `${low}%`, width: `${high - low}%` }}
      />
      <div className="absolute -top-0.5 -bottom-0.5 w-0.5 bg-accent" style={{ left: point }} />
    </div>
  );
}
