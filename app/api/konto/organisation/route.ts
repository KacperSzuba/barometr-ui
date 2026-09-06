/**
 * "Kto ma dostęp i do czego" — one workspace: its people, its seats, its two policies.
 *
 * The account may belong to several, so the membership list is read first and the rest
 * hangs off the one it picks. Which one is a question the reader answers, the same way
 * they pick a profile on the configuration screen.
 *
 * The permission matrix is not read from anywhere, and could not be: the three workspace
 * roles are a closed vocabulary inside identity, and what each may do is written into
 * `TeamWorkspaces` as code rather than as data. What is written here is a reading of
 * that code, kept beside the endpoints it describes — and it is the one thing on this
 * screen that a backend change could silently falsify.
 */
import { BackendError, readFromBackend, type Read } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";
import { pluralPl } from "@/lib/format";
import type {
  ActivityEntry,
  ChipEntry,
  Member,
  Organisation,
  Permission,
  Role,
  SettingRow,
  Tone,
} from "@/lib/data/types";

interface Membership {
  workspaceId: string;
  role: string;
  joinedAt: string;
}

interface Workspace {
  id: string;
  name: string;
  seats: number;
  seatsTaken: number;
  requireTwoFactor: boolean;
  sessionIdleTimeout: string | null;
  myRole: string;
}

interface WorkspaceMember {
  userId: string;
  email: string | null;
  role: string;
  joinedAt: string;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
}

interface AuditEntry {
  at: string;
  action: string;
  resource: string;
  outcome: string;
  /** The entry's own hash. Unique per row, and already the thing that identifies it. */
  hash: string;
}

const ROLE_LABELS: Record<string, string> = {
  owner: "Właściciel",
  admin: "Administrator",
  member: "Członek",
};

/** Enough recent activity to see who has been doing what, without a day of scrolling. */
const ACTIVITY_LIMIT = 15;

export async function GET(request: Request) {
  const wanted = new URL(request.url).searchParams.get("zespol");

  try {
    const memberships = await readFromBackend<Membership[]>("/api/v1/workspaces");
    const chosen = memberships.data.find((it) => it.workspaceId === wanted) ?? memberships.data[0];

    if (!chosen) return jsonForScreen(withoutWorkspace(), [memberships]);

    const base = `/api/v1/workspaces/${chosen.workspaceId}`;
    const [workspace, members, invitations, audit] = await Promise.all([
      readFromBackend<Workspace>(base),
      readFromBackend<WorkspaceMember[]>(`${base}/members`),
      // Only an administrator may read the open invitations, and a member opening this
      // screen must not get an error page for asking a question they are not allowed to
      // ask. The absence is the answer.
      optional<Invitation[]>(`${base}/invitations`),
      readFromBackend<AuditEntry[]>(`/api/v1/audit/me?limit=${ACTIVITY_LIMIT}`),
    ]);

    const organisation: Organisation = {
      headline: headlineFor(workspace.data),
      teamNote: teamNoteFor(workspace.data),
      roles: rolesIn(members.data),
      permissions: PERMISSIONS,
      members: members.data.map(describeMember),
      activity: audit.data.map(describeActivity),
      policies: policiesOf(workspace.data),
      invites: invitesOf(invitations?.data ?? null, workspace.data),
    };

    return jsonForScreen(
      organisation,
      [memberships, workspace, members, audit, invitations].filter((read) => read !== null),
    );
  } catch (cause) {
    return readableFailure(cause);
  }
}

/** A read the caller may legitimately not be allowed to make. Refusal is data, not a fault. */
async function optional<T>(path: string): Promise<Read<T> | null> {
  try {
    return await readFromBackend<T>(path);
  } catch (cause) {
    if (cause instanceof BackendError) return null;
    throw cause;
  }
}

/** Every account starts outside one, and the screen has to say so rather than render blanks. */
function withoutWorkspace(): Organisation {
  return {
    headline: "ORGANIZACJA · BRAK",
    teamNote: "DOŁĄCZENIE WYŁĄCZNIE PRZEZ ZAPROSZENIE",
    roles: [],
    permissions: PERMISSIONS,
    members: [],
    activity: [],
    policies: [
      {
        name: "Brak organizacji",
        note: "To konto nie należy do żadnego zespołu. Organizacja to miejsca, role i dwie polityki, których pilnuje właściciel.",
        state: "—",
        tone: "neutral",
      },
    ],
    invites: [],
  };
}

function headlineFor(workspace: Workspace): string {
  return `ORGANIZACJA · ${workspace.name.toUpperCase()} · ${workspace.seatsTaken}/${workspace.seats} MIEJSC`;
}

/**
 * Nobody joins by having the right e-mail domain. A seat is offered to one address by
 * somebody who administers the workspace, and taking it means signing in as that
 * address — which is the whole of the mechanism.
 */
function teamNoteFor(workspace: Workspace): string {
  return `DOŁĄCZENIE WYŁĄCZNIE PRZEZ ZAPROSZENIE · TWOJA ROLA: ${(ROLE_LABELS[workspace.myRole] ?? workspace.myRole).toUpperCase()}`;
}

function rolesIn(members: WorkspaceMember[]): Role[] {
  return Object.entries(ROLE_LABELS).map(([wire, name]) => ({
    name,
    count: pluralPl(
      members.filter((member) => member.role === wire).length,
      "osoba",
      "osoby",
      "osób",
    ),
  }));
}

/**
 * Initials from an address, which is all there is.
 *
 * The system stores no name — registration takes an e-mail and a password — so a full
 * name here would be a field somebody invented. The local part is what a colleague
 * recognises anyway.
 */
