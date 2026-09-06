import type {
  Billing,
  Login,
  Notifications,
  Onboarding,
  PlanCell,
  Organisation,
  Security,
} from "@/lib/data/types";

const yes: PlanCell = { kind: "yes" };
const no: PlanCell = { kind: "no" };
const text = (value: string): PlanCell => ({ kind: "text", text: value });

export const login: Login = {
  email: "p.kaczmarek@enerpol.example",

  authMethods: [
    {
      name: "Magic link na e-mail",
      note: "Domyślna metoda. Link jednorazowy, ważny 15 minut, bez hasła.",
      state: "AKTYWNA",
      tone: "emerald",
      action: "ZMIEŃ E-MAIL",
    },
    {
      name: "Hasło (opcjonalne)",
      note: "Można ustawić, ale nie jest wymagane. Minimum 12 znaków, sprawdzane wobec wykradzionych baz.",
      state: "USTAWIONE",
      tone: "emerald",
      action: "ZMIEŃ",
    },
    {
      name: "Passkey / WebAuthn",
      note: "Klucz sprzętowy albo biometria urządzenia. Odporne na phishing.",
      state: "2 KLUCZE",
      tone: "emerald",
      action: "DODAJ KLUCZ",
    },
    {
      name: "OAuth: Google, Microsoft",
      note: "Powiązane konto Microsoft 365 organizacji. Google wyłączone polityką.",
      state: "MICROSOFT",
      tone: "neutral",
      action: "ZARZĄDZAJ",
    },
    {
      name: "2FA: TOTP + kody zapasowe",
      note: "Aplikacja uwierzytelniająca, 8 nieużytych kodów zapasowych.",
      state: "WYMAGANE",
      tone: "emerald",
      action: "POBIERZ KODY",
    },
    {
      name: "SSO: SAML 2.0 / OIDC + SCIM",
      note: "Dla planu enterprise i Gov. Provisioning i deprovisioning kont przez SCIM.",
      state: "ADD-ON",
      tone: "amber",
      action: "WŁĄCZ",
    },
  ],

  operations: [
    {
      name: "Reset hasła",
      note: "Link na e-mail, unieważnia wszystkie sesje",
      cta: "WYŚLIJ LINK",
      tone: "neutral",
    },
    {
      name: "Zmiana adresu e-mail",
      note: "Potwierdzenie na stary i nowy adres",
      cta: "ROZPOCZNIJ",
      tone: "neutral",
    },
    {
      name: "Eksport danych konta",
      note: "JSON + CSV, gotowe w 30 minut",
      cta: "EKSPORTUJ",
      tone: "emerald",
    },
    {
      name: "Usunięcie konta",
      note: "Timer 30 dni, transfer własności wymagany",
      cta: "USUŃ KONTO",
      tone: "accent",
    },
  ],

  sessions: [
    {
      id: "s-macbook",
      device: "MacBook Pro · Chrome 141",
      meta: "Katowice · 89.64.x.x · passkey",
      when: "ta sesja",
      action: "—",
      isHighlighted: true,
    },
    {
      id: "s-iphone",
      device: "iPhone 16 · aplikacja",
      meta: "Katowice · sieć komórkowa · Face ID",
      when: "2 h temu",
      action: "WYLOGUJ",
      isHighlighted: false,
    },
    {
      id: "s-windows",
      device: "Windows 11 · Edge",
      meta: "Warszawa · 194.29.x.x · SSO Microsoft",
      when: "wczoraj 17:22",
      action: "WYLOGUJ",
      isHighlighted: false,
    },
    {
      id: "s-unknown",
      device: "Nieznane urządzenie · Firefox",
      meta: "Gdańsk · 5.173.x.x · magic link",
      when: "24 VII, 03:14",
      action: "ZABLOKUJ",
      isHighlighted: true,
      isAlert: true,
    },
  ],

  history: [
    {
      id: "e1",
      when: "29 VII 08:41",
      what: "Logowanie passkey — MacBook Pro, Katowice",
      tag: "OK",
      tone: "emerald",
    },
    {
      id: "e2",
      when: "28 VII 17:22",
      what: "Logowanie SSO Microsoft — Windows, Warszawa",
      tag: "OK",
      tone: "emerald",
    },
    {
      id: "e3",
      when: "24 VII 03:14",
      what: "Magic link z nowego urządzenia — Gdańsk, Firefox",
      tag: "ALERT",
      tone: "accent",
    },
    {
      id: "e4",
      when: "24 VII 03:15",
      what: "Alert o nowym urządzeniu wysłany na e-mail i push",
      tag: "WYSŁANY",
      tone: "amber",
    },
    {
      id: "e5",
      when: "21 VII 09:02",
      what: "Zmiana ustawień powiadomień przez użytkownika",
      tag: "ZMIANA",
      tone: "neutral",
    },
  ],
};

