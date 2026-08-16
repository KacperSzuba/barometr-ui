import type { BarometrSource } from "./source";
import type {
  Alerts,
  Analysis,
  Billing,
  BillingCycle,
  Bip,
  Briefing,
  Concept,
  ConstituentInbox,
  Coverage,
  CrisisView,
  DailyDigest,
  Deliberation,
  Geo,
  Guards,
  Health,
  Impact,
  Intake,
  InterestProfile,
  Legislation,
  LegislativePulse,
  Login,
  Market,
  Money,
  Notifications,
  Onboarding,
  OpenData,
  Organisation,
  People,
  Polls,
  Pricing,
  Presentation,
  Processing,
  AuditTrail,
  GovSettings,
  MobileCompanion,
  PackBuilder,
  ProductMap,
  PublicMirror,
  RegionalMap,
  Security,
  Sessions,
  SignalSettings,
  StoryTracker,
  Sources,
  TeamSettings,
  TrustCenter,
  VerificationDesk,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_BAROMETR_API ?? "";

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  const response = await fetch(`${BASE}${path}${query}`, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Barometr API ${response.status} przy ${path}`);
  }

  return response.json() as Promise<T>;
}

/**
 * `BarometrSource` implementation backed by a real API.
 *
 * The paths are a proposal — align them with the backend. Response shapes must
 * match the types in `types.ts`; nothing outside this file needs to change.
 */
export const httpSource: BarometrSource = {
  getProductMap: () => get<ProductMap>("/product-map"),
  getPricing: (cycle: BillingCycle) => get<Pricing>("/pricing", { cycle }),
  getTrustCenter: () => get<TrustCenter>("/trust-center"),

  getDailyDigest: () => get<DailyDigest>("/wolny/digest"),
  getLegislation: () => get<Legislation>("/wolny/legislation"),
  getPeople: () => get<People>("/wolny/people"),
  getOpenData: () => get<OpenData>("/wolny/open-data"),

  getImpact: () => get<Impact>("/pro/impact"),
  getAlerts: () => get<Alerts>("/pro/alerts"),
  getAnalysis: () => get<Analysis>("/pro/analysis"),
  getMarket: () => get<Market>("/pro/market"),

  getBip: () => get<Bip>("/local/bip"),
  getSessions: () => get<Sessions>("/local/sessions"),
  getMoney: () => get<Money>("/local/money"),
  getGeo: () => get<Geo>("/local/geo"),

  getIntake: () => get<Intake>("/silnik/intake"),
  getProcessing: () => get<Processing>("/silnik/processing"),
  getHealth: () => get<Health>("/silnik/health"),

  getLogin: () => get<Login>("/konto/login"),
  getOrganisation: () => get<Organisation>("/konto/organisation"),
  getBilling: () => get<Billing>("/konto/billing"),
  getNotifications: () => get<Notifications>("/konto/notifications"),
  getOnboarding: () => get<Onboarding>("/konto/onboarding"),
  getSecurity: () => get<Security>("/konto/security"),

  getInterestProfile: () => get<InterestProfile>("/konfiguracja/profile"),
  getSignalSettings: () => get<SignalSettings>("/konfiguracja/signal"),
  getPresentation: () => get<Presentation>("/konfiguracja/presentation"),
  getSources: () => get<Sources>("/konfiguracja/sources"),
  getTeamSettings: () => get<TeamSettings>("/konfiguracja/team"),
  getGuards: () => get<Guards>("/konfiguracja/guards"),

  getConcept: () => get<Concept>("/gov/concept"),
  getBriefing: () => get<Briefing>("/gov/briefing"),
  getRegionalMap: () => get<RegionalMap>("/gov/map"),
  getStoryTracker: () => get<StoryTracker>("/gov/story"),
  getPolls: () => get<Polls>("/gov/polls"),
  getCoverage: () => get<Coverage>("/gov/coverage"),
  getCrisisView: () => get<CrisisView>("/gov/alert"),
  getConstituentInbox: () => get<ConstituentInbox>("/gov/inbox"),
  getLegislativePulse: () => get<LegislativePulse>("/gov/bills"),
  getDeliberation: () => get<Deliberation>("/gov/research"),
  getVerificationDesk: () => get<VerificationDesk>("/gov/verify"),
  getAuditTrail: () => get<AuditTrail>("/gov/audit"),
  getPublicMirror: () => get<PublicMirror>("/gov/portal"),
  getMobileCompanion: () => get<MobileCompanion>("/gov/mobile"),
  getGovSettings: () => get<GovSettings>("/gov/settings"),
  getPackBuilder: () => get<PackBuilder>("/gov/reports"),
};
