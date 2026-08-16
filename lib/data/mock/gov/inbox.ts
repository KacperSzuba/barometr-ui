import type { ConstituentInbox } from "@/lib/data/types";

export const constituentInbox: ConstituentInbox = {
  intake: [
    {
      label: "CONTACTS · 24H",
      value: "1 284",
      note: "Email 58% · form 27% · phone 11% · letter 4%",
    },
    { label: "CLUSTERED", value: "9", note: "Above the k = 50 threshold" },
    { label: "BELOW THRESHOLD", value: "146", note: "Held, never shown as a trend" },
    { label: "MEDIAN FIRST REPLY", value: "31 h", note: "Statutory limit 30 days" },
  ],

  clusters: [
    {
      topic: "Energy bills — asking for instalment plans",
      count: 412,
      region: "Śląskie · Podkarpackie · Łódzkie",
      mix: "Email 61% · form 28% · call 11%",
      status: "ROUTED TO POLICY",
      statusKind: "routed",
      paraphrase: "I can pay, but not all at once in January. Let us spread it.",
    },
    {
      topic: "Identical text opposing the tariff cap",
      count: 377,
      region: "National, no regional pattern",
      mix: "Form 96% · email 4%",
      status: "DISCLOSED AS CAMPAIGN",
      statusKind: "flagged",
      paraphrase: "Template submission, 377 near-identical bodies, 3 origin domains.",
      flag: "COORDINATED",
      flagKind: "coordinated",
    },
    {
      topic: "Rent rises after building renovations",
      count: 188,
      region: "Mazowieckie · Małopolskie",
      mix: "Email 44% · form 39% · letter 17%",
      status: "IN ANALYSIS",
      statusKind: "analysis",
      paraphrase: "The renovation was needed. The new rent is not survivable.",
    },
    {
      topic: "School transport in rural counties",
      count: 141,
      region: "Warmińsko-mazurskie · Podlaskie",
      mix: "Call 52% · email 33% · form 15%",
      status: "ROUTED TO CASEWORK",
      statusKind: "routed",
      paraphrase: "Two buses were cut. My child now waits ninety minutes.",
    },
    {
      topic: "Hospital closure worry (rumour-linked)",
      count: 96,
      region: "Podkarpackie",
      mix: "Call 61% · email 39%",
      status: "LINKED TO ALERT #221",
      statusKind: "rumour",
      paraphrase: "Just tell us honestly whether the ward is closing.",
      flag: "RUMOUR-LINKED",
      flagKind: "rumour",
    },
    {
      topic: "Delays in disability benefit decisions",
      count: 74,
      region: "National",
      mix: "Letter 46% · email 38% · call 16%",
      status: "INDIVIDUAL CASEWORK",
      statusKind: "analysis",
      paraphrase: "Four months without a decision and no one answers the phone.",
    },
  ],

  coordinationNote:
    "377 near-identical submissions arrived through a campaign template. They are labelled, counted once as a campaign and once as 377 people who chose to send it — organised opinion is still opinion. What the label prevents is a template being briefed as spontaneous grassroots feeling.",

  separationNote:
    "A letter asking for help with a specific case goes to the casework system, with a name, a file and a legal deadline. Only the anonymised, clustered signal reaches this analytics view. The two databases do not join — deliberately, and verifiably.",

  heldBackNote:
    "Below the k = 50 floor. They are answered individually as casework, but they will not appear here as a trend, however tempting the story.",
};
