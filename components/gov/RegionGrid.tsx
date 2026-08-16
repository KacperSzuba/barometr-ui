"use client";

import type { Region } from "@/lib/data/types";
import { moodColor, moodText } from "@/lib/gov-scale";

/**
 * Equal-area cartogram — 16 voivodeships on a 4×4 grid, colour derived from the
 * mood index. The `mini` variant is the briefing summary, `full` the map tiles.
 */
export function RegionGrid({
  regions,
  selected,
  onSelect,
  variant = "mini",
}: {
  regions: Region[];
  selected: string;
  onSelect: (abbr: string) => void;
  variant?: "mini" | "full";
}) {
  const isFull = variant === "full";

  return (
    <div
      className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[3px]"
      style={{ gridAutoRows: isFull ? "76px" : "34px" }}
    >
      {regions.map((region) => {
        const isSelected = region.abbr === selected;

        return (
          <button
            key={region.abbr}
            type="button"
            title={region.name}
            onClick={() => onSelect(region.abbr)}
            className={
              isFull
                ? "flex min-w-0 cursor-pointer flex-col justify-between gap-1 overflow-hidden px-2.5 py-[9px]"
                : "flex min-w-0 cursor-pointer items-center justify-center overflow-hidden text-[9.5px] tracking-[.04em]"
            }
            style={{
              background: moodColor(region.value),
              color: moodText(region.value),
              gridColumn: region.col,
              gridRow: region.row,
              outline: isSelected
                ? `${isFull ? "2.5px" : "2px"} solid rgba(255,255,255,.06)`
                : isFull
                  ? "1px solid rgba(23,24,26,.14)"
                  : "none",
              outlineOffset: isSelected
                ? isFull
                  ? "-2.5px"
                  : "-2px"
                : isFull
                  ? "-1px"
                  : undefined,
            }}
          >
            {isFull ? (
              <>
                <span className="text-[9.5px] tracking-[.04em]">{region.abbr}</span>
                <span className="text-[17px] font-medium tracking-[-.02em]">
                  {region.value.toFixed(1)}
                </span>
              </>
            ) : (
              region.abbr
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Mood scale legend — a gradient from negative to positive. */
export function MoodLegend() {
  return (
    <div className="mt-[9px] flex items-center gap-2 text-[9px] text-ink/50">
      <span>NEG</span>
      <div className="h-[7px] flex-1 bg-[linear-gradient(90deg,#7C5CFF,#c98d7a,rgba(255,255,255,.06),#8bb5a4,#1F9C7C)]" />
      <span>POS</span>
    </div>
  );
}
