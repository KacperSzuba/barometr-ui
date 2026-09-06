/**
 * Domain types for Barometr's content.
 *
 * The contract is independent of the source implementation — `mockSource` and
 * `httpSource` satisfy the same set of shapes, so swapping one for the other
 * touches neither views nor hooks.
 */

/** A value available immediately (mock) or after a network response (HTTP). */
export type Awaitable<T> = T | Promise<T>;

/** Semantic tone of an element — the equivalent of `chip(kind)`. */
export type Tone = "emerald" | "accent" | "amber" | "neutral";

/** Billing cycle that drives the pricing table. */
export type BillingCycle = "rok" | "mies";

/* ——— Product map —————————————————————————————————————————————————————— */

export interface Counter {
  label: string;
  value: string;
}

/** One of the four access tiers (Wolny / Pro / Local / Gov). */
export interface Layer {
  roman: string;
  kicker: string;
  name: string;
  price: string;
  href: string;
  cta: string;
  /** Tier colour as an RGB triplet, e.g. "34,211,165". */
  hue: string;
  who: string;
  features: string[];
}

export interface InfraCard {
  kicker: string;
  name: string;
  desc: string;
  href: string;
  cta: string;
}

export interface Step {
  n: string;
  title: string;
  detail: string;
}

/** A label–value pair; the basis of definition lists throughout the app. */
export interface Entry {
  label: string;
  value: string;
  link?: { label: string; href: string };
}

export interface ProductMap {
  counters: Counter[];
  layers: Layer[];
  infra: InfraCard[];
  nipSteps: Step[];
  principles: Entry[];
}

/* ——— Plans and payments ——————————————————————————————————————————————— */

export interface Plan {
  name: string;
  price: string;
  unit: string;
  audience: string;
  buy: string;
}

/** Cell in the plan comparison table. */
export type PlanCell =
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "never"; text: string }
  | { kind: "text"; text: string };

export interface PlanFeature {
  label: string;
  note?: string;
  cells: PlanCell[];
}

export interface PlanGroup {
  label: string;
  rows: PlanFeature[];
}

export interface PayPath {
  kicker: string;
  flag?: string;
  title: string;
  desc: string;
  items: string[];
}

export interface Addon {
  name: string;
  note: string;
  price: string;
}

export interface Pricing {
  plans: Plan[];
  groups: PlanGroup[];
  payPaths: PayPath[];
  billingRules: Entry[];
  addons: Addon[];
}

/* ——— Compliance and trust ————————————————————————————————————————————— */

export interface TrustItem {
  label: string;
  value: string;
  tone: Tone;
}

export interface TrustBlock {
  kicker: string;
  name: string;
  items: TrustItem[];
}

export interface SlaRow {
  plan: string;
  channel: string;
  firstResponse: string;
  fix: string;
}

export interface TrustCenter {
  blocks: TrustBlock[];
  sla: SlaRow[];
  openness: Entry[];
}

/* ——— Free tier · daily digest ————————————————————————————————————————— */

export interface DigestItem {
  tag: string;
  institution: string;
  title: string;
  what: string;
  sourceLabel: string;
  time: string;
  novelty: string;
}

export interface SilenceItem {
  tag: string;
  tone: Tone;
  meta: string;
  title: string;
  why: string;
}

export interface DailyDigest {
  items: DigestItem[];
  silence: SilenceItem[];
  feeds: string[];
}

/* ——— Free tier · legislation and consultations ———————————————————————— */

export interface BillStep {
  date: string;
  label: string;
}

export interface Bill {
  id: string;
  author: string;
  title: string;
  summary: string;
  filed: string;
  versions: string;
  comments: string;
  /** Index of the current stage within `steps`. */
  current: number;
  steps: BillStep[];
  next: Entry[];
}

export interface Consultation {
  title: string;
  who: string;
  deadline: string;
  left: string;
  tone: Tone;
}

export interface Forecast {
  question: string;
  probability: string;
  /** Bounds of the uncertainty band, in percent. */
  low: number;
  high: number;
  band: string;
  horizon: string;
}

export interface ResolvedForecast {
  question: string;
  said: string;
  result: string;
  tone: Tone;
}

export interface Legislation {
  bills: Bill[];
  consultations: Consultation[];
  forecasts: Forecast[];
  resolved: ResolvedForecast[];
}

/* ——— Free tier · people and promises —————————————————————————————————— */

export interface Deputy {
  name: string;
  district: string;
  club: string;
  attendance: string;
  attendanceValue: number;
  loyalty: string;
  loyaltyValue: number;
  interpellations: string;
  lastVote: string;
}

export interface PromiseCheck {
  verdict: string;
  tone: Tone;
  who: string;
  quote: string;
  quoteSource: string;
  vote: string;
}

