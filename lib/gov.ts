/**
 * The Gov console has its own internal navigation — 15 screens in six groups.
 * Its copy is entirely in English, matching the `Barometr.dc.html` prototype.
 */

import type { Veracity } from "@/lib/data/types";

export interface GovScreen {
  /** Route segment; `""` means `/gov`. */
  segment: string;
  label: string;
  /** Counter next to the item; `!` renders as an alarm. */
  badge?: string;
}

export interface GovNavGroup {
  label: string;
  items: GovScreen[];
}

export const GOV_NAV: GovNavGroup[] = [
  { label: "THE IDEA", items: [{ segment: "", label: "Product concept" }] },
  {
    label: "LISTEN",
    items: [
      { segment: "briefing", label: "Morning briefing" },
      { segment: "map", label: "Regional sentiment" },
      { segment: "coverage", label: "Coverage compare" },
      { segment: "inbox", label: "Constituent inbox", badge: "1284" },
      { segment: "research", label: "Deliberation desk" },
    ],
  },
  {
    label: "UNDERSTAND",
    items: [
      { segment: "story", label: "Story tracker", badge: "94" },
      { segment: "bills", label: "Legislative pulse" },
      { segment: "polls", label: "Polls & method" },
    ],
  },
  {
    label: "RESPOND",
    items: [
      { segment: "verify", label: "Verification desk", badge: "7" },
      { segment: "alert", label: "Crisis view", badge: "!" },
      { segment: "reports", label: "Daily pack builder" },
    ],
  },
  {
    label: "GOVERN",
    items: [
      { segment: "audit", label: "Audit & access" },
      { segment: "portal", label: "Public mirror" },
    ],
  },
  { label: "FIELD", items: [{ segment: "mobile", label: "Mobile companion" }] },
];

/** Builds a screen route — an empty segment points at the console root. */
export const govHref = (segment: string) => (segment ? `/gov/${segment}` : "/gov");

/** Badges above the content — shared by every screen of the console. */
export const GOV_BADGES = [
  { label: "READ-ONLY LISTENING MODE", tone: "amber" as const },
  { label: "AGREGATY · k ≥ 50", tone: "emerald" as const },
  { label: "29 VII 2026 · 07:12", tone: "neutral" as const },
];

/** Guarantees listed in the governance card under the navigation. */
export const GOV_GUARANTEES = [
  "No outbound posting or ad targeting",
  "Aggregates only, k ≥ 50",
  "Every query written to audit log",
];

/**
 * Veracity badge — shared by the briefing and the claim ledger (the prototype
 * keeps it in a single `vStyle` helper).
 */
export const VERACITY_TONE: Record<Veracity, string> = {
  false: "bg-accent text-ink",
  disputed: "bg-amber text-ink",
  verified: "bg-ink/[.08] text-ink/60",
};

/** Gov account settings tabs — reached from the user card, not the screen nav. */
export const GOV_SETTINGS_TABS = [
  { label: "Profile", href: "/gov/settings" },
  { label: "Notifications", href: "/gov/settings/notifications" },
  { label: "Security", href: "/gov/settings/security" },
  { label: "Data", href: "/gov/settings/data" },
  { label: "Team", href: "/gov/settings/team" },
  { label: "Billing", href: "/gov/settings/billing" },
] as const;

export interface GovUserMenuEntry {
  label: string;
  hint: string;
  href: string;
}

/** Signed-in operator of the Gov console. */
export const GOV_USER = {
  initials: "MK",
  name: "Maria Kowalczyk",
  role: "Policy advisor · clearance B",
};

/**
 * Entries of the account dropdown. Each one deep-links into a settings tab;
 * the audit shortcut is last because it leaves the settings area.
 */
export const GOV_USER_MENU: GovUserMenuEntry[] = [
  { label: "Account & profile", hint: "Name, office, language", href: "/gov/settings" },
  {
    label: "Notifications",
    hint: "Alerts, briefing, quiet hours",
    href: "/gov/settings/notifications",
  },
  { label: "Security & sessions", hint: "2FA on · 3 devices", href: "/gov/settings/security" },
  { label: "Data & privacy", hint: "What this account may query", href: "/gov/settings/data" },
  { label: "Team & seats", hint: "12 of 20 seats used", href: "/gov/settings/team" },
  {
    label: "Billing & payment",
    hint: "Institutional contract · invoice 07/2026",
    href: "/gov/settings/billing",
  },
];

export const GOV_AUDIT_SHORTCUT: GovUserMenuEntry = {
  label: "Audit log",
  hint: "Everything this account did",
  href: "/gov/audit",
};
