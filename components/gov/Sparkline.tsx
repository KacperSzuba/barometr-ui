import { SPARK_MIN_HEIGHT } from "@/lib/gov-scale";

/**
 * Sparkline of rectangular bars — the last one in the series colour, the rest
 * dimmed. Mirrors the prototype's `spark()` helper.
 */
export function Sparkline({
  values,
  color,
  height = 22,
}: {
  values: number[];
  /** Colour of the last bar. */
  color: string;
  height?: number;
}) {
  const max = Math.max(...values);

  return (
    <div className="flex items-end gap-0.5" style={{ height }}>
      {values.map((value, index) => (
        <div
          key={index}
          className="flex-1"
          style={{
            height: `${Math.max(SPARK_MIN_HEIGHT, (value / max) * 100)}%`,
            background: index === values.length - 1 ? color : "rgba(231,234,242,.18)",
          }}
        />
      ))}
    </div>
  );
}
