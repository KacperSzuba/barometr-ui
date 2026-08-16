"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database } from "@/components/icons";
import { useProductMap } from "@/hooks/useProductMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PAGE_PADDING } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

/** The Pro tier card gets the gradient treatment — index 1 in tier order. */
const FEATURED = 1;

export default function ProductMapPage() {
  const { data } = useProductMap();
  if (!data) return null;

  const { counters, layers, infra, nipSteps, principles } = data;

  return (
    <div className={cx(PAGE_PADDING, "flex flex-col gap-[34px]")}>
      <section className="grid items-stretch gap-[26px] shell:grid-cols-[minmax(0,1.55fr)_minmax(300px,1fr)]">
        <div className="rounded-[22px] border border-white/[.08] bg-[linear-gradient(150deg,rgba(124,92,255,.16),rgba(20,22,34,.55)_46%)] px-9 py-[38px] shadow-[0_30px_60px_-34px_rgba(0,0,0,.9)]">
          <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[.16] px-3.5 py-[7px] text-[11.5px] font-bold tracking-[.04em] text-accent-strong">
            Mapa produktu · jeden silnik, cztery warstwy
          </div>
          <h1 className="m-0 mb-[18px] max-w-[16ch] text-[52px] leading-[1.04] font-extrabold tracking-[-.035em] text-balance">
            Co się faktycznie wydarzyło w instytucjach — i kogo to dotyczy
          </h1>
          <p className="m-0 max-w-[70ch] text-[15px] leading-[1.75] text-pretty text-ink/60">
            Jeden potok pozyskiwania i przetwarzania danych publicznych zasila cztery warstwy
            dostępu. Warstwa darmowa jest kompletna sama w sobie i publiczna. Warstwy płatne dodają
            routing, prognozy i współpracę — nie dodają przywileju widzenia rzeczy, których nie
            widzą pozostali.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {counters.map((counter) => (
            <div
              key={counter.label}
              className="flex flex-col justify-between gap-3.5 rounded-2xl border border-white/[.07] bg-white/[.035] p-5 transition-[transform,box-shadow,background] duration-200 hover:-translate-y-[3px] hover:bg-white/[.06] hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,.9)]"
            >
              <div className="text-[11.5px] leading-[1.4] font-semibold text-ink/45">
                {counter.label}
              </div>
              <div className="text-[30px] leading-none font-extrabold tracking-[-.03em]">
                {counter.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Warstwy dostępu" hint="Cztery poziomy, jeden zbiór danych" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[18px]">
          {layers.map((layer, index) => {
            const featured = index === FEATURED;

            return (
              <div
                key={layer.name}
                className={cx(
                  "flex flex-col rounded-[20px] border p-6 transition-[transform,box-shadow,border-color] duration-[220ms] hover:-translate-y-1 hover:border-white/[.14] hover:shadow-[0_34px_60px_-30px_rgba(0,0,0,.95)]",
                  featured
                    ? "border-accent/[.28] bg-[linear-gradient(160deg,rgba(124,92,255,.14),rgba(255,255,255,.03)_52%)]"
                    : "border-white/[.07] bg-white/[.03]",
                )}
              >
                <div className="mb-[18px] flex items-center justify-between gap-3">
                  <div
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] border text-[15px] font-extrabold tracking-[.02em]"
                    style={{
                      background: `rgba(${layer.hue},.16)`,
                      borderColor: `rgba(${layer.hue},.32)`,
                      color: `rgb(${layer.hue})`,
                      boxShadow: `0 10px 26px -14px rgba(${layer.hue},.9)`,
                    }}
                  >
                    {layer.roman}
                  </div>
                  <div className="rounded-full border border-white/[.08] bg-white/[.05] px-[11px] py-1.5 text-[10.5px] font-bold tracking-[.03em] whitespace-nowrap text-ink/55">
                    {layer.kicker}
                  </div>
                </div>

                <div className="mb-2.5 flex items-baseline justify-between gap-2.5">
                  <div className="text-[26px] font-extrabold tracking-[-.03em]">{layer.name}</div>
                  <div className="text-sm font-bold text-ink/75">{layer.price}</div>
                </div>

                <p className="m-0 mb-5 min-h-[82px] text-[12.5px] leading-[1.65] text-pretty text-ink/50">
                  {layer.who}
                </p>

                <div className="mb-6 flex flex-col gap-[11px]">
                  {layer.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-ink/[.78]"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 flex-none rounded-[2px]"
                        style={{ background: `rgb(${layer.hue})` }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex-1" />

                <Link
                  href={layer.href}
                  className={cx(
                    "inline-flex items-center justify-center gap-[9px] rounded-xl px-[18px] py-[13px] text-[12.5px] font-bold transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.12]",
                    featured
                      ? "bg-[linear-gradient(135deg,#8B72FF,#5B3CE0)] text-white shadow-[0_18px_34px_-18px_rgba(124,92,255,.95)]"
                      : "border",
                  )}
                  style={
                    featured
                      ? undefined
                      : {
                          background: `rgba(${layer.hue},.12)`,
                          borderColor: `rgba(${layer.hue},.3)`,
                          color: `rgb(${layer.hue})`,
                        }
                  }
                >
                  {layer.cta}
                  <ArrowRight size={15} strokeWidth={2.4} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid items-start gap-[22px] shell:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
        <div>
          <SectionHeading title="Warstwa wspólna" hint="Te same dane dla wszystkich planów" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {infra.map((card) => (
              <div
                key={card.kicker}
                className="rounded-[18px] border border-white/[.07] bg-white/[.035] p-[22px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-white/[.14] hover:shadow-[0_30px_55px_-32px_rgba(0,0,0,.95)]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[11px] border border-accent/[.26] bg-accent/[.14] text-accent-soft">
                  <Database size={17} strokeWidth={2} />
                </div>
                <div className="mb-2 text-[11px] font-bold tracking-[.1em] text-ink/[.38]">
                  {card.kicker}
                </div>
                <div className="mb-2.5 text-[17px] font-bold tracking-[-.02em] text-balance">
                  {card.name}
                </div>
                <p className="m-0 mb-4 text-[12.5px] leading-[1.65] text-pretty text-ink/[.52]">
                  {card.desc}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold"
                >
                  {card.cta}
                  <ArrowUpRight size={13} strokeWidth={2.4} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-accent/[.26] bg-[linear-gradient(160deg,rgba(124,92,255,.26),rgba(18,20,32,.9)_58%)] p-[26px] shadow-[0_34px_60px_-34px_rgba(124,92,255,.6)]">
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-[.04em] text-[#DCD5FF]">
            Start w 3 krokach · bez kreatora
          </div>
          <div className="mb-[22px] text-[25px] leading-[1.2] font-extrabold tracking-[-.03em]">
            Podajesz NIP. Reszta konfiguruje się sama.
          </div>

          <div className="mb-5 flex flex-col gap-2.5">
            {nipSteps.map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-[34px_minmax(0,1fr)] gap-3.5 rounded-[14px] border border-white/[.08] bg-white/[.06] p-3.5"
              >
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-white/10 text-[12.5px] font-extrabold text-[#DCD5FF]">
                  {step.n}
                </span>
                <div>
                  <div className="mb-1 text-[13.5px] font-bold">{step.title}</div>
                  <div className="text-[11.5px] leading-[1.55] text-ink/55">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="m-0 mb-5 text-xs leading-[1.7] text-pretty text-ink/55">
            Dane z KRS, REGON i CRBR zaciągane są automatycznie; PKD wybiera profil routingu wpływu.
            Import listy obserwowanych podmiotów z CSV dostępny od razu.
          </p>

          <Link
            href="/konto"
            className="inline-flex items-center gap-[9px] rounded-xl bg-white px-5 py-[13px] text-[13px] font-bold text-[#14152A] shadow-[0_16px_30px_-16px_rgba(255,255,255,.5)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:text-[#14152A] hover:shadow-[0_22px_40px_-18px_rgba(255,255,255,.6)]"
          >
            Otwórz onboarding
            <ArrowRight size={15} strokeWidth={2.4} />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {principles.map((principle) => (
          <div
            key={principle.label}
            className="rounded-2xl border border-white/[.06] bg-white/[.028] p-[22px] transition-colors duration-200 hover:bg-white/[.055]"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-[3px] bg-accent shadow-[0_0_12px_rgba(124,92,255,.8)]" />
              <div className="text-[11.5px] font-extrabold tracking-[.06em] text-accent-soft">
                {principle.label}
              </div>
            </div>
            <div className="text-[12.5px] leading-[1.7] text-pretty text-ink/60">
              {principle.value}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
