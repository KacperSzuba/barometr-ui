import type { BillingCycle, PlanCell, Pricing, ProductMap, TrustCenter } from "@/lib/data/types";

const yes: PlanCell = { kind: "yes" };
const no: PlanCell = { kind: "no" };
const never = (text: string): PlanCell => ({ kind: "never", text });
const text = (value: string): PlanCell => ({ kind: "text", text: value });

/** Tier colours — the same RGB triplets as in the prototype. */
const HUE = {
  emerald: "34,211,165",
  indigo: "124,92,255",
  amber: "245,165,36",
  sky: "56,189,248",
} as const;

export const productMap: ProductMap = {
  counters: [
    { label: "Źródeł aktywnych", value: "1 284" },
    { label: "Gmin w indeksie", value: "2 477" },
    { label: "Aktów śledzonych", value: "6 190" },
    { label: "Opóźnienie medianowe", value: "4 min" },
  ],

  layers: [
    {
      roman: "I",
      kicker: "Warstwa publiczna",
      name: "Wolny",
      price: "0 zł",
      href: "/wolny",
      cta: "Otwórz warstwę wolną",
      hue: HUE.emerald,
      who: "Obywatel, dziennikarz, radny, student. Kompletny obraz tego, co zrobiły instytucje — bez konta, bez limitu czasu.",
      features: [
        "Destylat dnia: 10 rzeczy, które faktycznie się wydarzyły",
        "Radar ciszy — co przeszło bez rozgłosu",
        "Tracker projektów ustaw i kalendarz konsultacji",
        "Karty posłów, rejestr obietnic vs. głosowań",
        "Otwarte dane: CSV, API, ICS, RSS",
      ],
    },
    {
      roman: "II",
      kicker: "Warstwa komercyjna",
      name: "Pro",
      price: "590 zł/mies.",
      href: "/pro",
      cta: "Otwórz konsolę Pro",
      hue: HUE.indigo,
      who: "Analityk regulacyjny, compliance, dział strategii, fundusz. Pytanie nie brzmi „co się stało”, ale „co to znaczy dla nas i do kiedy”.",
      features: [
        "Routing wpływu po PKD, branży, regionie i wielkości firmy",
        "Diff wersji aktów powiązany z uwagą z konsultacji",
        "Widok forward-looking: decyzje tego kwartału",
        "Mapa interesariuszy i prognozy z pasmem",
        "Eksport, API, webhooki, Slack i Teams",
      ],
    },
    {
      roman: "III",
      kicker: "Warstwa samorządowa",
      name: "Local",
      price: "820 zł/mies.",
      href: "/local",
      cta: "Otwórz warstwę Local",
      hue: HUE.amber,
      who: "Urząd, deweloper, lokalny biznes, redakcja powiatowa. Wszystko, co dzieje się w promieniu, który ma znaczenie.",
      features: [
        "Agregacja BIP: uchwały, protokoły, budżety, MPZP",
        "Transkrypcje sesji rad z indeksem mówców",
        "Alerty geograficzne: promień, działka, obręb",
        "Wydatki i przetargi gminy + benchmark GUS",
        "Wielogminność — kilka jednostek naraz",
      ],
    },
    {
      roman: "IV",
      kicker: "Warstwa instytucjonalna",
      name: "Gov",
      price: "kontrakt",
      href: "/gov",
      cta: "Otwórz konsolę Gov",
      hue: HUE.sky,
      who: "Instytucja publiczna. Tryb nasłuchu z bezpiecznikami: agregaty, audyt, niezależny monitor. Nigdy narzędzie kształtowania opinii.",
      features: [
        "Poranny briefing i mapa nastrojów regionalnych",
        "Tryb kryzysowy z eskalacją i bramką sign-off",
        "Agregator sondaży z korektą house effects",
        "Klastrowana skrzynka obywatelska (k ≥ 50)",
        "Log audytowy append-only i publiczne lustro",
      ],
    },
  ],

  infra: [
    {
      kicker: "SILNIK",
      name: "Pozyskiwanie i przetwarzanie",
      desc: "1 284 źródła, transkrypcje Whisper, deduplikacja embeddingami, kaskada modeli i graf encji. Każde zdanie streszczenia klikalne do źródła.",
      href: "/silnik",
      cta: "Konsola silnika",
    },
    {
      kicker: "KONTO",
      name: "Logowanie, zespół, rozliczenia",
      desc: "Magic link, passkeys, SSO SAML/OIDC ze SCIM, role i seaty, faktury pro forma, BLIK i Przelewy24, powiadomienia i API.",
      href: "/konto",
      cta: "Panel konta",
    },
    {
      kicker: "KONFIGURACJA",
      name: "Profil, próg, źródła",
      desc: "Profile zainteresowań po PKD i regionie, czułość alertów, długość streszczeń, wagi źródeł, bezpieczniki nadzorowane.",
      href: "/konfiguracja",
      cta: "Ustawienia sygnału",
    },
  ],

  nipSteps: [
    {
      n: "01",
      title: "Wpisujesz NIP",
      detail: "Walidacja VIES, dane z KRS / REGON / CRBR, forma prawna i wielkość podmiotu",
    },
    {
      n: "02",
      title: "Zaciągamy PKD",
      detail: "Kody PKD mapowane na obszary regulacyjne, komisje sejmowe i akty w toku",
    },
    {
      n: "03",
      title: "Routing gotowy",
      detail: "Reguły wpływu, próg istotności i lista obserwowanych podmiotów wstępnie ustawione",
    },
  ],

  principles: [
    {
      label: "BEZ WARSTWY PRZYWILEJU",
      value:
        "Płatne plany dają szybkość, routing i współpracę. Nie dają dostępu do danych, których nie widzi warstwa darmowa.",
    },
    {
      label: "PROWENIENCJA ZAWSZE",
      value:
        "Każde zdanie streszczenia prowadzi do dokumentu, transkryptu albo głosowania. Bez linku nie ma zdania.",
    },
    {
      label: "NOWOŚĆ, NIE HAŁAS",
      value:
        "Wykrywamy, co faktycznie nowe, i odsiewamy recykling. Anomalia nieobecności też jest sygnałem.",
    },
    {
      label: "TON WOBEC SPRAWY",
      value:
        "Klasyfikujemy framing i ton wobec sprawy, nie wobec osoby. Profilowanie osób jest wyłączone konstrukcyjnie.",
    },
  ],
};

