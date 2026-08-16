import type { StoryTracker } from "@/lib/data/types";

/** Press share of hourly volume — the remainder is social platforms. */
const PRESS_SHARE = 0.42;

const hourly = [
  3, 5, 9, 14, 11, 7, 5, 4, 6, 12, 21, 33, 46, 52, 61, 74, 88, 96, 84, 71, 62, 78, 104, 118,
];

export const storyTracker: StoryTracker = {
  badge: "PARTLY UNVERIFIED",
  meta: "STORY #4182 · first seen 27 Jul 21:06 · 94 items",
  title: "Energy tariff revision leaks before the committee vote",
  lead: "A draft annex circulated to two outlets suggests household tariffs would rise 8–11% from January. The ministry has neither confirmed nor denied the figure. Coverage is splitting into a cost-of-living frame and a procedural-leak frame, with regional press leaning heavily on the former.",

  spread: hourly.map((total) => {
    const press = Math.round(total * PRESS_SHARE);
    return { press, social: total - press };
  }),
  spreadPeak: "peak 06:00 · 118 items/h",

  framings: [
    {
      outlet: "Kurier Krajowy",
      type: "National daily",
      frame: "Cost of living",
      phrase: "another winter of bills",
      tone: "−58",
      toneValue: 58,
    },
    {
      outlet: "Dziennik Poranny",
      type: "National daily",
      frame: "Procedural leak",
      phrase: "who saw the annex first",
      tone: "−31",
      toneValue: 31,
    },
    {
      outlet: "TV Panorama",
      type: "Broadcast",
      frame: "Household impact",
      phrase: "what it means per month",
      tone: "−22",
      toneValue: 22,
    },
    {
      outlet: "Głos Regionu",
      type: "Regional network",
      frame: "Local services",
      phrase: "the south will pay most",
      tone: "−64",
      toneValue: 64,
    },
    {
      outlet: "Tygodnik Debata",
      type: "Weekly",
      frame: "Policy trade-offs",
      phrase: "the arithmetic of the grid",
      tone: "−9",
      toneValue: 9,
    },
  ],

  checks: [
    {
      kind: "confirmed",
      claim: "A draft annex exists and was circulated internally",
      status: "CONFIRMED · 2 independent sources",
    },
    {
      kind: "pending",
      claim: "The 8–11% range is the figure in that annex",
      status: "UNCONFIRMED · ministry declined to comment",
    },
    {
      kind: "refuted",
      claim: "The increase takes effect in January regardless of the vote",
      status: "FALSE · committee vote is binding",
    },
    {
      kind: "pending",
      claim: "Regional distribution differs from the national rate",
      status: "PENDING · analysis desk, ETA 12:00",
    },
  ],

  parliamentary: [
    {
      title: "Committee on Energy — tariff annex reading",
      meta: "SCHEDULED 30 JUL 10:00 · 23 members",
    },
    {
      title: "Written question 4471 on tariff methodology",
      meta: "FILED 26 JUL · answer due 9 AUG",
    },
    { title: "Previous vote on the 2025 tariff cap", meta: "PASSED 231–198 · 12 abstentions" },
  ],

  briefingNote:
    "Public concern is about the size of the bill, not the leak. A factual clarification of the timetable — with the actual range and who decides it — answers the dominant question. Silence until the vote is likely to be read as confirmation.",

  useLimits:
    "No author-level profiles. No amplification tooling. Journalist identities are not stored. This view was opened by M. Kowalczyk at 07:12 and is in the audit log.",
};
