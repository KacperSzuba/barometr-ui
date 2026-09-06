import type {
  Alerts,
  Analysis,
  Awaitable,
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
  Processing,
  Presentation,
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
import { mockSource } from "./mockSource";
import { httpSource } from "./httpSource";

/**
 * The only contract through which the application reaches for content.
 *
 * Every method returns `Awaitable<T>` — the mock hands data back synchronously,
 * so a view renders immediately and without the loading states the design never
 * drew. The HTTP implementation returns a `Promise`, and the hooks then run the
 * usual `isLoading → data | error` cycle, with no change in any component.
 */
export interface BarometrSource {
  /* Product map */
  getProductMap(): Awaitable<ProductMap>;
  getPricing(cycle: BillingCycle): Awaitable<Pricing>;
  getTrustCenter(): Awaitable<TrustCenter>;

  /* Free tier */
  getDailyDigest(): Awaitable<DailyDigest>;
  getLegislation(): Awaitable<Legislation>;
  getPeople(): Awaitable<People>;
  getOpenData(): Awaitable<OpenData>;

  /* Pro */
  getImpact(): Awaitable<Impact>;
  getAlerts(): Awaitable<Alerts>;
  getAnalysis(): Awaitable<Analysis>;
  getMarket(): Awaitable<Market>;

  /* Local */
  getBip(): Awaitable<Bip>;
  getSessions(): Awaitable<Sessions>;
  getMoney(): Awaitable<Money>;
  getGeo(): Awaitable<Geo>;

  /* Engine */
  getIntake(): Awaitable<Intake>;
  getProcessing(): Awaitable<Processing>;
  getHealth(): Awaitable<Health>;

  /* Account */
  getLogin(): Awaitable<Login>;
  getOrganisation(): Awaitable<Organisation>;
  getBilling(): Awaitable<Billing>;
  getNotifications(): Awaitable<Notifications>;
  getOnboarding(): Awaitable<Onboarding>;
  getSecurity(): Awaitable<Security>;

  /* Configuration */
  getInterestProfile(): Awaitable<InterestProfile>;
  getSignalSettings(): Awaitable<SignalSettings>;
  getPresentation(): Awaitable<Presentation>;
  getSources(): Awaitable<Sources>;
  getTeamSettings(): Awaitable<TeamSettings>;
  getGuards(): Awaitable<Guards>;

  /* Gov */
  getConcept(): Awaitable<Concept>;
  getBriefing(): Awaitable<Briefing>;
  getRegionalMap(): Awaitable<RegionalMap>;
  getStoryTracker(): Awaitable<StoryTracker>;
  getPolls(): Awaitable<Polls>;
  getCoverage(): Awaitable<Coverage>;
  getCrisisView(): Awaitable<CrisisView>;
  getConstituentInbox(): Awaitable<ConstituentInbox>;
  getLegislativePulse(): Awaitable<LegislativePulse>;
  getDeliberation(): Awaitable<Deliberation>;
  getVerificationDesk(): Awaitable<VerificationDesk>;
  getAuditTrail(): Awaitable<AuditTrail>;
  getPublicMirror(): Awaitable<PublicMirror>;
  getMobileCompanion(): Awaitable<MobileCompanion>;
  getGovSettings(): Awaitable<GovSettings>;
  getPackBuilder(): Awaitable<PackBuilder>;
}

/**
 * The implementation swap point — the only place in the codebase that knows which source
 * is in play. Setting `BAROMETR_API_URL` switches the whole application over to the real
 * API, reached through this application's own route handlers.
 *
 * The flag is derived from `BAROMETR_API_URL` in `next.config.ts` and inlined at build
 * time — a flag rather than the address itself, and the difference is not cosmetic. This
 * line runs in the browser, and a browser that knows where the backend is, is a browser
 * that will eventually call it directly; then the token has to live somewhere a script
 * can read it, and the HttpOnly cookie was for nothing.
 */
export const source: BarometrSource = process.env.BAROMETR_LIVE ? httpSource : mockSource;
