/**
 * "Co obserwujemy i gdzie" — one interest profile, and the names of the others.
 *
 * The backend models a profile as a name and a flat list of interests, each a kind, a
 * value and whether it excludes rather than includes. Everything this screen shows is a
 * reading of that list: what is watched, grouped by kind; what is muted, which is the
 * same list filtered to the exclusions; and a sentence saying what the whole thing adds
 * up to.
 *
 * The preview is asked for separately because the backend charges for it — a search per
 * phrase — and it earns that here: an interest that matches nothing today is the answer
 * to "why am I not hearing anything", which is the question this screen exists to
 * prevent somebody asking.
 */
import { BackendError, readFromBackend, type Read } from "@/lib/server/backend";
import { jsonForScreen, readableFailure } from "@/lib/server/respond";
import { pluralPl } from "@/lib/format";
import type { InterestProfile, Mute, WatchedGroup } from "@/lib/data/types";

interface Interest {
  kind: string;
  value: string;
  excluded: boolean;
}

interface Profile {
  id: string;
  name: string;
  version: number;
  interests: Interest[];
}

interface MatchPreview {
  version: number;
  matches: { kind: string; id: string; title: string; eli: string | null }[];
  /** Interests that match nothing right now. */
  silent: Interest[];
  /** Interests that could not be looked up at all. */
  dormant: { interest: Interest }[];
}

/**
 * The backend's five interest kinds, in the words the screen uses.
 *
 * Four forms each, because Polish needs three of them to count and the group heading is
 * a fifth thing again. A kind this table does not know — the backend's vocabulary is
 * closed, but it can grow — falls back to the wire name rather than to a wrong ending.
 */
interface KindWords {
  group: string;
  one: string;
  few: string;
  many: string;
}

const KINDS: Record<string, KindWords> = {
  pkd: { group: "KODY PKD", one: "kod PKD", few: "kody PKD", many: "kodów PKD" },
  region: {
    group: "WOJEWÓDZTWA",
    one: "województwo",
    few: "województwa",
    many: "województw",
  },
  act: { group: "USTAWY", one: "ustawa", few: "ustawy", many: "ustaw" },
  draft: { group: "PROJEKTY", one: "projekt", few: "projekty", many: "projektów" },
  keyword: { group: "FRAZY", one: "fraza", few: "frazy", many: "fraz" },
};

function wordsFor(kind: string): KindWords {
  return KINDS[kind] ?? { group: kind.toUpperCase(), one: kind, few: kind, many: kind };
}

export async function GET(request: Request) {
  const wanted = new URL(request.url).searchParams.get("profil");

  try {
    const owned = await readFromBackend<Profile[]>("/api/v1/profiles");
    const chosen = owned.data.find((profile) => profile.name === wanted) ?? owned.data[0];

    if (!chosen) return jsonForScreen(emptyAccount(), [owned]);

    const preview = await previewFor(chosen.id);

    const watched = chosen.interests.filter((interest) => !interest.excluded);
    const excluded = chosen.interests.filter((interest) => interest.excluded);

    const profile: InterestProfile = {
      profiles: owned.data.map((it) => it.name),
      // No fields, and that is the honest answer rather than an oversight. The mock drew
      // dropdowns for an industry and a range; the backend has no such vocabulary — a
      // profile is a list of interests a person writes. Offering choices nothing would
      // record is how a settings screen starts lying about what it saves.
      fields: [],
      sentence: sentenceFor(chosen, watched, excluded, preview?.data),
      watched: groupByKind(watched),
      muteColumns: ["TYP", "CO", "DLACZEGO", "OD KIEDY", ""],
      mutes: excluded.map((interest) => describeMute(interest, chosen.version)),
    };

    return jsonForScreen(profile, preview ? [owned, preview] : [owned]);
  } catch (cause) {
    return readableFailure(cause);
  }
}

/**
 * A profile with nothing in it is the state every account starts in, and the screen has
 * to say so rather than render four empty panels.
 */
function emptyAccount(): InterestProfile {
  return {
    profiles: [],
    fields: [],
    sentence:
      "To konto nie ma jeszcze żadnego profilu.\n\n" +
      "Profil to lista rzeczy, o których chcesz wiedzieć: kody PKD, województwa, " +
      "konkretne ustawy i projekty, frazy. Alerty rozchodzą się wyłącznie po nich — " +
      "bez profilu silnik nie ma czego dopasować.",
    watched: [],
    muteColumns: ["TYP", "CO", "DLACZEGO", "OD KIEDY", ""],
    mutes: [],
  };
}

