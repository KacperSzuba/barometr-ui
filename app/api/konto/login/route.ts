/**
 * "Jak wchodzisz i czym się potwierdzasz", assembled from four backend reads.
 *
 * This is the first screen taken off the mocks, and it sets the pattern for the other
 * forty-three: the backend publishes resources — an account, its sessions, its second
 * factor, its audit trail — and the shape the page wants is a page, so something has to
 * do the joining. It is done here rather than in Kotlin because the shape is a fact about
 * this screen and about nothing else, and because `tone`, the wording of a state and the
 * formatting of a date are presentation, which a bounded context should not own.
 *
 * **What is not here is as deliberate as what is.** The mock offered magic links,
 * passkeys, OAuth and SSO. The backend has a password and TOTP. Listing the rest as
 * "AKTYWNA" would be a screen describing a product rather than an account, so they are
 * absent until something implements them.
 */
import { readFromBackend } from "@/lib/server/backend";
import { jsonForScreen, signedOutOr } from "@/lib/server/respond";
import type { Login, LoginEvent, Session, SettingRow, Tone } from "@/lib/data/types";

interface Account {
  id: string;
  email: string;
  roles: string[];
}

interface SignedInSession {
  id: string;
  current: boolean;
  userAgent: string | null;
  clientIp: string | null;
  approximateLocation: string | null;
  createdAt: string;
  lastSeenAt: string;
}

interface SecondFactor {
  enabled: boolean;
  enrolmentStarted: boolean;
  recoveryCodesLeft: number;
}

interface AuditEntry {
  at: string;
  action: string;
  resource: string;
  outcome: string;
  status: number | null;
  detail: string | null;
  /** The entry's own hash. Unique per row, and already the thing that identifies it. */
  hash: string;
}

/** Enough to recognise the last few sign-ins without scrolling past a day of reads. */
const HISTORY_LIMIT = 12;

export async function GET() {
  try {
    const [account, sessions, factor, history] = await Promise.all([
      readFromBackend<Account>("/api/v1/me"),
      readFromBackend<SignedInSession[]>("/api/v1/sessions"),
      readFromBackend<SecondFactor>("/api/v1/auth/2fa"),
      readFromBackend<AuditEntry[]>(`/api/v1/audit/me?limit=${HISTORY_LIMIT}`),
    ]);

    const login: Login = {
      email: account.data.email,
      authMethods: authMethodsOf(account.data, factor.data),
      operations: ACCOUNT_OPERATIONS,
      sessions: sessions.data.map(describeSession),
      history: history.data.map(describeEvent),
    };

    return jsonForScreen(login, [account, sessions, factor, history]);
  } catch (cause) {
    return signedOutOr(cause);
  }
}

function authMethodsOf(account: Account, factor: SecondFactor): SettingRow[] {
  return [
    {
      name: "Hasło",
      note: `Konto ${account.email}. Zmiana hasła unieważnia wszystkie sesje poza bieżącą.`,
      state: "USTAWIONE",
      tone: "emerald",
      action: "ZMIEŃ",
    },
    secondFactorRow(factor),
  ];
}

/**
 * Three states, not two. Enrolment started and never confirmed looks from the outside
 * exactly like having done nothing, and that is the state worth saying out loud.
 */
function secondFactorRow(factor: SecondFactor): SettingRow {
  if (factor.enabled) {
    return {
      name: "2FA: aplikacja uwierzytelniająca",
      note: `Kodów zapasowych do wykorzystania: ${factor.recoveryCodesLeft}.`,
      state: "AKTYWNE",
      tone: factor.recoveryCodesLeft > 0 ? "emerald" : "amber",
      action: "KODY ZAPASOWE",
    };
  }

  if (factor.enrolmentStarted) {
    return {
      name: "2FA: aplikacja uwierzytelniająca",
      note: "Kod QR zeskanowany, potwierdzenie niedokończone — logowanie nadal idzie samym hasłem.",
      state: "NIEDOKOŃCZONE",
      tone: "amber",
      action: "DOKOŃCZ",
    };
  }

  return {
    name: "2FA: aplikacja uwierzytelniająca",
    note: "Wyłączone. Samo hasło wystarczy, żeby wejść na to konto.",
    state: "WYŁĄCZONE",
    tone: "amber",
    action: "WŁĄCZ",
  };
}

/** Only what the backend actually implements: the export and the closure. */
const ACCOUNT_OPERATIONS: Login["operations"] = [
  {
    name: "Eksport danych konta",
    note: "Wszystko, co to konto o sobie zostawiło. Przygotowywany w tle.",
    cta: "EKSPORTUJ",
    tone: "emerald",
  },
  {
    name: "Usunięcie konta",
    note: "Wymaga hasła. Nieodwracalne.",
    cta: "USUŃ KONTO",
    tone: "accent",
  },
];

/**
 * A user agent is not a device name, and the backend says so by handing it over
 * unparsed. It is shortened rather than interpreted here: guessing "MacBook Pro" out of
 * a header is how a session list ends up confidently wrong.
 */
function describeSession(session: SignedInSession): Session {
  return {
    id: session.id,
    device: session.userAgent?.slice(0, 60) ?? "Nieznany klient",
    meta: [session.approximateLocation, session.clientIp].filter(Boolean).join(" · ") || "—",
    when: session.current ? "ta sesja" : whenLabel(session.lastSeenAt),
    // The one session that must not offer a way to end itself is the one being read on.
    action: session.current ? "—" : "WYLOGUJ",
    isHighlighted: session.current,
  };
}

function describeEvent(entry: AuditEntry): LoginEvent {
  return {
    id: entry.hash,
    when: whenLabel(entry.at),
    what: entry.detail ? `${entry.action} — ${entry.detail}` : `${entry.action} ${entry.resource}`,
    tag: entry.outcome.toUpperCase(),
    tone: outcomeTone(entry.outcome),
  };
}

/** A refusal is the entry an audit trail is bought for, so it is the one that stands out. */
function outcomeTone(outcome: string): Tone {
  return outcome === "denied" ? "accent" : "neutral";
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
