import type { GovSettings } from "@/lib/data/types";

export const govSettings: GovSettings = {
  profile: {
    initials: "MK",
    name: "Maria Kowalczyk",
    meta: "m.kowalczyk@ministerstwo.example · seat 4 of 20",
    fields: [
      { label: "FULL NAME", value: "Maria Kowalczyk" },
      { label: "ROLE", value: "Policy advisor · Energy and infrastructure" },
      { label: "OFFICE", value: "Ministry programme office, Warsaw" },
      { label: "CLEARANCE", value: "B — aggregate + regional detail, no raw items" },
      {
        label: "GRANTED BY",
        value: "Director of the analysis desk · 4 Feb 2026 · review due 4 Feb 2027",
      },
      { label: "INTERFACE LANGUAGE", value: "Polski (PL) · English available" },
      { label: "TIME ZONE", value: "Europe/Warsaw (CEST)" },
      { label: "BRIEFING DELIVERY", value: "06:40 daily · desktop and mobile" },
    ],
    clearanceNote:
      "Clearance is granted by a named person for a fixed term, not by an administrator toggle. When it lapses, access to regional detail stops automatically and the briefing degrades to national aggregates.",
  },

  notifications: {
    rows: [
      { event: "Crisis alert, level 2 and above", email: true, push: true, sms: true },
      { event: "Morning briefing ready", email: true, push: true, sms: false },
      { event: "Verification verdict on a tracked claim", email: true, push: true, sms: false },
      { event: "Constituent cluster crosses threshold", email: true, push: false, sms: false },
      { event: "Weekly method and polling digest", email: true, push: false, sms: false },
      { event: "Audit log entry naming me", email: true, push: false, sms: false },
    ],
    quietHours:
      "22:00 – 06:00 · overridden only by level 3 crisis alerts, which also notify the duty officer",
  },

  security: {
    items: [
      {
        label: "TWO-FACTOR",
        value: "Hardware key (primary) + authenticator app",
        state: "ON",
      },
      {
        label: "SIGN-IN POLICY",
        value: "Government network or approved device only",
        state: "ENFORCED",
      },
      { label: "EXPORT PIN", value: "Required for every pack generation", state: "ON" },
      { label: "AUTO SIGN-OUT", value: "After 20 minutes idle on shared screens", state: "ON" },
      {
        label: "BREAK-GLASS ACCESS",
        value: "Two-person rule, monitor notified within 1 h",
        state: "ARMED",
      },
    ],
    sessions: [
      {
        device: "Desktop · Warsaw office",
        detail: "Chrome on Windows · 10.14.2.31",
        when: "Active now",
      },
      {
        device: "Government phone",
        detail: "Barometr Mobile · SIM-bound",
        when: "Last used 06:58",
      },
      {
        device: "Tablet · ministerial car",
        detail: "Read-only profile, no export",
        when: "Last used 27 Jul, 19:20",
      },
    ],
  },

  data: {
    items: [
      {
        label: "THIS ACCOUNT MAY QUERY",
        value: "Aggregates at k ≥ 50, regional detail, coverage, polls",
      },
      {
        label: "THIS ACCOUNT MAY NEVER QUERY",
        value: "Named individuals, journalist activity, contact bodies below threshold",
      },
      {
        label: "MY EXPORTS",
        value: "14 packs in 90 days · all watermarked · 2 expired unopened",
      },
      {
        label: "MY ACTIVITY RETENTION",
        value: "Audit entries kept 7 years, readable by the monitor and by me",
      },
      {
        label: "DOWNLOAD MY TRAIL",
        value: "Everything this account did, as CSV, no approval needed",
      },
    ],
    scopeNote:
      "A scope change is a request, not a setting. It goes to the analysis desk and the independent monitor, and the decision — including a refusal — is written into the quarterly transparency report.",
  },

  team: {
    members: [
      { name: "M. Kowalczyk", role: "Policy advisor", clearance: "B", last: "now" },
      { name: "A. Nowak", role: "Press officer", clearance: "B+", last: "07:08" },
      { name: "J. Zieliński", role: "Analyst", clearance: "A", last: "06:31" },
      {
        name: "K. Wiśniewska",
        role: "Regional liaison · south",
        clearance: "C",
        last: "Yesterday",
      },
      { name: "P. Lewandowski", role: "Independent monitor", clearance: "M", last: "05:58" },
      {
        name: "Seat pending",
        role: "Deputy press officer",
        clearance: "—",
        last: "Awaiting monitor sign-off",
        isPending: true,
      },
    ],
    inviteNote:
      "Invitations are countersigned by the monitor. Offboarding is automatic on the day someone leaves the office — access ends before the handover meeting, not after it.",
  },

  billing: {
    plan: [
      { label: "CONTRACT", value: "Institutional licence · public body tier" },
      { label: "TERM", value: "1 Jan 2026 – 31 Dec 2026 · renews by tender" },
      { label: "SEATS", value: "12 of 20 used · 5 read-only mobile included" },
      { label: "MONITORING SCOPE", value: "428 sources · 4 broadcast streams · 16 regions" },
      { label: "PROCUREMENT REF", value: "PO-2026/ENG/0417 · framework agreement 3/2025" },
      { label: "BILLING ENTITY", value: "Ministry programme office · NIP 000-000-00-00" },
    ],
    price: "48 000 zł",
    priceNote: "net / month · VAT 23% added",

    usage: [
      { label: "Seats", value: "12 / 20", pct: 60 },
      { label: "Monitored sources", value: "428 / 500", pct: 86 },
      { label: "Pack exports this month", value: "146 / unlimited", pct: 34 },
      { label: "API calls (integrations)", value: "1.2M / 2M", pct: 60 },
    ],

    paymentTitle: "Bank transfer · 14-day terms",
    paymentDetail: "PL** **** **** **** **** **** 4417 · Ministry finance dept",
    paymentNote:
      "Card payment is disabled for public-body contracts. Invoices settle against the procurement order, and every seat change is reconciled to it.",

    invoices: [
      {
        no: "FV 07/2026",
        period: "July 2026",
        amount: "48 000,00 zł",
        status: "PAID",
        isPaid: true,
        date: "Paid 12 Jul",
      },
      {
        no: "FV 06/2026",
        period: "June 2026",
        amount: "48 000,00 zł",
        status: "PAID",
        isPaid: true,
        date: "Paid 11 Jun",
      },
      {
        no: "FV 08/2026",
        period: "August 2026",
        amount: "48 000,00 zł",
        status: "SCHEDULED",
        isPaid: false,
        date: "Issues 1 Aug",
      },
      {
        no: "FV 05/2026",
        period: "May 2026 · +4 seats",
        amount: "54 400,00 zł",
        status: "PAID",
        isPaid: true,
        date: "Paid 14 May",
      },
    ],

    invoiceNote:
      "Spending on this contract is published in the annual transparency report, line by line.",
  },
};
