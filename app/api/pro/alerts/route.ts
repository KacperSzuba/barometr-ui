/**
 * "Reguły, progi i podgląd" — standing instructions, and what they actually produced.
 *
 * Five reads, and the last of them is the one that makes this screen worth opening.
 * `/alerts/decisions` records why somebody was *not* told about something, and the
 * backend is explicit that "why did I not get an alert about this" is the question this
 * product will be judged on. A preview showing only what was sent would answer the easy
 * half.
 *
 * A rule is stated in the vocabulary of two contexts — a profile it points at, a set of
 * stages, an urgency and a significance floor — so the profiles are read alongside it:
 * a rule table listing `01a0…-59cc` where a name belongs is a table nobody can check.
 */
import { readFromBackend } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";
import { pluralPl } from "@/lib/format";
import type {
  AlertPreview,
  AlertRule,
  Alerts,
  NotificationChannel,
  RuleField,
} from "@/lib/data/types";

interface Profile {
  id: string;
  name: string;
  version: number;
}

interface Rule {
  id: string;
  profileId: string;
  enabled: boolean;
  stages: string[];
  urgency: string;
  minimumSignificance: number;
}

interface Preference {
  mode: string;
  atHour: number | null;
  onWeekday: number | null;
  zone: string;
  quietFrom: number | null;
  quietTo: number | null;
}

interface Notification {
  id: string;
  title: string;
  matchedKind: string;
  matchedValue: string;
  significance: number;
  significanceReasons: string[];
  createdAt: string;
  readAt: string | null;
}

interface Decision {
  subjectKind: string;
  subjectId: string;
  decision: string;
  reason: string;
  decidedAt: string;
}

/** Enough to see the shape of a week without turning the panel into a feed. */
const PREVIEW_LIMIT = 6;
const DECISION_LIMIT = 50;

/** The backend's four delivery modes, in the words the screen uses. */
const MODES: Record<string, string> = {
  immediate: "natychmiast",
  hourly: "co godzinę",
  daily: "raz dziennie",
  weekly: "raz w tygodniu",
};

const WEEKDAYS = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

const MATCH_LABELS: Record<string, string> = {
  pkd: "PKD",
  region: "REGION",
  act: "USTAWA",
  draft: "PROJEKT",
  keyword: "FRAZA",
};

export async function GET() {
  try {
    const [rules, profiles, preference, sent, withheld] = await Promise.all([
      readFromBackend<Rule[]>("/api/v1/alerts/rules"),
      readFromBackend<Profile[]>("/api/v1/profiles"),
      readFromBackend<Preference>("/api/v1/alerts/preferences"),
      readFromBackend<Notification[]>(`/api/v1/alerts?limit=${PREVIEW_LIMIT}`),
      readFromBackend<Decision[]>(`/api/v1/alerts/decisions?limit=${DECISION_LIMIT}`),
    ]);

    const named = new Map(profiles.data.map((profile) => [profile.id, profile]));

    const alerts: Alerts = {
      columns: ["REGUŁA", "CO WYWOŁUJE", "PRÓG", "ETAPY", "DORĘCZANIE", "STAN"],
      rules: rules.data.map((rule) => describeRule(rule, named, preference.data)),
      fields: fieldsFor(profiles.data, rules.data, preference.data),
      sentence: cadenceSentence(preference.data, rules.data),
      preview: sent.data.map(describeNotification),
      channels: channelsFor(preference.data),
      activity: activityFor(sent.data, withheld.data),
      previewNote: previewNote(sent.data, withheld.data),
      quietHours: quietHoursLabel(preference.data),
    };

    return jsonForScreen(alerts, [rules, profiles, preference, sent, withheld]);
  } catch (cause) {
    return readableFailure(cause);
  }
}

