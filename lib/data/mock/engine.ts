import type { Health, Intake, Processing } from "@/lib/data/types";

export const intake: Intake = {
  kpis: [
    {
      label: "ŹRÓDŁA AKTYWNE",
      value: "1 284",
      delta: "+6",
      note: "12 klas konektorów, 2 477 jednostek BIP",
      tone: "emerald",
    },
    {
      label: "POZYCJE / 24 H",
      value: "",
      delta: "live",
      note: "po deduplikacji: 12 640 klastrów",
      tone: "emerald",
      isLive: true,
    },
    {
      label: "MARTWE ŹRÓDŁA",
      value: "7",
      delta: "+2",
      note: "wykryte w ciągu 6 h od awarii",
      tone: "accent",
    },
    {
      label: "KOLEJKA RETRY",
      value: "34",
      delta: "−11",
      note: "backoff wykładniczy, maks. 6 prób",
      tone: "amber",
    },
    {
      label: "TRANSKRYPCJE W TOKU",
      value: "12",
      delta: "",
      note: "sesje rad, komisje, konferencje",
      tone: "emerald",
    },
  ],

  filters: ["Wszystkie", "Instytucje", "Samorząd", "Media", "Dane"],

  columns: [
    "ŹRÓDŁO",
    "TYP",
    "HARMONOGRAM",
    "OSTATNI CYKL",
    "POZYCJE/24H",
    "RETRY",
    "ROBOTS/TDM",
    "STATUS",
  ],

  connectors: [
    {
      name: "RSS i kanały redakcyjne",
      detail: "428 kanałów · 12 redakcji krajowych",
      type: "RSS",
      schedule: "co 5 min",
      last: "2 min temu",
      volume: "18 402",
      retry: "3",
      tdm: "OK",
      tdmTone: "emerald",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Media",
    },
    {
      name: "API Sejmu",
      detail: "druki, głosowania, interpelacje, komisje",
      type: "REST",
      schedule: "co 10 min",
      last: "4 min temu",
      volume: "1 208",
      retry: "0",
      tdm: "N/D",
      tdmTone: "neutral",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Instytucje",
    },
    {
      name: "RCL — Rządowe Centrum Legislacji",
      detail: "projekty, uwagi z konsultacji, wersje",
      type: "HTML+API",
      schedule: "co 15 min",
      last: "7 min temu",
      volume: "346",
      retry: "1",
      tdm: "OK",
      tdmTone: "emerald",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Instytucje",
    },
    {
      name: "ISAP / ELI",
      detail: "teksty jednolite, akty ogłoszone",
      type: "ELI API",
      schedule: "co 30 min",
      last: "11 min temu",
      volume: "92",
      retry: "0",
      tdm: "N/D",
      tdmTone: "neutral",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Instytucje",
    },
    {
      name: "BIP-y jednostek samorządu",
      detail: "2 477 gmin, powiatów i województw",
      type: "HTML+PDF",
      schedule: "co 60 min",
      last: "23 min temu",
      volume: "6 918",
      retry: "19",
      tdm: "OK",
      tdmTone: "emerald",
      status: "7 MARTWYCH",
      statusTone: "amber",
      group: "Samorząd",
    },
    {
      name: "eZamówienia i TED",
      detail: "ogłoszenia, wyniki, umowy",
      type: "REST",
      schedule: "co 30 min",
      last: "9 min temu",
      volume: "2 140",
      retry: "2",
      tdm: "N/D",
      tdmTone: "neutral",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Instytucje",
    },
    {
      name: "GUS / BDL",
      detail: "wskaźniki gminne i wojewódzkie",
      type: "REST",
      schedule: "dziennie 04:00",
      last: "5 h temu",
      volume: "480",
      retry: "0",
      tdm: "N/D",
      tdmTone: "neutral",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Dane",
    },
    {
      name: "PKW",
      detail: "wyniki wyborów, frekwencja, obwody",
      type: "CSV+HTML",
      schedule: "dziennie 05:00",
      last: "4 h temu",
      volume: "0",
      retry: "0",
      tdm: "N/D",
      tdmTone: "neutral",
      status: "CZUWA",
      statusTone: "neutral",
      group: "Dane",
    },
    {
      name: "KRS / CRBR / REGON",
      detail: "spółki, beneficjenci, PKD",
      type: "REST",
      schedule: "co 6 h",
      last: "2 h temu",
      volume: "1 044",
      retry: "0",
      tdm: "N/D",
      tdmTone: "neutral",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Dane",
    },
    {
      name: "YouTube Data API",
      detail: "transmisje sesji, konferencje prasowe",
      type: "API+AV",
      schedule: "co 20 min",
      last: "6 min temu",
      volume: "318",
      retry: "4",
      tdm: "LIMIT",
      tdmTone: "amber",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Media",
    },
    {
      name: "Telegram — kanały publiczne",
      detail: "tylko kanały otwarte, bez grup prywatnych",
      type: "MTProto",
      schedule: "co 10 min",
      last: "3 min temu",
      volume: "4 210",
      retry: "5",
      tdm: "OK",
      tdmTone: "emerald",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Media",
    },
    {
      name: "Bluesky",
      detail: "firehose filtrowany po encjach",
      type: "AT Proto",
      schedule: "strumień",
      last: "live",
      volume: "6 802",
      retry: "0",
      tdm: "OK",
      tdmTone: "emerald",
      status: "AKTYWNY",
      statusTone: "emerald",
      group: "Media",
    },
  ],

  transcripts: [
    {
      name: "Sesja Rady Miasta Gliwice · LXII",
      meta: "11 mówców zidentyfikowanych · 4 punkty budżetowe",
      length: "3 h 42 m",
      status: "GOTOWE",
      tone: "emerald",
    },
    {
      name: "Komisja Energii i Klimatu · posiedzenie 41",
      meta: "diaryzacja w toku, indeks mówców 78%",
      length: "2 h 08 m",
      status: "W TOKU",
      tone: "amber",
    },
    {
      name: "Konferencja prasowa MKiŚ · taryfy",
      meta: "transkrypt + cytaty z sekundą",
      length: "38 m",
      status: "GOTOWE",
      tone: "emerald",
    },
    {
      name: "Sesja Rady Powiatu Sanockiego · XLIV",
      meta: "audio niskiej jakości, pewność 71%",
      length: "2 h 55 m",
      status: "DO REWIZJI",
      tone: "accent",
    },
    {
      name: "Komisja Samorządu Terytorialnego · 33",
      meta: "kolejka, start o 10:20",
      length: "1 h 20 m",
      status: "W KOLEJCE",
      tone: "neutral",
    },
  ],

  limits: [
    {
      label: "Respektowanie robots.txt — bez wyjątków, także dla źródeł publicznych",
      value: "ZAWSZE",
      tone: "emerald",
    },
    {
      label: "Zastrzeżenia TDM: 41 domen wykluczonych z uczenia i streszczeń",
      value: "41 DOMEN",
      tone: "emerald",
    },
    {
      label: "Grupy prywatne, zamknięte fora, treści za logowaniem",
      value: "NIE POBIERAMY",
      tone: "emerald",
    },
    {
      label: "Dane osobowe z komentarzy — pseudonimizacja przed indeksem",
      value: "AUTOMAT",
      tone: "emerald",
    },
    { label: "Limit obciążenia serwera źródła", value: "1 REQ / 2 S", tone: "neutral" },
  ],

  schedules: [
    { every: "strumień", what: "Bluesky, alerty krytyczne", count: "2 źródła" },
    { every: "co 5–10 min", what: "RSS redakcji, API Sejmu, Telegram", count: "441 źródeł" },
    { every: "co 15–30 min", what: "RCL, ISAP, eZamówienia, YouTube", count: "38 źródeł" },
    { every: "co 60 min", what: "BIP-y jednostek samorządu", count: "2 477 jednostek" },
    { every: "dziennie", what: "GUS/BDL, PKW, KRS/REGON", count: "3 źródła" },
  ],
};