function describeMember(member: WorkspaceMember): Member {
  const local = member.email?.split("@")[0] ?? "";
  const closed = member.email === null;

  return {
    initials: (local.slice(0, 2) || "??").toUpperCase(),
    name: member.email ?? "Konto zamknięte",
    mail: member.email ?? `id ${member.userId.slice(-8)}`,
    role: ROLE_LABELS[member.role] ?? member.role,
    last: `dołączył ${dayLabel(member.joinedAt)}`,
    state: closed ? "KONTO ZAMKNIĘTE" : "AKTYWNY",
    tone: closed ? "amber" : "emerald",
  };
}

function describeActivity(entry: AuditEntry): ActivityEntry {
  return {
    id: entry.hash,
    when: whenLabel(entry.at),
    what:
      entry.outcome === "denied"
        ? `${entry.action} ${entry.resource} — odmowa`
        : `${entry.action} ${entry.resource}`,
  };
}

/**
 * The two an institutional customer asks about before signing, and no others.
 *
 * The backend's policy endpoint takes exactly these two fields; a row for anything else
 * would be a switch with nothing behind it.
 */
function policiesOf(workspace: Workspace): SettingRow[] {
  const seatsLeft = workspace.seats - workspace.seatsTaken;

  return [
    {
      name: "Drugi składnik wymagany",
      note: "Włączenie nikogo nie wylogowuje: kto nie ma drugiego składnika, wchodzi i dosięga wyłącznie tras rejestracji tego składnika.",
      state: workspace.requireTwoFactor ? "WYMAGANY" : "NIEWYMAGANY",
      tone: workspace.requireTwoFactor ? "emerald" : "amber",
      action: "ZMIEŃ",
    },
    {
      name: "Bezczynność kończy sesję",
      note: "Krócej niż domyślna długość życia sesji we wdrożeniu. Bez ustawienia obowiązuje ta domyślna.",
      state: idleLabel(workspace.sessionIdleTimeout),
      tone: workspace.sessionIdleTimeout ? "emerald" : "neutral",
      action: "ZMIEŃ",
    },
    {
      name: "Miejsca",
      note: "Zaproszenie też zajmuje miejsce — zaoferowane miejsce jest miejscem obiecanym.",
      state: `${workspace.seatsTaken}/${workspace.seats}`,
      tone: seatsLeft > 0 ? "emerald" : "accent",
      action: "ZMIEŃ",
    },
  ];
}

/**
 * An ISO-8601 duration, read back as time.
 *
 * The backend takes and returns exactly what `Duration.parse` accepts, so `PT8H` is the
 * honest wire value and `PT8H` on a settings row is a screen speaking a machine's
 * language at somebody.
 */
function idleLabel(timeout: string | null): string {
  if (timeout === null) return "DOMYŚLNA";

  const parts = timeout.matchAll(/(\d+)([DHM])/g);
  const units: Record<string, [string, string, string]> = {
    D: ["dzień", "dni", "dni"],
    H: ["godzina", "godziny", "godzin"],
    M: ["minuta", "minuty", "minut"],
  };

  const said = [...parts]
    .map(([, count, unit]) => pluralPl(Number(count), ...units[unit]))
    .join(" ");

  return said || timeout;
}

/**
 * Open invitations, or the reason there is no list.
 *
 * A member who is not an administrator may not read them, and saying so beats an empty
 * list that reads as "nobody has been invited".
 */
function invitesOf(invitations: Invitation[] | null, workspace: Workspace): ChipEntry[] {
  if (invitations === null) {
    return [
      {
        label: "Zaproszenia",
        value: `widoczne dla administratorów · twoja rola: ${ROLE_LABELS[workspace.myRole] ?? workspace.myRole}`,
        tone: "neutral",
      },
    ];
  }

  if (invitations.length === 0) {
    return [{ label: "Zaproszenia", value: "brak otwartych", tone: "neutral" }];
  }

  return invitations.map((invitation) => ({
    label: invitation.email,
    value: `${ROLE_LABELS[invitation.role] ?? invitation.role} · wygasa ${dayLabel(invitation.expiresAt)}`,
    tone: "amber" as Tone,
  }));
}

/**
 * What each of the three roles may do, read off `TeamWorkspaces`.
 *
 * Written here because it is not published anywhere: the rules are Kotlin, not rows, and
 * the endpoint that enforces them does not describe them. Kept short and checkable for
 * that reason — every cell below is one `administrator(...)` or `owner(...)` check in
 * that class.
 */
const PERMISSIONS: Permission[] = [
  {
    label: "Czyta zespół i politykę",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
  },
  {
    label: "Zaprasza i usuwa ludzi",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "no" }],
  },
  {
    label: "Ustawia polityki i miejsca",
    cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "no" }],
  },
  {
    label: "Nie da się go usunąć jako ostatniego",
    cells: [{ kind: "yes" }, { kind: "no" }, { kind: "no" }],
  },
  {
    label: "Usuwa sam siebie",
    cells: [{ kind: "text", text: "poza ostatnim" }, { kind: "yes" }, { kind: "yes" }],
  },
];

const DAY = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short", year: "numeric" });
const WHEN = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function dayLabel(instant: string): string {
  const at = new Date(instant);
  return Number.isNaN(at.getTime()) ? instant : DAY.format(at);
}

function whenLabel(instant: string): string {
  const at = new Date(instant);
  return Number.isNaN(at.getTime()) ? instant : WHEN.format(at);
}