export interface CouncilItem {
  id: string;
  vote: string;
  title: string;
  effect: string;
}

export interface People {
  columns: string[];
  deputies: Deputy[];
  promises: PromiseCheck[];
  /** Council resolutions keyed by city name. */
  councils: Record<string, CouncilItem[]>;
}

/* ——— Free tier · data and corrections ————————————————————————————————— */

export interface ExportChannel {
  kind: string;
  name: string;
  desc: string;
  cta: string;
}

export interface Correction {
  date: string;
  what: string;
  how: string;
  kind: string;
}

export interface OpenData {
  /** Licence, attribution and the rate actually being enforced — read, not written down. */
  terms: string[];
  /** Why the corrections list is empty, when it is. */
  correctionsNote: string;
  exports: ExportChannel[];
  embedCode: string;
  widgetKinds: string[];
  corrections: Correction[];
  publicPromises: Entry[];
}

/* ——— Pro · impact on us ——————————————————————————————————————————————— */

export interface ImpactRow {
  id: string;
  title: string;
  stage: string;
  change: string;
  level: string;
  tone: Tone;
  deadline: string;
  deadlineNote: string;
  owner: string;
  action: string;
}

export interface QuarterEvent {
  when: string;
  what: string;
  who: string;
  tag: string;
  tone: Tone;
}

export interface Stakeholder {
  side: string;
  tone: Tone;
  who: string;
  power: string;
  why: string;
  evidence: string;
  /** Impact strength in percent — the bar width. */
  weight: number;
}

export interface Impact {
  columns: string[];
  rows: ImpactRow[];
  quarter: QuarterEvent[];
  forecasts: Forecast[];
  stakeholders: Stakeholder[];
}

/* ——— Pro · alerts and rules ——————————————————————————————————————————— */

/**
 * A rule as the engine holds it, beside the sentences the screen shows.
 *
 * Carried on every row because the backend states a rule whole rather than patching it:
 * a change that sent only `enabled` would reset what the rule watches to "every stage,
 * normal urgency, no floor" and silently widen one somebody had narrowed on purpose.
 */
export interface AlertRuleSettings {
  enabled: boolean;
  stages: string[];
  urgency: string;
  minimumSignificance: number;
}

export interface AlertRule {
  /** Two rules can watch the same profile, so the name cannot key the row. */
  id: string;
  /** What a change has to send back. See [AlertRuleSettings]. */
  settings: AlertRuleSettings;
  name: string;
  scope: string;
  condition: string;
  threshold: string;
  sources: string;
  channels: string;
  state: string;
  tone: Tone;
}

export interface RuleField {
  label: string;
  /** Note under the label — used by the signal configuration. */
  hint?: string;
  options: string[];
  /** Option selected by default. */
  selected: string;
}

export interface AlertPreview {
  channel: string;
  tone: Tone;
  when: string;
  score: string;
  text: string;
}

export interface NotificationChannel {
  name: string;
  state: string;
  tone: Tone;
  note: string;
  cadence: string;
}

export interface Alerts {
  columns: string[];
  rules: AlertRule[];
  fields: RuleField[];
  sentence: string;
  preview: AlertPreview[];
  channels: NotificationChannel[];
  /** What has actually gone out lately — the header's own numbers, not a guess. */
  activity: string[];
  /** Why the preview holds what it holds, including what was withheld and on what ground. */
  previewNote: string;
  /** The window in which nothing but a critical rule speaks. */
  quietHours: string;
}

/* ——— Pro · analysis and archive ——————————————————————————————————————— */

export type DiffKind = "same" | "added" | "removed";

export interface DiffLine {
  mark: string;
  text: string;
  kind: DiffKind;
}

export interface Outlet {
  name: string;
  kind: string;
  frame: string;
  /** Share of the narrative frame, in percent. */
  share: number;
  count: string;
}

export interface SavedSearch {
  name: string;
  query: string;
  hits: string;
  mode: string;
  tone: Tone;
}

export interface Analysis {
  diff: DiffLine[];
  /** Consultation comment that triggered a change to the bill. */
  diffComment: Entry[];
  outlets: Outlet[];
  briefOptions: string[];
  briefSelected: string[];
  brief: string;
  saved: SavedSearch[];
}

/* ——— Pro · market and team ———————————————————————————————————————————— */

export interface Tender {
  buyer: string;
  place: string;
  subject: string;
  value: string;
  deadline: string;
  fit: string;
  /** Match score in percent — the bar width. */
  fitValue: number;
  signal: string;
  tone: Tone;
}

export interface Comment {
  initials: string;
  who: string;
  when: string;
  text: string;
}

export interface SharedTopic {
  name: string;
  people: string;
  items: string;
}

