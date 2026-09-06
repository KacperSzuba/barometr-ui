/**
 * "Czym się da nas sprawdzić i jak nas podłączyć" — the account's keys, and the rights
 * this system implements rather than describes.
 *
 * The compliance blocks are not marketing copy here. Each one names a route that exists
 * and reports its actual state: how many exports this account has asked for, whether the
 * second factor is on, how much of its own audit trail it can read. A claim on this
 * screen that nothing could be checked against would be the exact failure the trail is
 * bought to prevent.
 */
import { readFromBackend } from "@/lib/server/backend";
import { jsonForScreen, signedOutOr } from "@/lib/server/respond";
import { pluralPl } from "@/lib/format";
import type { ApiKey, ChipEntry, ComplianceBlock, Security, Tone } from "@/lib/data/types";

interface Key {
  id: string;
  name: string;
  tier: string;
  requestsPerHour: number;
  scopes: string[];
  createdAt: string;
  expiresAt: string | null;
  revokedAt: string | null;
  lastUsedAt: string | null;
  requests: number;
}

interface Export {
  id: string;
  status: string;
  byteSize: number | null;
  requestedAt: string;
  completedAt: string | null;
  expiresAt: string;
}

interface SecondFactor {
  enabled: boolean;
  enrolmentStarted: boolean;
  recoveryCodesLeft: number;
}

interface AuditEntry {
  at: string;
  action: string;
  outcome: string;
}

/** Enough to say how busy the trail is without reading a year of it. */
const AUDIT_SAMPLE = 200;

export async function GET() {
  try {
    const [keys, exports, factor, audit] = await Promise.all([
      readFromBackend<Key[]>("/api/v1/me/api-keys"),
      readFromBackend<Export[]>("/api/v1/me/export"),
      readFromBackend<SecondFactor>("/api/v1/auth/2fa"),
      readFromBackend<AuditEntry[]>(`/api/v1/audit/me?limit=${AUDIT_SAMPLE}`),
    ]);

    const security: Security = {
      compliance: complianceFor(exports.data, factor.data, audit.data),
      keyColumns: ["KLUCZ", "ZAKRESY", "TEMPO", "UŻYCIE", "STAN"],
      keys: keys.data.map(describeKey),
      curlSample: curlSample(),
      webhooks: WEBHOOKS,
      devTools: DEV_TOOLS,
      activity: activityFor(keys.data, exports.data),
    };

    return jsonForScreen(security, [keys, exports, factor, audit]);
  } catch (cause) {
    return signedOutOr(cause);
  }
}

/**
 * A key is described by what it can do and what it has done — never by what it is.
 *
 * There is no prefix to show. The secret comes back once, from the call that mints it,
 * and what is stored is a hash; a column showing the first characters of a live key
 * would mean keeping something of it that this system deliberately does not keep. The
 * identifier under the name is what a revocation names, which is the only handle a
 * reader actually needs — its *tail*, because these are UUIDv7 and the front of one is
 * a timestamp: two keys minted in the same second share their first eight characters
 * exactly, so a prefix would tell two rows apart by not telling them apart at all.
 */
function describeKey(key: Key): ApiKey {
  const state = keyState(key);

  return {
    name: key.name,
    prefix: `…${key.id.slice(-8)} · od ${dayLabel(key.createdAt)}`,
    scopes: key.scopes.join(", "),
    rate: `${key.requestsPerHour}/h · ${key.tier}`,
    used: key.lastUsedAt
      ? `${key.requests} · ost. ${dayLabel(key.lastUsedAt)}`
      : `${key.requests} · nieużywany`,
    env: state.label,
    tone: state.tone,
  };
}

function keyState(key: Key): { label: string; tone: Tone } {
  if (key.revokedAt !== null) return { label: "ODWOŁANY", tone: "neutral" };
  if (key.expiresAt !== null && new Date(key.expiresAt) < new Date()) {
    return { label: "WYGASŁ", tone: "amber" };
  }
  return { label: "AKTYWNY", tone: "emerald" };
}

/**
 * Three blocks, three rights, each with a route behind it and a state read from it.
 */