export function pricing(cycle: BillingCycle): Pricing {
  const yearly = cycle === "rok";

  return {
    plans: [
      {
        name: "Wolny",
        price: "0 zł",
        unit: "bez konta · konto opcjonalne",
        audience: "Obywatele, dziennikarze, radni",
        buy: "BEZ PŁATNOŚCI",
      },
      {
        name: "Pro",
        price: yearly ? "590 zł" : "690 zł",
        unit: yearly ? "mies. / seat, rozliczenie roczne" : "mies. / seat, rozliczenie miesięczne",
        audience: "Analitycy, compliance, fundusze",
        buy: "KARTA · BLIK · P24 · PRZELEW",
      },
      {
        name: "Local",
        price: yearly ? "820 zł" : "990 zł",
        unit: "mies. / jednostka, do 5 użytkowników",
        audience: "Samorząd, deweloperzy, lokalny biznes",
        buy: "PRO FORMA · PRZELEW 14/30 DNI",
      },
      {
        name: "Gov",
        price: "kontrakt",
        unit: "od 84 000 zł / rok, wycena indywidualna",
        audience: "Instytucje publiczne",
        buy: "POSTĘPOWANIE · PO NA FAKTURZE",
      },
    ],

    groups: [
      {
        label: "DANE I DOSTĘP",
        rows: [
          {
            label: "Destylat dnia i radar ciszy",
            note: "10 rzeczy, które faktycznie się wydarzyły + co przeszło bez rozgłosu",
            cells: [yes, yes, yes, yes],
          },
          {
            label: "Tracker projektów, karty posłów, rejestr obietnic",
            cells: [yes, yes, yes, yes],
          },
          {
            label: "Otwarte dane: CSV, ICS, RSS, newsletter, widgety",
            cells: [yes, yes, yes, yes],
          },
          {
            label: "Publiczne API",
            note: "klucze z zakresami, sandbox, paginacja kursorowa",
            cells: [
              text("1 tys. req/mies."),
              text("100 tys. req/mies."),
              text("50 tys. req/mies."),
              text("limit kontraktowy"),
            ],
          },
          {
            label: "Archiwum i wyszukiwarka pełnotekstowa",
            cells: [
              text("90 dni"),
              text("pełne + zapisane wyszukiwania"),
              text("pełne + BIP gminy"),
              text("pełne, retencja procedurą"),
            ],
          },
        ],
      },
      {
        label: "ALERTY I ROUTING",
        rows: [
          {
            label: "Routing wpływu: PKD, branża, region, wielkość firmy",
            cells: [no, yes, text("gmina i promień"), text("resort i województwo")],
          },
          {
            label: "Reguły alertów na encje, akty, osoby, komisje",
            note: "z progiem istotności i minimalną liczbą źródeł",
            cells: [text("3 reguły"), text("bez limitu"), text("bez limitu"), text("bez limitu")],
          },
          {
            label: "Kanały powiadomień",
            cells: [
              text("e-mail, RSS, ICS"),
              text("+ Slack, Teams, webhook, push"),
              text("+ SMS krytyczny"),
              text("+ kanał kryzysowy"),
            ],
          },
          {
            label: "Reguły warunkowe („jeśli X i region Y, to SMS”)",
            cells: [no, yes, yes, yes],
          },
          {
            label: "Alerty geograficzne: promień, działka, obręb",
            cells: [no, no, yes, yes],
          },
        ],
      },
      {
        label: "ANALIZA",
        rows: [
          {
            label: "Diff wersji dokumentów prawnych",
            cells: [
              text("podstawowy"),
              text("+ uwaga z konsultacji i jej autor"),
              text("+ uchwały i MPZP"),
              text("pełny"),
            ],
          },
          {
            label: "Porównanie framingu tej samej sprawy",
            cells: [
              no,
              text("12 redakcji"),
              text("redakcje lokalne"),
              text("pełne + tryb kryzysowy"),
            ],
          },
          {
            label: "Prognozy przejścia legislacyjnego",
            note: "publiczny rejestr trafności dla wszystkich planów",
            cells: [
              text("punktowe"),
              text("z pasmem niepewności"),
              text("z pasmem niepewności"),
              text("z pasmem niepewności"),
            ],
          },
          {
            label: "Mapa interesariuszy: kto zyskuje, kto traci",
            cells: [no, yes, yes, yes],
          },
          {
            label: "Monitoring przetargów jako sygnał sprzedażowy",
            cells: [no, yes, text("+ benchmark GUS"), no],
          },
          {
            label: "Sondaże: house effects, pooling, raw vs. informed",
            cells: [no, no, no, yes],
          },
          {
            label: "Skrzynka obywatelska (k ≥ 50), desk deliberatywny",
            cells: [no, no, no, yes],
          },
        ],
      },
      {
        label: "ZESPÓŁ, EKSPORT, WSPÓŁPRACA",
        rows: [
          {
            label: "Seaty i role",
            note: "właściciel / admin / analityk / czytelnik / gość",
            cells: [
              text("1, konto opcjonalne"),
              text("od 3, add-on za seat"),
              text("5 w cenie"),
              text("kontraktowe, z clearance"),
            ],
          },
          {
            label: "Komentarze, przypisanie alertu, wspólne tematy",
            cells: [no, yes, yes, text("+ bramka sign-off")],
          },
          {
            label: "Eksport PDF / CSV / XLSX i raporty cykliczne",
            cells: [text("CSV"), yes, yes, text("ze znakiem wodnym")],
          },
          {
            label: "Branding, white-label, własna domena",
            cells: [no, text("add-on"), text("add-on"), yes],
          },
          {
            label: "SSO SAML 2.0 / OIDC + SCIM",
            cells: [no, text("add-on"), text("add-on"), text("wymagane")],
          },
        ],
      },
      {
        label: "ZGODNOŚĆ I BEZPIECZNIKI",
        rows: [
          {
            label: "WCAG 2.1 AA, nawigacja klawiaturą, czytniki ekranu",
            cells: [yes, yes, yes, yes],
          },
          {
            label: "RODO: DPA, rejestr czynności, eksport i usunięcie",
            cells: [
              text("eksport konta"),
              text("DPA"),
              text("DPA"),
              text("DPA + rejestr czynności"),
            ],
          },
          {
            label: "Log audytowy",
            cells: [
              no,
              text("log aktywności zespołu"),
              text("log aktywności zespołu"),
              text("append-only + monitor"),
            ],
          },
          {
            label: "Blokowanie konkretnych redakcji",
            note: "w Gov celowo niedostępne — brak blocklisty to element pozycjonowania",
            cells: [no, yes, yes, never("NIEDOSTĘPNE")],
          },
          {
            label: "Próg agregacji k, retencja, zakres uprawnień",
            cells: [
              text("domyślne"),
              text("konfigurowalne"),
              text("konfigurowalne"),
              never("TYLKO PROCEDURĄ"),
            ],
          },
        ],
      },
    ],

    payPaths: [
      {
        kicker: "ŚCIEŻKA 1 · NATYCHMIAST",
        title: "Karta, BLIK, Przelewy24, Google i Apple Pay",
        desc: "Aktywacja w chwili płatności. Trial 14 dni bez podawania karty — po nim konto schodzi do warstwy darmowej, nie blokuje się.",
        items: [
          "Subskrypcja miesięczna lub roczna (−17%)",
          "Proration przy zmianie planu w trakcie okresu",
          "Anulowanie samodzielne, bez kontaktu z nami",
          "Historia płatności do pobrania w PDF i CSV",
        ],
      },
      {
        kicker: "ŚCIEŻKA 2 · INSTYTUCJE",
        flag: "MUST-HAVE W PL",
        title: "Faktura pro forma i przelew, termin 14 lub 30 dni",
        desc: "Bez tego żaden samorząd ani instytucja publiczna nie kupi — karta nie przejdzie przez księgowość. Pro forma generowana samodzielnie, dostęp na wniosek aktywny przed opłaceniem.",
        items: [
          "Faktura VAT z NIP, walidacja VIES",
          "Numer zamówienia / PO na fakturze",
          "Odwrotne obciążenie UE, procedura OSS",
          "Potwierdzenie przelewu zamyka pozycję automatycznie",
        ],
      },
      {
        kicker: "ŚCIEŻKA 3 · ZAMÓWIENIA",
        title: "Postępowanie i tryb poniżej 130 tys. zł",
        desc: "Pakiet dokumentów do postępowania: opis przedmiotu zamówienia, oświadczenie o dostępności cyfrowej, wzór umowy powierzenia i DPA.",
        items: [
          "Tryb do 130 000 zł netto — oferta w 2 dni robocze",
          "Oświadczenie WCAG 2.1 AA do dokumentacji",
          "Kontrakt roczny lub wieloletni, faktura kwartalna",
          "Klauzula wyjścia z eksportem całości danych",
        ],
      },
    ],

    billingRules: [
      {
        label: "TRIAL",
        value:
          "14 dni pełnego Pro lub Local bez karty. Po zakończeniu plan schodzi do warstwy darmowej.",
      },
      {
        label: "LIMITY FREEMIUM",
        value: "Licznik zużycia API i alertów widoczny na koncie; alert progowy przy 80% i 100%.",
      },
      {
        label: "DUNNING",
        value:
          "Trzy ponowienia płatności w 10 dni, grace period 7 dni, potem downgrade zamiast blokady dostępu.",
      },
      {
        label: "ZWROTY",
        value:
          "Rezygnacja w ciągu 14 dni od pierwszej płatności — zwrot pełny. Później proporcjonalny za niewykorzystany okres.",
      },
      {
        label: "KUPONY",
        value:
          "Kody rabatowe i kredyty pilotażowe rozliczane na fakturze, widoczne jako osobna pozycja.",
      },
      {
        label: "PLANY SPECJALNE",
        value:
          "Edukacyjny, NGO i prasowy: −70%, weryfikacja raz w roku. Lokalna redakcja — dostęp symboliczny.",
      },
      {
        label: "ZMIANA PLANU",
        value:
          "Upgrade od razu, downgrade od następnego okresu, bez utraty zapisanych widoków i reguł.",
      },
      {
        label: "WALUTA I PODATEK",
        value: "PLN, VAT 23%. Dla podmiotów z UE poza PL odwrotne obciążenie po walidacji VIES.",
      },
    ],

    addons: [
      {
        name: "Dodatkowy seat",
        note: "Pro i Local, rola analityk lub czytelnik",
        price: "180 zł/mies.",
      },
      {
        name: "Wyższy limit API",
        note: "+250 tys. requestów, webhooki bez limitu",
        price: "450 zł/mies.",
      },
      {
        name: "Dodatkowa gmina",
        note: "Local, pełny BIP + transkrypcje sesji",
        price: "240 zł/mies.",
      },
      {
        name: "SSO SAML/OIDC + SCIM",
        note: "wymuszenie na poziomie organizacji",
        price: "390 zł/mies.",
      },
      {
        name: "White-label i własna domena",
        note: "branding raportów i portalu",
        price: "wycena",
      },
    ],
  };
}