export interface Report {
  name: string;
  to: string;
  cadence: string;
  format: string;
  tone: Tone;
}

export interface Integration {
  name: string;
  state: string;
  tone: Tone;
  note: string;
}

/** Thread header the team discussion is organised around. */
export interface AlertThread {
  badge: string;
  meta: string;
  title: string;
}

export interface Market {
  columns: string[];
  tenders: Tender[];
  thread: AlertThread;
  comments: Comment[];
  shared: SharedTopic[];
  reports: Report[];
  integrations: Integration[];
}

/* ——— Local · municipality and public register ————————————————————————— */

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  note: string;
  tone: Tone;
  /** Value comes from the live counter, not from a constant. */
  isLive?: boolean;
}

export interface BipDocument {
  type: string;
  /** Group the filter bar above the list narrows by. */
  group: string;
  typeTone: Tone;
  id: string;
  title: string;
  note: string;
  date: string;
  pages: string;
  state: string;
  stateTone: Tone;
}

export interface ZoningPlan {
  area: string;
  stage: string;
  tone: Tone;
  what: string;
  size: string;
  deadline: string;
}

export interface BudgetLine {
  label: string;
  value: string;
  /** Share of the largest item, in percent. */
  share: number;
}

export interface CalendarEntry {
  when: string;
  what: string;
}

export interface Bip {
  /** Unit description keyed by name — a municipality or county. */
  units: Record<string, string>;
  kpis: Kpi[];
  documentGroups: string[];
  documents: BipDocument[];
  zoning: ZoningPlan[];
  budget: BudgetLine[];
  calendar: CalendarEntry[];
}

/* ——— Local · sessions and councillors ————————————————————————————————— */

export interface TranscriptLine {
  time: string;
  who: string;
  role: string;
  text: string;
  /** Search hit — the row is highlighted. */
  isHit: boolean;
}

export interface Speaker {
  name: string;
  role: string;
  time: string;
  /** Speaking time in minutes — the basis of the bar length. */
  minutes: number;
}

export interface SessionEvent {
  when: string;
  what: string;
  unit: string;
  tag: string;
  tone: Tone;
}

export interface Councillor {
  name: string;
  club: string;
  attendance: string;
  attendanceValue: number;
  forAgainst: string;
  interpellations: string;
  lastVote: string;
}

export interface Sessions {
  transcript: TranscriptLine[];
  speakers: Speaker[];
  /** Short list of upcoming sittings under the speaker index. */
  upcoming: CalendarEntry[];
  columns: string[];
  councillors: Councillor[];
}

/* ——— Local · money and tenders ———————————————————————————————————————— */

export interface SpendingLine {
  label: string;
  value: string;
  /** Spending as a percentage of the scale. */
  share: number;
  /** Peer-group median as a percentage of the scale. */
  median: number;
  vs: string;
}

export interface BenchmarkRow {
  name: string;
  perCapita: string;
  invest: string;
  debt: string;
  waste: string;
  /** The user's own municipality — highlighted. */
  isSelf: boolean;
}

export interface LocalTender {
  id: string;
  mode: string;
  subject: string;
  value: string;
  offers: string;
  winner: string;
  flag: string;
  tone: Tone;
}

export interface Money {
  spending: SpendingLine[];
  benchmarkColumns: string[];
  benchmark: BenchmarkRow[];
  tenderColumns: string[];
  tenders: LocalTender[];
}

/* ——— Local · map, alerts, newsroom ———————————————————————————————————— */

export interface WatchedPlace {
  name: string;
  detail: string;
  hits: string;
  tone: Tone;
}

export interface GeoHit {
  type: string;
  tone: Tone;
  where: string;
  title: string;
  note: string;
  distance: string;
  date: string;
  action: string;
}

export interface Geo {
  radiusOptions: string[];
  /** Full calendar of sessions and committees. */
  calendar: SessionEvent[];
  fields: RuleField[];
  sentence: string;
  watched: WatchedPlace[];
  hits: GeoHit[];
  pressPerks: string[];
}

/* ——— Engine · intake —————————————————————————————————————————————————— */

export interface Connector {
  name: string;
  detail: string;
  type: string;
  schedule: string;
  last: string;
  volume: string;
  retry: string;
  tdm: string;
  tdmTone: Tone;
  status: string;
  statusTone: Tone;
  /** Group the filter bar above the table narrows by. */
  group: string;
}

export interface Transcript {
  name: string;
  meta: string;
  length: string;
  status: string;
  tone: Tone;
}

export interface IntakeLimit {
  label: string;
  value: string;
  tone: Tone;
}

export interface Schedule {
  every: string;
  what: string;
  count: string;
}

