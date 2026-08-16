"use client";

import { useState } from "react";
import { Check, TriangleAlert } from "@/components/icons";
import { usePricing } from "@/hooks/usePricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { PAGE_PADDING } from "@/components/ui/layout";
import type { BillingCycle, PlanCell } from "@/lib/data/types";
import { cx } from "@/lib/cn";

/** Plan table grid — label plus four plan columns. */
const TABLE_GRID = "grid grid-cols-[minmax(280px,1.7fr)_repeat(4,minmax(160px,1fr))]";

/** The Pro plan is highlighted with a gradient column. */
const FEATURED = 1;

/** Purchase-path colours, in order: emerald, indigo, sky. */
const PATH_HUES = ["34,211,165", "124,92,255", "56,189,248"];

const CYCLES: { id: BillingCycle; label: string }[] = [
  { id: "rok", label: "Rocznie −17%" },
  { id: "mies", label: "Miesięcznie" },
];

function Cell({ cell }: { cell: PlanCell }) {
  const base = "flex items-center px-3.5 py-[13px] text-[12.5px] leading-[1.45]";

  switch (cell.kind) {
    case "yes":
      return <div className={cx(base, "text-[15px] font-extrabold text-emerald")}>✓</div>;
    case "no":
      return <div className={cx(base, "text-ink/[.22]")}>—</div>;
    case "never":
      return (
        <div className={cx(base, "text-[10.5px] font-extrabold tracking-[.06em] text-[#FF8A98]")}>
          {cell.text}
        </div>
      );
    default:
      return <div className={cx(base, "text-ink/[.66]")}>{cell.text}</div>;
  }
}

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("rok");
  const { data } = usePricing(cycle);
  if (!data) return null;

  const { plans, groups, payPaths, billingRules, addons } = data;

  return (
    <div className={cx(PAGE_PADDING, "flex flex-col gap-8")}>
      <div className="flex flex-wrap items-end gap-5">
        <div>
          <Kicker>Plany i płatności</Kicker>
          <h1 className="m-0 text-[42px] leading-[1.06] font-extrabold tracking-[-.035em]">
            Cztery plany, cztery ścieżki zakupu
          </h1>
        </div>
        <div className="flex-1" />
        <div className="flex gap-[5px] rounded-[14px] border border-white/[.07] bg-white/[.04] p-[5px]">
          {CYCLES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setCycle(option.id)}
              className={cx(
                "rounded-[10px] px-4 py-2.5 text-[12.5px] font-bold transition-all duration-200",
                cycle === option.id
                  ? "bg-[linear-gradient(135deg,#8B72FF,#5B3CE0)] text-white shadow-[0_12px_26px_-14px_rgba(124,92,255,.95)]"
                  : "text-ink/55",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[20px] border border-white/[.07] bg-white/[.025]">
        <div className="min-w-[1060px]">
          <div className={cx(TABLE_GRID, "border-b border-white/[.07]")}>
            <div className="self-end px-6 pt-[22px] pb-5 text-[11.5px] font-semibold text-ink/40">
              Ceny netto · VAT 23%
            </div>
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={cx(
                  "px-5 pt-[22px] pb-5",
                  index === FEATURED &&
                    "rounded-tr-[18px] border-t-2 border-accent bg-[linear-gradient(180deg,rgba(124,92,255,.18),rgba(124,92,255,0))]",
                )}
              >
                <div className="mb-2 text-[19px] font-extrabold tracking-[-.025em]">
                  {plan.name}
                </div>
                <div className="text-2xl leading-none font-extrabold tracking-[-.035em]">
                  {plan.price}
                </div>
                <div className="mt-1.5 text-[11px] leading-[1.5] text-ink/[.42]">{plan.unit}</div>
                <div className="mt-3 text-[11.5px] leading-[1.5] text-ink/60">{plan.audience}</div>
                <div className="mt-3.5 inline-block rounded-lg border border-white/[.08] bg-white/[.06] px-2.5 py-1.5 text-[10.5px] font-semibold text-ink/[.62]">
                  {plan.buy}
                </div>
              </div>
            ))}
          </div>

          {groups.map((group) => (
            <div key={group.label}>
              <div className="bg-white/[.035] px-6 py-3 text-[11px] font-extrabold tracking-[.12em] text-ink/45">
                {group.label}
              </div>
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className={cx(
                    TABLE_GRID,
                    "border-t border-white/[.05] transition-colors duration-[160ms] hover:bg-white/[.04]",
                  )}
                >
                  <div className="min-w-0 px-6 py-[13px]">
                    <div className="text-[13px] leading-[1.45] text-ink/90">{row.label}</div>
                    {row.note && (
                      <div className="mt-1 text-[11px] leading-[1.5] text-ink/[.38]">
                        {row.note}
                      </div>
                    )}
                  </div>
                  {row.cells.map((cell, index) => (
                    <Cell key={index} cell={cell} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section>
        <SectionHeading title="Ścieżki zakupu" hint="Od BLIK-a po postępowanie" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-[18px]">
          {payPaths.map((path, index) => {
            const hue = PATH_HUES[index] ?? PATH_HUES[0];

            return (
              <div
                key={path.kicker}
                className={cx(
                  "rounded-[20px] border p-[26px] transition-[transform,box-shadow,border-color] duration-[220ms] hover:-translate-y-1 hover:border-white/[.14] hover:shadow-[0_34px_60px_-30px_rgba(0,0,0,.95)]",
                  index === FEATURED
                    ? "border-accent/[.26] bg-[linear-gradient(160deg,rgba(124,92,255,.13),rgba(255,255,255,.03)_55%)]"
                    : "border-white/[.07] bg-white/[.03]",
                )}
              >
                <div className="mb-4 flex flex-wrap items-center gap-[9px]">
                  <span
                    className="rounded-full border px-3 py-1.5 text-[10.5px] font-extrabold tracking-[.06em]"
                    style={{
                      background: `rgba(${hue},.12)`,
                      borderColor: `rgba(${hue},.28)`,
                      color: `rgb(${hue})`,
                    }}
                  >
                    {path.kicker}
                  </span>
                  {path.flag && (
                    <span className="rounded-full border border-amber/30 bg-amber/[.14] px-2.5 py-[5px] text-[10.5px] font-bold text-amber-soft">
                      {path.flag}
                    </span>
                  )}
                </div>

                <div className="mb-3 text-[19px] leading-[1.3] font-bold tracking-[-.025em] text-balance">
                  {path.title}
                </div>
                <p className="m-0 mb-[18px] text-[12.5px] leading-[1.7] text-pretty text-ink/55">
                  {path.desc}
                </p>

                <div className="flex flex-col gap-2.5">
                  {path.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-ink/[.78]"
                    >
                      <Check
                        size={15}
                        strokeWidth={2.6}
                        stroke="#22D3A5"
                        className="mt-0.5 flex-none"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] items-start gap-[22px]">
        <div>
          <h2 className="m-0 mb-4 text-xl font-extrabold tracking-[-.02em]">Zasady rozliczeń</h2>
          <div className="overflow-hidden rounded-[18px] border border-white/[.07] bg-white/[.028]">
            {billingRules.map((rule) => (
              <div
                key={rule.label}
                className="grid grid-cols-[150px_minmax(0,1fr)] gap-4 border-b border-white/[.05] px-5 py-3.5 transition-colors duration-[160ms] hover:bg-white/[.04]"
              >
                <div className="pt-0.5 text-[11px] font-extrabold tracking-[.08em] text-accent-soft">
                  {rule.label}
                </div>
                <div className="text-[12.5px] leading-[1.65] text-pretty text-ink/[.68]">
                  {rule.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="m-0 mb-4 text-xl font-extrabold tracking-[-.02em]">
            Dodatki i plany specjalne
          </h2>
          <div className="mb-[18px] overflow-hidden rounded-[18px] border border-white/[.07] bg-white/[.028]">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center gap-4 border-b border-white/[.05] px-5 py-[15px] transition-colors duration-[160ms] hover:bg-white/[.04]"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold">{addon.name}</div>
                  <div className="mt-[3px] text-[11.5px] text-ink/40">{addon.note}</div>
                </div>
                <div className="flex-none text-sm font-extrabold tracking-[-.02em]">
                  {addon.price}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[18px] border border-[#FF5A6E]/[.24] bg-[linear-gradient(150deg,rgba(255,90,110,.14),rgba(20,22,34,.6)_60%)] p-[22px]">
            <div className="mb-3 flex items-center gap-[9px]">
              <TriangleAlert size={16} strokeWidth={2.2} stroke="#FF8A98" />
              <div className="text-[11.5px] font-extrabold tracking-[.06em] text-rose-soft">
                Niuans pozycjonowania
              </div>
            </div>
            <div className="text-[12.5px] leading-[1.75] text-pretty text-ink/[.68]">
              Blokowanie konkretnych redakcji jest dostępne w planie Pro i Local jako filtr roboczy.
              W warstwie Gov pozostaje niedostępne — brak blocklisty jest elementem pozycjonowania i
              nie da się go włączyć ani wykupić. Podobnie próg agregacji k, retencja i zakres
              uprawnień: w Gov zmieniane wyłącznie procedurą z drugim podpisem i wpisem do audytu.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