export const organisation: Organisation = {
  headline: "ORGANIZACJA · ENERPOL SA · 6/8 MIEJSC",
  teamNote: "DOMENA @ENERPOL.EXAMPLE · AUTO-DOŁĄCZANIE WŁ.",

  roles: [
    { name: "Właściciel", count: "1 osoba" },
    { name: "Admin", count: "1 osoba" },
    { name: "Analityk", count: "3 osoby" },
    { name: "Czytelnik", count: "1 osoba" },
    { name: "Gość", count: "1 · wygasa" },
  ],

  permissions: [
    {
      label: "Przeglądanie widoków i archiwum",
      cells: [yes, yes, yes, yes, text("WYBRANE")],
    },
    { label: "Tworzenie i edycja reguł alertów", cells: [yes, yes, yes, no, no] },
    { label: "Eksport PDF / CSV / XLSX", cells: [yes, yes, yes, text("CSV"), no] },
    { label: "Zarządzanie kluczami API i webhookami", cells: [yes, yes, text("SANDBOX"), no, no] },
    { label: "Zapraszanie osób i zmiana ról", cells: [yes, yes, no, no, no] },
    { label: "Zmiana polityk organizacji", cells: [yes, text("CZĘŚĆ"), no, no, no] },
    { label: "Rozliczenia, faktury, dane do faktury", cells: [yes, text("PODGLĄD"), no, no, no] },
    { label: "Transfer własności i usunięcie workspace", cells: [yes, no, no, no, no] },
  ],

  members: [
    {
      initials: "PK",
      name: "P. Kaczmarek",
      mail: "p.kaczmarek@enerpol.example",
      role: "Właściciel",
      last: "teraz",
      state: "AKTYWNY",
      tone: "emerald",
    },
    {
      initials: "JO",
      name: "J. Ostrowska",
      mail: "j.ostrowska@enerpol.example",
      role: "Admin · legal",
      last: "12 min temu",
      state: "AKTYWNA",
      tone: "emerald",
    },
    {
      initials: "MR",
      name: "M. Rudnicki",
      mail: "m.rudnicki@enerpol.example",
      role: "Analityk",
      last: "2 h temu",
      state: "AKTYWNY",
      tone: "emerald",
    },
    {
      initials: "KS",
      name: "K. Sowa",
      mail: "k.sowa@enerpol.example",
      role: "Analityk · sprzedaż",
      last: "wczoraj",
      state: "AKTYWNA",
      tone: "emerald",
    },
    {
      initials: "AW",
      name: "A. Wróbel",
      mail: "a.wrobel@enerpol.example",
      role: "Analityk",
      last: "4 dni temu",
      state: "NIEAKTYWNY",
      tone: "amber",
    },
    {
      initials: "TZ",
      name: "T. Zając",
      mail: "t.zajac@enerpol.example",
      role: "Czytelnik · zarząd",
      last: "2 dni temu",
      state: "AKTYWNY",
      tone: "emerald",
    },
    {
      initials: "DK",
      name: "D. Kwiatkowska",
      mail: "d.kwiatkowska@kancelaria.example",
      role: "Gość · kancelaria",
      last: "6 h temu",
      state: "WYGASA 12 VIII",
      tone: "amber",
    },
  ],

  activity: [
    {
      id: "a1",
      when: "29 VII 09:12",
      what: "J. Ostrowska pobrała eksport XLSX widoku „Wpływ na nas” (18 pozycji).",
    },
    {
      id: "a2",
      when: "29 VII 08:44",
      what: "P. Kaczmarek zmienił próg istotności reguły „Krytyczne: nasz PKD + region” z 0,80 na 0,85.",
    },
    {
      id: "a3",
      when: "28 VII 16:30",
      what: "K. Sowa przypisała alert #4128 do J. Ostrowskiej z terminem 1 VIII.",
    },
    {
      id: "a5",
      when: "28 VII 11:05",
      what: "M. Rudnicki dodał komentarz w wątku „taryfy energetyczne”.",
    },
    {
      id: "a4",
      when: "27 VII 14:20",
      what: "Zaproszenie dla d.kwiatkowska@kancelaria.example wysłane przez J. Ostrowską (rola: gość, wygasa po 14 dniach).",
    },
  ],

  policies: [
    {
      name: "Wymuszone 2FA dla wszystkich",
      note: "Bez wyjątków; passkey spełnia wymóg",
      state: "WYMUSZONE",
      tone: "emerald",
    },
    {
      name: "Wymuszone SSO dla domeny firmowej",
      note: "Add-on nieaktywny — do włączenia",
      state: "NIEAKTYWNE",
      tone: "amber",
    },
    {
      name: "Auto-dołączanie z domeny @enerpol.example",
      note: "Nowe konto z domeny wchodzi jako czytelnik",
      state: "WŁĄCZONE",
      tone: "emerald",
    },
    {
      name: "Automatyczny offboarding",
      note: "Dezaktywacja po 30 dniach bez logowania i po wyjściu z SCIM",
      state: "WŁĄCZONY",
      tone: "emerald",
    },
    {
      name: "Blokada eksportu dla roli gość",
      note: "Nadpisuje ustawienie indywidualne",
      state: "WYMUSZONE",
      tone: "emerald",
    },
    {
      name: "Domyślne ustawienia dla nowych członków",
      note: "Profil „Regulacje”, digest dzienny 07:00, PL",
      state: "ZDEFINIOWANE",
      tone: "neutral",
    },
  ],

  invites: [
    { label: "Zaproszenia wygasają automatycznie", value: "14 DNI", tone: "neutral" },
    {
      label: "Transfer własności — wymaga potwierdzenia obu stron",
      value: "DOSTĘPNY",
      tone: "emerald",
    },
    {
      label: "Offboarding: przypisania i reguły przechodzą na admina",
      value: "AUTOMAT",
      tone: "emerald",
    },
    {
      label: "Konta gościa bez dostępu do rozliczeń i eksportu",
      value: "ZAWSZE",
      tone: "emerald",
    },
  ],
};

