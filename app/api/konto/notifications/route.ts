/**
 * "Co, gdzie i jak często" — what this account is told, through what, and how much of
 * it there has actually been.
 *
 * The matrix is one column wide, and that is the screen's main piece of news. The mock
 * drew six — e-mail, push, SMS, Slack, Teams, webhook — and one transport exists. A
 * matrix with five empty columns would be a screen describing a roadmap; one column
 * describes the system.
 */
import { readFromBackend } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";
import { pluralPl } from "@/lib/format";
import type { ChannelCount, Endpoint, Notifications, SettingRow } from "@/lib/data/types";

interface Account {
  email: string;
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
  readAt: string | null;
}

interface Digest {
  id: string;
  createdAt: string;
  matters: { alerts: string[] }[];
}

interface Decision {
  reason: string;
}

/** A window wide enough to show a shape, narrow enough not to be a feed. */
const LIMIT = 100;

const MODES: Record<string, string> = {
  immediate: "natychmiast",
  hourly: "co godzinę",
  daily: "raz dziennie",
  weekly: "raz w tygodniu",
};

export async function GET() {
  try {
    const [account, preference, alerts, digests, withheld] = await Promise.all([
      readFromBackend<Account>("/api/v1/me"),
      readFromBackend<Preference>("/api/v1/alerts/preferences"),
      readFromBackend<Notification[]>(`/api/v1/alerts?limit=${LIMIT}`),
      readFromBackend<Digest[]>(`/api/v1/alerts/digests?limit=${LIMIT}`),
      readFromBackend<Decision[]>(`/api/v1/alerts/decisions?limit=${LIMIT}`),
    ]);

    const notifications: Notifications = {
      cadence: cadenceFor(preference.data),
      columns: ["E-MAIL"],
      rows: EVENTS,
      endpoints: endpointsFor(account.data),
      countsTitle: `CO FAKTYCZNIE POSZŁO · OSTATNIE ${LIMIT} POZYCJI`,
      counts: countsFor(alerts.data, digests.data, withheld.data),
      countsNote: mergingNote(digests.data),
      hygiene: hygieneFor(preference.data),
    };

    return jsonForScreen(notifications, [account, preference, alerts, digests, withheld]);
  } catch (cause) {
    return readableFailure(cause);
  }
}

/**
 * The four things this system sends, and nothing else.
 *
 * Each is a job type the backend registers a handler for — `alerts.digest.mail`,
 * `alerts.new-device-mail`, `alerts.invitation-mail` — plus the match that fills a
 * window. A row for anything else would be a row nothing enqueues.
 */
const EVENTS: Notifications["rows"] = [
  {
    label: "Dopasowanie profilu",
    note: "Coś, co pasuje do interesu z profilu, trafia do najbliższego okna doręczania.",
    cells: [{ kind: "yes" }],
  },
  {
    label: "Zamknięcie okna",
    note: "Podsumowanie tego, co zebrało się w oknie, zgrupowane po sprawie, a nie po wierszu.",
    cells: [{ kind: "yes" }],
  },
  {
    label: "Logowanie z nowego urządzenia",
    note: "Pierwsze logowanie z klienta, którego to konto dotąd nie używało. Nie dotyczy pierwszego logowania w ogóle.",
    cells: [{ kind: "yes" }],
  },
  {
    label: "Zaproszenie do zespołu",
    note: "Wysyłane na adres, któremu zaoferowano miejsce. Token idzie w tej jednej wiadomości i nigdzie indziej.",
    cells: [{ kind: "yes" }],
  },
];

function cadenceFor(preference: Preference): string[] {
  const mode = MODES[preference.mode] ?? preference.mode;
  const hour =
    preference.atHour === null ? "" : ` o ${String(preference.atHour).padStart(2, "0")}:00`;

  return [
    `okno doręczania: ${mode}${hour}, czas ${preference.zone}`,
    preference.quietFrom === null || preference.quietTo === null
      ? "godziny ciszy: nieustawione"
      : `godziny ciszy: ${pad(preference.quietFrom)}–${pad(preference.quietTo)} · przechodzą tylko reguły pilne`,
  ];
}