export interface Intake {
  kpis: Kpi[];
  filters: string[];
  columns: string[];
  connectors: Connector[];
  transcripts: Transcript[];
  limits: IntakeLimit[];
  schedules: Schedule[];
}

/* ——— Engine · processing —————————————————————————————————————————————— */

export interface PipelineStage {
  n: string;
  name: string;
  desc: string;
  flow: string;
  tech: string;
  /** Share of items passing through the stage, in percent. */
  share: number;
}

export interface Model {
  name: string;
  role: string;
  calls: string;
  cost: string;
  latency: string;
}

/** Entity-graph node kind — drives the label colour. */
export type EntityKind = "osoba" | "instytucja" | "spolka" | "akt" | "temat";

export interface GraphEdge {
  from: string;
  fromKind: EntityKind;
  relation: string;
  to: string;
  toKind: EntityKind;
  source: string;
  confidence: string;
}

export interface ProvenanceSentence {
  text: string;
  kind: string;
  source: string;
  cta: string;
  /** Raw source text revealed when the sentence is expanded. */
  raw: string;
}

export interface Anomaly {
  tag: string;
  tone: Tone;
  meta: string;
  text: string;
}

export interface FramingShare {
  label: string;
  share: string;
  value: number;
  note: string;
  color: string;
}

export interface Processing {
  stages: PipelineStage[];
  modelColumns: string[];
  models: Model[];
  edges: GraphEdge[];
  provenance: ProvenanceSentence[];
  diff: DiffLine[];
  anomalies: Anomaly[];
  framing: FramingShare[];
}

/* ——— Engine · health and incidents ———————————————————————————————————— */

export interface DeadSource {
  name: string;
  reason: string;
  last: string;
  state: string;
  tone: Tone;
  action: string;
}

export interface RetryQueueItem {
  count: string;
  what: string;
  next: string;
}

export interface Incident {
  tag: string;
  tone: Tone;
  when: string;
  text: string;
  impact: string;
}

export interface ChangelogEntry {
  date: string;
  text: string;
  kind: string;
}

export interface Health {
  dead: DeadSource[];
  /** Pipeline lag in minutes, hour by hour. */
  latency: number[];
  retries: RetryQueueItem[];
  incidents: Incident[];
  changelog: ChangelogEntry[];
}

/* ——— Account · sign-in and sessions ——————————————————————————————————— */

/** A "name + description + state + action" row — the basis of account settings lists. */
export interface SettingRow {
  name: string;
  note: string;
  state: string;
  tone: Tone;
  action?: string;
}

export interface Session {
  /** Identity, not decoration: it keys the list and names the session an action ends. */
  id: string;
  device: string;
  meta: string;
  when: string;
  action: string;
  /** Current or suspicious session — both get a highlighted edge. */
  isHighlighted: boolean;
  /** Suspicious sign-in — the action renders in the accent colour. */
  isAlert?: boolean;
}

export interface LoginEvent {
  /** Two events can share a minute, so the label they are shown with cannot key them. */
  id: string;
  when: string;
  what: string;
  tag: string;
  tone: Tone;
}

export interface AccountOperation {
  name: string;
  note: string;
  cta: string;
  tone: Tone;
}

export interface Login {
  /** Whose account this is. The screen said one address and listed another's sessions. */
  email: string;
  authMethods: SettingRow[];
  operations: AccountOperation[];
  sessions: Session[];
  history: LoginEvent[];
}

/* ——— Account · organisation and roles ————————————————————————————————— */

export interface Role {
  name: string;
  count: string;
}

export interface Permission {
  label: string;
  cells: PlanCell[];
}

export interface Member {
  initials: string;
  name: string;
  mail: string;
  role: string;
  last: string;
  state: string;
  tone: Tone;
}

export interface ActivityEntry {
  /** Two entries can share a minute, so the label they are shown with cannot key them. */
  id: string;
  when: string;
  what: string;
}

export interface Organisation {
  /** Which organisation, and how full it is — the header's own line. */
  headline: string;
  /** What governs joining this team. Read, not written into the page. */
  teamNote: string;
  roles: Role[];
  permissions: Permission[];
  members: Member[];
  activity: ActivityEntry[];
  policies: SettingRow[];
  invites: ChipEntry[];
}

/** A statement with a badge — the prototypes' `kv()` helper. */
export interface ChipEntry {
  label: string;
  value: string;
  tone: Tone;
}

/* ——— Account · payments and invoices —————————————————————————————————— */

export interface UsageMeter {
  label: string;
  value: string;
  /** Quota utilisation, in percent. */
  percent: number;
  note: string;
}

export interface Invoice {
  id: string;
  date: string;
  net: string;
  vat: string;
  po: string;
  method: string;
  state: string;
  tone: Tone;
}

