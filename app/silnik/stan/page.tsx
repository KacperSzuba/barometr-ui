"use client";

import { useHealth } from "@/hooks/useEngine";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

/** Pipeline lag thresholds in minutes — they drive the bar colour. */
const LATENCY_HIGH = 8;
const LATENCY_MEDIUM = 5;
/** Upper bound of the chart scale. */
const LATENCY_SCALE = 12;

const latencyColor = (minutes: number) =>
  minutes > LATENCY_HIGH
    ? "#7C5CFF"
    : minutes > LATENCY_MEDIUM
      ? "#F5A524"
      : "rgba(231,234,242,.28)";

export default function HealthPage() {
  const { data } = useHealth();
  if (!data) return null;

  const { dead, latency, retries, incidents, changelog } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="STAN POTOKU · STATUS PAGE"
        title="Co się psuje i jak szybko to widzimy"
        aside={
          <>
            dostępność 90 dni: 99,97%
            <br />
            otwartych incydentów: 1
          </>
        }
      />

      <div className="mb-[26px] grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Martwe i chore źródła" aside="7 WYMAGA DECYZJI" />
          <HairlineList>
            {dead.map((source) => (
              <HairlineItem
                key={source.name}
                className="grid grid-cols-[minmax(0,1fr)_110px_120px_110px] items-center gap-2.5 px-[13px] py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-[12.5px]">{source.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{source.reason}</div>
                </div>
                <div className="text-[10px] text-ink/60">{source.last}</div>
                <div>
                  <Chip tone={source.tone}>{source.state}</Chip>
                </div>
                <div className="cursor-pointer text-[9.5px] text-accent-soft">{source.action}</div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div>
            <SectionRule title="Opóźnienie potoku" aside="24 H · MINUTY" />
            <div className="rounded-[14px] border border-white/[.13] bg-white/[.03] px-[15px] py-3.5">
              <div className="flex h-24 items-end gap-[3px]">
                {latency.map((minutes, hour) => (
                  <div
                    key={hour}
                    title={`${minutes} min`}
                    className="flex-1"
                    style={{
                      height: `${Math.round((minutes / LATENCY_SCALE) * 100)}%`,
                      background: latencyColor(minutes),
                    }}
                  />
                ))}
              </div>
              <div className="mt-[7px] flex justify-between text-[9px] text-ink/45">
                <span>09:00 wcz.</span>
                <span>21:00</span>
                <span>03:00</span>
                <span>09:00</span>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] bg-white/[.05] px-[15px] py-3.5 text-ink">
            <div className="mb-[9px] text-[9px] tracking-[.14em] text-ink/50">KOLEJKA RETRY</div>
            <div className="flex flex-col gap-[7px]">
              {retries.map((retry) => (
                <div key={retry.what} className="flex items-center gap-2.5">
                  <span className="w-[52px] flex-none text-[10px] text-amber">{retry.count}</span>
                  <span className="min-w-0 flex-1 text-[11.5px]">{retry.what}</span>
                  <span className="flex-none text-[10px] text-ink/60">{retry.next}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Incydenty" />
          <HairlineList>
            {incidents.map((incident) => (
              <HairlineItem key={incident.when} className="px-[13px] py-[11px]">
                <div className="mb-[5px] flex items-center gap-2">
                  <Chip tone={incident.tone}>{incident.tag}</Chip>
                  <span className="text-[9.5px] text-ink/45">{incident.when}</span>
                </div>
                <div className="text-[12.5px] leading-[1.45] text-pretty text-ink/[.82]">
                  {incident.text}
                </div>
                <div className="mt-1 text-[9.5px] text-ink/50">{incident.impact}</div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div>
          <SectionRule title="Dziennik zmian silnika" aside="PUBLICZNY" />
          <HairlineList>
            {changelog.map((entry) => (
              <HairlineItem
                key={entry.date}
                className="grid grid-cols-[78px_minmax(0,1fr)] items-baseline gap-3 px-[13px] py-2.5"
              >
                <div className="text-[9.5px] text-ink/50">{entry.date}</div>
                <div className="min-w-0">
                  <div className="text-xs leading-[1.45] text-pretty text-ink/[.82]">
                    {entry.text}
                  </div>
                  <div className="mt-[3px] text-[9px] tracking-[.08em] text-ink/45">
                    {entry.kind}
                  </div>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>
    </div>
  );
}