function groupByKind(interests: Interest[]): WatchedGroup[] {
  const byKind = new Map<string, string[]>();

  for (const interest of interests) {
    const label = wordsFor(interest.kind).group;
    byKind.set(label, [...(byKind.get(label) ?? []), interest.value]);
  }

  return [...byKind].map(([kind, items]) => ({
    kind,
    count: pluralPl(items.length, "pozycja", "pozycje", "pozycji"),
    items,
  }));
}

/**
 * An exclusion is permanent until somebody removes it — the backend has no timer on one,
 * and the column header promising that they "wygasają same" is the mock's, not the
 * engine's. Saying "bezterminowo" is the difference between a screen describing this
 * system and a screen describing a wish.
 */
function describeMute(interest: Interest, version: number): Mute {
  return {
    type: wordsFor(interest.kind).group,
    tone: "amber",
    what: interest.value,
    why: "Wykluczenie wpisane w profil — dopasowania po tej wartości nie tworzą alertu.",
    until: `bezterminowo · wersja ${version}`,
    action: "USUŃ",
  };
}

/**
 * The preview, or nothing, and never a failure of the whole screen.
 *
 * It is the only read here that goes through the search index, and the backend is
 * explicit that the index is derived, rebuildable, and not something the rest of the
 * system depends on being up. A profile that cannot be read because its preview could
 * not be computed would make this screen the one place that disagrees.
 */
async function previewFor(profileId: string): Promise<Read<MatchPreview> | null> {
  try {
    return await readFromBackend<MatchPreview>(`/api/v1/profiles/${profileId}/matches`);
  } catch (cause) {
    if (cause instanceof BackendError) return null;
    throw cause;
  }
}

function sentenceFor(
  profile: Profile,
  watched: Interest[],
  excluded: Interest[],
  preview: MatchPreview | undefined,
): string {
  if (watched.length === 0) {
    return (
      `Profil „${profile.name}" nie obserwuje niczego.\n\n` +
      "Dopóki nie ma w nim ani jednego interesu, silnik dopasowań nie ma czego szukać " +
      "i ten profil nie wyśle żadnego alertu."
    );
  }

  const lines = [
    `Profil „${profile.name}", wersja ${profile.version}.`,
    "",
    `Obserwuje: ${summarise(watched)}.`,
  ];

  if (excluded.length > 0) {
    lines.push(`Wyklucza: ${summarise(excluded)}.`);
  }

  lines.push("", previewLine(preview));

  if (!preview) return lines.join("\n");

  // Named, not counted. "Trzy interesy milczą" sends somebody to compare two lists;
  // naming them is the whole of the answer.
  if (preview.silent.length > 0) {
    lines.push(`Nic nie pasuje dziś do: ${preview.silent.map((it) => it.value).join(", ")}.`);
  }

  if (preview.dormant.length > 0) {
    lines.push(
      `Nie da się sprawdzić: ${preview.dormant.map((it) => it.interest.value).join(", ")} — ` +
        "archiwum nie zna jeszcze tej wartości.",
    );
  }

  return lines.join("\n");
}

function previewLine(preview: MatchPreview | undefined): string {
  if (!preview) {
    return "Podglądu nie da się teraz policzyć — indeks wyszukiwania nie odpowiada. Sam profil jest aktualny.";
  }

  if (preview.matches.length === 0) {
    return "Gdyby ten profil zadziałał teraz, nie złapałby nic.";
  }

  const first = preview.matches[0];
  return (
    `Gdyby zadziałał teraz, złapałby ${pluralPl(preview.matches.length, "pozycję", "pozycje", "pozycji")} — ` +
    `między innymi „${first.title}".`
  );
}

/** "2 kody PKD, 1 województwo i 2 frazy" — the list read back, not its length. */
function summarise(interests: Interest[]): string {
  const counted = new Map<string, number>();
  for (const interest of interests) {
    counted.set(interest.kind, (counted.get(interest.kind) ?? 0) + 1);
  }

  const parts = [...counted].map(([kind, count]) => {
    const words = wordsFor(kind);
    return pluralPl(count, words.one, words.few, words.many);
  });

  return parts.length > 1
    ? `${parts.slice(0, -1).join(", ")} i ${parts[parts.length - 1]}`
    : parts[0];
}
