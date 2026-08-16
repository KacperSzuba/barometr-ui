import type { BarometrSource } from "./source";
import { pricing, productMap, trustCenter } from "./mock/product-map";
import { dailyDigest, legislation, openData, people } from "./mock/free-tier";
import { alerts, analysis, impact, market } from "./mock/pro";
import { bip, geo, money, sessions } from "./mock/local";
import { health, intake, processing } from "./mock/engine";
import { billing, login, notifications, onboarding, organisation, security } from "./mock/account";
import {
  guards,
  interestProfile,
  presentation,
  signalSettings,
  sources,
  teamSettings,
} from "./mock/configuration";
import { concept } from "./mock/gov/concept";
import { briefing, regionDetails, regionFallback, regions } from "./mock/gov/briefing";
import { regionalMap } from "./mock/gov/map";
import { storyTracker } from "./mock/gov/story";
import { polls } from "./mock/gov/polls";
import { coverage } from "./mock/gov/coverage";
import { crisisView } from "./mock/gov/alert";
import { constituentInbox } from "./mock/gov/inbox";
import { legislativePulse } from "./mock/gov/bills";
import { deliberation } from "./mock/gov/research";
import { packBuilder, verificationDesk } from "./mock/gov/verify";
import { auditTrail } from "./mock/gov/audit";
import { publicMirror } from "./mock/gov/portal";
import { mobileCompanion } from "./mock/gov/mobile";
import { govSettings } from "./mock/gov/settings";

/**
 * The mocked source — content taken straight from the prototypes.
 *
 * Returns data synchronously, so views render without loading states. Swapping
 * in `httpSource` requires no change outside `source.ts`.
 */
export const mockSource: BarometrSource = {
  getProductMap: () => productMap,
  getPricing: (cycle) => pricing(cycle),
  getTrustCenter: () => trustCenter,

  getDailyDigest: () => dailyDigest,
  getLegislation: () => legislation,
  getPeople: () => people,
  getOpenData: () => openData,

  getImpact: () => impact,
  getAlerts: () => alerts,
  getAnalysis: () => analysis,
  getMarket: () => market,

  getBip: () => bip,
  getSessions: () => sessions,
  getMoney: () => money,
  getGeo: () => geo,

  getIntake: () => intake,
  getProcessing: () => processing,
  getHealth: () => health,

  getLogin: () => login,
  getOrganisation: () => organisation,
  getBilling: () => billing,
  getNotifications: () => notifications,
  getOnboarding: () => onboarding,
  getSecurity: () => security,

  getInterestProfile: () => interestProfile,
  getSignalSettings: () => signalSettings,
  getPresentation: () => presentation,
  getSources: () => sources,
  getTeamSettings: () => teamSettings,
  getGuards: () => guards,

  getConcept: () => concept,
  getBriefing: () => ({ ...briefing, regions }),
  getStoryTracker: () => storyTracker,
  getPolls: () => polls,
  getCoverage: () => coverage,
  getCrisisView: () => crisisView,
  getConstituentInbox: () => constituentInbox,
  getLegislativePulse: () => legislativePulse,
  getDeliberation: () => deliberation,
  getVerificationDesk: () => verificationDesk,
  getAuditTrail: () => auditTrail,
  getPublicMirror: () => publicMirror,
  getMobileCompanion: () => mobileCompanion,
  getGovSettings: () => govSettings,
  getPackBuilder: () => packBuilder,
  getRegionalMap: () => ({
    ...regionalMap,
    regions,
    details: regionDetails,
    fallback: regionFallback,
  }),
};