export const billing: Billing = {
  usage: [
    {
      label: "ZAPYTANIA API",
      value: "41 820",
      percent: 42,
      note: "z 100 000 / mies. · alert progowy przy 80%",
    },
    { label: "ALERTY WYSŁANE", value: "412", percent: 28, note: "bez limitu w planie Pro" },
    { label: "SEATY", value: "6 / 8", percent: 75, note: "2 wolne · dodatkowy 180 zł/mies." },
    { label: "EKSPORTY", value: "38", percent: 19, note: "PDF 21 · XLSX 12 · CSV 5" },
  ],

  methods: [
    {
      name: "Karta VISA •••• 4417",
      note: "Domyślna metoda, wygasa 09/2028",
      state: "DOMYŚLNA",
      tone: "emerald",
      action: "ZMIEŃ",
    },
    {
      name: "BLIK",
      note: "Potwierdzenie w aplikacji banku, natychmiastowa aktywacja",
      state: "DOSTĘPNY",
      tone: "neutral",
      action: "UŻYJ",
    },
    {
      name: "Przelewy24",
      note: "Szybki przelew z 60 banków, aktywacja w kilka minut",
      state: "DOSTĘPNY",
      tone: "neutral",
      action: "UŻYJ",
    },
    {
      name: "Google Pay / Apple Pay",
      note: "Płatność jednym kliknięciem na urządzeniu mobilnym",
      state: "DOSTĘPNE",
      tone: "neutral",
      action: "WŁĄCZ",
    },
    {
      name: "Przelew tradycyjny + pro forma",
      note: "Termin 14 lub 30 dni, ścieżka dla instytucji publicznych",
      state: "AKTYWNA",
      tone: "emerald",
      action: "GENERUJ",
    },
    {
      name: "Faktura kwartalna (kontrakt)",
      note: "Dla planu Gov i umów wieloletnich",
      state: "KONTRAKT",
      tone: "amber",
      action: "ZAPYTAJ",
    },
  ],

  proforma: [
    { label: "TERMIN", value: "14 lub 30 dni od wystawienia — do wyboru przy generowaniu" },
    {
      label: "DOSTĘP",
      value:
        "Aktywny od razu na wniosek, bez czekania na wpływ środków (dla podmiotów publicznych)",
    },
    { label: "NUMER PO", value: "Wpisywany przy generowaniu i drukowany na fakturze VAT" },
    {
      label: "TRYB DO 130 TYS. ZŁ",
      value: "Pakiet: opis przedmiotu zamówienia, oświadczenie WCAG 2.1 AA, wzór umowy powierzenia",
    },
  ],

  taxRows: [
    { label: "NABYWCA", value: "Enerpol SA, ul. Portowa 14, 44-100 Gliwice" },
    { label: "NIP", value: "6340012345 · zweryfikowany w VIES 14 III 2026" },
    { label: "STAWKA VAT", value: "23% (usługa krajowa)" },
    {
      label: "ODWROTNE OBCIĄŻENIE",
      value: "Stosowane dla nabywców z UE poza PL po walidacji VIES",
    },
    { label: "PROCEDURA OSS", value: "Dla konsumentów z UE — VAT kraju odbiorcy, deklaracja OSS" },
    { label: "NUMER PO", value: "PO-2026/ENP/318 — drukowany na każdej fakturze" },
    { label: "E-FAKTURA", value: "PDF + XML (KSeF-ready), wysyłka na adres księgowości" },
  ],

  dunning: [
    { label: "Ostatnia płatność zaksięgowana", value: "1 VII 2026", tone: "emerald" },
    { label: "Ponowienia płatności przy odrzuceniu", value: "3 W 10 DNI", tone: "neutral" },
    { label: "Grace period przed zmianą planu", value: "7 DNI", tone: "amber" },
    { label: "Po grace period: downgrade, nie blokada", value: "ZASADA", tone: "emerald" },
  ],

  invoiceColumns: ["NUMER", "DATA", "NETTO", "VAT 23%", "NUMER PO", "METODA", "STATUS"],

  invoices: [
    {
      id: "FV/2026/07/118",
      date: "1 VII 2026",
      net: "5 664 zł",
      vat: "1 303 zł",
      po: "PO-2026/ENP/318",
      method: "Karta VISA •••• 4417",
      state: "OPŁACONA",
      tone: "emerald",
    },
    {
      id: "FV/2026/06/094",
      date: "1 VI 2026",
      net: "5 664 zł",
      vat: "1 303 zł",
      po: "PO-2026/ENP/318",
      method: "Przelew · 14 dni",
      state: "OPŁACONA",
      tone: "emerald",
    },
    {
      id: "PF/2026/06/021",
      date: "28 V 2026",
      net: "5 664 zł",
      vat: "1 303 zł",
      po: "PO-2026/ENP/318",
      method: "Pro forma → przelew",
      state: "ROZLICZONA",
      tone: "emerald",
    },
    {
      id: "FV/2026/05/071",
      date: "1 V 2026",
      net: "4 830 zł",
      vat: "1 111 zł",
      po: "—",
      method: "BLIK",
      state: "OPŁACONA",
      tone: "emerald",
    },
    {
      id: "FV/2026/04/052",
      date: "1 IV 2026",
      net: "4 830 zł",
      vat: "1 111 zł",
      po: "—",
      method: "Karta · ponowienie 2/3",
      state: "OPŁACONA PO 4 DN.",
      tone: "amber",
    },
    {
      id: "KOR/2026/03/004",
      date: "18 III 2026",
      net: "−690 zł",
      vat: "−159 zł",
      po: "—",
      method: "Zwrot na kartę",
      state: "KOREKTA",
      tone: "neutral",
    },
  ],

  cards: [
    {
      label: "ZMIANA PLANU",
      value:
        "Upgrade działa od razu z proration za niewykorzystany okres. Downgrade od następnego okresu, bez utraty zapisanych widoków i reguł.",
      cta: "ZMIEŃ PLAN",
    },
    {
      label: "DODATKI",
      value:
        "Dodatkowe seaty, wyższy limit API, dodatkowe gminy, SSO ze SCIM, white-label. Rozliczane proporcjonalnie od dnia włączenia.",
      cta: "ZARZĄDZAJ DODATKAMI",
    },
    {
      label: "ANULOWANIE I ZWROTY",
      value:
        "Anulowanie samodzielne, bez kontaktu z nami. Zwrot pełny w ciągu 14 dni od pierwszej płatności, później proporcjonalny.",
      cta: "ANULUJ SUBSKRYPCJĘ",
    },
  ],
};