export const trustCenter: TrustCenter = {
  blocks: [
    {
      kicker: "DANE OSOBOWE",
      name: "RODO w praktyce",
      items: [
        {
          label: "Umowa powierzenia (DPA) i rejestr czynności przetwarzania",
          value: "DOSTĘPNE",
          tone: "emerald",
        },
        {
          label: "Eksport wszystkich danych konta w JSON i CSV",
          value: "SAMOOBSŁUGA",
          tone: "emerald",
        },
        {
          label: "Usunięcie konta z potwierdzeniem i timerem 30 dni",
          value: "SAMOOBSŁUGA",
          tone: "emerald",
        },
        { label: "Polityka retencji per typ danych", value: "90 D – 5 LAT", tone: "neutral" },
        {
          label: "Tryb bez śledzenia, zgody cookies granularne",
          value: "DOMYŚLNY",
          tone: "emerald",
        },
      ],
    },
    {
      kicker: "BEZPIECZEŃSTWO",
      name: "Infrastruktura",
      items: [
        {
          label: "Szyfrowanie w spoczynku i w tranzycie",
          value: "AES-256 / TLS 1.3",
          tone: "neutral",
        },
        { label: "Rotacja kluczy", value: "CO 90 DNI", tone: "neutral" },
        { label: "Kopie zapasowe z testem odtworzenia", value: "CO TYDZIEŃ", tone: "neutral" },
        { label: "Raport z testów penetracyjnych", value: "12 VI 2026", tone: "neutral" },
        { label: "Hosting danych", value: "UE · WARSZAWA", tone: "neutral" },
      ],
    },
    {
      kicker: "MODELE",
      name: "Zgodność z AI Act",
      items: [
        {
          label: "Informacja, gdzie i jaki model liczy wynik",
          value: "PRZY KAŻDEJ POZYCJI",
          tone: "emerald",
        },
        {
          label: "Klasyfikacja tonu i framingu — model i wersja jawne",
          value: "v4.2 / F1 0,79",
          tone: "neutral",
        },
        {
          label: "Streszczenia generowane, każde zdanie klikalne do źródła",
          value: "PROWENIENCJA",
          tone: "emerald",
        },
        {
          label: "Brak profilowania osób fizycznych",
          value: "KONSTRUKCYJNIE",
          tone: "emerald",
        },
        {
          label: "Człowiek w pętli przy prognozach i trybie kryzysowym",
          value: "WYMAGANY",
          tone: "neutral",
        },
      ],
    },
    {
      kicker: "DOSTĘPNOŚĆ",
      name: "WCAG 2.1 AA",
      items: [
        {
          label: "Deklaracja dostępności i oświadczenie do postępowań",
          value: "PODPISANE",
          tone: "emerald",
        },
        {
          label: "Pełna nawigacja klawiaturą, widoczny focus",
          value: "AUDYT 05/2026",
          tone: "emerald",
        },
        {
          label: "Czytniki ekranu: NVDA, JAWS, VoiceOver",
          value: "TESTOWANE",
          tone: "emerald",
        },
        { label: "Kontrast tekstu i wykresów", value: "MIN. 4,5:1", tone: "neutral" },
        {
          label: "Wykresy zawsze z tabelą danych i opisem tekstowym",
          value: "ZAWSZE",
          tone: "emerald",
        },
      ],
    },
    {
      kicker: "JAKOŚĆ DANYCH",
      name: "Kontrola i korekty",
      items: [
        {
          label: "Detekcja martwych źródeł i alarm redakcyjny",
          value: "PONIŻEJ 6 H",
          tone: "neutral",
        },
        { label: "Zgłoszenie błędu przy każdej pozycji", value: "KAŻDY PLAN", tone: "emerald" },
        { label: "Publiczny rejestr korekt i błędów", value: "JAWNY", tone: "emerald" },
        { label: "Publiczny rejestr trafności prognoz", value: "JAWNY", tone: "emerald" },
        {
          label: "Respektowanie robots.txt i zastrzeżeń TDM",
          value: "BEZWARUNKOWO",
          tone: "emerald",
        },
      ],
    },
    {
      kicker: "JĘZYK I FORMATY",
      name: "i18n",
      items: [
        { label: "Interfejs polski i angielski", value: "PL / EN", tone: "neutral" },
        { label: "Formaty dat, liczb i waluty", value: "LOKALNE", tone: "neutral" },
        { label: "Strefa czasowa raportów", value: "PER UŻYTKOWNIK", tone: "neutral" },
        {
          label: "Terminologia prawnicza: uproszczona lub dosłowna",
          value: "SUWAK",
          tone: "neutral",
        },
        { label: "Transkrypcje sesji — język oryginału", value: "PL", tone: "neutral" },
      ],
    },
  ],

  sla: [
    {
      plan: "Wolny",
      channel: "e-mail, baza wiedzy",
      firstResponse: "5 dni rob.",
      fix: "5 dni rob.",
    },
    { plan: "Pro", channel: "czat + e-mail", firstResponse: "4 h rob.", fix: "2 dni rob." },
    {
      plan: "Local",
      channel: "czat + e-mail + telefon",
      firstResponse: "4 h rob.",
      fix: "2 dni rob.",
    },
    {
      plan: "Gov",
      channel: "dedykowany opiekun",
      firstResponse: "1 h (24/7 dla kryzysu)",
      fix: "8 h",
    },
  ],

  openness: [
    {
      label: "CHANGELOG",
      value: "Każda zmiana modelu, źródła i progu opisana w dzienniku zmian z datą wdrożenia.",
      link: { label: "Zobacz w warstwie wolnej", href: "/wolny" },
    },
    {
      label: "ROADMAPA",
      value: "Publiczna lista tego, co budujemy i czego świadomie nie zbudujemy — z powodem.",
    },
    {
      label: "STATUS",
      value: "Dostępność usługi, opóźnienia potoku i incydenty w czasie rzeczywistym.",
      link: { label: "Stan źródeł", href: "/silnik" },
    },
    {
      label: "LUSTRO",
      value: "Publiczne lustro danych z warstwy Gov: te same agregaty, które widzi instytucja.",
      link: { label: "Otwórz lustro", href: "/gov" },
    },
    {
      label: "TRAFNOŚĆ",
      value:
        "Rejestr prognoz z wynikiem: 214 prognoz, 78% trafnych w pasmie, pełna historia do pobrania.",
    },
  ],
};
