import type { Deliberation } from "@/lib/data/types";

export const deliberation: Deliberation = {
  themes: [
    {
      theme: "Distrust is about the timetable, not the policy",
      strength: "STRONG",
      where: "All four sessions",
      quote: "Tell me the date and I will plan around it. Do not tell me it is being considered.",
    },
    {
      theme: "People price fairness by comparison with neighbours",
      strength: "STRONG",
      where: "Kraków, Katowice",
      quote: "If the block next door pays less for the same flat, no explanation will help.",
    },
    {
      theme: "Official language is read as evasion",
      strength: "MEDIUM",
      where: "Rzeszów, online",
      quote: "When it says analysis is ongoing, we hear nothing will happen.",
    },
    {
      theme: "Support rises when trade-offs are shown honestly",
      strength: "MEDIUM",
      where: "Panel, online",
      quote: "Show me what gets cut to pay for it and I will tell you if it is worth it.",
    },
  ],

  sessions: [
    {
      type: "Citizens’ panel",
      place: "Kraków",
      date: "12–13 Jul",
      n: 48,
      method: "Stratified random · 2 days · paid",
      representativeness: "Broadly representative",
    },
    {
      type: "Town hall",
      place: "Rzeszów",
      date: "19 Jul",
      n: 210,
      method: "Open attendance · self-selected",
      representativeness: "NOT representative — read as testimony",
    },
    {
      type: "Focus groups ×4",
      place: "Katowice",
      date: "22 Jul",
      n: 32,
      method: "Quota-recruited · 90 min",
      representativeness: "Indicative only",
    },
    {
      type: "Online deliberation",
      place: "National",
      date: "25 Jul",
      n: 390,
      method: "Panel sample · moderated",
      representativeness: "Weighted to census",
    },
  ],

  reach: [
    { label: "Age 18–29", value: 82 },
    { label: "Age 30–49", value: 104 },
    { label: "Age 50–64", value: 111 },
    { label: "Age 65+", value: 71 },
    { label: "Rural", value: 88 },
    { label: "Large cities", value: 118 },
  ],

  reachNote:
    "Amber bars are outside ±15% of the census share. Over-65s and rural residents are under-reached this cycle — the next two sessions are being placed accordingly, and any briefing drawn from this round says so on the page.",

  methodNote:
    "Qualitative work does not measure how many. It explains why the quantitative numbers move, and it is the only part of the system where a citizen speaks in full sentences. Themes are coded by two analysts independently; disagreements are recorded, not resolved by seniority.",
};
