import type { CrisisView } from "@/lib/data/types";

export const crisisView: CrisisView = {
  title: "Claim that four county hospitals close in September is circulating without a source",

  kpis: [
    {
      label: "VELOCITY",
      value: "6.4×",
      color: "#e08b87",
      note: "vs 30-day baseline for health topics",
    },
    {
      label: "EST. REACH",
      value: "340K",
      color: "#E7EAF2",
      note: "4 voivodeships, mostly social",
    },
    {
      label: "VERIFIED FALSE",
      value: "06:02",
      color: "#8fc4ab",
      note: "Ground truth on file, 2 sources",
    },
    { label: "OFFICIAL REPLY", value: "NONE", color: "#e0a04f", note: "No statement issued yet" },
  ],

  timeline: [
    {
      time: "04:18",
      event: "First post naming four hospitals, no source cited",
      source: "Public social post · regional group",
      tag: "ORIGIN",
      kind: "origin",
    },
    {
      time: "04:51",
      event: "Screenshot reposted with an added closure date",
      source: "Multiple accounts · content mutated",
      tag: "MUTATION",
      kind: "mutation",
    },
    {
      time: "05:26",
      event: "Regional online outlet aggregates the claim as a question",
      source: "Serwis Południe",
      tag: "PRESS PICKUP",
      kind: "pickup",
    },
    {
      time: "06:02",
      event: "Regional health authority confirms no closure order exists",
      source: "Direct confirmation · analysis desk",
      tag: "GROUND TRUTH",
      kind: "truth",
    },
    {
      time: "06:40",
      event: "Constituent contacts on hospital access up 4×",
      source: "Contact intake · aggregated",
      tag: "PUBLIC IMPACT",
      kind: "impact",
    },
    {
      time: "07:05",
      event: "Two national outlets request comment",
      source: "Press office queue",
      tag: "PENDING",
      kind: "pending",
    },
  ],

  hotRegions: [
    { name: "Podkarpackie", multiplier: "6.4×" },
    { name: "Świętokrzyskie", multiplier: "4.1×" },
    { name: "Lubelskie", multiplier: "3.3×" },
    { name: "Małopolskie", multiplier: "1.9×" },
  ],

  steps: [
    {
      label: "Confirm facts with the regional health authority",
      owner: "ANALYSIS DESK · done 06:02",
      isDone: true,
    },
    {
      label: "Publish plain-language service note: which wards, which dates",
      owner: "PRESS OFFICE · done 06:48",
      isDone: true,
    },
    {
      label: "Brief affected county officials before media reply",
      owner: "REGIONAL LIAISON · in progress",
      isDone: false,
    },
    {
      label: "Answer the two pending press requests with the same text",
      owner: "PRESS OFFICE · queued",
      isDone: false,
    },
    {
      label: "Log the incident and origin for the transparency report",
      owner: "COMPLIANCE · queued",
      isDone: false,
    },
  ],

  groundTruth:
    "Regional health authority confirms no closure order exists. Two of the four named hospitals have scheduled ward renovations in Q4, published in the June bulletin — the likely origin of the claim.",
  groundTruthMeta: "Verified 06:02 by analysis desk\nTwo independent confirmations on file",

  escalationGate:
    "Level 3 requires sign-off from the ministry press office and the independent monitor. Escalation cannot be triggered from this account.",
};
