import type { Kpi } from "@/lib/data/types";
import { HairlineItem, HairlineList } from "./HairlineList";
import { TEXT_TONE } from "./tones";
import { cx } from "@/lib/cn";

/**
 * KPI strip under the page header — no top rule, because it butts against the
 * header line. Shared by the Local tier and the engine console.
 */
export function KpiStrip({
  kpis,
  liveValue,
}: {
  kpis: Kpi[];
  /** Value for the KPI flagged as `isLive`. */
  liveValue?: string;
}) {
  return (
    <HairlineList columns="repeat(auto-fit,minmax(170px,1fr))" className="mb-[22px] border-t-0">
      {kpis.map((kpi) => (
        <HairlineItem key={kpi.label} className="px-[15px] py-[13px]">
          <div className="mb-2 text-[9px] tracking-[.13em] text-ink/50">{kpi.label}</div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-medium tracking-[-.02em]">
              {kpi.isLive ? liveValue : kpi.value}
            </div>
            <div className={cx("text-[10.5px]", TEXT_TONE[kpi.tone])}>{kpi.delta}</div>
          </div>
          <div className="mt-[7px] text-[10.5px] leading-[1.35] text-ink/50">{kpi.note}</div>
        </HairlineItem>
      ))}
    </HairlineList>
  );
}
