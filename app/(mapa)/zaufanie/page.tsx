"use client";

import Link from "next/link";
import { ArrowUpRight, Lock } from "@/components/icons";
import { useTrustCenter } from "@/hooks/useTrustCenter";
import { Kicker } from "@/components/ui/Kicker";
import { PAGE_PADDING } from "@/components/ui/layout";
import { VALUE_TONE } from "@/components/ui/tones";
import { cx } from "@/lib/cn";

/** SLA table grid — plan plus three parameter columns. */
const SLA_GRID = "grid grid-cols-[minmax(140px,1fr)_repeat(3,minmax(115px,1fr))]";

const SLA_HEAD = "px-3.5 py-[13px] text-[10.5px] font-extrabold tracking-[.1em] text-ink/[.42]";

export default function TrustPage() {
  const { data } = useTrustCenter();
  if (!data) return null;

  const { blocks, sla, openness } = data;

  return (
    <div className={cx(PAGE_PADDING, "flex flex-col gap-8")}>
      <div className="flex flex-wrap items-end gap-5">
        <div>
          <Kicker tone="emerald">Trust center · zgodność i jakość</Kicker>
          <h1 className="m-0 text-[42px] leading-[1.06] font-extrabold tracking-[-.035em]">
            Czym się da nas sprawdzić
          </h1>
        </div>
        <div className="flex-1" />
        <div className="rounded-2xl border border-white/[.07] bg-white/[.035] px-5 py-4 text-right text-xs leading-[1.8] text-ink/55">
          ostatni pentest: 12 VI 2026 · raport na wniosek
          <br />
          status page: 99,97% / 90 dni
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-[18px]">
        {blocks.map((block) => (
          <div
            key={block.name}
            className="rounded-[20px] border border-white/[.07] bg-white/[.03] p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-white/[.14] hover:shadow-[0_34px_60px_-32px_rgba(0,0,0,.95)]"
          >
            <div className="mb-[18px] flex items-center gap-3">
              <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[11px] border border-accent/[.26] bg-accent/[.14] text-accent-soft">
                <Lock size={16} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="mb-[3px] text-[10.5px] font-extrabold tracking-[.1em] text-ink/[.38]">
                  {block.kicker}
                </div>
                <div className="text-[17px] font-bold tracking-[-.02em]">{block.name}</div>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              {block.items.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[.05] py-[9px]"
                >
                  <span className="text-xs leading-[1.5] text-pretty text-ink/[.68]">
                    {item.label}
                  </span>
                  <span
                    className={cx(
                      "flex-none rounded-lg border px-2.5 py-[5px] text-[10.5px] font-bold tracking-[.03em] whitespace-nowrap",
                      VALUE_TONE[item.tone],
                    )}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] items-start gap-[22px]">
        <div>
          <h2 className="m-0 mb-4 text-xl font-extrabold tracking-[-.02em]">Wsparcie i SLA</h2>
          <div className="overflow-x-auto rounded-[18px] border border-white/[.07] bg-white/[.028]">
            <div className="min-w-[560px]">
              <div className={cx(SLA_GRID, "bg-white/[.04]")}>
                <div className={cx(SLA_HEAD, "px-5")}>PLAN</div>
                <div className={SLA_HEAD}>KANAŁ</div>
                <div className={SLA_HEAD}>PIERWSZA ODPOWIEDŹ</div>
                <div className={SLA_HEAD}>BŁĄD W DANYCH</div>
              </div>
              {sla.map((row) => (
                <div
                  key={row.plan}
                  className={cx(
                    SLA_GRID,
                    "border-t border-white/[.05] transition-colors duration-[160ms] hover:bg-white/[.04]",
                  )}
                >
                  <div className="px-5 py-3.5 text-[13px] font-bold">{row.plan}</div>
                  <div className="px-3.5 py-3.5 text-[12.5px] text-ink/60">{row.channel}</div>
                  <div className="px-3.5 py-3.5 text-[12.5px] font-semibold text-ink/85">
                    {row.firstResponse}
                  </div>
                  <div className="px-3.5 py-3.5 text-[12.5px] font-semibold text-ink/85">
                    {row.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="m-0 mt-3.5 max-w-[70ch] text-xs leading-[1.7] text-ink/[.42]">
            Zgłoszenie błędu w danych jest dostępne przy każdej pozycji w każdym planie, również
            darmowym. Każda przyjęta korekta trafia do publicznego rejestru korekt.
          </p>
        </div>

        <div>
          <h2 className="m-0 mb-4 text-xl font-extrabold tracking-[-.02em]">Jawność produktu</h2>
          <div className="overflow-hidden rounded-[18px] border border-white/[.07] bg-white/[.028]">
            {openness.map((entry) => (
              <div
                key={entry.label}
                className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 border-b border-white/[.05] px-5 py-[15px] transition-colors duration-[160ms] hover:bg-white/[.04]"
              >
                <div className="pt-0.5 text-[11px] font-extrabold tracking-[.08em] text-emerald-soft">
                  {entry.label}
                </div>
                <div className="min-w-0">
                  <div className="text-[12.5px] leading-[1.65] text-pretty text-ink/[.68]">
                    {entry.value}
                  </div>
                  {entry.link && (
                    <Link
                      href={entry.link.href}
                      className="mt-[7px] inline-flex items-center gap-1.5 text-[11.5px] font-bold"
                    >
                      {entry.link.label}
                      <ArrowUpRight size={13} strokeWidth={2.4} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
