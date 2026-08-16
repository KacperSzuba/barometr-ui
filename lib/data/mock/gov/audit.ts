import type { AuditTrail } from "@/lib/data/types";

export const auditTrail: AuditTrail = {
  log: [
    {
      time: "07:12:04",
      user: "M. Kowalczyk",
      action: "Opened story #4182",
      scope: "Aggregate view",
      result: "OK",
      kind: "ok",
    },
    {
      time: "07:08:51",
      user: "A. Nowak (press)",
      action: "Generated pack PACK-2026-0728-A",
      scope: "1 recipient",
      result: "OK · watermarked",
      kind: "ok",
    },
    {
      time: "06:55:12",
      user: "External connector",
      action: "Export request to campaign CRM",
      scope: "Contact clusters",
      result: "BLOCKED · policy 4.2",
      kind: "blocked",
    },
    {
      time: "06:40:00",
      user: "System",
      action: "Briefing generated",
      scope: "3 140 items",
      result: "OK · 2 stories suppressed (k < 50)",
      kind: "ok",
    },
    {
      time: "06:31:47",
      user: "J. Zieliński (analyst)",
      action: "Query: contacts by name",
      scope: "Individual level",
      result: "BLOCKED · query type unsupported",
      kind: "blocked",
    },
    {
      time: "06:02:33",
      user: "Analysis desk",
      action: "Ground truth filed for alert #221",
      scope: "2 confirmations",
      result: "OK",
      kind: "ok",
    },
    {
      time: "05:58:10",
      user: "Independent monitor",
      action: "Read audit log, 24h window",
      scope: "Full",
      result: "OK · no findings",
      kind: "monitor",
    },
  ],

  refusalNote:
    "Two attempts today were refused by the system, not by a person: an export connector reaching for contact clusters, and an analyst query written at individual level. Both are shown here because a guardrail nobody can see is a guardrail nobody trusts.",

  retention: [
    { label: "Public social posts", left: "purge in 12 days", pct: 68 },
    { label: "Broadcast transcripts", left: "purge in 7 months", pct: 42 },
    { label: "Contact bodies (raw text)", left: "purge in 19 days", pct: 84 },
    { label: "Aggregated indices", left: "kept permanently", pct: 0 },
  ],

  retentionNote:
    "Deletion is a scheduled job, not a request form. Raw text disappears; only aggregates survive.",

  monitorNotes: [
    {
      date: "Q2 2026",
      text: "Two queries approached the aggregation floor. Threshold logic verified in code, no breach.",
    },
    {
      date: "Q1 2026",
      text: "Recommended shortening social-post retention from 180 to 90 days. Implemented in March.",
    },
  ],

  monitorFooter: "Q3 report due 15 Oct · published in full on the public mirror",
};