/** Channel pattern: 1 = available, 0 = unavailable, text = variant. */
const channels = (pattern: (0 | 1 | string)[]): PlanCell[] =>
  pattern.map((value) => (value === 1 ? yes : value === 0 ? no : text(String(value))));

export const notifications: Notifications = {
  columns: ["NATYCHMIAST", "GODZINNIE", "DZIENNIE", "TYGODNIOWO", "SMS", "WEBHOOK"],

  rows: [
    {
      label: "Zmiana treści obserwowanego aktu",
      note: "diff wersji, nowa wersja projektu",
      cells: channels([1, 0, 1, 0, 0, 1]),
    },
    {
      label: "Nowy etap legislacyjny",
      note: "czytania, komisje, Senat, podpis",
      cells: channels([1, 0, 1, 0, 0, 1]),
    },
    {
      label: "Uwaga w konsultacjach od obserwowanego podmiotu",
      note: "autor uwagi na liście obserwowanych",
      cells: channels([0, 1, 1, 0, 0, 1]),
    },
    {
      label: "Alert krytyczny (PKD + region + próg 0,85)",
      note: "nadpisuje godziny ciszy",
      cells: channels([1, 0, 0, 0, 1, 1]),
    },
    {
      label: "Przetarg dopasowany do profilu",
      note: "wartość powyżej progu, CPV z listy",
      cells: channels([0, 1, 1, 0, 0, 1]),
    },
    {
      label: "Sesje rad i posiedzenia komisji",
      note: "24 h przed terminem",
      cells: channels([0, 0, 1, 1, 0, 0]),
    },
    {
      label: "Anomalia nieobecności",
      note: "cisza instytucji dłuższa niż norma",
      cells: channels([0, 0, 1, 1, 0, 1]),
    },
    {
      label: "Podsumowanie tygodnia",
      note: "wszystko, co zmieniło status",
      cells: channels([0, 0, 0, 1, 0, 0]),
    },
  ],

  endpoints: [
    {
      kind: "E-MAIL",
      value: "p.kaczmarek@enerpol.example",
      note: "Adres podstawowy, zweryfikowany",
      state: "OK",
      tone: "emerald",
    },
    {
      kind: "E-MAIL",
      value: "regulacje@enerpol.example",
      note: "Skrzynka zespołowa dla digestów",
      state: "OK",
      tone: "emerald",
    },
    {
      kind: "SMS",
      value: "+48 •••• ••• 418",
      note: "Tylko poziom krytyczny",
      state: "OK",
      tone: "emerald",
    },
    {
      kind: "SLACK",
      value: "enerpol.slack.com · #regulacje",
      note: "Aplikacja zainstalowana 14 III 2026",
      state: "OK",
      tone: "emerald",
    },
    {
      kind: "TEAMS",
      value: "Enerpol · zespół Regulacje",
      note: "Karty adaptacyjne z diffem",
      state: "OK",
      tone: "emerald",
    },
    {
      kind: "RSS / ICS",
      value: "barometr.pl/f/9c14…/pl.xml",
      note: "Token prywatny, można odwołać",
      state: "AKTYWNY",
      tone: "neutral",
    },
  ],

  counts: [
    { channel: "E-MAIL", count: "14", share: 100 },
    { channel: "PUSH", count: "9", share: 64 },
    { channel: "SMS", count: "2", share: 15 },
    { channel: "WEBHOOK", count: "41", share: 100 },
  ],

  hygiene: [
    {
      name: "Deduplikacja powiadomień",
      note: "Okno 6 h; ta sama pozycja nie wraca drugi raz",
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Podsumowanie zamiast serii",
      note: "Powyżej 3 zdarzeń w wątku wysyłamy jedno zbiorcze",
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Godziny ciszy 21:00–07:00",
      note: "Nadpisanie tylko dla alertów krytycznych",
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Limit dzienny na kanał",
      note: "E-mail 10, push 8, SMS 3 — nadwyżka do digestu",
      state: "USTAWIONY",
      tone: "neutral",
    },
  ],
};

