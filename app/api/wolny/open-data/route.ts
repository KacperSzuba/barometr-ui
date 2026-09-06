/**
 * "Weź nasze dane i sprawdź nas" — the first screen here that works without an account.
 *
 * Every other route in this folder starts by reading a cookie. This one must not: the
 * whole free tier is meant to be readable by somebody who has never signed in, `proxy.ts`
 * deliberately does not guard `/wolny`, and a screen about open data that asked for a
 * login would be arguing with its own subject.
 *
 * So it calls `callBackend` — the unauthenticated door, the same one the sign-in routes
 * use — rather than `readFromBackend`, which throws when there is no session.
 *
 * The terms are read rather than written: the rate this system actually enforces comes
 * back in `X-RateLimit-*` on the very request that fetches them, and the attribution
 * line is the one the backend puts in the body. A page stating a limit of its own would
 * be a page that is wrong the day somebody changes the tier.
 */
import { NextResponse } from "next/server";
import { callBackend } from "@/lib/server/backend";
import { readableFailure } from "@/lib/server/respond";
import type { ExportChannel, OpenData } from "@/lib/data/types";

interface PublicConsultations {
  from: string;
  until: string;
  attribution: string;
  consultations: { id: string }[];
}

export async function GET() {
  try {
    const response = await callBackend("/api/v1/public/consultations", { method: "GET" });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Publiczne API odpowiedziało ${response.status}.` },
        { status: 502 },
      );
    }

    const open = (await response.json()) as PublicConsultations;

    const data: OpenData = {
      terms: termsFrom(response, open),
      exports: EXPORTS,
      embedCode: embedCode(),
      widgetKinds: [],
      corrections: [],
      correctionsNote: CORRECTIONS_NOTE,
      publicPromises: PROMISES,
    };

    return NextResponse.json(data);
  } catch (cause) {
    return readableFailure(cause);
  }
}

/** The limit the gate is enforcing on this very request, not a number written down here. */
function termsFrom(response: Response, open: PublicConsultations): string[] {
  const perHour = response.headers.get("X-RateLimit-Limit");
  const left = response.headers.get("X-RateLimit-Remaining");

  return [
    open.attribution,
    perHour
      ? `limit bez klucza: ${perHour} żądań na godzinę po adresie · zostało ${left ?? "?"}`
      : "limit bez klucza: podawany w nagłówkach X-RateLimit-*",
    `okno konsultacji: ${open.from} — ${open.until}, pozycji: ${open.consultations.length}`,
  ];
}

/**
 * Four channels, and each one is a route that answers today.
 *
 * The CSV needs the `bulk` scope, which is a real condition and is said rather than
 * discovered by being refused. The calendar feed needs a profile, so it needs an
 * account — it is here because it is the one channel that keeps working without anybody
 * opening anything, which is what most people who ask for "open data" actually want.
 */
const EXPORTS: ExportChannel[] = [
  {
    kind: "JSON",
    name: "Konsultacje publiczne",
    desc: "Otwarte terminy z najbliższych trzech miesięcy, z dniami roboczymi do końca i adresem, pod który składa się uwagi.",
    cta: "GET /api/v1/public/consultations",
  },
  {
    kind: "CSV",
    name: "To samo do arkusza",
    desc: "Ten sam zestaw, jedna kolumna na fakt. Wymaga klucza z zakresem bulk — bez niego zwraca odmowę, nie pusty plik.",
    cta: "GET /api/v1/public/consultations/csv",
  },
  {
    kind: "ICS",
    name: "Kanał kalendarza",
    desc: "Terminy jako subskrypcja, którą klient kalendarza sam odpytuje. Adres jest losowy i odwoływalny — to on jest upoważnieniem. Wymaga konta.",
    cta: "SUBSKRYBUJ W KONFIGURACJI",
  },
  {
    kind: "OPENAPI",
    name: "Kontrakt API",
    desc: "Generowany z kodu przy każdym buildzie, nie pisany obok niego. Nadaje się do wygenerowania klienta.",
    cta: "GET /v3/api-docs",
  },
];

/**
 * A snippet that runs, not a widget that does not exist.
 *
 * The mock offered an embeddable component with a choice of kinds; nothing here serves
 * one. What can honestly go in a box somebody copies is the request itself — it works
 * from a terminal, from a page, and from a spreadsheet's web query, and it is the whole
 * of what an integration with this system looks like today.
 */
function embedCode(): string {
  return [
    "const response = await fetch(",
    '  "https://api.barometr.example/api/v1/public/consultations",',
    ");",
    "const { consultations, attribution } = await response.json();",
    "",
    "// attribution trzeba pokazać przy publikacji — to warunek licencji, nie prośba.",
  ].join("\n");
}

/**
 * There is no register of corrections, and the screen says so rather than showing
 * something else that happens to be a list.
 *
 * The nearest things are the classification review queue and the act-match queue, and
 * neither is this: both are operator-only, both are about what has not been decided yet,
 * and a correction is a decision that was made and later found wrong.
 */
const CORRECTIONS_NOTE =
  "Publicznego rejestru korekt jeszcze nie ma. Kolejki weryfikacji, które istnieją po " +
  "stronie operatora, są czym innym — mówią, czego jeszcze nie rozstrzygnięto, a korekta " +
  "to rozstrzygnięcie, które okazało się błędne. Do czasu jego zbudowania ta sekcja jest " +
  "pusta i tak ma być: pusty rejestr jest uczciwszy niż cudzy.";

/** What this system does, phrased as what it refuses to do. Each line is a decision in the code. */
const PROMISES = [
  {
    label: "ARCHIWUM JEST NIEPODWAŻALNE",
    value:
      "Zapisujemy dokładnie to, co źródło zwróciło, adresowane treścią. Wszystko inne jest z tego wyliczane i da się przeliczyć od nowa.",
  },
  {
    label: "ŻADNEJ LICZBY BEZ METODY",
    value:
      "Pole z wynikiem pomiaru albo jest policzone z wejścia i niesie nazwę metody, albo jest puste. Prawdopodobna liczba nie jest odpowiedzią.",
  },
  {
    label: "STRESZCZENIE WSKAZUJE ŹRÓDŁO",
    value:
      "Każde zdanie pochodne niesie identyfikator dokumentu i zakres znaków. Zdanie, którego nie da się zakotwiczyć, jest odrzucane, a nie uzupełniane.",
  },
];