export const processing: Processing = {
  stages: [
    {
      n: "01",
      name: "Normalizacja i odcisk treści",
      desc: "Kanoniczny tekst, metadane, hash treści. Odrzucamy duplikaty bitowe i wersje z parametrami URL.",
      flow: "41 820 → 38 106",
      tech: "reguły + hash",
      share: 92,
    },
    {
      n: "02",
      name: "Embeddingi i klastrowanie",
      desc: "Wektoryzacja polskojęzyczna, klastrowanie po podobieństwie i czasie. Jeden temat = jeden klaster.",
      flow: "38 106 → 12 640 klastrów",
      tech: "e5-large-pl",
      share: 33,
    },
    {
      n: "03",
      name: "Kaskada modeli",
      desc: "Mały klasyfikator na całości, średni na klastrach powyżej progu, duży wyłącznie na top-N.",
      flow: "12 640 → 240 do dużego modelu",
      tech: "3 poziomy",
      share: 12,
    },
    {
      n: "04",
      name: "Ekstrakcja encji i graf",
      desc: "Osoby w rolach publicznych, instytucje, spółki, akty, tematy. Krawędzie z proweniencją.",
      flow: "84 210 wzmianek → 6 118 encji",
      tech: "NER + reguły",
      share: 46,
    },
    {
      n: "05",
      name: "Wykrywanie nowości",
      desc: "Co jest faktycznie nowe wobec historii wątku, a co recyklingiem tej samej informacji.",
      flow: "12 640 → 1 180 nowych",
      tech: "porównanie do historii",
      share: 22,
    },
    {
      n: "06",
      name: "Scoring istotności i anomalie",
      desc: "Waga instytucjonalna, zasięg, tempo, odchylenie od normy. Wykrywamy też anomalię nieobecności.",
      flow: "1 180 → 148 istotnych",
      tech: "model + progi",
      share: 18,
    },
    {
      n: "07",
      name: "Streszczenia z proweniencją",
      desc: "Każde zdanie ma źródło i jest klikalne. Bez linku zdanie nie wchodzi do streszczenia.",
      flow: "148 → 148 streszczeń",
      tech: "duży model",
      share: 100,
    },
    {
      n: "08",
      name: "Timeline i scalanie historii",
      desc: "Wątek dostaje osadzenie w czasie; nowe pozycje scalane z historią, diff wersji aktów odświeżany.",
      flow: "148 → 18 wątków nowych",
      tech: "scalanie",
      share: 14,
    },
  ],

  modelColumns: ["MODEL", "ROLA", "WYWOŁANIA/24H", "KOSZT", "LATENCJA"],

  models: [
    {
      name: "klasyfikator-s",
      role: "język, typ dokumentu, wstępna istotność",
      calls: "38 106",
      cost: "2,10 €",
      latency: "40 ms",
    },
    {
      name: "ton-framing-m v4.2",
      role: "framing i ton wobec sprawy",
      calls: "12 640",
      cost: "7,80 €",
      latency: "180 ms",
    },
    {
      name: "encje-m",
      role: "ekstrakcja encji i krawędzi grafu",
      calls: "12 640",
      cost: "6,40 €",
      latency: "210 ms",
    },
    {
      name: "streszczenia-l",
      role: "streszczenia top-N z proweniencją",
      calls: "240",
      cost: "24,90 €",
      latency: "3,2 s",
    },
  ],

  edges: [
    {
      from: "A. Wiśniewska",
      fromKind: "osoba",
      relation: "— wiceministra →",
      to: "MKiŚ",
      toKind: "instytucja",
      source: "BIP · powołanie",
      confidence: "1,00",
    },
    {
      from: "MKiŚ",
      fromKind: "instytucja",
      relation: "— autor projektu →",
      to: "DRUK 412",
      toKind: "akt",
      source: "RCL · v4",
      confidence: "1,00",
    },
    {
      from: "DRUK 412",
      fromKind: "akt",
      relation: "— dotyczy →",
      to: "taryfy energetyczne",
      toKind: "temat",
      source: "klasyfikacja",
      confidence: "0,96",
    },
    {
      from: "Izba Obrotu Energią",
      fromKind: "spolka",
      relation: "— uwaga nr 118 →",
      to: "DRUK 412",
      toKind: "akt",
      source: "RCL · konsultacje",
      confidence: "1,00",
    },
    {
      from: "Enerpol SA",
      fromKind: "spolka",
      relation: "— członek izby →",
      to: "Izba Obrotu Energią",
      toKind: "spolka",
      source: "KRS",
      confidence: "0,99",
    },
    {
      from: "R. Nowak",
      fromKind: "osoba",
      relation: "— przewodniczy →",
      to: "Komisja Energii",
      toKind: "instytucja",
      source: "API Sejmu",
      confidence: "1,00",
    },
  ],

  provenance: [
    {
      text: "Projekt zmiany taryf trafił do drugiego czytania 27 lipca, dwa tygodnie po zakończeniu konsultacji.",
      kind: "DOKUMENT",
      source: "API Sejmu · druk 412, harmonogram",
      cta: "ZOBACZ WPIS",
      raw: `API Sejmu / prace/druki/412/etapy

2026-07-27T14:02  etap: „II czytanie — skierowano”
2026-07-13T23:59  etap: „konsultacje zakończone”
źródło: api.sejm.gov.pl · pobrano 2026-07-29 09:12`,
    },
    {
      text: "Wersja czwarta skreśla ustęp o obowiązku informowania odbiorcy 30 dni przed zmianą stawki.",
      kind: "DIFF",
      source: "RCL · v3 → v4, art. 12 ust. 3",
      cta: "ZOBACZ DIFF",
      raw: `RCL / projekt 412 / diff v3→v4

−  3. Sprzedawca informuje odbiorcę o zmianie stawki
−     nie później niż 30 dni przed jej wejściem w życie.
+  (ustęp skreślony)

powiązana uwaga: nr 118 z 14 VI 2026`,
    },
    {
      text: "Na posiedzeniu komisji 24 lipca przedstawiciel resortu uzasadnił skreślenie kosztem operacyjnym po stronie sprzedawców.",
      kind: "TRANSKRYPT",
      source: "Komisja Energii · 24 VII, 01:14:22",
      cta: "ODTWÓRZ FRAGMENT",
      raw: `Transkrypt · Komisja Energii i Klimatu, posiedzenie 41

[01:14:22] przedstawiciel MKiŚ:
„…obowiązek trzydziestodniowy generuje po stronie sprzedawców
koszt operacyjny, którego nie da się przenieść inaczej niż w taryfie…”

pewność transkrypcji: 0,94 · mówca zidentyfikowany z listy obecności`,
    },
    {
      text: "W dwunastu monitorowanych redakcjach zmiana została opisana wyłącznie jako spór o ceny; wątek proceduralny pojawił się w dwóch.",
      kind: "AGREGAT",
      source: "12 redakcji · 148 materiałów, ±4 pkt",
      cta: "ZOBACZ ROZKŁAD",
      raw: `Agregat framingu · wątek „taryfy energetyczne”

koszt życia            68%   (101 materiałów)
spór polityczny        21%   (31)
procedura legislacyjna  7%   (11)
skutki dla firm         4%   (5)

klasyfikator: ton-framing-m v4.2 · macro-F1 0,79 · błąd ±4 pkt`,
    },
  ],

  diff: [
    {
      mark: "",
      text: "Art. 12. 1. Sprzedawca ustala taryfę na okres nie krótszy niż 12 miesięcy.",
      kind: "same",
    },
    {
      mark: "",
      text: "2. Zmiana taryfy wymaga zatwierdzenia przez organ regulacyjny.",
      kind: "same",
    },
    {
      mark: "−",
      text: "3. Sprzedawca informuje odbiorcę o zmianie stawki nie później niż 30 dni przed jej wejściem w życie.",
      kind: "removed",
    },
    {
      mark: "+",
      text: "3. Sprzedawca publikuje zmianę stawki w serwisie internetowym w dniu jej zatwierdzenia.",
      kind: "added",
    },
    { mark: "+", text: "3a. Do odbiorcy wrażliwego stosuje się termin 14 dni.", kind: "added" },
    {
      mark: "",
      text: "4. Przepisy ust. 1–3 stosuje się odpowiednio do sprzedaży rezerwowej.",
      kind: "same",
    },
  ],

  anomalies: [
    {
      tag: "ANOMALIA NIEOBECNOŚCI",
      tone: "accent",
      meta: "9 dni bez sygnału",
      text: "Resort nie zabrał głosu w sprawie taryf od 20 lipca, mimo 148 materiałów prasowych i dwóch interpelacji. Cisza jest odchyleniem od normy dla tego wątku.",
    },
    {
      tag: "ANOMALIA NIEOBECNOŚCI",
      tone: "accent",
      meta: "3 gminy",
      text: "Protokoły sesji z 22 lipca nie zostały opublikowane w terminie ustawowym w trzech monitorowanych gminach.",
    },
    {
      tag: "SKOK OBJĘTOŚCI",
      tone: "amber",
      meta: "×4,2 wobec bazy",
      text: "Wzmianki o zamknięciu szpitali w Podkarpackiem wzrosły czterokrotnie w ciągu 6 godzin, przy jednym źródle pierwotnym.",
    },
    {
      tag: "RECYKLING",
      tone: "neutral",
      meta: "82% podobieństwa",
      text: "41 materiałów to powtórzenie komunikatu z 14 lipca bez nowej informacji. Wątek nie został podniesiony w destylacie dnia.",
    },
    {
      tag: "ROZBIEŻNOŚĆ ŹRÓDEŁ",
      tone: "amber",
      meta: "2 wersje liczby",
      text: "Kwota programu podawana jako 1,2 mld zł (BIP) i 1,4 mld zł (konferencja). Pozycja oznaczona do weryfikacji przed publikacją.",
    },
  ],

  framing: [
    {
      label: "Koszt życia i rachunki",
      share: "68%",
      value: 68,
      note: "101 materiałów · dominuje w prasie regionalnej",
      color: "#BDB0FF",
    },
    {
      label: "Spór polityczny",
      share: "21%",
      value: 21,
      note: "31 materiałów · głównie tytuły ogólnokrajowe",
      color: "#F7C46C",
    },
    {
      label: "Procedura legislacyjna",
      share: "7%",
      value: 7,
      note: "11 materiałów · dwa tytuły branżowe",
      color: "#7FE9CB",
    },
    {
      label: "Skutki dla przedsiębiorstw",
      share: "4%",
      value: 4,
      note: "5 materiałów · prasa gospodarcza",
      color: "rgba(231,234,242,.4)",
    },
  ],
};

