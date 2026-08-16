"use client";

import { useNotifications } from "@/hooks/useAccount";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { MatrixCell } from "@/components/ui/MatrixCell";
import { Bar } from "@/components/ui/Bar";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";

const NOTIFY_GRID = "minmax(220px,1.5fr) repeat(6,minmax(110px,1fr))";

export default function NotificationsPage() {
  const { data } = useNotifications();
  if (!data) return null;

  const { columns, rows, endpoints, counts, hygiene } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="POWIADOMIENIA"
        title="Co, gdzie i jak często"
        aside={
          <>
            godziny ciszy: 21:00–07:00 · nadpisanie tylko krytyczne
            <br />
            limit dzienny: 5 · deduplikacja 6 h
          </>
        }
      />

      <div className="mb-6 overflow-x-auto border border-white/[.13]">
        <div className="min-w-[1020px]">
          <div
            className="grid border-b border-white/[.13] bg-white/[.05]"
            style={{ gridTemplateColumns: NOTIFY_GRID }}
          >
            <div className="px-3 py-2.5 text-[9px] tracking-[.13em] text-ink/50">TYP ZDARZENIA</div>
            {columns.map((column) => (
              <div
                key={column}
                className="border-l border-white/10 px-3 py-2.5 text-[9px] tracking-[.1em] text-ink/55"
              >
                {column}
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div
              key={row.label}
              className="grid items-center border-b border-ink/[.08] bg-white/[.03] transition-colors hover:bg-white/[.04]"
              style={{ gridTemplateColumns: NOTIFY_GRID }}
            >
              <div className="min-w-0 px-3 py-[9px]">
                <div className="text-xs">{row.label}</div>
                <div className="mt-0.5 text-[9px] text-ink/45">{row.note}</div>
              </div>
              {row.cells.map((cell, index) => (
                <MatrixCell key={index} cell={cell} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Adresy i punkty odbioru" />
          <HairlineList>
            {endpoints.map((endpoint) => (
              <HairlineItem
                key={endpoint.value}
                className="grid grid-cols-[88px_minmax(0,1fr)_96px] items-center gap-[11px] px-[13px] py-2.5"
              >
                <div className="text-[9.5px] tracking-[.08em] text-ink/55">{endpoint.kind}</div>
                <div className="min-w-0">
                  <div className="truncate text-[11px] text-ink/80">{endpoint.value}</div>
                  <div className="mt-0.5 text-[10.5px] text-ink/50">{endpoint.note}</div>
                </div>
                <div>
                  <Chip tone={endpoint.tone}>{endpoint.state}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-[14px] border border-white/[.13] bg-white/[.035] px-[15px] py-3.5">
            <div className="mb-[9px] text-[9px] tracking-[.12em] text-accent-soft">
              CO BYŚ DOSTAŁ PRZY TYCH USTAWIENIACH · 7 DNI
            </div>
            <div className="flex flex-col gap-[9px]">
              {counts.map((count) => (
                <div
                  key={count.channel}
                  className="grid grid-cols-[96px_minmax(0,1fr)_44px] items-center gap-2.5"
                >
                  <span className="text-[9.5px] text-ink/55">{count.channel}</span>
                  <Bar value={count.share} height={8} />
                  <span className="text-right text-[10px]">{count.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-[11px] border-t border-dashed border-white/[.16] pt-[9px] text-[11.5px] leading-[1.55] text-pretty text-ink/70">
              118 pozycji zostałoby scalonych w 14 podsumowań zamiast wysłanych pojedynczo. Zawsze
              pokazujemy ten podgląd przed zapisaniem reguły.
            </div>
          </div>

          <HairlineList>
            {hygiene.map((rule) => (
              <HairlineItem
                key={rule.name}
                className="flex items-center justify-between gap-3 px-[13px] py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-xs">{rule.name}</div>
                  <div className="mt-0.5 text-[9.5px] leading-[1.45] text-ink/45">{rule.note}</div>
                </div>
                <Chip tone={rule.tone}>{rule.state}</Chip>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>
    </div>
  );
}
