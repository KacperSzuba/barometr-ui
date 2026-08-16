import type { PackBuilder, VerificationDesk } from "@/lib/data/types";

export const verificationDesk: VerificationDesk = {
  claims: [
    {
      claim: "Four county hospitals close in September",
      status: "FALSE",
      kind: "false",
      origin: "Public social post, 04:18",
      checker: "Analysis desk · 2 confirmations",
      age: "2 h 54 m",
      evidence: [
        "Regional health authority: no closure order exists",
        "June bulletin lists Q4 ward renovations at two of the four sites",
        "County budget shows no decommissioning line",
      ],
      impact: "Est. reach 340 000 · 96 constituent contacts",
    },
    {
      claim: "The tariff annex contains an 8–11% increase",
      status: "UNCONFIRMED",
      kind: "disputed",
      origin: "Two outlets citing a draft, 21:06",
      checker: "Awaiting ministry response",
      age: "10 h 06 m",
      evidence: [
        "Existence of a draft annex confirmed by two sources",
        "The specific range has one source only",
        "Ministry declined to comment at 06:30",
      ],
      impact: "Est. reach 4.1M · dominant story of the day",
    },
    {
      claim: "The tariff rise is automatic regardless of the vote",
      status: "FALSE",
      kind: "false",
      origin: "Aggregator headline, 05:40",
      checker: "Analysis desk",
      age: "1 h 32 m",
      evidence: [
        "Committee vote is legally binding on the annex",
        "Procedure published in the parliamentary handbook",
      ],
      impact: "Est. reach 610 000",
    },
    {
      claim: "Rail programme opening was delayed by two years",
      status: "TRUE",
      kind: "verified",
      origin: "Regional outlet, 26 Jul",
      checker: "Verified against tender records",
      age: "1 d",
      evidence: [
        "Original completion date in the 2021 tender: Q3 2024",
        "Handover certificate dated July 2026",
      ],
      impact: "Low reach · relevant to today’s opening",
    },
    {
      claim: "Teacher action affects all schools in three voivodeships",
      status: "MISLEADING",
      kind: "disputed",
      origin: "Union statement summarised by press",
      checker: "Desk · partial confirmation",
      age: "5 h",
      evidence: [
        "Action is confirmed in three voivodeships",
        "Participation is per-school, not blanket — 41% of schools so far",
      ],
      impact: "Parents’ contacts up 4× overnight",
    },
    {
      claim: "Waiting times fell nationally by 18% this year",
      status: "UNCONFIRMED",
      kind: "disputed",
      origin: "Own office briefing, 14 Jul",
      checker: "Internal review — our own claim",
      age: "14 d",
      evidence: [
        "Figure derived from a partial regional sample",
        "National registry publishes in September",
        "Recommended withdrawal until then",
      ],
      impact: "Quoted in two interviews · correction drafted",
    },
  ],

  standards: [
    "Two independent sources, or the claim stays UNCONFIRMED — no exceptions for convenience",
    "Documents beat officials; officials beat anonymous briefings",
    "The office’s own errors are logged in the same ledger as everyone else’s",
    "A claim that cannot be checked is never quoted, even when it is helpful",
  ],

  ownRecord: [
    {
      date: "14 Jul",
      what: "Figure of 12 000 new places quoted in a press briefing",
      action: "Corrected to 9 400 within 4 h · correction published",
    },
    {
      date: "02 Jul",
      what: "Regional waiting-time chart used an outdated baseline",
      action: "Chart withdrawn and reissued · 1 day",
    },
    {
      date: "19 Jun",
      what: "Claim that consultations covered every county",
      action: "Retracted · three counties had no session",
    },
  ],

  ledgerNote:
    "The last row is a claim this office made. It sits in the same ledger, with the same statuses and the same public visibility as anyone else’s — that is the whole point of keeping one ledger instead of two.",
};

export const packBuilder: PackBuilder = {
  blocks: [
    { label: "Mood index with error band", isIncluded: true },
    { label: "Top five stories", isIncluded: true },
    { label: "Regional map", isIncluded: true },
    { label: "Coverage comparison", isIncluded: false },
    { label: "Open alerts and ground truth", isIncluded: true },
    { label: "Constituent clusters", isIncluded: true },
    { label: "Full verification ledger", isIncluded: false },
    { label: "Method appendix", isIncluded: true },
  ],

  audiences: [
    {
      label: "Principal · 1 page",
      rules: [
        // The prototype stores "Toplines only,每 figure…" here and swaps `每` for `every`
        // only at render time, losing the space after the comma. Stored correctly here.
        "Toplines only, every figure with its error band",
        "No raw items, no quotes below k = 50",
        "One page, printable, no appendix",
      ],
      recipients: "1 named recipient",
    },
    {
      label: "Cabinet · 4 pages",
      rules: [
        "Regional detail included, small cells suppressed",
        "Verification ledger attached in full",
        "Watermarked per recipient, expires in 14 days",
      ],
      recipients: "17 named, watermarked individually",
    },
    {
      label: "Press office · working",
      rules: [
        "Raw item counts visible to the desk",
        "Draft language flagged as unverified stays flagged",
        "Not shareable outside the press office",
      ],
      recipients: "6 desk members",
    },
  ],

  meta: [
    { label: "EXPIRES", value: "14 days from generation" },
    { label: "AUDIT STAMP", value: "PACK-2026-0728-A · logged on generation" },
    { label: "SOURCES CITED", value: "428 monitored · 12 polls · 4 sessions" },
  ],
};