function describeRule(
  rule: Rule,
  profiles: Map<string, Profile>,
  preference: Preference,
): AlertRule {
  const profile = profiles.get(rule.profileId);
  const critical = rule.urgency === "critical";

  return {
    id: rule.id,
    settings: {
      enabled: rule.enabled,
      stages: rule.stages,
      urgency: rule.urgency,
      minimumSignificance: rule.minimumSignificance,
    },
    name: profile?.name ?? "Profil spoza konta",
    // A rule points at a version of a profile, and an alert raised last week was
    // decided by what that profile said then. Naming the version is what makes the
    // two reconcilable.
    scope: profile ? `profil w wersji ${profile.version}` : rule.profileId,
    condition: critical
      ? "Każde dopasowanie profilu. Pilne: wychodzi też w godzinach ciszy i poza oknem."
      : "Każde dopasowanie profilu, doręczane w najbliższym oknie.",
    threshold:
      rule.minimumSignificance > 0 ? `istotność ≥ ${rule.minimumSignificance}` : "bez progu",
    // The stage vocabulary is closed and lives inside the legislative context; it is
    // not published over HTTP, so what a rule watches is read back from the rule
    // rather than offered as a list this side would have to keep in step.
    sources: rule.stages.length > 0 ? rule.stages.map(stageLabel).join(", ") : "wszystkie etapy",
    channels: critical
      ? "e-mail · natychmiast"
      : `e-mail · ${MODES[preference.mode] ?? preference.mode}`,
    state: rule.enabled ? "AKTYWNA" : "WYŁĄCZONA",
    tone: rule.enabled ? "emerald" : "neutral",
  };
}

/**
 * A wire name made readable, without writing the vocabulary down a second time.
 *
 * Two rules and no list: underscores are word breaks, and a word made only of `i` is a
 * Roman numeral the source spells in lower case (`i_czytanie`, `iii_czytanie`). Because
 * nothing here enumerates the stages, a stage added on the backend renders correctly
 * without this file being touched — which is the whole reason not to keep a copy.
 *
 * The proper fix is upstream: a vocabulary the screens have to render is a vocabulary
 * the API should publish.
 */
function stageLabel(stage: string): string {
  return stage
    .split("_")
    .map((word) => (/^i+$/.test(word) ? word.toUpperCase() : word))
    .join(" ");
}

/**
 * The choices the backend actually records, and no others.
 *
 * The stages are missing on purpose — see [describeRule]. Offering a dropdown of them
 * would mean writing that vocabulary out a second time here, and a second copy of a
 * closed list is a list that drifts.
 */
function fieldsFor(profiles: Profile[], rules: Rule[], preference: Preference): RuleField[] {
  const first = rules[0];

  return [
    {
      label: "Profil",
      hint: "Reguła nie ma własnych warunków — pilnuje jednego profilu.",
      options: profiles.map((profile) => profile.name),
      selected: profiles.find((it) => it.id === first?.profileId)?.name ?? profiles[0]?.name ?? "—",
    },
    {
      label: "Pilność",
      hint: "Wybiera człowiek, nie model: decyduje wyłącznie o tym, czy obowiązują godziny ciszy.",
      options: ["normalna", "pilna"],
      selected: first?.urgency === "critical" ? "pilna" : "normalna",
    },
    {
      label: "Próg istotności",
      hint: "Ile pozycja musi znaczyć, żeby reguła się odezwała. Zero to brak progu.",
      options: ["0", "25", "50", "75"],
      selected: String(first?.minimumSignificance ?? 0),
    },
    {
      label: "Doręczanie",
      hint: "Wspólne dla całego konta, nie dla pojedynczej reguły.",
      options: Object.values(MODES),
      selected: MODES[preference.mode] ?? preference.mode,
    },
  ];
}

function cadenceSentence(preference: Preference, rules: Rule[]): string {
  const active = rules.filter((rule) => rule.enabled).length;
  const critical = rules.filter((rule) => rule.urgency === "critical").length;

  const lines = [
    `${pluralPl(active, "aktywna reguła", "aktywne reguły", "aktywnych reguł")} ` +
      `z ${pluralPl(rules.length, "zapisanej", "zapisanych", "zapisanych")}.`,
    "",
    `Okno doręczania: ${windowLabel(preference)}, czas ${preference.zone}.`,
    quietHoursSentence(preference, critical),
  ];

  return lines.join("\n");
}

function windowLabel(preference: Preference): string {
  const mode = MODES[preference.mode] ?? preference.mode;

  if (preference.mode === "weekly" && preference.onWeekday !== null) {
    const day = WEEKDAYS[preference.onWeekday - 1] ?? `dzień ${preference.onWeekday}`;
    return `${mode}, w ${day}${atHour(preference)}`;
  }

  return `${mode}${atHour(preference)}`;
}

function atHour(preference: Preference): string {
  return preference.atHour === null ? "" : ` o ${String(preference.atHour).padStart(2, "0")}:00`;
}