export const onboarding: Onboarding = {
  wizard: [
    {
      n: "01",
      kicker: "IDENTYFIKACJA",
      title: "NIP i dane rejestrowe",
      state: "GOTOWE",
      tone: "emerald",
      rows: [
        { label: "NIP", value: "6340012345 — zwalidowany w VIES" },
        { label: "Z KRS", value: "Enerpol SA, spółka akcyjna, KRS 0000123456" },
        { label: "Z REGON", value: "240 pracowników, siedziba Gliwice (TERYT 2466011)" },
        { label: "Z CRBR", value: "2 beneficjentów rzeczywistych, dane publiczne" },
      ],
    },
    {
      n: "02",
      kicker: "PROFIL DZIAŁALNOŚCI",
      title: "PKD i obszary regulacyjne",
      state: "GOTOWE",
      tone: "emerald",
      rows: [
        { label: "PKD GŁÓWNE", value: "35.14 — handel energią elektryczną" },
        { label: "PKD DODATKOWE", value: "35.13, 43.21, 71.12 (3 kody z KRS)" },
        {
          label: "OBSZARY",
          value: "Prawo energetyczne, taryfy, ochrona odbiorcy, zamówienia publiczne",
        },
        { label: "KOMISJE", value: "Energii i Klimatu, Finansów Publicznych, Gospodarki" },
      ],
    },
    {
      n: "03",
      kicker: "ROUTING",
      title: "Reguły i progi wstępne",
      state: "AKTYWNY",
      tone: "emerald",
      rows: [
        { label: "REGION", value: "Śląskie i Małopolskie + promień 10 km od siedziby" },
        { label: "PRÓG", value: "Istotność 0,60 dla digestu, 0,85 dla SMS" },
        { label: "OBSERWOWANE", value: "18 aktów, 41 spółek, 6 gmin, 3 izby branżowe" },
        { label: "PIERWSZY ALERT", value: "Wysłany 4 minuty po zakończeniu kreatora" },
      ],
    },
  ],

  routing: [
    {
      pkd: "35.14",
      area: "Handel energią — taryfy, obowiązki informacyjne",
      source: "Sejm, RCL, ISAP, URE",
      items: "18 aktów",
    },
    {
      pkd: "35.13",
      area: "Dystrybucja — przyłączenia, jakość dostaw",
      source: "RCL, ISAP",
      items: "7 aktów",
    },
    {
      pkd: "43.21",
      area: "Instalacje elektryczne — normy i warunki techniczne",
      source: "RCL, BIP-y",
      items: "4 akty",
    },
    {
      pkd: "71.12",
      area: "Usługi projektowe — zamówienia publiczne",
      source: "eZamówienia, TED",
      items: "19 postępowań",
    },
    {
      pkd: "geo",
      area: "Gminy siedziby i oddziałów",
      source: "BIP-y 6 jednostek",
      items: "412 uchwał",
    },
  ],

  support: [
    {
      name: "Baza wiedzy",
      note: "148 artykułów, wyszukiwanie pełnotekstowe",
      state: "OTWARTA",
      tone: "emerald",
    },
    {
      name: "Dziennik zmian (changelog)",
      note: "Każda zmiana modelu, źródła i progu z datą",
      state: "PUBLICZNY",
      tone: "emerald",
    },
    {
      name: "Status page",
      note: "Dostępność, opóźnienia potoku, incydenty",
      state: "99,97% / 90 DNI",
      tone: "emerald",
    },
    {
      name: "Roadmapa publiczna",
      note: "Co budujemy i czego świadomie nie zbudujemy",
      state: "PUBLICZNA",
      tone: "emerald",
    },
    {
      name: "Wsparcie czat i e-mail",
      note: "Plan Pro: pierwsza odpowiedź w 4 h roboczych",
      state: "SLA 4 H",
      tone: "neutral",
    },
    {
      name: "Zgłoszenie błędu w danych",
      note: "Przy każdej pozycji; korekta w 2 dni roboczych",
      state: "ZAWSZE",
      tone: "emerald",
    },
  ],
};

