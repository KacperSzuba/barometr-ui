/**
 * Colour scales of the Gov console, transcribed from the prototype's
 * `moodColor()` and `spark()`. The `oklch` values are computed from the mood
 * index, which is why they live in code rather than in tokens — they are a
 * function of the data, not a design constant.
 */

/** Span over which the mood index reaches full saturation. */
const MOOD_SPAN = 22;
/** The index's neutral line. */
const MOOD_NEUTRAL = 50;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** Tile colour: crimson below neutral, green above. */
export function moodColor(value: number): string {
  if (value < MOOD_NEUTRAL) {
    const t = clamp01((MOOD_NEUTRAL - value) / MOOD_SPAN);
    return `oklch(${0.9 - 0.42 * t} ${0.02 + 0.13 * t} 22)`;
  }

  const t = clamp01((value - MOOD_NEUTRAL) / MOOD_SPAN);
  return `oklch(${0.9 - 0.38 * t} ${0.02 + 0.1 * t} 158)`;
}

/** Tile text — darker where the background is most saturated. */
export const moodText = (value: number): string =>
  value < 39 || value > 61 ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.06)";

/** Minimum sparkline bar height, as a percentage. */
export const SPARK_MIN_HEIGHT = 8;
