import type { Briefing, Region, RegionDetail } from "@/lib/data/types";

/** No `regions` — `mockSource` supplies the cartogram, shared with the map screen. */
export const briefing: Omit<Briefing, "regions"> = {
  kpis: [
    {
      label: "PUBLIC MOOD INDEX",
      value: "47.2",
      delta: "−1.8",
      direction: "down",
      note: "Below the 50 neutral line for a fifth week · ±2.1",
      spark: [51, 50, 50, 49, 49, 48, 49, 48, 48, 47, 48, 47, 47, 47],
      sparkColor: "#7C5CFF",
    },
    {
      label: "COVERAGE VOLUME",
      value: "3 140",
      delta: "+12%",
      direction: "up",
      note: "Items in 24h across 428 monitored sources",
      spark: [21, 24, 22, 26, 25, 29, 27, 31, 28, 33, 30, 36, 34, 41],
      sparkColor: "rgba(255,255,255,.06)",
    },
    {
      label: "DOMINANT ISSUE",
      value: "64%",
      delta: "+7 pt",
      direction: "up",
      note: "Share of contacts mentioning energy prices",
      spark: [38, 40, 42, 41, 45, 47, 46, 50, 52, 55, 57, 59, 61, 64],
      sparkColor: "#b5734f",
    },
    {
      label: "CONSTITUENT CONTACTS",
      value: "1 284",
      delta: "+4.1×",
      direction: "up",
      note: "Letters, calls, forms · 3 clusters above threshold",
      spark: [12, 14, 13, 15, 16, 15, 18, 17, 20, 24, 31, 44, 58, 71],
      sparkColor: "#1F9C7C",
    },
  ],

  filters: ["All", "Verified", "Disputed", "Rising"],

  stories: [
    {
      title: "Energy tariff revision leaks before the committee vote",
      summary:
        "Draft annex suggesting an 8–11% household increase reaches two outlets; ministry has not confirmed the figure.",
      meta: "94 ITEMS · 12 OUTLETS",
      veracity: "PARTLY UNVERIFIED",
      veracityKind: "disputed",
      tags: ["ENERGY", "COST OF LIVING", "LEAK"],
      negative: 62,
      neutral: 29,
      positive: 9,
      sentimentLabel: "−53",
      reach: "4.1M",
      velocity: "3.2× base",
    },
    {
      title: "Hospital-closure claim spreads across the south-east",
      summary:
        "No closure order exists; regional authority confirmed at 06:02. Two named hospitals have published Q4 renovations.",
      meta: "61 ITEMS · MOSTLY SOCIAL",
      veracity: "FALSE",
      veracityKind: "false",
      tags: ["HEALTH", "MISINFORMATION"],
      negative: 74,
      neutral: 21,
      positive: 5,
      sentimentLabel: "−69",
      reach: "340K",
      velocity: "6.4× base",
    },
    {
      title: "Rail investment programme reaches its first opening",
      summary: "Regional press coverage is warm and largely local; national pickup is thin so far.",
      meta: "48 ITEMS · 9 OUTLETS",
      veracity: "VERIFIED",
      veracityKind: "verified",
      tags: ["INFRASTRUCTURE", "REGIONS"],
      negative: 14,
      neutral: 34,
      positive: 52,
      sentimentLabel: "+38",
      reach: "1.2M",
      velocity: "1.4× base",
    },
    {
      title: "Committee hearing on housing bill draws long public queue",
      summary:
        "Broadcast transcripts show landlord-side and tenant-side arguments running at near-equal airtime.",
      meta: "37 ITEMS · 4 BROADCASTS",
      veracity: "VERIFIED",
      veracityKind: "verified",
      tags: ["HOUSING", "PARLIAMENT"],
      negative: 41,
      neutral: 42,
      positive: 17,
      sentimentLabel: "−24",
      reach: "860K",
      velocity: "1.1× base",
    },
    {
      title: "Two-day teachers’ action announced in three voivodeships",
      summary:
        "Contact volume from parents up 4× overnight, concentrated on childcare arrangements rather than the dispute itself.",
      meta: "29 ITEMS · 7 OUTLETS",
      veracity: "VERIFIED",
      veracityKind: "verified",
      tags: ["EDUCATION", "LABOUR"],
      negative: 52,
      neutral: 33,
      positive: 15,
      sentimentLabel: "−37",
      reach: "520K",
      velocity: "2.6× base",
    },
  ],

  /*
   * The prototype renders this card from an empty `{{ inbox }}` binding — the key
   * is missing from `renderVals()`. Clusters filled in using the format the
   * prototype uses for regional quotes: paraphrase + similar-contact count +
   * place.
   */
  inbox: [
    {
      channel: "LETTER",
      tone: "neutral",
      place: "Śląskie",
      count: "158",
      text: "Every winter the same conversation, and every winter the bill is higher. Tell us what the cap actually covers.",
    },
    {
      channel: "FORM",
      tone: "accent",
      place: "Podkarpackie",
      count: "96",
      text: "If the hospital in our county really closes, the nearest one is ninety minutes away. Nobody has answered us.",
    },
    {
      channel: "PHONE",
      tone: "amber",
      place: "Mazowieckie",
      count: "214",
      text: "We are not asking for handouts. We are asking why a flat costs eleven years of salary.",
    },
    {
      channel: "E-MAIL",
      tone: "neutral",
      place: "National",
      count: "61",
      text: "Two days without school and no guidance on childcare. Parents found out from the news, not from the office.",
    },
  ],

  provenance:
    "Ranking is by change in coverage volume and reach, not by editorial importance. Sentiment classes are model estimates (macro-F1 0.79 on Polish-language validation set) and carry ±4 pt error. Two stories were withheld from this briefing because source count fell below the k ≥ 50 aggregation threshold.",
};

