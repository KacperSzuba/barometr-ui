import {
  Briefcase,
  Building,
  Check,
  Cpu,
  CreditCard,
  Globe,
  type IconComponent,
  Landmark,
  Map,
  Shield,
  Sliders,
  Sparkle,
} from "@/components/icons";
import type { Tone } from "@/lib/data/types";

/*
 * Internal section identity. Deliberately independent of the URL slug: the
 * product ships Polish URLs (`/wolny`, `/konfiguracja`) while the code stays in
 * English, so a slug can be changed for SEO without touching any identifier.
 */
export type SectionId =
  | "productMap"
  | "freeTier"
  | "proTier"
  | "localTier"
  | "gov"
  | "engine"
  | "account"
  | "configuration";

export interface Tab {
  label: string;
  /** Absolute path of the tab. */
  href: string;
}

export interface Badge {
  label: string;
  tone: Tone;
  /** Icon rendered before the label (only the product map uses it). */
  icon?: IconComponent;
  iconStroke?: number;
}

/**
 * The prototypes use two badge intensities: stronger in the consoles, softer on
 * the landing page. The difference is purely in background and border alpha.
 */
export type BadgeScale = "console" | "map";

/**
 * The live counter in the sidebar badge. Values transcribed from each
 * prototype's `pageDidMount()` — every page ticks at its own rhythm.
 */
export interface LiveCounter {
  start: number;
  /** Increment per tick: `min + random(spread)`. */
  min: number;
  spread: number;
  intervalMs: number;
  /** Builds the badge text from the counter's current value. */
  format: (value: string) => string;
}

export interface Section {
  id: SectionId;
  label: string;
  icon: IconComponent;
  /** The section's main route — also its first tab. */
  href: string;
  /** Subtitle under the brand name in the sidebar. */
  subtitle: string;
  /** Static live-badge text, for sections without a counter. */
  liveText?: string;
  live?: LiveCounter;
  tabs: Tab[];
  badges: Badge[];
  badgeScale?: BadgeScale;
}

const counter = (
  start: number,
  min: number,
  spread: number,
  intervalMs: number,
  format: LiveCounter["format"],
): LiveCounter => ({ start, min, spread, intervalMs, format });

