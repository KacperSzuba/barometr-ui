import type { Polls } from "@/lib/data/types";

/** Full series length; shorter ranges take the tail of this series. */
const FULL_LENGTH = 26;

/**
 * Synthetic support series — drift plus a sine component, exactly as `mk()` does
 * in the prototype. Demo data, not a model; it belongs in the mock.
 */
const trend = (base: number, drift: number, amplitude: number, phase: number): number[] =>
  Array.from({ length: FULL_LENGTH }, (_, i) =>
    Number(
      (base + (drift * i) / (FULL_LENGTH - 1) + amplitude * Math.sin(i / 4 + phase)).toFixed(1),
    ),
  );

export const polls: Polls = {
  ranges: ["3 months", "6 months", "12 months"],

  pointsPerRange: {
    "3 months": 8,
    "6 months": 14,
    "12 months": 26,
  },

  xLabels: {
    "3 months": ["May 26", "Jun 26", "Jul 26"],
    "6 months": ["Feb 26", "Apr 26", "May 26", "Jun 26", "Jul 26"],
    "12 months": ["Aug 25", "Nov 25", "Feb 26", "May 26", "Jul 26"],
  },

  series: [
    { name: "Bloc A", color: "#BDB0FF", values: trend(34.5, -3.2, 1.4, 0.4) },
    { name: "Bloc B", color: "#7FE9CB", values: trend(28.1, 3.6, 1.1, 2.1) },
    { name: "Party C", color: "#b5734f", values: trend(12.4, 1.1, 0.8, 1.2) },
    { name: "Party D", color: "#3f5d7d", values: trend(9.2, -0.6, 0.6, 3.0) },
  ],

  history: [
    {
      date: "27 Jul 2026",
      avg: "31.3",
      delta: "−0.4",
      polls: 6,
      spread: "6.4 pt",
      note: "Tariff leak lands mid-field",
    },
    { date: "20 Jul 2026", avg: "31.7", delta: "−0.2", polls: 5, spread: "4.1 pt", note: "" },
    {
      date: "13 Jul 2026",
      avg: "31.9",
      delta: "+0.6",
      polls: 7,
      spread: "3.8 pt",
      note: "Rail programme coverage",
    },
    { date: "06 Jul 2026", avg: "31.3", delta: "−0.9", polls: 5, spread: "5.2 pt", note: "" },
    { date: "29 Jun 2026", avg: "32.2", delta: "+0.1", polls: 6, spread: "3.4 pt", note: "" },
    {
      date: "22 Jun 2026",
      avg: "32.1",
      delta: "−1.3",
      polls: 4,
      spread: "7.1 pt",
      note: "One house re-weighted its panel",
    },
  ],

  rows: [
    {
      house: "Instytut Kappa",
      field: "22–25 Jul",
      n: 1010,
      mode: "CATI",
      value: 46.4,
      effect: "−0.8",
      client: "Public broadcaster",
    },
    {
      house: "Omnibus Sigma",
      field: "23–25 Jul",
      n: 1200,
      mode: "CAWI",
      value: 49.1,
      effect: "+1.6",
      client: "Kurier Krajowy",
    },
    {
      house: "Pracownia Delta",
      field: "21–24 Jul",
      n: 900,
      mode: "Mixed",
      value: 47.0,
      effect: "−0.2",
      client: "Own commission",
    },
    {
      house: "Barometr field team",
      field: "24–26 Jul",
      n: 2400,
      mode: "Mixed",
      value: 47.3,
      effect: "0.0",
      client: "This office",
    },
    {
      house: "Centrum Rho",
      field: "18–21 Jul",
      n: 1050,
      mode: "CAPI",
      value: 44.8,
      effect: "−1.9",
      client: "Academic consortium",
    },
    {
      house: "Panel Theta",
      field: "24–26 Jul",
      n: 780,
      mode: "CAWI",
      value: 51.2,
      effect: "+3.1",
      client: "Undisclosed",
      isFlagged: true,
    },
  ],

  warnings: [
    "Panel Theta asks a different question stem (“approve of the government” vs “mood about the country”). It is shown, but excluded from the average — averaging incompatible questions is how a briefing becomes wrong.",
    "Two houses have not published weighting schemes for July. Their entries are greyed in exports.",
    "Field dates overlap the tariff leak. Anything fielded before 27 Jul predates it.",
  ],
};