export const regions: Region[] = [
  {
    abbr: "ZPM",
    name: "Zachodniopomorskie",
    value: 45.1,
    delta: "−0.9",
    n: 412,
    moe: 4.8,
    col: 1,
    row: 1,
  },
  { abbr: "POM", name: "Pomorskie", value: 52.4, delta: "+0.4", n: 640, moe: 3.9, col: 2, row: 1 },
  {
    abbr: "WAR",
    name: "Warmińsko-mazurskie",
    value: 41.8,
    delta: "−2.6",
    n: 388,
    moe: 5.1,
    col: 3,
    row: 1,
  },
  { abbr: "PDL", name: "Podlaskie", value: 43.2, delta: "−1.1", n: 351, moe: 5.4, col: 4, row: 1 },
  { abbr: "LBU", name: "Lubuskie", value: 46.6, delta: "+0.2", n: 402, moe: 4.9, col: 1, row: 2 },
  {
    abbr: "KUJ",
    name: "Kujawsko-pomorskie",
    value: 44.9,
    delta: "−1.4",
    n: 520,
    moe: 4.3,
    col: 2,
    row: 2,
  },
  {
    abbr: "MAZ",
    name: "Mazowieckie",
    value: 54.7,
    delta: "+1.2",
    n: 1180,
    moe: 2.9,
    col: 3,
    row: 2,
  },
  { abbr: "LUB", name: "Lubelskie", value: 42.5, delta: "−2.1", n: 498, moe: 4.4, col: 4, row: 2 },
  {
    abbr: "WLP",
    name: "Wielkopolskie",
    value: 49.8,
    delta: "−0.3",
    n: 760,
    moe: 3.6,
    col: 1,
    row: 3,
  },
  { abbr: "LDZ", name: "Łódzkie", value: 46.1, delta: "−1.0", n: 590, moe: 4.1, col: 2, row: 3 },
  {
    abbr: "SWI",
    name: "Świętokrzyskie",
    value: 40.3,
    delta: "−3.2",
    n: 344,
    moe: 5.5,
    col: 3,
    row: 3,
  },
  {
    abbr: "PKR",
    name: "Podkarpackie",
    value: 38.9,
    delta: "−4.1",
    n: 470,
    moe: 4.6,
    col: 4,
    row: 3,
  },
  {
    abbr: "DSL",
    name: "Dolnośląskie",
    value: 51.2,
    delta: "+0.6",
    n: 720,
    moe: 3.7,
    col: 1,
    row: 4,
  },
  { abbr: "OPO", name: "Opolskie", value: 47.4, delta: "−0.5", n: 296, moe: 5.9, col: 2, row: 4 },
  { abbr: "SLK", name: "Śląskie", value: 43.6, delta: "−2.9", n: 980, moe: 3.1, col: 3, row: 4 },
  {
    abbr: "MAL",
    name: "Małopolskie",
    value: 50.6,
    delta: "+0.8",
    n: 830,
    moe: 3.4,
    col: 4,
    row: 4,
  },
];

/** Region detail — three voivodeships have their own copy, the rest fall back. */
export const regionDetails: Record<string, RegionDetail> = {
  MAZ: {
    issues: [
      ["Housing costs", 71],
      ["Public transport", 48],
      ["Healthcare access", 44],
      ["Energy prices", 39],
    ],
    driver:
      "Mood held up as employment data improved, but housing dominates every channel — 71% of contacts from the capital area mention rent or mortgage costs, up 9 pt in a month.",
    quote: "We are not asking for handouts. We are asking why a flat costs eleven years of salary.",
    quoteSource: "Paraphrased cluster · 214 similar contacts · Warsaw metro",
  },
  PKR: {
    issues: [
      ["Healthcare access", 78],
      ["Energy prices", 61],
      ["Rail connections", 52],
      ["Youth outmigration", 44],
    ],
    driver:
      "Sharpest fall nationally. The unverified hospital-closure claim reached an estimated 340 000 people here before any official statement; healthcare mentions tripled overnight.",
    quote: "If the hospital in our county really closes, the nearest one is ninety minutes away.",
    quoteSource: "Paraphrased cluster · 96 similar contacts · south-east counties",
  },
  SLK: {
    issues: [
      ["Energy prices", 74],
      ["Industrial transition", 66],
      ["Air quality", 51],
      ["Healthcare access", 40],
    ],
    driver:
      "Tariff leak coverage landed hardest in industrial districts. Local press framing is almost entirely cost-of-living; the procedural angle barely appears.",
    quote: "Every winter the same conversation, and every winter the bill is higher.",
    quoteSource: "Paraphrased cluster · 158 similar contacts · Katowice conurbation",
  },
};

export const regionFallback: RegionDetail = {
  issues: [
    ["Energy prices", 64],
    ["Healthcare access", 55],
    ["Housing costs", 42],
    ["Local roads", 31],
  ],
  driver:
    "No single event dominates this week. Movement is within the margin of error and should not be briefed as a trend.",
  quote: "Tell us what changes and when. That is all.",
  quoteSource: "Paraphrased cluster · 61 similar contacts",
};
