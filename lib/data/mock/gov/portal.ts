import type { PublicMirror } from "@/lib/data/types";

export const publicMirror: PublicMirror = {
  url: "barometr.gov.example / dane",
  headline: "What the government is being told about you",
  lede: "This page publishes the same public-opinion figures that reach the minister’s morning briefing, at the same time, with the same margins of error — plus everything we got wrong and had to correct.",
  moodValue: "47.2",
  moodMeta: "±2.1 · n = 6 800",

  cards: [
    {
      kicker: "PUBLISHED TODAY",
      title: "National mood index 47.2",
      body: "Same figure, same error band, same method sheet as the internal briefing. Updated at 06:40 daily.",
    },
    {
      kicker: "CORRECTIONS REGISTER",
      title: "3 corrections in the last 30 days",
      body: "Every figure this office got wrong, what it should have been, and how long the correction took.",
    },
    {
      kicker: "METHOD",
      title: "Model cards and question wording",
      body: "Classifier performance, sampling frames, weighting schemes and the full question bank, in plain Polish.",
    },
    {
      kicker: "NOT COLLECTED",
      title: "What we deliberately do not hold",
      body: "No named citizens, no journalist profiles, no political affiliation of correspondents, no biometric or location data.",
    },
  ],

  claim: "If the public can see what the powerful see, monitoring stays monitoring.",
};
