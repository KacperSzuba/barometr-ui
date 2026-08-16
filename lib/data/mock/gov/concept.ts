import type { Concept } from "@/lib/data/types";

export const concept: Concept = {
  principles: [
    {
      n: "I",
      title: "Listen, never push",
      text: "The system reads the public sphere and reports it. It has no outbound surface at all — no posting, no ad buying, no audience export, no A/B tested messaging. The only writable artefact is an internal briefing.",
    },
    {
      n: "II",
      title: "Aggregate, never profile",
      text: "Nothing addressable about an individual leaves the ingest layer. Contacts become clusters at k ≥ 50; authors are hashed and dropped after classification; no citizen, journalist or activist can be looked up by name.",
    },
    {
      n: "III",
      title: "Show your work",
      text: "Every number carries sample size, field dates, method and error. Every query is logged and readable by an independent monitor. A public mirror publishes the same toplines the minister sees.",
    },
  ],

  isFor: [
    "Understanding what people actually need before a decision is made",
    "Catching a false claim early and answering it with facts",
    "Seeing which regions are being left out of a policy conversation",
    "Giving the press office one shared, dated version of reality",
    "Making the evidence behind a public statement auditable afterwards",
  ],

  isNot: [
    "Message testing, spin optimisation or sentiment engineering",
    "Tracking journalists, activists, or named citizens",
    "Micro-targeting voters or exporting audiences to campaign tools",
    "Ranking outlets as friendly or hostile",
    "Predicting elections or scoring political opponents",
  ],

  pipeline: [
    {
      n: "01",
      name: "Ingest",
      detail:
        "428 sources: press APIs, broadcast ASR, official registers, public social firehose, contact intake, commissioned polls.",
      tech: "Rate-limited, licence-checked",
    },
    {
      n: "02",
      name: "Normalise",
      detail:
        "Deduplication, language ID, entity resolution against a public register of institutions — never persons.",
      tech: "Author IDs hashed, then dropped",
    },
    {
      n: "03",
      name: "Classify",
      detail:
        "Topic, frame, stance-toward-policy, veracity signals. Polish-language models, macro-F1 0.79, revalidated monthly.",
      tech: "Model card published",
    },
    {
      n: "04",
      name: "Aggregate",
      detail:
        "Nothing surfaces below k = 50 contacts or n = 400 survey responses. Small cells are suppressed, not estimated.",
      tech: "Hard gate, not a setting",
    },
    {
      n: "05",
      name: "Brief",
      detail:
        "Ranked by movement, not by importance. Every card carries provenance, uncertainty and the option to see the raw counts.",
      tech: "Human desk sign-off",
    },
    {
      n: "06",
      name: "Audit",
      detail:
        "Query log, export register, retention timers, quarterly transparency report to the independent monitor.",
      tech: "Append-only",
    },
  ],

  feeds: [
    {
      name: "National & regional press",
      kind: "Text",
      cadence: "5 min",
      retention: "24 months",
      note: "Licensed feeds + public RSS",
    },
    {
      name: "Broadcast transcripts",
      kind: "ASR",
      cadence: "15 min",
      retention: "12 months",
      note: "4 channels, human spot-check",
    },
    {
      name: "Public social posts",
      kind: "Text",
      cadence: "2 min",
      retention: "90 days",
      note: "Aggregates only, authors dropped",
    },
    {
      name: "Constituent contacts",
      kind: "Mixed",
      cadence: "Live",
      retention: "36 months (casework law)",
      note: "Clustered at k ≥ 50",
    },
    {
      name: "Commissioned polling",
      kind: "Survey",
      cadence: "Weekly",
      retention: "Permanent",
      note: "Full method sheet attached",
    },
    {
      name: "Deliberative panels",
      kind: "Qual",
      cadence: "Monthly",
      retention: "Permanent",
      note: "Consent-recorded, anonymised",
    },
    {
      name: "Parliamentary records",
      kind: "Structured",
      cadence: "Daily",
      retention: "Permanent",
      note: "Open data, no processing",
    },
  ],

  roleCaps: [
    "See briefing",
    "Region detail",
    "Raw items",
    "Export pack",
    "Escalate crisis",
    "Read audit log",
  ],

  roles: [
    {
      role: "Principal (minister / mayor)",
      caps: ["full", "full", "limited", "limited", "none", "full"],
    },
    { role: "Policy advisor", caps: ["full", "full", "full", "full", "none", "limited"] },
    { role: "Press officer", caps: ["full", "full", "full", "full", "limited", "limited"] },
    { role: "Analyst desk", caps: ["full", "full", "full", "full", "limited", "full"] },
    { role: "Regional liaison", caps: ["full", "full", "limited", "limited", "none", "none"] },
    { role: "Independent monitor", caps: ["full", "limited", "none", "none", "none", "full"] },
    { role: "Public (mirror site)", caps: ["full", "limited", "none", "none", "none", "full"] },
  ],

  modules: [
    {
      code: "M1",
      name: "Morning briefing",
      purpose: "What moved overnight, ranked by change, with uncertainty attached",
      segment: "briefing",
    },
    {
      code: "M2",
      name: "Regional sentiment",
      purpose: "Equal-area cartogram of mood, concerns and drivers by voivodeship",
      segment: "map",
    },
    {
      code: "M3",
      name: "Coverage compare",
      purpose: "How outlets frame an issue, with ownership and correction rates disclosed",
      segment: "coverage",
    },
    {
      code: "M4",
      name: "Constituent inbox",
      purpose: "Letters, calls and forms clustered into demands, with coordination flags",
      segment: "inbox",
    },
    {
      code: "M5",
      name: "Deliberation desk",
      purpose: "Town halls and citizens’ panels — the why behind the numbers",
      segment: "research",
    },
    {
      code: "M6",
      name: "Story tracker",
      purpose: "A single narrative followed across channels, frames and time",
      segment: "story",
    },
    {
      code: "M7",
      name: "Legislative pulse",
      purpose: "Opinion per bill, plus what the public wrongly believes it does",
      segment: "bills",
    },
    {
      code: "M8",
      name: "Polls & method",
      purpose: "Poll aggregation with house effects and incompatibility warnings",
      segment: "polls",
    },
    {
      code: "M9",
      name: "Verification desk",
      purpose: "Claim ledger, evidence chain, and our own correction record",
      segment: "verify",
    },
    {
      code: "M10",
      name: "Crisis view",
      purpose: "Fast-moving false claims: origin, spread, ground truth, factual response",
      segment: "alert",
    },
    {
      code: "M11",
      name: "Daily pack builder",
      purpose: "Assemble a briefing pack with redaction rules and an audit stamp",
      segment: "reports",
    },
    {
      code: "M12",
      name: "Audit & access",
      purpose: "Who saw what, retention timers, blocked misuse attempts",
      segment: "audit",
    },
    {
      code: "M13",
      name: "Public mirror",
      purpose: "The citizen-facing site publishing the same toplines and methods",
      segment: "portal",
    },
    {
      code: "M14",
      name: "Mobile companion",
      purpose: "Three cards for the corridor: mood, alert, top story — read-only",
      segment: "mobile",
    },
  ],

  guardrails: [
    {
      rule: "No outbound publishing surface exists in the codebase",
      how: "Architectural — there is no write path to any platform",
    },
    {
      rule: "Aggregation floor k = 50 / n = 400",
      how: "Enforced in the query layer, not in the UI",
    },
    {
      rule: "Author identifiers dropped after classification",
      how: "Ingest job, verified by the monitor quarterly",
    },
    {
      rule: "No outlet or journalist scoring",
      how: "Tone is measured toward policy, never toward people",
    },
    {
      rule: "Escalation above level 2 needs two signatures",
      how: "One political, one independent",
    },
    { rule: "Every export watermarked and logged", how: "Recipient, purpose and expiry embedded" },
    {
      rule: "Public mirror publishes the same toplines",
      how: "Same data warehouse, no separate curation",
    },
  ],

  phases: [
    {
      label: "PHASE 1 · 0–3 MTH",
      title: "Read-only pilot",
      items: [
        "Press + broadcast ingest",
        "Morning briefing, regional map",
        "One ministry, 12 users",
        "Monitor appointed before launch",
      ],
    },
    {
      label: "PHASE 2 · 3–6 MTH",
      title: "Public voice in",
      items: [
        "Contact intake clustering",
        "Verification desk",
        "Crisis workflow with drills",
        "First transparency report",
      ],
    },
    {
      label: "PHASE 3 · 6–12 MTH",
      title: "Deliberation & policy",
      items: [
        "Citizens’ panel integration",
        "Legislative pulse per bill",
        "Regional liaison rollout",
        "Public mirror goes live",
      ],
    },
    {
      label: "PHASE 4 · 12+ MTH",
      title: "Institutionalise",
      items: [
        "Statutory basis for the monitor",
        "Open method + model cards",
        "Independent annual audit",
        "Handover-proof: survives a change of government",
      ],
    },
  ],

  successMetrics: [
    {
      value: "< 90 min",
      label: "FALSE CLAIM TO FACTUAL REPLY",
      note: "Median, measured on the crisis log",
    },
    {
      value: "100%",
      label: "PUBLIC STATEMENTS WITH SOURCED EVIDENCE",
      note: "Traceable back to a dated record",
    },
    {
      value: "0",
      label: "INDIVIDUAL-LEVEL QUERIES POSSIBLE",
      note: "Not a target — a structural property",
    },
    {
      value: "4 / year",
      label: "TRANSPARENCY REPORTS PUBLISHED",
      note: "Signed by the independent monitor",
    },
  ],
};