export interface BillingCard {
  label: string;
  value: string;
  cta: string;
}

export interface Billing {
  usage: UsageMeter[];
  methods: SettingRow[];
  proforma: Entry[];
  taxRows: Entry[];
  dunning: ChipEntry[];
  invoiceColumns: string[];
  invoices: Invoice[];
  cards: BillingCard[];
}

/* ——— Account · notifications —————————————————————————————————————————— */

export interface NotificationRow {
  label: string;
  note: string;
  cells: PlanCell[];
}

export interface Endpoint {
  kind: string;
  value: string;
  note: string;
  state: string;
  tone: Tone;
}

export interface ChannelCount {
  channel: string;
  count: string;
  /** Share of the busiest channel, in percent. */
  share: number;
}

export interface Notifications {
  /** Window and quiet hours, read from the account's own cadence. */
  cadence: string[];
  /** What the counts below are counted over. */
  countsTitle: string;
  /** What the windows did to the volume — counted, not estimated. */
  countsNote: string;
  columns: string[];
  rows: NotificationRow[];
  endpoints: Endpoint[];
  counts: ChannelCount[];
  hygiene: SettingRow[];
}

/* ——— Account · onboarding and support ————————————————————————————————— */

export interface WizardStep {
  n: string;
  kicker: string;
  title: string;
  state: string;
  tone: Tone;
  rows: Entry[];
}

export interface RoutingRow {
  pkd: string;
  area: string;
  source: string;
  items: string;
}

export interface Onboarding {
  wizard: WizardStep[];
  routing: RoutingRow[];
  support: SettingRow[];
}

/* ——— Account · security and API ——————————————————————————————————————— */

export interface ComplianceBlock {
  kicker: string;
  name: string;
  items: ChipEntry[];
}

export interface ApiKey {
  /** What a revocation names. Not shown — the row shows its tail beside the name. */
  id: string;
  name: string;
  prefix: string;
  scopes: string;
  rate: string;
  used: string;
  env: string;
  tone: Tone;
}

export interface Webhook {
  url: string;
  note: string;
  state: string;
  tone: Tone;
}

export interface DevTool {
  name: string;
  note: string;
}

export interface Security {
  /** What the header states about this account — read, not written into the page. */
  activity: string[];
  compliance: ComplianceBlock[];
  keyColumns: string[];
  keys: ApiKey[];
  curlSample: string;
  webhooks: Webhook[];
  devTools: DevTool[];
}

/* ——— Configuration · interest profile ————————————————————————————————— */

export interface WatchedGroup {
  kind: string;
  count: string;
  items: string[];
}

export interface Mute {
  type: string;
  tone: Tone;
  what: string;
  why: string;
  until: string;
  action: string;
}

export interface InterestProfile {
  profiles: string[];
  fields: RuleField[];
  sentence: string;
  watched: WatchedGroup[];
  muteColumns: string[];
  mutes: Mute[];
}

/* ——— Configuration · signal and threshold ————————————————————————————— */

export interface ConditionalRule {
  name: string;
  state: string;
  tone: Tone;
  logic: string;
}

export interface SignalSettings {
  fields: RuleField[];
  /** Effect of the relevance threshold: threshold → [hits, notifications]. */
  thresholdImpact: Record<string, [number, number]>;
  rules: ConditionalRule[];
}

/* ——— Configuration · content presentation ————————————————————————————— */

export interface Dashboard {
  name: string;
  modules: string;
  owner: string;
  scope: string;
  tone: Tone;
}

export interface Presentation {
  fields: RuleField[];
  /** Summary preview: length → jargon level → text. */
  previews: Record<string, Record<string, string>>;
  modules: SettingRow[];
  dashboards: Dashboard[];
}

/* ——— Configuration · sources —————————————————————————————————————————— */

export interface SourceType {
  name: string;
  count: string;
  weight: string;
  /** Weight as a percentage of the scale. */
  share: number;
  state: string;
  tone: Tone;
}

export interface BlockedSource {
  name: string;
  note: string;
}

export interface Sources {
  types: SourceType[];
  blocked: BlockedSource[];
  limits: ChipEntry[];
}

/* ——— Configuration · team and export —————————————————————————————————— */

export interface ReportTemplate {
  name: string;
  sections: string;
  cadence: string;
  to: string;
  format: string;
  tone: Tone;
}

export interface TeamSettings {
  defaults: SettingRow[];
  exportFields: RuleField[];
  templateColumns: string[];
  templates: ReportTemplate[];
  branding: Entry[];
}

/* ——— Configuration · guards ——————————————————————————————————————————— */

/** The tier whose context the guards are viewed in. */
export type GuardLayer = "Pro" | "Gov";

