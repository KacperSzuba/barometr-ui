import type { LegislativePulse } from "@/lib/data/types";

export const legislativePulse: LegislativePulse = {
  bills: [
    {
      code: "DRUK 412",
      title: "Household energy tariff cap",
      stage: "Committee",
      support: 64,
      oppose: 21,
      unaware: 15,
      salience: "HIGH",
      delta: "+6",
      next: "Committee vote 30 Jul",
    },
    {
      code: "DRUK 388",
      title: "Rent stabilisation in high-pressure cities",
      stage: "First reading",
      support: 58,
      oppose: 29,
      unaware: 13,
      salience: "HIGH",
      delta: "+2",
      next: "First reading 4 Aug",
    },
    {
      code: "DRUK 355",
      title: "Rural GP incentive scheme",
      stage: "Committee",
      support: 71,
      oppose: 12,
      unaware: 17,
      salience: "MEDIUM",
      delta: "+1",
      next: "Expert hearing 6 Aug",
    },
    {
      code: "DRUK 341",
      title: "School curriculum hours reform",
      stage: "Second reading",
      support: 37,
      oppose: 44,
      unaware: 19,
      salience: "MEDIUM",
      delta: "−5",
      next: "Second reading 12 Aug",
    },
    {
      code: "DRUK 297",
      title: "Municipal waste levy revision",
      stage: "Senate",
      support: 31,
      oppose: 52,
      unaware: 17,
      salience: "LOW",
      delta: "−3",
      next: "Senate sitting 9 Aug",
    },
    {
      code: "DRUK 260",
      title: "Public transport funding formula",
      stage: "Signed",
      support: 49,
      oppose: 26,
      unaware: 25,
      salience: "LOW",
      delta: "0",
      next: "In force 1 Sep",
    },
  ],

  details: {
    "DRUK 412": {
      informed: 71,
      misconceptions: [
        ["Believe the cap also covers businesses", 41],
        ["Believe it starts in January regardless of the vote", 33],
        ["Believe it is paid for by a new household tax", 27],
      ],
      objections: [
        ["Will be reversed after the next election", 38],
        ["Helps everyone equally instead of those in need", 31],
        ["Suspect the grid operator absorbs it as profit", 22],
      ],
      note: "Support is real but shallow: it rises 7 pt after one page of neutral explanation, and the biggest objection is durability, not principle. A dated, binding timetable does more for confidence than any additional spending.",
      evidence:
        "Deliberative poll n = 1 200 · 4 focus groups · 412 contact cluster · 94 coverage items",
    },
    "DRUK 341": {
      informed: 33,
      misconceptions: [
        ["Believe total teaching hours are cut", 46],
        ["Believe subjects are being removed entirely", 29],
        ["Believe it takes effect this September", 24],
      ],
      objections: [
        ["Teachers were not consulted", 52],
        ["Timing lands mid school year", 34],
        ["No transition funding for schools", 25],
      ],
      note: "One of the few bills where informed opinion falls: the more people read the detail, the less they like the sequencing. That is a design problem, not a communication problem.",
      evidence: "Deliberative poll n = 980 · 2 town halls · 141 contact cluster",
    },
  },

  fallback: {
    informed: 55,
    misconceptions: [
      ["Uncertain what the bill actually changes", 44],
      ["Confuse it with an earlier draft", 26],
      ["Believe it applies nationally when it is regional", 19],
    ],
    objections: [
      ["Doubt it will be enforced", 33],
      ["Expect costs to be passed on", 28],
      ["Prefer money spent elsewhere", 21],
    ],
    note: "Awareness is the binding constraint here, not opposition. Anything briefed on this bill should start from what it does, not from why it is right.",
    evidence: "Weekly omnibus n = 1 010 · 37 coverage items",
  },

  unawareNote:
    "“Unaware” is reported as loudly as support. A bill with 25% unawareness has a communication problem that no support figure can hide, and briefing on its popularity alone would be misleading.",
};