function pad(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

/**
 * One address and one feed.
 *
 * The account's own e-mail is not configurable as a destination — it is where this
 * account is, and changing it is changing the account. The calendar feed is the only
 * other place anything leaves through, and its address is its own authorisation, which
 * is why it is not printed here.
 */
function endpointsFor(account: Account): Endpoint[] {
  return [
    {
      kind: "E-MAIL",
      value: account.email,
      note: "Adres konta. Alerty i podsumowania idą tutaj; osobnego odbiornika nie ma.",
      state: "JEDYNY",
      tone: "emerald",
    },
    {
      kind: "ICS",
      value: "kanał kalendarza per profil",
      note: "Terminy konsultacji, odpytywane przez klienta kalendarza. Adres jest losowy i odwoływalny — to on jest upoważnieniem, więc nie pokazujemy go poza konfiguracją.",
      state: "NA ŻĄDANIE",
      tone: "neutral",
    },
  ];
}

/**
 * Three counts from three reads, and the third is the one worth having: what the engine
 * decided *not* to send. A panel showing only what went out answers the easy half of
 * "dlaczego nic nie dostaję".
 */
function countsFor(
  alerts: Notification[],
  digests: Digest[],
  withheld: Decision[],
): ChannelCount[] {
  const rows = [
    { channel: "ALERTY", value: alerts.length },
    { channel: "PODSUMOWANIA", value: digests.length },
    { channel: "WSTRZYMANE", value: withheld.length },
  ];

  // Relative to the busiest row, so an account with three alerts and no digests still
  // renders a bar somebody can read.
  const busiest = Math.max(...rows.map((row) => row.value), 1);

  return rows.map((row) => ({
    channel: row.channel,
    count: String(row.value),
    share: Math.round((row.value / busiest) * 100),
  }));
}

/**
 * What the windows actually did to the volume — counted, not estimated.
 *
 * A digest groups by matter rather than by row, so a draft that moved and was then
 * published is one thing to a reader and two rows to the engine. The difference between
 * those two numbers is the whole value of having windows at all.
 */
function mergingNote(digests: Digest[]): string {
  if (digests.length === 0) {
    return "Żadne okno jeszcze się nie zamknęło, więc nie ma czego grupować.";
  }

  const matters = digests.reduce((total, digest) => total + digest.matters.length, 0);
  const grouped = digests.reduce(
    (total, digest) =>
      total + digest.matters.reduce((sum, matter) => sum + matter.alerts.length, 0),
    0,
  );

  return (
    `${pluralPl(grouped, "powiadomienie zebrało się", "powiadomienia zebrały się", "powiadomień zebrało się")} ` +
    `w ${pluralPl(matters, "sprawę", "sprawy", "spraw")}, w ${pluralPl(digests.length, "oknie", "oknach", "oknach")}. ` +
    "Grupowanie liczy się przy czytaniu, nie przy zapisie, więc ta sama historia może zostać złożona inaczej jutro."
  );
}

function hygieneFor(preference: Preference): SettingRow[] {
  return [
    {
      name: "Wypisanie z listy",
      note: "Każda wiadomość niesie odwoływalny token, który zatrzymuje pocztę bez logowania. Kto nie może się wypisać, oznacza wiadomość jako spam.",
      state: "W KAŻDEJ WIADOMOŚCI",
      tone: "emerald",
    },
    {
      name: "Pilność omija ciszę",
      note: "Wybiera człowiek przy regule, nie model przy zdarzeniu. Model decydujący o trzeciej w nocy, że coś jest warte obudzenia, składałby obietnicę w cudzym imieniu.",
      state:
        preference.quietFrom === null ? "CISZA NIEUSTAWIONA" : "TYLKO REGUŁY OZNACZONE JAKO PILNE",
      tone: preference.quietFrom === null ? "neutral" : "emerald",
    },
    {
      // A real gap, said out loud rather than shown as zeros. The engine records
      // bounces and complaints — the provider posts them to /api/v1/alerts/email-events
      // — but nothing reads them back out, so this screen cannot honestly report
      // deliverability.
      name: "Stan doręczeń",
      note: "Odbicia i skargi są zapisywane, ale nie ma trasy, która je czyta, więc tego stanu nie da się dziś pokazać. Zera byłyby zmyślone.",
      state: "NIEDOSTĘPNY",
      tone: "amber",
    },
  ];
}
