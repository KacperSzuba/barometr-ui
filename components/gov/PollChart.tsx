import {
  CHART_HEIGHT,
  CHART_WIDTH,
  GRID_LEFT,
  buildChart,
  type SeriesInput,
} from "@/lib/gov-chart";
import { cx } from "@/lib/cn";

/**
 * Line chart of the polling average. Y-axis labels are positioned `<span>`s over
 * the SVG, exactly as in the prototype — that way they scale with the text
 * rather than with the viewBox.
 */
export function PollChart({ series, xLabels }: { series: SeriesInput[]; xLabels: string[] }) {
  const chart = buildChart(series);

  return (
    <>
      <div className="relative min-h-[180px]">
        {chart.ticks.map((tick) => (
          <span
            key={tick.label}
            className="absolute left-0 -translate-y-1/2 text-[9.5px] text-ink/45"
            style={{ top: `${tick.topPercent}%` }}
          >
            {tick.label}
          </span>
        ))}

        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Polling average by bloc over the selected range"
        >
          {chart.ticks.map((tick) => (
            <line
              key={tick.label}
              x1={GRID_LEFT}
              y1={tick.y}
              x2={CHART_WIDTH}
              y2={tick.y}
              stroke="rgba(23,24,26,.1)"
              strokeWidth="1"
            />
          ))}

          {chart.series.map((one) => (
            <polyline
              key={one.name}
              points={one.points}
              fill="none"
              stroke={one.color}
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {chart.series.map((one) => (
            <circle key={one.name} cx={one.cx} cy={one.cy} r="4" fill={one.color} />
          ))}
        </svg>
      </div>

      <div
        className="mt-0.5 flex justify-between text-[9px] text-ink/45"
        style={{ paddingLeft: GRID_LEFT }}
      >
        {xLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-[18px] border-t border-white/10 pt-[11px]">
        {chart.series.map((one) => (
          <div key={one.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 flex-none" style={{ background: one.color }} />
            <span className="text-[11.5px]">{one.name}</span>
            <span className="text-[13px]">{one.value}</span>
            <span
              className={cx(
                "text-[10.5px]",
                one.direction === "down"
                  ? "text-accent-soft"
                  : one.direction === "up"
                    ? "text-emerald-soft"
                    : "text-ink/40",
              )}
            >
              {one.delta}
            </span>
          </div>
        ))}
        <span className="ml-auto text-[9.5px] text-ink/45">
          Pooled average · house effects corrected · 14-day half-life
        </span>
      </div>
    </>
  );
}