export const health: Health = {
  dead: [
    {
      name: "BIP gminy Krasnobród",
      reason: "certyfikat wygasł 26 VII",
      last: "3 dni temu",
      state: "MARTWE",
      tone: "accent",
      action: "ZGŁOŚ DO URZĘDU",
    },
    {
      name: "BIP powiatu leskiego",
      reason: "struktura strony zmieniona",
      last: "2 dni temu",
      state: "PARSER",
      tone: "amber",
      action: "NAPRAW PARSER",
    },
    {
      name: "RSS · Kurier Podkarpacki",
      reason: "404 na kanale",
      last: "5 dni temu",
      state: "MARTWE",
      tone: "accent",
      action: "SZUKAJ NOWEGO URL",
    },
    {
      name: "YouTube · kanał Rady Miasta Zamość",
      reason: "limit quota API",
      last: "14 h temu",
      state: "THROTTLE",
      tone: "amber",
      action: "PRZESUŃ OKNO",
    },
    {
      name: "BIP gminy Ustrzyki",
      reason: "zastrzeżenie TDM dodane do robots.txt",
      last: "6 dni temu",
      state: "WYŁĄCZONE",
      tone: "neutral",
      action: "RESPEKTUJEMY",
    },
    {
      name: "eZamówienia · endpoint wyników",
      reason: "timeouty powyżej 30 s",
      last: "40 min temu",
      state: "CHORE",
      tone: "amber",
      action: "RETRY 4/6",
    },
  ],

  latency: [5, 4, 4, 6, 5, 4, 4, 3, 4, 5, 7, 12, 9, 6, 5, 4, 4, 4, 3, 3, 4, 6, 5, 4],

  retries: [
    { count: "19 poz.", what: "BIP-y — parser PDF, próba 2/6", next: "za 4 min" },
    { count: "8 poz.", what: "eZamówienia — timeout endpointu wyników", next: "za 12 min" },
    { count: "5 poz.", what: "YouTube — quota, okno przesunięte", next: "o 11:00" },
    { count: "2 poz.", what: "Telegram — rate limit kanału", next: "za 90 s" },
  ],

  incidents: [
    {
      tag: "OTWARTY",
      tone: "accent",
      when: "29 VII, 08:12",
      text: "Parser PDF nie odczytuje protokołów w nowym szablonie trzech gmin. Pozycje wstrzymane, nie publikujemy niepewnych treści.",
      impact: "wpływ: 3 gminy · warstwa Local",
    },
    {
      tag: "ZAMKNIĘTY",
      tone: "emerald",
      when: "28 VII, 19:40",
      text: "Opóźnienie potoku wzrosło do 12 minut po skoku objętości z Bluesky. Skalowanie kolejki rozwiązało problem.",
      impact: "czas trwania: 48 min · bez utraty danych",
    },
    {
      tag: "ZAMKNIĘTY",
      tone: "emerald",
      when: "26 VII, 06:05",
      text: "Model klasyfikacji tonu oznaczał satyrę jako materiał informacyjny. Wersja v4.2 wdrożona z korektą, 41 pozycji przeklasyfikowanych.",
      impact: "korekta wpisana do rejestru",
    },
    {
      tag: "PLANOWANY",
      tone: "amber",
      when: "2 VIII, 02:00",
      text: "Migracja indeksu wektorowego. Wyszukiwarka pełnotekstowa w trybie tylko do czytania na 40 minut.",
      impact: "API bez zmian",
    },
  ],

  changelog: [
    {
      date: "28 VII",
      text: "Klasyfikator framingu v4.2 — poprawa na satyrze i cytatach, macro-F1 0,76 → 0,79.",
      kind: "MODEL · WPŁYW NA HISTORIĘ: 41 POZYCJI",
    },
    {
      date: "24 VII",
      text: "Dodane 118 nowych BIP-ów gminnych; indeks samorządowy obejmuje 2 477 jednostek.",
      kind: "ŹRÓDŁA",
    },
    {
      date: "21 VII",
      text: "Wykrywanie anomalii nieobecności rozszerzone na terminy ustawowe publikacji protokołów.",
      kind: "LOGIKA SYGNAŁU",
    },
    {
      date: "18 VII",
      text: "Zastrzeżenia TDM 12 domen uwzględnione — treści usunięte z indeksu i ze streszczeń.",
      kind: "ZGODNOŚĆ",
    },
    {
      date: "14 VII",
      text: "Kaskada modeli: próg wejścia do dużego modelu podniesiony, koszt cyklu −38% bez zmiany trafności top-N.",
      kind: "KOSZT",
    },
  ],
};