export interface Guard {
  name: string;
  scope: string;
  /** Value that depends on the tier. */
  value: Record<GuardLayer, string>;
  why: Record<GuardLayer, string>;
}

export interface Signature {
  who: string;
  role: string;
  state: string;
  tone: Tone;
}

export interface AuditEntry {
  when: string;
  what: string;
  who: string;
}

export interface Guards {
  columns: string[];
  guards: Guard[];
  signatures: Signature[];
  audit: AuditEntry[];
}

/* ——— Gov · shared ————————————————————————————————————————————————————— */

/** Direction of the KPI change — drives the delta colour. */
export type Direction = "up" | "down";

export interface GovKpi {
  label: string;
  value: string;
  delta: string;
  direction: Direction;
  note: string;
  /** Series feeding the sparkline. */
  spark: number[];
  /** Colour of the sparkline's last bar. */
  sparkColor: string;
}

export interface Region {
  abbr: string;
  name: string;
  /** Mood index 0–100; 50 is the neutral line. */
  value: number;
  delta: string;
  /** Sample size. */
  n: number;
  /** Margin of error, in points. */
  moe: number;
  col: number;
  row: number;
}

export interface RegionDetail {
  issues: [string, number][];
  driver: string;
  quote: string;
  quoteSource: string;
}

/* ——— Gov · morning briefing ——————————————————————————————————————————— */

/** Story veracity: verified, partly unverified, false. */
export type Veracity = "verified" | "disputed" | "false";

export interface Story {
  title: string;
  summary: string;
  meta: string;
  veracity: string;
  veracityKind: Veracity;
  tags: string[];
  /** Sentiment distribution, in percent. */
  negative: number;
  neutral: number;
  positive: number;
  sentimentLabel: string;
  reach: string;
  velocity: string;
}

export interface InboxCluster {
  channel: string;
  tone: Tone;
  place: string;
  count: string;
  text: string;
}

export interface Briefing {
  kpis: GovKpi[];
  filters: string[];
  stories: Story[];
  inbox: InboxCluster[];
  provenance: string;
  regions: Region[];
}

/* ——— Gov · product concept ———————————————————————————————————————————— */

export interface Principle {
  n: string;
  title: string;
  text: string;
}

export interface PipelineStep {
  n: string;
  name: string;
  detail: string;
  tech: string;
}

export interface Feed {
  name: string;
  kind: string;
  cadence: string;
  retention: string;
  note: string;
}

/** Permission level in the role matrix: full, limited, none. */
export type Capability = "full" | "limited" | "none";

export interface RoleRow {
  role: string;
  caps: Capability[];
}

export interface GovModule {
  code: string;
  name: string;
  purpose: string;
  /** Route segment of the screen the tile links to. */
  segment: string;
}

export interface Guardrail {
  rule: string;
  how: string;
}

export interface RolloutPhase {
  label: string;
  title: string;
  items: string[];
}

export interface SuccessMetric {
  value: string;
  label: string;
  note: string;
}

export interface Concept {
  principles: Principle[];
  isFor: string[];
  isNot: string[];
  pipeline: PipelineStep[];
  feeds: Feed[];
  roleCaps: string[];
  roles: RoleRow[];
  modules: GovModule[];
  guardrails: Guardrail[];
  phases: RolloutPhase[];
  successMetrics: SuccessMetric[];
}

/* ——— Gov · regional opinion map ——————————————————————————————————————— */

export interface RegionalMap {
  regions: Region[];
  /** Per-voivodeship detail; a missing key falls back to the default. */
  details: Record<string, RegionDetail>;
  fallback: RegionDetail;
  topics: string[];
  sources: { key: string; label: string }[];
  national: string;
  nationalMoe: string;
}

/* ——— Gov · story tracker —————————————————————————————————————————————— */

/** Volume distribution over time — press and social kept separate. */
export interface SpreadHour {
  press: number;
  social: number;
}

export interface Framing {
  outlet: string;
  type: string;
  frame: string;
  phrase: string;
  tone: string;
  /** Tone intensity in percent — the bar width. */
  toneValue: number;
}

/** Claim verification outcome: confirmed, open, refuted. */
export type CheckKind = "confirmed" | "pending" | "refuted";

export interface Check {
  kind: CheckKind;
  claim: string;
  status: string;
}

export interface ParliamentaryItem {
  title: string;
  meta: string;
}

export interface StoryTracker {
  badge: string;
  meta: string;
  title: string;
  lead: string;
  /** A 24-hour series; the scale is derived from its peak. */
  spread: SpreadHour[];
  spreadPeak: string;
  framings: Framing[];
  checks: Check[];
  parliamentary: ParliamentaryItem[];
  briefingNote: string;
  useLimits: string;
}

/* ——— Gov · polls & method ————————————————————————————————————————————— */