export const security: Security = {
  activity: ["DPA podpisana 14 III 2026", "ostatni eksport danych konta: 2 VII 2026"],

  compliance: [
    {
      kicker: "RODO",
      name: "Dane osobowe",
      items: [
        { label: "Umowa powierzenia (DPA) podpisana", value: "14 III 2026", tone: "emerald" },
        { label: "Rejestr czynności przetwarzania", value: "DOSTĘPNY", tone: "emerald" },
        { label: "Eksport danych konta (JSON + CSV)", value: "SAMOOBSŁUGA", tone: "emerald" },
        { label: "Usunięcie konta z timerem", value: "30 DNI", tone: "neutral" },
        { label: "Polityka retencji per typ danych", value: "90 D – 5 LAT", tone: "neutral" },
      ],
    },
    {
      kicker: "PRYWATNOŚĆ",
      name: "Śledzenie i zgody",
      items: [
        { label: "Tryb bez śledzenia jako domyślny", value: "WŁĄCZONY", tone: "emerald" },
        {
          label: "Zgody cookies granularne, odrzucenie jednym kliknięciem",
          value: "WCAG-OWE",
          tone: "emerald",
        },
        { label: "Brak profilowania osób fizycznych", value: "KONSTRUKCYJNIE", tone: "emerald" },
        { label: "Analityka produktowa — dane zagregowane", value: "BEZ ID", tone: "neutral" },
        { label: "Logi dostępu przechowywane", value: "12 MIESIĘCY", tone: "neutral" },
      ],
    },
    {
      kicker: "BEZPIECZEŃSTWO",
      name: "Infrastruktura",
      items: [
        {
          label: "Szyfrowanie w spoczynku i tranzycie",
          value: "AES-256 / TLS 1.3",
          tone: "neutral",
        },
        { label: "Rotacja kluczy", value: "CO 90 DNI", tone: "neutral" },
        { label: "Kopie zapasowe z testem odtworzenia", value: "CO TYDZIEŃ", tone: "neutral" },
        { label: "Raport z pentestu na wniosek", value: "12 VI 2026", tone: "emerald" },
        { label: "Hosting w UE", value: "WARSZAWA", tone: "neutral" },
      ],
    },
    {
      kicker: "DOSTĘPNOŚĆ I JĘZYK",
      name: "WCAG 2.1 AA oraz i18n",
      items: [
        {
          label: "Deklaracja dostępności i oświadczenie do postępowań",
          value: "PODPISANE",
          tone: "emerald",
        },
        {
          label: "Nawigacja klawiaturą, widoczny focus, skip links",
          value: "AUDYT 05/2026",
          tone: "emerald",
        },
        {
          label: "Czytniki ekranu: NVDA, JAWS, VoiceOver",
          value: "TESTOWANE",
          tone: "emerald",
        },
        {
          label: "Wykresy z tabelą danych i opisem tekstowym",
          value: "ZAWSZE",
          tone: "emerald",
        },
        { label: "Interfejs i formaty", value: "PL / EN", tone: "neutral" },
      ],
    },
  ],

  keyColumns: ["NAZWA", "ZAKRESY", "RATE LIMIT", "ZUŻYCIE", "ŚRODOWISKO"],

  keys: [
    {
      name: "CRM — przetargi",
      id: "k1",
      prefix: "bar_live_9c14…",
      scopes: "tenders:read, entities:read",
      rate: "600 / min",
      used: "18 420",
      env: "LIVE",
      tone: "emerald",
    },
    {
      name: "Hurtownia danych",
      id: "k2",
      prefix: "bar_live_4a71…",
      scopes: "acts:read, diffs:read, bulk:read",
      rate: "300 / min",
      used: "21 108",
      env: "LIVE",
      tone: "emerald",
    },
    {
      name: "Integracja testowa",
      id: "k3",
      prefix: "bar_test_1f08…",
      scopes: "wszystkie (sandbox)",
      rate: "60 / min",
      used: "2 292",
      env: "SANDBOX",
      tone: "amber",
    },
    {
      name: "Klucz stary — do rotacji",
      id: "k4",
      prefix: "bar_live_0b93…",
      scopes: "acts:read",
      rate: "300 / min",
      used: "0",
      env: "DO USUNIĘCIA",
      tone: "accent",
    },
  ],

  curlSample: `curl https://api.barometr.pl/v1/acts?updated_after=2026-07-01 \\
  -H "Authorization: Bearer bar_live_9c14…" \\
  -H "Accept: application/json"

# paginacja kursorowa: ?cursor=eyJpZCI6NDEyfQ
# limit: 600 req/min · nagłówki X-RateLimit-*`,

  webhooks: [
    {
      url: "https://crm.enerpol.example/hooks/barometr",
      note: "zdarzenia: tender.matched, act.changed · podpis HMAC-SHA256",
      state: "OK",
      tone: "emerald",
    },
    {
      url: "https://bi.enerpol.example/ingest/barometr",
      note: "zdarzenia: digest.daily · retry ×6 z backoffem",
      state: "OK",
      tone: "emerald",
    },
    {
      url: "https://legacy.enerpol.example/hook",
      note: "4 nieudane próby, ostatni błąd 504 · kolejka 24 h",
      state: "BŁĄD",
      tone: "accent",
    },
    {
      url: "https://hooks.slack.com/services/…",
      note: "kanał #regulacje · zarządzane przez aplikację Slack",
      state: "OK",
      tone: "emerald",
    },
  ],

  devTools: [
    { name: "OPENAPI 3.1", note: "Specyfikacja i przeglądarka zapytań w sandboxie." },
    { name: "SDK", note: "Python, TypeScript, Go — generowane ze specyfikacji." },
    { name: "POSTMAN", note: "Kolekcja z przykładami i środowiskiem sandbox." },
    { name: "BULK EXPORT", note: "Paczki JSONL, paginacja kursorowa, wznawianie." },
    { name: "SANDBOX", note: "Dane syntetyczne, bez limitu prób, reset na żądanie." },
    { name: "WEBHOOK LOG", note: "Podgląd payloadu, ponowna wysyłka pojedynczego zdarzenia." },
  ],
};
