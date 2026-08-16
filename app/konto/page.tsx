"use client";

import { useLogin } from "@/hooks/useAccount";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { Chip } from "@/components/ui/Chip";
import { CONSOLE_PADDING_TIGHT } from "@/components/ui/layout";
import { cx } from "@/lib/cn";

export default function LoginPage() {
  const { data } = useLogin();
  if (!data) return null;

  const { authMethods, operations, sessions, history } = data;

  return (
    <div className={CONSOLE_PADDING_TIGHT}>
      <PageHeader
        className="mb-5"
        titleSize="text-[31px]"
        kicker="KONTO · P. KACZMAREK · WŁAŚCICIEL"
        title="Jak wchodzisz i czym się potwierdzasz"
        aside={
          <>
            p.kaczmarek@enerpol.example
            <br />
            ostatnie logowanie: 29 VII, 08:41 · Katowice
          </>
        }
      />

      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
        <div>
          <SectionRule title="Metody wejścia" />
          <HairlineList>
            {authMethods.map((method) => (
              <HairlineItem
                key={method.name}
                className="grid grid-cols-[minmax(0,1fr)_104px_84px] items-center gap-[11px] px-[13px] py-3"
              >
                <div className="min-w-0">
                  <div className="mb-[3px] text-[12.5px] font-medium">{method.name}</div>
                  <div className="text-[11px] leading-[1.45] text-pretty text-ink/60">
                    {method.note}
                  </div>
                </div>
                <div>
                  <Chip tone={method.tone}>{method.state}</Chip>
                </div>
                <div className="cursor-pointer text-right text-[9.5px] text-accent-soft">
                  {method.action}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <HairlineList className="mt-3">
            <HairlineItem className="bg-white/[.05] px-[13px] py-[9px] text-[9px] tracking-[.13em] text-ink/55">
              OPERACJE NA KONCIE
            </HairlineItem>
            {operations.map((operation) => (
              <HairlineItem
                key={operation.name}
                className="flex items-center justify-between gap-3 px-[13px] py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-xs">{operation.name}</div>
                  <div className="mt-0.5 text-[9.5px] text-ink/45">{operation.note}</div>
                </div>
                <span className="cursor-pointer">
                  <Chip tone={operation.tone}>{operation.cta}</Chip>
                </span>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>

        <div>
          <SectionRule
            title="Sesje i urządzenia"
            aside={<span className="cursor-pointer text-accent-soft">WYLOGUJ WSZĘDZIE</span>}
          />
          <HairlineList>
            {sessions.map((session) => (
              <HairlineItem
                key={session.device}
                className={cx(
                  "grid grid-cols-[minmax(0,1fr)_110px_86px] items-center gap-[11px] px-[13px] py-2.5",
                  session.isAlert && "bg-white/[.065]",
                  session.isHighlighted && "shadow-[inset_3px_0_0_rgba(0,0,0,.75)]",
                )}
              >
                <div className="min-w-0">
                  <div className="mb-[3px] text-xs">{session.device}</div>
                  <div className="text-[9.5px] text-ink/50">{session.meta}</div>
                </div>
                <div className="text-right text-[9.5px] text-ink/55">{session.when}</div>
                <div
                  className={cx(
                    "cursor-pointer text-right text-[9.5px]",
                    session.isAlert ? "text-accent-soft" : "text-ink/50",
                  )}
                >
                  {session.action}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>

          <HairlineList className="mt-3">
            <HairlineItem className="bg-white/[.05] px-[13px] py-[9px] text-[9px] tracking-[.13em] text-ink/55">
              HISTORIA LOGOWAŃ · ALERT O NOWYM URZĄDZENIU: WŁ.
            </HairlineItem>
            {history.map((event) => (
              <HairlineItem
                key={event.when}
                className="grid grid-cols-[96px_minmax(0,1fr)_92px] items-center gap-2.5 px-[13px] py-[9px]"
              >
                <div className="text-[9.5px] text-ink/50">{event.when}</div>
                <div className="min-w-0 text-[11.5px]">{event.what}</div>
                <div>
                  <Chip tone={event.tone}>{event.tag}</Chip>
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>
    </div>
  );
}
