import type { MobileCompanion } from "@/lib/data/types";
import { briefing } from "./briefing";

/*
 * The phone has no story list of its own — the prototype takes
 * `stories.slice(0, 4)` from the briefing. The sharing stays inside the mock
 * layer; the view still only sees `getMobileCompanion()`.
 */
export const mobileCompanion: MobileCompanion = {
  notes: [
    {
      n: "01",
      text: "Three cards maximum before the fold — mood, open alert, top story. Anything longer does not survive a corridor walk.",
    },
    {
      n: "02",
      text: "Every number carries its margin of error inline. A principal quoting a figure should see its uncertainty in the same glance.",
    },
    {
      n: "03",
      text: "The phone is deliberately read-only: no export, no citizen search, no sharing. Sensitive aggregates stay on the desktop, inside the audit trail.",
    },
  ],

  statusTime: "07:12",
  statusDate: "TUE 28 JUL",

  moodValue: "47.2",
  moodDelta: "−1.8",
  moodSpark: [51, 50, 50, 49, 49, 48, 49, 48, 48, 47, 48, 47, 47, 48, 47, 47],
  moodMeta: "±2.1 · n = 6 800 · updated 06:40",

  alert: {
    title: "Hospital-closure claim spreading in the south-east",
    meta: "Unverified · 6.4× baseline · ground truth on file",
  },

  stories: briefing.stories.slice(0, 4),

  tabs: ["Briefing", "Regions", "Alerts", "Notes"],

  footer: "Synthetic demo data. Read-only device: no export, no citizen search, session logged.",
};