export interface PollRow {
  house: string;
  field: string;
  n: number;
  mode: string;
  value: number;
  effect: string;
  client: string;
  /** Methodologically incompatible poll — the row is highlighted. */
  isFlagged?: boolean;
}

export interface AverageHistoryRow {
  date: string;
  avg: string;
  delta: string;
  polls: number;
  spread: string;
  note: string;
}

/** Series definition, before projection onto chart geometry. */
export interface PollSeries {
  name: string;
  color: string;
  values: number[];
}

export interface Polls {
  /** History ranges; the key maps to a point count. */
  ranges: string[];
  /** Series per range — a full 26-point series, trimmed to the range. */
  series: PollSeries[];
  /** Number of points visible in a given range. */
  pointsPerRange: Record<string, number>;
  /** X-axis labels per range. */
  xLabels: Record<string, string[]>;
  history: AverageHistoryRow[];
  rows: PollRow[];
  warnings: string[];
}

/* ——— Gov · coverage compare ——————————————————————————————————————————— */

/** Outlet in the coverage comparison — distinct from `Outlet` in the Pro console. */
export interface CoverageOutlet {
  name: string;
  type: string;
  reach: string;
  items: number;
  /** Tone distribution toward the policy, in percent. */
  negative: number;
  neutral: number;
  positive: number;
  frame: string;
  owner: string;
  correction: string;
  /** Elevated correction rate — highlighted in amber. */
  isCorrectionHigh: boolean;
}

export interface Coverage {
  outlets: CoverageOutlet[];
  /** Share of voice by issue: label and percentage. */
  shareOfVoice: [string, number][];
}

/* ——— Gov · crisis view ———————————————————————————————————————————————— */

export interface AlertKpi {
  label: string;
  value: string;
  color: string;
  note: string;
}

/** Propagation stage: origin, mutation, pickup, ground truth, impact, pending. */
export type TimelineKind = "origin" | "mutation" | "pickup" | "truth" | "impact" | "pending";

export interface TimelineEntry {
  time: string;
  event: string;
  source: string;
  tag: string;
  kind: TimelineKind;
}

export interface HotRegion {
  name: string;
  multiplier: string;
}

export interface ResponseStep {
  label: string;
  owner: string;
  /** Step ticked by default. */
  isDone: boolean;
}

export interface CrisisView {
  title: string;
  kpis: AlertKpi[];
  timeline: TimelineEntry[];
  hotRegions: HotRegion[];
  steps: ResponseStep[];
  groundTruth: string;
  groundTruthMeta: string;
  escalationGate: string;
}

/* ——— Gov · constituent inbox —————————————————————————————————————————— */

/** Status of a contact cluster in the office's workflow. */
export type ClusterStatus = "routed" | "flagged" | "analysis" | "rumour";

export interface ContactCluster {
  topic: string;
  count: number;
  region: string;
  mix: string;
  status: string;
  statusKind: ClusterStatus;
  /** Paraphrase of what the cluster shares — never one person's words. */
  paraphrase: string;
  /** Extra label: coordination, or a link to an alert. */
  flag?: string;
  flagKind?: "coordinated" | "rumour";
}

export interface IntakeStat {
  label: string;
  value: string;
  note: string;
}

export interface ConstituentInbox {
  intake: IntakeStat[];
  clusters: ContactCluster[];
  coordinationNote: string;
  separationNote: string;
  heldBackNote: string;
}

/* ——— Gov · legislative pulse —————————————————————————————————————————— */

/** Salience of the topic in public opinion. */
export type Salience = "HIGH" | "MEDIUM" | "LOW";

/** Bill in the Gov legislative pulse — a different entity from `Bill` in the free tier. */
export interface GovBill {
  code: string;
  title: string;
  stage: string;
  support: number;
  oppose: number;
  unaware: number;
  salience: Salience;
  delta: string;
  next: string;
}

export interface BillDetail {
  /** Support after a neutral briefing — compared against the raw figure. */
  informed: number;
  misconceptions: [string, number][];
  objections: [string, number][];
  note: string;
  evidence: string;
}

export interface LegislativePulse {
  bills: GovBill[];
  /** Per-bill detail; a missing key falls back to the default. */
  details: Record<string, BillDetail>;
  fallback: BillDetail;
  unawareNote: string;
}

/* ——— Gov · deliberation desk —————————————————————————————————————————— */

/** Deliberative session — a different entity from `Session` (a login session) in the account. */
export interface DeliberationSession {
  type: string;
  place: string;
  date: string;
  n: number;
  method: string;
  /** Representativeness assessment — it governs how far the results may be read. */
  representativeness: string;
}

