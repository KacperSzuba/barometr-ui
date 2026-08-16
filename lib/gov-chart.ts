/**
 * Geometry for the polling line chart.
 *
 * Deliberately built without a charting library. The prototype requires a
 * specific DOM: a bare `<svg viewBox="0 0 760 210">` with four `polyline`s,
 * circles at the series ends, and axis labels as positioned `<span>`s *outside*
 * the SVG. Recharts and visx render their own axes, grid and margins — matching
 * them pixel for pixel would take more code than this transcription, and would
 * add a dependency used on a single screen. Reproducing the scale is a dozen
 * lines of pure functions, so they live here: separate from the markup and
 * testable on their own.
 *
 * A library would earn its place given tooltips, zoom, brushing, or axes that
 * pick their own ticks — none of which this chart has.
 */

export const CHART_WIDTH = 760;
export const CHART_HEIGHT = 210;
/** Inner padding so the line and end circle are not clipped at the edge. */
const PAD = 6;
/** Domain headroom above and below the extreme values of the series. */
const DOMAIN_MARGIN = 2;
/** Grid line spacing, in percentage points. */
const TICK_STEP = 5;
/** Grid offset from the left edge — room for the labels. */
export const GRID_LEFT = 34;

export interface SeriesInput {
  name: string;
  color: string;
  values: number[];
}

export interface PlottedSeries {
  name: string;
  color: string;
  /** The `points` attribute for `<polyline>`. */
  points: string;
  /** Coordinates of the circle on the last point. */
  cx: string;
  cy: string;
  value: string;
  delta: string;
  /** Direction of the last change; `flat` when it did not move. */
  direction: "up" | "down" | "flat";
}

export interface Tick {
  label: string;
  /** Position in SVG coordinates. */
  y: string;
  /** The same position as a percentage of height — for the HTML label. */
  topPercent: string;
}

export interface Chart {
  series: PlottedSeries[];
  ticks: Tick[];
}

/** Projects the chart onto SVG coordinates and axis label positions. */
export function buildChart(series: SeriesInput[]): Chart {
  const all = series.flatMap((one) => one.values);
  const low = Math.floor(Math.min(...all) - DOMAIN_MARGIN);
  const high = Math.ceil(Math.max(...all) + DOMAIN_MARGIN);
  const count = series[0]?.values.length ?? 0;

  const toX = (index: number) => PAD + (index * (CHART_WIDTH - PAD * 2)) / (count - 1);
  const toY = (value: number) => PAD + ((high - value) / (high - low)) * (CHART_HEIGHT - PAD * 2);

  const plotted = series.map((one) => {
    const last = one.values[one.values.length - 1];
    const previous = one.values[one.values.length - 2];
    const change = Number((last - previous).toFixed(1));

    return {
      name: one.name,
      color: one.color,
      points: one.values
        .map((value, index) => `${toX(index).toFixed(1)},${toY(value).toFixed(1)}`)
        .join(" "),
      cx: toX(count - 1).toFixed(1),
      cy: toY(last).toFixed(1),
      value: last.toFixed(1),
      delta: `${change > 0 ? "+" : ""}${change.toFixed(1)}`,
      direction: change < 0 ? ("down" as const) : change > 0 ? ("up" as const) : ("flat" as const),
    };
  });

  const ticks: Tick[] = [];
  for (let value = Math.ceil(low / TICK_STEP) * TICK_STEP; value <= high; value += TICK_STEP) {
    const y = toY(value);
    ticks.push({
      label: `${value}%`,
      y: y.toFixed(1),
      topPercent: ((y / CHART_HEIGHT) * 100).toFixed(2),
    });
  }

  return { series: plotted, ticks };
}