function complianceFor(
  exports: Export[],
  factor: SecondFactor,
  audit: AuditEntry[],
): ComplianceBlock[] {
  const ready = exports.filter((it) => it.status === "ready" || it.completedAt !== null);
  const denied = audit.filter((entry) => entry.outcome === "denied").length;

  return [
    {
      kicker: "ART. 15 I 17 RODO",
      name: "Kopia i usunięcie",
      items: [
        entry(
          "Eksport danych",
          exports.length === 0
            ? "nigdy nie zamawiany"
            : `${pluralPl(exports.length, "zamówienie", "zamówienia", "zamówień")} · ostatnie ${dayLabel(exports[0].requestedAt)}`,
          exports.length === 0 ? "neutral" : "emerald",
        ),
        entry(
          "Gotowe do pobrania",
          ready.length === 0 ? "brak" : `${ready.length} · wygasa ${dayLabel(ready[0].expiresAt)}`,
          ready.length === 0 ? "neutral" : "emerald",
        ),
        entry("Zamknięcie konta", "wymaga hasła · nieodwracalne", "amber"),
      ],
    },
    {
      kicker: "ŚLAD AUDYTOWY",
      name: "Co o tobie zapisano",
      items: [
        entry(
          "Wpisy o tym koncie",
          audit.length >= AUDIT_SAMPLE ? `${AUDIT_SAMPLE}+` : String(audit.length),
          "emerald",
        ),
        // The refusals are the entries an audit trail is bought for; a count of
        // successful requests answers an easier question.
        entry(
          "W tym odmowy",
          denied === 0 ? "brak" : String(denied),
          denied === 0 ? "neutral" : "accent",
        ),
        entry("Do pobrania", "CSV, ten sam zestaw co API", "neutral"),
      ],
    },
    {
      kicker: "DOSTĘP DO KONTA",
      name: "Czym się potwierdzasz",
      items: [
        entry("Drugi składnik", secondFactorState(factor), factor.enabled ? "emerald" : "amber"),
        entry(
          "Kody zapasowe",
          factor.enabled ? String(factor.recoveryCodesLeft) : "—",
          factor.enabled && factor.recoveryCodesLeft === 0 ? "accent" : "neutral",
        ),
        entry("Token dostępowy", "15 minut · rotowany refresh", "neutral"),
      ],
    },
  ];
}

function secondFactorState(factor: SecondFactor): string {
  if (factor.enabled) return "aplikacja uwierzytelniająca";
  return factor.enrolmentStarted ? "zaczęty, niepotwierdzony" : "wyłączony";
}

function entry(label: string, value: string, tone: Tone): ChipEntry {
  return { label, value, tone };
}

/**
 * The public API, which is the only thing a key opens. Written against the route that
 * exists rather than an illustrative one — a sample somebody pastes and gets a 404 from
 * teaches them the documentation is not maintained.
 */
function curlSample(): string {
  return [
    "curl -sS https://api.barometr.pl/api/v1/public/consultations \\",
    '  -H "X-Api-Key: $BAROMETR_KEY"',
    "",
    "# Bez klucza też odpowiada: 60 żądań na godzinę po adresie.",
    "# Nagłówki X-RateLimit-* mówią, ile zostało, a X-Attribution — kogo cytować.",
  ].join("\n");
}

/**
 * One webhook exists, and it points the other way: a mail provider reporting a bounce.
 * The mock offered outbound hooks per account; nothing here delivers one, and a row
 * describing one would be a promise the engine cannot keep.
 */
const WEBHOOKS: Security["webhooks"] = [
  {
    url: "POST /api/v1/alerts/email-events",
    note: "Przychodzący, od dostawcy poczty: odbicia i skargi. Uwierzytelniany współdzielonym sekretem — nieustawiony odrzuca wszystko.",
    state: "PRZYCHODZĄCY",
    tone: "neutral",
  },
];

const DEV_TOOLS: Security["devTools"] = [
  {
    name: "OpenAPI",
    note: "GET /v3/api-docs — kontrakt generowany z kodu, nie pisany obok niego.",
  },
  { name: "Kanał ICS", note: "Terminy konsultacji dla profilu, adres losowy i odwoływalny." },
  { name: "CSV konsultacji", note: "GET /api/v1/public/consultations/csv — wymaga zakresu bulk." },
];

function activityFor(keys: Key[], exports: Export[]): string[] {
  const live = keys.filter((key) => key.revokedAt === null).length;
  const last = exports[0];

  return [
    `klucze API: ${live} aktywne z ${keys.length}`,
    last
      ? `ostatni eksport danych konta: ${dayLabel(last.requestedAt)}`
      : "eksport danych konta: nigdy nie zamawiany",
  ];
}

const DAY = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short", year: "numeric" });

function dayLabel(instant: string): string {
  const at = new Date(instant);
  return Number.isNaN(at.getTime()) ? instant : DAY.format(at);
}