export interface Theme {
  theme: string;
  /** Strength of the pattern in the qualitative material. */
  strength: "STRONG" | "MEDIUM";
  where: string;
  quote: string;
}

export interface ReachBar {
  label: string;
  /** Reach relative to the population share; 100 = matching the census. */
  value: number;
}

export interface Deliberation {
  themes: Theme[];
  sessions: DeliberationSession[];
  reach: ReachBar[];
  reachNote: string;
  methodNote: string;
}

/* ——— Gov · verification desk —————————————————————————————————————————— */

export interface Claim {
  claim: string;
  status: string;
  kind: Veracity;
  origin: string;
  checker: string;
  age: string;
  evidence: string[];
  impact: string;
}

/** Entry in Gov's own correction record — a different shape from `Correction` in the free tier. */
export interface OwnCorrection {
  date: string;
  what: string;
  action: string;
}

export interface VerificationDesk {
  claims: Claim[];
  standards: string[];
  ownRecord: OwnCorrection[];
  ledgerNote: string;
}

/* ——— Gov · daily pack builder ————————————————————————————————————————— */

export interface PackAudience {
  label: string;
  rules: string[];
  recipients: string;
}

export interface PackBlock {
  label: string;
  /** Block included by default. */
  isIncluded: boolean;
}

export interface PackBuilder {
  blocks: PackBlock[];
  audiences: PackAudience[];
  /** Fixed footer rows of the pack, independent of the audience. */
  meta: Entry[];
}

/* ——— Gov · audit log —————————————————————————————————————————————————— */

export type AuditResult = "ok" | "blocked" | "monitor";

/** Gov audit entry — a different shape from `AuditEntry` in account configuration. */
export interface GovAuditEntry {
  time: string;
  user: string;
  action: string;
  scope: string;
  result: string;
  kind: AuditResult;
}

export interface RetentionTimer {
  label: string;
  left: string;
  /** How full the retention window is; `0` means no deletion deadline. */
  pct: number;
}

export interface MonitorNote {
  date: string;
  text: string;
}

export interface AuditTrail {
  log: GovAuditEntry[];
  refusalNote: string;
  retention: RetentionTimer[];
  retentionNote: string;
  monitorNotes: MonitorNote[];
  monitorFooter: string;
}

/* ——— Gov · public mirror —————————————————————————————————————————————— */

export interface MirrorCard {
  kicker: string;
  title: string;
  body: string;
}

export interface PublicMirror {
  url: string;
  headline: string;
  lede: string;
  moodValue: string;
  moodMeta: string;
  cards: MirrorCard[];
  claim: string;
}

/* ——— Gov · mobile companion ——————————————————————————————————————————— */

export interface MobileNote {
  n: string;
  text: string;
}

export interface MobileAlert {
  title: string;
  meta: string;
}

export interface MobileCompanion {
  notes: MobileNote[];
  statusTime: string;
  statusDate: string;
  moodValue: string;
  moodDelta: string;
  moodSpark: number[];
  moodMeta: string;
  alert: MobileAlert;
  /** The briefing's first four stories — the phone has no list of its own. */
  stories: Story[];
  tabs: string[];
  footer: string;
}

/* ——— Gov · account settings ——————————————————————————————————————————— */

/** Gov notification matrix row — a different shape from `NotificationRow` in the account. */
export interface GovNotificationRow {
  event: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface SecurityItem {
  label: string;
  value: string;
  state: string;
}

export interface DeviceSession {
  device: string;
  detail: string;
  when: string;
}

export interface TeamMember {
  name: string;
  role: string;
  clearance: string;
  last: string;
  /** Seat awaiting the monitor's countersignature — the row renders amber. */
  isPending?: boolean;
}

/** Gov contract usage meter — a different shape from `UsageMeter` in account billing. */
export interface GovUsageMeter {
  label: string;
  value: string;
  pct: number;
}

/** Gov contract invoice — a different shape from `Invoice` in account billing. */
export interface GovInvoice {
  no: string;
  period: string;
  amount: string;
  status: string;
  isPaid: boolean;
  date: string;
}

export interface GovSettings {
  profile: {
    initials: string;
    name: string;
    meta: string;
    fields: Entry[];
    clearanceNote: string;
  };
  notifications: {
    rows: GovNotificationRow[];
    quietHours: string;
  };
  security: {
    items: SecurityItem[];
    sessions: DeviceSession[];
  };
  data: {
    items: Entry[];
    scopeNote: string;
  };
  team: {
    members: TeamMember[];
    inviteNote: string;
  };
  billing: {
    plan: Entry[];
    price: string;
    priceNote: string;
    usage: GovUsageMeter[];
    paymentTitle: string;
    paymentDetail: string;
    paymentNote: string;
    invoices: GovInvoice[];
    invoiceNote: string;
  };
}