export const SECTIONS: Record<SectionId, Section> = {
  productMap: {
    id: "productMap",
    label: "Mapa",
    icon: Map,
    href: "/",
    subtitle: "Monitoring instytucji",
    live: counter(3140, 1, 4, 2800, (n) => `${n} pozycji dziś · potok aktywny`),
    tabs: [
      { label: "Mapa produktu", href: "/" },
      { label: "Plany i płatności", href: "/plany" },
      { label: "Zgodność i zaufanie", href: "/zaufanie" },
    ],
    badgeScale: "map",
    badges: [
      { label: "WCAG 2.1 AA", tone: "emerald", icon: Check, iconStroke: 2.4 },
      { label: "RODO · DPA", tone: "neutral", icon: Shield },
      { label: "AI Act: modele jawne", tone: "accent", icon: Sparkle },
    ],
  },

  freeTier: {
    id: "freeTier",
    label: "Wolny",
    icon: Globe,
    href: "/wolny",
    subtitle: "Warstwa wolna · bez konta",
    live: counter(41820, 2, 7, 2600, (n) => `${n} pozycji przetworzonych dziś`),
    tabs: [
      { label: "Destylat dnia", href: "/wolny" },
      { label: "Legislacja i konsultacje", href: "/wolny/legislacja" },
      { label: "Ludzie i obietnice", href: "/wolny/ludzie" },
      { label: "Dane i korekty", href: "/wolny/dane" },
    ],
    badges: [
      { label: "TRAFNOŚĆ PROGNOZ: 78% W PASMIE", tone: "emerald" },
      { label: "KOREKT W TYM ROKU: 19", tone: "neutral" },
      { label: "BEZ KONTA · BEZ PAYWALLA", tone: "accent" },
    ],
  },

  proTier: {
    id: "proTier",
    label: "Pro",
    icon: Briefcase,
    href: "/pro",
    subtitle: "Pro · routing wpływu",
    live: counter(41820, 2, 6, 2700, (n) => `${n} pozycji dopasowanych do profilu`),
    tabs: [
      { label: "Wpływ na nas", href: "/pro" },
      { label: "Alerty i reguły", href: "/pro/alerty" },
      { label: "Analiza i archiwum", href: "/pro/analiza" },
      { label: "Rynek i zespół", href: "/pro/rynek" },
    ],
    badges: [
      { label: "4 TERMINY W TYM TYGODNIU", tone: "accent" },
      { label: "API: 41 820 / 100 000", tone: "neutral" },
    ],
  },

  localTier: {
    id: "localTier",
    label: "Local",
    icon: Building,
    href: "/local",
    subtitle: "Local · samorząd i media",
    live: counter(6918, 1, 3, 3000, (n) => `${n} dokumentów z BIP-ów w tym tygodniu`),
    tabs: [
      { label: "Gmina i BIP", href: "/local" },
      { label: "Sesje i radni", href: "/local/sesje" },
      { label: "Pieniądze i przetargi", href: "/local/pieniadze" },
      { label: "Mapa, alerty, redakcja", href: "/local/mapa" },
    ],
    badges: [
      { label: "PROTOKOŁY W TERMINIE: 96%", tone: "emerald" },
      { label: "PANEL REDAKCJI: 2 KONTA", tone: "neutral" },
    ],
  },

  gov: {
    id: "gov",
    label: "Gov",
    icon: Landmark,
    href: "/gov",
    subtitle: "Gov · tryb nasłuchu",
    /* the Gov console is in English — so is its badge */
    live: counter(3140, 1, 5, 2600, (n) => `LIVE · ${n} items from 428 sources`),
    tabs: [],
    badges: [],
  },

  engine: {
    id: "engine",
    label: "Silnik",
    icon: Cpu,
    href: "/silnik",
    subtitle: "Konsola silnika",
    live: counter(41820, 3, 9, 2400, (n) => `${n} pozycji / 24 h · potok aktywny`),
    tabs: [
      { label: "Pozyskiwanie", href: "/silnik" },
      { label: "Przetwarzanie", href: "/silnik/przetwarzanie" },
      { label: "Stan i incydenty", href: "/silnik/stan" },
    ],
    badges: [
      { label: "ROBOTS.TXT RESPEKTOWANE", tone: "emerald" },
      { label: "ZASTRZEŻENIA TDM: 41 DOMEN", tone: "emerald" },
    ],
  },

  account: {
    id: "account",
    label: "Konto",
    icon: CreditCard,
    href: "/konto",
    subtitle: "Konto, zespół, rozliczenia",
    liveText: "potok aktywny · dane odświeżane co 4 min",
    tabs: [
      { label: "Logowanie i sesje", href: "/konto" },
      { label: "Organizacja i role", href: "/konto/organizacja" },
      { label: "Płatności i faktury", href: "/konto/platnosci" },
      { label: "Powiadomienia", href: "/konto/powiadomienia" },
      { label: "Onboarding i wsparcie", href: "/konto/onboarding" },
      { label: "Bezpieczeństwo i API", href: "/konto/bezpieczenstwo" },
    ],
    badges: [
      { label: "PLAN PRO · 3 SEATY", tone: "accent" },
      { label: "FAKTURY: PRO FORMA I PRZELEW", tone: "neutral" },
    ],
  },

  configuration: {
    id: "configuration",
    label: "Konfiguracja",
    icon: Sliders,
    href: "/konfiguracja",
    subtitle: "Konfiguracja sygnału",
    liveText: "potok aktywny · dane odświeżane co 4 min",
    tabs: [
      { label: "Profil zainteresowań", href: "/konfiguracja" },
      { label: "Sygnał i próg", href: "/konfiguracja/sygnal" },
      { label: "Prezentacja treści", href: "/konfiguracja/prezentacja" },
      { label: "Źródła", href: "/konfiguracja/zrodla" },
      { label: "Zespół i eksport", href: "/konfiguracja/zespol" },
      { label: "Bezpieczniki", href: "/konfiguracja/bezpieczniki" },
    ],
    badges: [
      { label: "PROFIL: REGULACJE", tone: "accent" },
      { label: "BEZPIECZNIKI NADZOROWANE", tone: "emerald" },
    ],
  },
};

/** The WARSTWY group in the sidebar. */
export const NAV_LAYERS: SectionId[] = ["productMap", "freeTier", "proTier", "localTier", "gov"];

/** The SYSTEM group in the sidebar. */
export const NAV_SYSTEM: SectionId[] = ["engine", "account", "configuration"];