function quietHoursSentence(preference: Preference, critical: number): string {
  const range = quietRange(preference);

  if (range === null) {
    return "Godziny ciszy nie są ustawione — alerty wychodzą o każdej porze.";
  }

  // The count leads, so the plural never has to open a sentence and be capitalised
  // into "1 Reguła pilna przechodzi".
  return critical > 0
    ? `Przez ciszę ${range} przechodzi mimo to ${pluralPl(critical, "reguła pilna", "reguły pilne", "reguł pilnych")}.`
    : `Cisza ${range}. Żadna reguła nie ma pilności, więc nic jej nie przerywa.`;
}

/** The window itself, as it reads inside a sentence. Null when nobody set one. */
function quietRange(preference: Preference): string | null {
  if (preference.quietFrom === null || preference.quietTo === null) return null;

  const hour = (value: number) => `${String(value).padStart(2, "0")}:00`;
  return `${hour(preference.quietFrom)}–${hour(preference.quietTo)}`;
}

/** The same window as a section heading, which is a different shape from a sentence. */
function quietHoursLabel(preference: Preference): string {
  const range = quietRange(preference);
  return range === null
    ? "GODZINY CISZY: NIEUSTAWIONE"
    : `GODZINY CISZY: ${range} · PRZECHODZĄ TYLKO PILNE`;
}

/**
 * The chip names what caught it, not which pipe it came down.
 *
 * There is one transport, so "E-MAIL" on every row would be six repetitions of a
 * constant. The matched interest is the row's actual news: it is the answer to "why am
 * I being told this", and the backend hands it over for exactly that reason.
 */
function describeNotification(notification: Notification): AlertPreview {
  return {
    channel: `${MATCH_LABELS[notification.matchedKind] ?? notification.matchedKind.toUpperCase()} ${notification.matchedValue}`,
    tone: notification.readAt === null ? "accent" : "neutral",
    when: whenLabel(notification.createdAt),
    score: String(notification.significance),
    text: notification.title,
  };
}

/** Only what exists. A card for SMS or push would be a promise nothing here can keep. */
function channelsFor(preference: Preference): NotificationChannel[] {
  return [
    {
      name: "E-MAIL",
      state: "JEDYNY TRANSPORT",
      tone: "emerald",
      note: "Alerty i podsumowania idą pocztą. Bez skonfigurowanego SMTP okna i tak się zamykają, a treść zostaje w API.",
      cadence: windowLabel(preference),
    },
    {
      name: "KALENDARZ (ICS)",
      state: "SUBSKRYPCJA NA PROFIL",
      tone: "neutral",
      note: "Terminy konsultacji jako kanał, który sam się odpytuje. Adres jest losowy i odwoływalny — to on jest upoważnieniem.",
      cadence: "odświeżane przez klienta kalendarza",
    },
  ];
}

function activityFor(sent: Notification[], withheld: Decision[]): string[] {
  const unread = sent.filter((notification) => notification.readAt === null).length;

  return [
    `ostatnie powiadomienia: ${sent.length}, nieprzeczytane: ${unread}`,
    `wstrzymane decyzje silnika: ${withheld.length}`,
  ];
}

/**
 * What was withheld, and on what ground.
 *
 * Grouped by reason rather than listed: "wstrzymano 14" is a number somebody has to go
 * and investigate, and the reason is the investigation.
 */
function previewNote(sent: Notification[], withheld: Decision[]): string {
  if (sent.length === 0 && withheld.length === 0) {
    return "Silnik nie podjął jeszcze żadnej decyzji dla tego konta — nic nie wysłano i nic nie wstrzymano.";
  }

  if (withheld.length === 0) {
    return `W tym oknie nic nie zostało wstrzymane — wszystko, co pasowało, poszło dalej.`;
  }

  const byReason = new Map<string, number>();
  for (const decision of withheld) {
    byReason.set(decision.reason, (byReason.get(decision.reason) ?? 0) + 1);
  }

  const grouped = [...byReason]
    .sort((left, right) => right[1] - left[1])
    .map(([reason, count]) => `${reason} (${count})`)
    .join(", ");

  return `Wstrzymano ${pluralPl(withheld.length, "pozycję", "pozycje", "pozycji")}: ${grouped}.`;
}

const WHEN = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function whenLabel(instant: string): string {
  const at = new Date(instant);
  return Number.isNaN(at.getTime()) ? instant : WHEN.format(at);
}
