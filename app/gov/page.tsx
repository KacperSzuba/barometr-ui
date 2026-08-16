"use client";

import Link from "next/link";
import { useConcept } from "@/hooks/useGov";
import { HairlineItem, HairlineList } from "@/components/ui/HairlineList";
import { GovSectionRule } from "@/components/gov/GovSectionRule";
import { govHref } from "@/lib/gov";
import type { Capability } from "@/lib/data/types";
import { cx } from "@/lib/cn";

/** Permission matrix glyphs: full, limited, blocked. */
const CAPABILITY: Record<Capability, { mark: string; className: string }> = {
  full: { mark: "●", className: "text-emerald-soft" },
  limited: { mark: "○", className: "text-ink/40" },
  none: { mark: "✕", className: "text-accent-soft" },
};

const FEED_GRID = "1.5fr .7fr .7fr 1.1fr";
const ROLE_GRID = "1.5fr repeat(6,minmax(0,1fr))";

export default function ConceptPage() {
  const { data } = useConcept();
  if (!data) return null;

  const {
    principles,
    isFor,
    isNot,
    pipeline,
    feeds,
    roleCaps,
    roles,
    modules,
    guardrails,
    phases,
    successMetrics,
  } = data;

  return (
    <div className="max-w-[1180px] px-[30px] pt-[26px] pb-14">
      <div className="mb-2.5 text-[9.5px] tracking-[.18em] text-accent-soft">
        PRODUCT CONCEPT · V1.0 · FOR REVIEW
      </div>
      <h1 className="m-0 max-w-[20ch] text-[46px] leading-[1.05] font-bold tracking-[-.03em] text-pretty">
        A listening instrument for people who hold power
      </h1>
      <p className="mt-4 mb-0 max-w-[70ch] text-[15px] leading-[1.7] text-pretty text-ink/75">
        Barometr tells a government what the country is actually saying, worrying about and being
        told — accurately, fast, and with its uncertainty visible. It is deliberately built with no
        way to push anything back. Everything a politician could use to manipulate opinion is absent
        by construction; everything they need to understand it is one screen away.
      </p>

      <HairlineList columns="repeat(3,minmax(0,1fr))" className="mt-7 mb-[34px]">
        {principles.map((principle) => (
          <HairlineItem key={principle.n} className="min-w-0 px-[18px] pt-[18px] pb-5">
            <div className="text-[26px] leading-none text-accent-soft">{principle.n}</div>
            <div className="mt-2.5 text-[19px] font-semibold tracking-[-.01em]">
              {principle.title}
            </div>
            <div className="mt-2 text-[12.5px] leading-[1.6] text-pretty text-ink/[.68]">
              {principle.text}
            </div>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="mb-9 grid grid-cols-2 gap-5">
        <div className="rounded-[14px] border border-white/[.14] bg-white/[.035] px-[18px] py-4">
          <div className="mb-3 text-[9px] tracking-[.14em] text-emerald-soft">WHAT IT IS FOR</div>
          {isFor.map((item) => (
            <div
              key={item}
              className="flex gap-[9px] py-1.5 text-[12.5px] leading-[1.5] text-ink/[.78]"
            >
              <span className="text-emerald-soft">+</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="rounded-[14px] border border-accent/25 bg-accent/[.05] px-[18px] py-4">
          <div className="mb-3 text-[9px] tracking-[.14em] text-accent-soft">
            WHAT IT WILL NEVER DO
          </div>
          {isNot.map((item) => (
            <div
              key={item}
              className="flex gap-[9px] py-1.5 text-[12.5px] leading-[1.5] text-ink/[.78]"
            >
              <span className="text-accent-soft">−</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <GovSectionRule title="How the system is built" aside="SIX STAGES · ONE DIRECTION" />
      <HairlineList columns="repeat(6,minmax(0,1fr))" className="mb-3">
        {pipeline.map((step) => (
          <HairlineItem
            key={step.n}
            className="flex min-w-0 flex-col gap-[7px] px-[13px] pt-3.5 pb-[15px]"
          >
            <div className="flex items-center gap-[7px]">
              <span className="text-[9px] text-ink/40">{step.n}</span>
              <span className="text-base font-semibold">{step.name}</span>
            </div>
            <div className="text-[11px] leading-[1.5] text-pretty text-ink/[.66]">
              {step.detail}
            </div>
            <div className="mt-auto border-t border-dashed border-white/[.18] pt-2 text-[8.5px] leading-[1.4] tracking-[.06em] text-accent-soft">
              {step.tech}
            </div>
          </HairlineItem>
        ))}
      </HairlineList>
      <div className="mb-[34px] text-[9.5px] text-ink/45">
        There is no seventh stage. Nothing flows back out to the public sphere except a signed,
        dated human statement made elsewhere.
      </div>

      <div className="mb-9 grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-[26px]">
        <div>
          <GovSectionRule title="What feeds it" size="sm" />
          <div className="border border-white/[.14]">
            <div
              className="grid gap-[9px] rounded-[10px] bg-white/[.05] px-3 py-2 text-[8.5px] tracking-[.11em] text-ink/50"
              style={{ gridTemplateColumns: FEED_GRID }}
            >
              <span>SOURCE</span>
              <span>TYPE</span>
              <span>REFRESH</span>
              <span>RETENTION</span>
            </div>
            {feeds.map((feed) => (
              <div
                key={feed.name}
                className="rounded-[14px] border-t border-white/10 bg-white/[.03] px-3 py-[9px]"
              >
                <div
                  className="grid items-baseline gap-[9px]"
                  style={{ gridTemplateColumns: FEED_GRID }}
                >
                  <span className="text-xs font-medium">{feed.name}</span>
                  <span className="text-[10px] text-ink/60">{feed.kind}</span>
                  <span className="text-[10px] text-ink/60">{feed.cadence}</span>
                  <span className="text-[10px] text-ink/60">{feed.retention}</span>
                </div>
                <div className="mt-[3px] text-[10.5px] text-ink/50">{feed.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <GovSectionRule title="Who can do what" size="sm" />
          <div className="border border-white/[.14] bg-white/[.035]">
            <div
              className="grid gap-1 rounded-[14px] bg-white/[.05] px-3 py-[9px]"
              style={{ gridTemplateColumns: ROLE_GRID }}
            >
              <span />
              {roleCaps.map((cap) => (
                <span
                  key={cap}
                  className="text-center text-[7.5px] leading-[1.25] tracking-[.05em] text-ink/50"
                >
                  {cap}
                </span>
              ))}
            </div>
            {roles.map((row) => (
              <div
                key={row.role}
                className="grid items-center gap-1 border-t border-white/10 px-3 py-2"
                style={{ gridTemplateColumns: ROLE_GRID }}
              >
                <span className="text-[11.5px]">{row.role}</span>
                {row.caps.map((cap, index) => (
                  <span
                    key={index}
                    className={cx("text-center text-[11px]", CAPABILITY[cap].className)}
                  >
                    {CAPABILITY[cap].mark}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <GovSectionRule title="Modules" aside="CLICK TO OPEN" size="sm" />
      <HairlineList columns="repeat(2,minmax(0,1fr))" className="mb-9">
        {modules.map((module) => (
          <HairlineItem key={module.code} className="p-0">
            <Link
              href={govHref(module.segment)}
              className="grid grid-cols-[34px_minmax(0,1fr)] items-baseline gap-3 px-3.5 py-3 hover:bg-white/[.04] hover:text-ink"
            >
              <span className="text-[10px] text-accent-soft">{module.code}</span>
              <div>
                <div className="text-[13px] font-semibold text-ink">{module.name}</div>
                <div className="mt-[3px] text-[11.5px] leading-[1.5] text-pretty text-ink/[.62]">
                  {module.purpose}
                </div>
              </div>
            </Link>
          </HairlineItem>
        ))}
      </HairlineList>

      <div className="mb-9 grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[26px]">
        <div>
          <GovSectionRule title="Guardrails, and where they live" size="sm" />
          <div className="border border-white/[.14] bg-white/[.035]">
            {guardrails.map((guardrail) => (
              <div
                key={guardrail.rule}
                className="flex items-start gap-2.5 border-b border-white/[.09] px-[13px] py-[11px]"
              >
                <span className="mt-[5px] h-1.5 w-1.5 flex-none rotate-45 bg-[#1F9C7C]" />
                <div>
                  <div className="text-xs leading-[1.45] font-medium">{guardrail.rule}</div>
                  <div className="mt-[3px] text-[9.5px] text-ink/50">{guardrail.how}</div>
                </div>
              </div>
            ))}
            <div className="px-[13px] py-[11px] text-[11px] leading-[1.55] text-pretty text-ink/[.62]">
              A guardrail that is a setting is not a guardrail. Each of these is a property of the
              architecture or a two-signature process, so a future occupant of the office cannot
              quietly switch it off.
            </div>
          </div>
        </div>

        <div>
          <GovSectionRule title="Rollout" size="sm" />
          <HairlineList columns="repeat(2,minmax(0,1fr))">
            {phases.map((phase) => (
              <HairlineItem key={phase.label} className="min-w-0 px-3.5 py-[13px]">
                <div className="text-[8.5px] tracking-[.12em] text-accent-soft">{phase.label}</div>
                <div className="mt-[7px] text-base font-semibold">{phase.title}</div>
                <div className="mt-2 flex flex-col gap-[5px]">
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      className="flex gap-[7px] text-[11px] leading-[1.45] text-ink/[.68]"
                    >
                      <span className="text-ink/35">·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </HairlineItem>
            ))}
          </HairlineList>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-px border border-white/[.14] bg-white/[.05]">
        {successMetrics.map((metric) => (
          <div
            key={metric.label}
            className="min-w-0 rounded-[14px] bg-white/[.05] px-4 pt-4 pb-[18px] text-ink"
          >
            <div className="text-[27px] font-medium tracking-[-.02em] whitespace-nowrap">
              {metric.value}
            </div>
            <div className="mt-[9px] text-[8.5px] leading-[1.5] tracking-[.12em] text-ink/60">
              {metric.label}
            </div>
            <div className="mt-1.5 text-[10.5px] leading-[1.45] text-ink/45">{metric.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
