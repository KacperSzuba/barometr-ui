import type { DailyDigest, Legislation, OpenData, People } from "@/lib/data/types";

export const dailyDigest: DailyDigest = {
  items: [
    {
      tag: "SEJM",
      institution: "druk 412 · II czytanie",
      title:
        "Projekt taryfowy przeszedł do drugiego czytania bez obowiązku 30-dniowego uprzedzenia",
      what: "W wersji czwartej skreślono ustęp nakazujący sprzedawcy poinformowanie odbiorcy 30 dni przed zmianą stawki. Dla odbiorcy wrażliwego wprowadzono termin 14 dni.",
      sourceLabel: "API SEJMU + RCL",
      time: "27 VII, 14:02",
      novelty: "nowe",
    },
    {
      tag: "RCL",
      institution: "nowy projekt",
      title: "Resort zdrowia opublikował projekt ustawy o sieci szpitali powiatowych",
      what: "Konsultacje trwają 30 dni, do 28 sierpnia. Nowe kryteria kwalifikacji obejmą 271 szpitali; projekt wskazuje 14 placówek tracących profil zabiegowy.",
      sourceLabel: "RCL · PROJEKT 501",
      time: "29 VII, 05:40",
      novelty: "nowe",
    },
    {
      tag: "RADA MINISTRÓW",
      institution: "rozporządzenie",
      title: "Przyjęto rozporządzenie o wsparciu odbiorcy wrażliwego na sezon 2026/2027",
      what: "Kwota programu wskazana w komunikacie (1,4 mld zł) różni się od kwoty w projekcie budżetowym (1,2 mld zł). Pozycja oznaczona do weryfikacji.",
      sourceLabel: "BIP KPRM",
      time: "28 VII, 16:20",
      novelty: "rozbieżność",
    },
    {
      tag: "UZP / TED",
      institution: "2 140 ogłoszeń",
      title: "Największe wczorajsze postępowanie: modernizacja sieci ciepłowniczej za 84 mln zł",
      what: "Trzy postępowania powyżej 50 mln zł, wszystkie w energetyce cieplnej. Dwa z terminem składania ofert krótszym niż ustawowe minimum — wysłano zapytanie do zamawiającego.",
      sourceLabel: "eZAMÓWIENIA",
      time: "28 VII, 23:59",
      novelty: "nowe",
    },
    {
      tag: "KOMISJA",
      institution: "Energii i Klimatu",
      title:
        "Komisja przyjęła sprawozdanie; resort uzasadnił skreślenie kosztem po stronie sprzedawców",
      what: "Transkrypt posiedzenia z indeksem mówców jest dostępny. Cytat prowadzi do sekundy nagrania, nie do całego pliku.",
      sourceLabel: "TRANSKRYPT · 01:14:22",
      time: "24 VII, 13:11",
      novelty: "nowe",
    },
    {
      tag: "NIK",
      institution: "wystąpienie pokontrolne",
      title: "Kontrola wykazała brak rejestru umów w 11 z 24 skontrolowanych gmin",
      what: "Wystąpienie dotyczy okresu 2023–2025. Wnioski pokrywają się z zakresem druku 388, który od 12 czerwca leży w komisji.",
      sourceLabel: "BIP NIK",
      time: "28 VII, 10:05",
      novelty: "nowe",
    },
    {
      tag: "GUS",
      institution: "BDL",
      title: "Ceny nośników energii dla gospodarstw: +4,1% rok do roku",
      what: "Najwyższy wzrost w województwie śląskim (+6,2%), najniższy w pomorskim (+2,4%). Dane wchodzą do porównań gminnych w warstwie Local.",
      sourceLabel: "GUS / BDL",
      time: "29 VII, 04:00",
      novelty: "nowe",
    },
    {
      tag: "SAMORZĄD",
      institution: "Rada Miasta Gliwice",
      title: "Rada uchwaliła zmianę planu miejscowego dla 14 ha przy ulicy Portowej",
      what: "Zmiana dopuszcza zabudowę usługowo-produkcyjną. Protokół sesji i transkrypt z indeksem mówców opublikowane w terminie.",
      sourceLabel: "BIP GLIWICE",
      time: "28 VII, 19:44",
      novelty: "nowe",
    },
    {
      tag: "PREZYDENT",
      institution: "podpis",
      title: "Podpisana nowelizacja o zamówieniach poniżej progów unijnych",
      what: "Wchodzi w życie 1 września. Zmienia tryb dokumentowania postępowań do 130 tys. zł — dotyczy każdej jednostki samorządu.",
      sourceLabel: "ISAP / ELI",
      time: "28 VII, 12:30",
      novelty: "nowe",
    },
    {
      tag: "INTERPELACJE",
      institution: "18 nowych",
      title: "Osiemnaście interpelacji o taryfy energetyczne w ciągu doby, z dziewięciu okręgów",
      what: "Cztery zawierają to samo pytanie o mechanizm ochrony odbiorcy wrażliwego. Odpowiedzi resortu nie ma od 20 lipca.",
      sourceLabel: "API SEJMU",
      time: "28 VII, 21:15",
      novelty: "skok",
    },
  ],

  silence: [
    {
      tag: "BRAK ODPOWIEDZI",
      tone: "accent",
      meta: "21 dni · termin ustawowy minął",
      title: "Resort nie odpowiedział na 4 interpelacje o mechanizm ochrony odbiorcy",
      why: "Termin odpowiedzi to 21 dni. Brak odpowiedzi jest faktem instytucjonalnym, nie interpretacją.",
    },
    {
      tag: "BRAK PROTOKOŁU",
      tone: "accent",
      meta: "3 gminy · 7 dni po terminie",
      title: "Protokoły sesji z 22 lipca nie zostały opublikowane w trzech gminach",
      why: "Ustawowy termin publikacji minął. Monitorujemy 2 477 jednostek; to jedyne trzy zaległości.",
    },
    {
      tag: "BEZ KONSULTACJI",
      tone: "amber",
      meta: "tryb pilny",
      title: "Rozporządzenie o taryfach ciepłowniczych wydane bez konsultacji publicznych",
      why: "Uzasadnienie trybu pilnego liczy dwa akapity i nie wskazuje przesłanki ustawowej.",
    },
    {
      tag: "CISZA RESORTU",
      tone: "amber",
      meta: "9 dni bez stanowiska",
      title: "Żadnego stanowiska resortu w sprawie taryf od 20 lipca",
      why: "W tym czasie ukazało się 148 materiałów prasowych i wpłynęło 18 interpelacji.",
    },
    {
      tag: "UNIEWAŻNIENIE",
      tone: "neutral",
      meta: "84 mln zł",
      title: "Postępowanie na modernizację sieci unieważnione bez uzasadnienia w BIP",
      why: "Ogłoszenie o unieważnieniu nie zawiera podstawy prawnej. Wysłaliśmy zapytanie do zamawiającego.",
    },
  ],

  feeds: ["RSS", "ICS — KALENDARZ", "API", "CSV DNIA"],
};

export const legislation: Legislation = {
  bills: [
    {
      id: "DRUK 412",
      author: "projekt rządowy · MKiŚ",
      title: "Ustawa o zmianie ustawy — Prawo energetyczne (taryfy i ochrona odbiorcy wrażliwego)",
      summary:
        "Zmienia tryb zatwierdzania taryf i skraca obowiązek informowania odbiorcy o zmianie stawki. Po konsultacjach skreślono ustęp o 30-dniowym uprzedzeniu; dla odbiorcy wrażliwego wprowadzono termin 14 dni.",
      filed: "wniesiony: 8 V 2026",
      versions: "wersji projektu: 4",
      comments: "uwag w konsultacjach: 214",
      current: 5,
      steps: [
        { date: "8 V", label: "Projekt" },
        { date: "14 VI", label: "Konsultacje" },
        { date: "26 VI", label: "Rada Ministrów" },
        { date: "3 VII", label: "I czytanie" },
        { date: "24 VII", label: "Komisja" },
        { date: "27 VII", label: "II czytanie" },
        { date: "—", label: "III czytanie" },
        { date: "—", label: "Senat" },
        { date: "—", label: "Prezydent" },
      ],
      next: [
        {
          label: "CO DALEJ",
          value:
            "III czytanie i głosowanie w bloku głosowań posiedzenia — najbliższy możliwy termin: 5 sierpnia.",
        },
        {
          label: "KIEDY DECYZJA",
          value:
            "Senat ma 30 dni od uchwalenia. Realny koniec ścieżki: przełom września i października.",
        },
        {
          label: "CO SIĘ ZMIENI",
          value:
            "Vacatio legis 14 dni od publikacji. Nowy tryb taryfowy obejmie umowy zawierane po wejściu w życie.",
        },
      ],
    },
    {
      id: "DRUK 388",
      author: "projekt poselski · grupa 15 posłów",
      title: "Ustawa o jawności rejestrów umów jednostek samorządu terytorialnego",
      summary:
        "Obniża progi publikacji umów w rejestrach gminnych i wprowadza jednolity format danych. Samorządy wskazują koszt wdrożenia; Ministerstwo Cyfryzacji zgłosiło uwagi techniczne do formatu.",
      filed: "wniesiony: 2 IV 2026",
      versions: "wersji projektu: 2",
      comments: "uwag w konsultacjach: 96",
      current: 3,
      steps: [
        { date: "2 IV", label: "Projekt" },
        { date: "30 IV", label: "Konsultacje" },
        { date: "—", label: "Rada Ministrów" },
        { date: "12 VI", label: "I czytanie" },
        { date: "—", label: "Komisja" },
        { date: "—", label: "II czytanie" },
        { date: "—", label: "III czytanie" },
        { date: "—", label: "Senat" },
        { date: "—", label: "Prezydent" },
      ],
      next: [
        {
          label: "CO DALEJ",
          value:
            "Projekt leży w Komisji Samorządu Terytorialnego od 12 czerwca. Podkomisja nie została powołana.",
        },
        {
          label: "KIEDY DECYZJA",
          value:
            "Bez powołania podkomisji do końca sierpnia szansa na uchwalenie w tej sesji spada poniżej 20%.",
        },
        {
          label: "CO SIĘ ZMIENI",
          value:
            "Obowiązek publikacji od 500 zł wartości umowy, jednolity CSV, termin 14 dni od zawarcia.",
        },
      ],
    },
    {
      id: "DRUK 501",
      author: "projekt rządowy · MZ",
      title: "Ustawa o sieci szpitali powiatowych i zabezpieczeniu świadczeń",
      summary:
        "Zmienia zasady kwalifikacji szpitali do sieci i wprowadza mechanizm ratunkowy dla placówek powiatowych. Projekt trafił do konsultacji 20 lipca; termin uwag mija 28 sierpnia.",
      filed: "wniesiony: 20 VII 2026",
      versions: "wersji projektu: 1",
      comments: "uwag w konsultacjach: 41",
      current: 1,
      steps: [
        { date: "20 VII", label: "Projekt" },
        { date: "do 28 VIII", label: "Konsultacje" },
        { date: "—", label: "Rada Ministrów" },
        { date: "—", label: "I czytanie" },
        { date: "—", label: "Komisja" },
        { date: "—", label: "II czytanie" },
        { date: "—", label: "III czytanie" },
        { date: "—", label: "Senat" },
        { date: "—", label: "Prezydent" },
      ],
      next: [
        {
          label: "CO DALEJ",
          value:
            "Konsultacje publiczne trwają — 30 dni. Uwagi można złożyć przez formularz RCL do 28 sierpnia.",
        },
        {
          label: "KIEDY DECYZJA",
          value:
            "Rada Ministrów najwcześniej w październiku; wejście w życie planowane na 1 stycznia 2027.",
        },
        {
          label: "CO SIĘ ZMIENI",
          value:
            "Nowe kryteria kwalifikacji obejmą 271 szpitali powiatowych; 14 z nich straci profil zabiegowy.",
        },
      ],
    },
  ],

  consultations: [
    {
      title: "Projekt ustawy o sieci szpitali powiatowych",
      who: "MZ · RCL",
      deadline: "28 VIII",
      left: "30 dni",
      tone: "neutral",
    },
    {
      title: "Rozporządzenie o taryfach ciepłowniczych — uwagi techniczne",
      who: "MKiŚ",
      deadline: "4 VIII",
      left: "6 dni",
      tone: "amber",
    },
    {
      title: "Wysłuchanie publiczne: rejestry umów JST",
      who: "Sejm · Komisja Samorządu",
      deadline: "1 VIII",
      left: "3 dni",
      tone: "accent",
    },
    {
      title: "Konsultacje MPZP — obszar Portowa, Gliwice",
      who: "UM Gliwice · BIP",
      deadline: "12 VIII",
      left: "14 dni",
      tone: "neutral",
    },
    {
      title: "Strategia rozwoju powiatu sanockiego 2027–2033",
      who: "Powiat sanocki",
      deadline: "20 VIII",
      left: "22 dni",
      tone: "neutral",
    },
    {
      title: "Program ochrony powietrza — województwo śląskie",
      who: "Urząd Marszałkowski",
      deadline: "9 VIII",
      left: "11 dni",
      tone: "neutral",
    },
  ],

  forecasts: [
    {
      question: "Druk 412 uchwalony przez Sejm do 30 IX",
      probability: "82%",
      low: 71,
      high: 91,
      band: "71–91%",
      horizon: "30 IX 2026",
    },
    {
      question: "Druk 388 wyjdzie z komisji w tej sesji",
      probability: "18%",
      low: 8,
      high: 31,
      band: "8–31%",
      horizon: "31 X 2026",
    },
    {
      question: "Rozporządzenie o wsparciu wejdzie w życie przed 1 XI",
      probability: "64%",
      low: 49,
      high: 78,
      band: "49–78%",
      horizon: "1 XI 2026",
    },
    {
      question: "Sieć szpitali: projekt trafi do Sejmu w 2026 r.",
      probability: "47%",
      low: 30,
      high: 65,
      band: "30–65%",
      horizon: "31 XII 2026",
    },
  ],

  resolved: [
    {
      question: "Nowelizacja o zamówieniach podpisana do 31 VII",
      said: "76%",
      result: "TRAFNA",
      tone: "emerald",
    },
    {
      question: "Rozporządzenie ciepłownicze bez konsultacji",
      said: "31%",
      result: "NIETRAFNA",
      tone: "accent",
    },
    {
      question: "Sprawozdanie komisji przed 25 VII",
      said: "88%",
      result: "TRAFNA",
      tone: "emerald",
    },
    {
      question: "Podkomisja ds. rejestrów umów do 30 VI",
      said: "54%",
      result: "W PASMIE",
      tone: "amber",
    },
  ],
};

export const people: People = {
  columns: [
    "POSEŁ / POSŁANKA",
    "KLUB",
    "FREKWENCJA",
    "ZGODNOŚĆ Z KLUBEM",
    "INTERPELACJE",
    "OSTATNIE KLUCZOWE GŁOSOWANIE",
  ],

  deputies: [
    {
      name: "A. Wiśniewska",
      district: "okręg 19 · Warszawa",
      club: "klub A",
      attendance: "96%",
      attendanceValue: 96,
      loyalty: "98%",
      loyaltyValue: 98,
      interpellations: "12",
      lastVote: "ZA — druk 412, II czytanie",
    },
    {
      name: "R. Nowak",
      district: "okręg 31 · Katowice",
      club: "klub B",
      attendance: "91%",
      attendanceValue: 91,
      loyalty: "87%",
      loyaltyValue: 87,
      interpellations: "31",
      lastVote: "PRZECIW — druk 412, II czytanie",
    },
    {
      name: "M. Zawadzka",
      district: "okręg 22 · Krosno",
      club: "klub C",
      attendance: "88%",
      attendanceValue: 88,
      loyalty: "74%",
      loyaltyValue: 74,
      interpellations: "44",
      lastVote: "WSTRZYMANIE — druk 412",
    },
    {
      name: "T. Lewandowski",
      district: "okręg 3 · Wrocław",
      club: "klub A",
      attendance: "99%",
      attendanceValue: 99,
      loyalty: "99%",
      loyaltyValue: 99,
      interpellations: "4",
      lastVote: "ZA — druk 412, II czytanie",
    },
    {
      name: "K. Borowiec",
      district: "okręg 41 · Szczecin",
      club: "klub D",
      attendance: "72%",
      attendanceValue: 72,
      loyalty: "69%",
      loyaltyValue: 69,
      interpellations: "19",
      lastVote: "NIEOBECNOŚĆ — druk 412",
    },
    {
      name: "J. Sikora",
      district: "okręg 12 · Kraków",
      club: "klub B",
      attendance: "94%",
      attendanceValue: 94,
      loyalty: "91%",
      loyaltyValue: 91,
      interpellations: "27",
      lastVote: "PRZECIW — druk 412, II czytanie",
    },
  ],

  promises: [
    {
      verdict: "ZGODNE",
      tone: "emerald",
      who: "A. Wiśniewska · klub A",
      quote:
        "Odbiorca wrażliwy musi mieć osobny, krótszy termin i osobną ochronę — to nie podlega negocjacji.",
      quoteSource: "Konferencja prasowa, 12 VI 2026 · transkrypt 00:08:41",
      vote: "Głosowała ZA poprawką wprowadzającą 14-dniowy termin dla odbiorcy wrażliwego (art. 12 ust. 3a), 27 VII 2026.",
    },
    {
      verdict: "NIEZGODNE",
      tone: "accent",
      who: "K. Borowiec · klub D",
      quote:
        "Nie zgodzę się na skrócenie terminu informowania o podwyżce. Trzydzieści dni to minimum przyzwoitości.",
      quoteSource: "Wystąpienie w debacie, 3 VII 2026 · transkrypt 02:11:07",
      vote: "Nieobecny przy głosowaniu nad utrzymaniem 30-dniowego terminu, 27 VII 2026. Poprawka przepadła różnicą 4 głosów.",
    },
    {
      verdict: "CZĘŚCIOWO",
      tone: "amber",
      who: "R. Nowak · klub B",
      quote: "Ten projekt trzeba odrzucić w całości i napisać od nowa.",
      quoteSource: "Posiedzenie komisji, 24 VII 2026 · transkrypt 00:52:19",
      vote: "Głosował PRZECIW w II czytaniu, ale wcześniej poparł dwie poprawki redakcyjne do tego samego projektu.",
    },
    {
      verdict: "BEZ ROZSTRZYGNIĘCIA",
      tone: "neutral",
      who: "M. Zawadzka · klub C",
      quote: "Szpitale powiatowe nie mogą stracić profilu zabiegowego bez zgody rady powiatu.",
      quoteSource: "Wywiad regionalny, 21 VII 2026",
      vote: "Nie było jeszcze głosowania — projekt 501 jest w konsultacjach do 28 VIII. Pozycja wróci do rejestru po głosowaniu.",
    },
  ],

  councils: {
    Gliwice: [
      {
        id: "UCHWAŁA LXII/812",
        vote: "18 za · 5 przeciw · 2 wstrz.",
        title: "Zmiana planu miejscowego dla obszaru 14 ha przy ul. Portowej",
        effect:
          "Dopuszcza zabudowę usługowo-produkcyjną. Wchodzi w życie po 14 dniach od publikacji w dzienniku wojewódzkim.",
      },
      {
        id: "UCHWAŁA LXII/813",
        vote: "25 za · 0 przeciw",
        title: "Zmiany w budżecie miasta na 2026 rok — przesunięcie 4,2 mln zł",
        effect:
          "Środki z rezerwy inwestycyjnej na remonty szkół. Zmniejszono pozycję „promocja miasta” o 380 tys. zł.",
      },
      {
        id: "UCHWAŁA LXII/814",
        vote: "14 za · 11 przeciw",
        title: "Podwyżka opłaty za gospodarowanie odpadami do 41 zł od osoby",
        effect: "Obowiązuje od 1 października. Uzasadnienie wskazuje wzrost kosztów odbioru o 18%.",
      },
      {
        id: "STANOWISKO 7",
        vote: "przyjęte jednogłośnie",
        title: "Stanowisko rady w sprawie projektu ustawy o rejestrach umów",
        effect: "Rada wskazuje koszt wdrożenia jednolitego formatu na 240 tys. zł w skali miasta.",
      },
      {
        id: "INTERPELACJA 118",
        vote: "oczekuje odpowiedzi",
        title: "Interpelacja radnej o stan techniczny wiaduktu na ul. Kujawskiej",
        effect: "Termin odpowiedzi prezydenta miasta: 14 dni. Pozostało 9 dni.",
      },
    ],
    Gdynia: [
      {
        id: "UCHWAŁA XLIV/601",
        vote: "21 za · 3 przeciw",
        title: "Program ochrony powietrza — dopłaty do wymiany źródeł ciepła",
        effect:
          "Budżet 6,8 mln zł na 2027 rok, nabór od stycznia. Priorytet dla budynków przed 1990 rokiem.",
      },
      {
        id: "UCHWAŁA XLIV/602",
        vote: "19 za · 6 przeciw",
        title: "Zmiana stawek opłaty za parkowanie w strefie A",
        effect:
          "Podwyżka o 1 zł za pierwszą godzinę od 1 września. Wpływy kierowane na transport zbiorowy.",
      },
      {
        id: "UCHWAŁA XLIV/603",
        vote: "24 za · 0 przeciw",
        title: "Przystąpienie do sporządzenia MPZP dla dzielnicy Oksywie",
        effect: "Prace planistyczne na 18 miesięcy. Konsultacje wstępne zaplanowano na wrzesień.",
      },
      {
        id: "UCHWAŁA XLIV/604",
        vote: "15 za · 9 przeciw · 1 wstrz.",
        title: "Sprzedaż nieruchomości gminnej przy ul. Morskiej w trybie przetargu",
        effect: "Wycena 12,4 mln zł. Radni opozycji wnioskowali o dzierżawę zamiast sprzedaży.",
      },
      {
        id: "PROTOKÓŁ XLIII",
        vote: "przyjęty",
        title: "Protokół z poprzedniej sesji wraz z transkryptem i indeksem mówców",
        effect: "Publikacja w terminie ustawowym. Transkrypt obejmuje 4 h 12 m, 14 mówców.",
      },
    ],
    Lublin: [
      {
        id: "UCHWAŁA LI/744",
        vote: "22 za · 8 przeciw",
        title: "Wieloletnia prognoza finansowa — aktualizacja limitu zadłużenia",
        effect:
          "Limit podniesiony o 90 mln zł na inwestycje wodociągowe. Opinia RIO pozytywna z uwagą.",
      },
      {
        id: "UCHWAŁA LI/745",
        vote: "30 za · 0 przeciw",
        title: "Regulamin budżetu obywatelskiego na 2027 rok",
        effect: "Pula 12 mln zł, próg wieku obniżony do 13 lat, głosowanie w październiku.",
      },
      {
        id: "UCHWAŁA LI/746",
        vote: "17 za · 13 przeciw",
        title: "Zmiana MPZP dla terenu przy ul. Turystycznej pod zabudowę wielorodzinną",
        effect:
          "Dopuszczona wysokość do 6 kondygnacji. Uwagi mieszkańców w 41 pismach, uwzględniono 6.",
      },
      {
        id: "UCHWAŁA LI/747",
        vote: "28 za · 2 wstrz.",
        title: "Utworzenie żłobka miejskiego na osiedlu Choiny",
        effect:
          "120 miejsc od września 2027. Koszt inwestycji 18,2 mln zł, w tym 6 mln z programu krajowego.",
      },
      {
        id: "INTERPELACJA 96",
        vote: "odpowiedź udzielona",
        title: "Interpelacja o koszty utrzymania basenu miejskiego",
        effect: "Odpowiedź prezydenta: 4,1 mln zł rocznie, w tym 1,3 mln dopłaty do biletów.",
      },
    ],
  },
};

export const openData: OpenData = {
  exports: [
    {
      kind: "CSV",
      name: "Destylat dnia i radar ciszy",
      desc: "Pełna dzienna paczka z proweniencją każdej pozycji: instytucja, dokument, czas, klasa nowości.",
      cta: "POBIERZ CSV",
    },
    {
      kind: "API",
      name: "Publiczne API",
      desc: "Klucz z zakresami, sandbox, paginacja kursorowa, 1 000 zapytań miesięcznie bez opłat.",
      cta: "OTWÓRZ OPENAPI",
    },
    {
      kind: "ICS",
      name: "Kalendarz terminów",
      desc: "Konsultacje, posiedzenia komisji, sesje rad i terminy odpowiedzi — subskrypcja do kalendarza.",
      cta: "SUBSKRYBUJ ICS",
    },
    {
      kind: "RSS",
      name: "Kanały tematyczne",
      desc: "Osobny feed dla każdego obserwowanego aktu, komisji, gminy i tematu.",
      cta: "LISTA KANAŁÓW",
    },
    {
      kind: "DUMP",
      name: "Bulk export",
      desc: "Archiwalne paczki miesięczne w JSON-lines, do analiz i pracy naukowej. Bez limitu pobrań.",
      cta: "ARCHIWUM MIESIĘCZNE",
    },
    {
      kind: "KONTO",
      name: "Konto opcjonalne",
      desc: "Magic link bez hasła. Służy tylko do zapisania obserwowanych tematów i ustawień digestu.",
      cta: "ZAŁÓŻ KONTO",
    },
  ],

  embedCode: `<script src="https://barometr.pl/w.js" defer></script>
<div data-barometr-widget="tracker"
     data-akt="druk-412"
     data-theme="paper"
     data-lang="pl"></div>

<!-- bez ciasteczek · bez trackingu · render serwerowy -->`,

  widgetKinds: [
    "TRACKER USTAWY",
    "DESTYLAT DNIA",
    "KALENDARZ KONSULTACJI",
    "KARTA POSŁA",
    "UCHWAŁY GMINY",
  ],

  corrections: [
    {
      date: "26 VII",
      what: "Kwota programu wsparcia podana jako 1,4 mld zł zamiast 1,2 mld zł.",
      how: "Źródłem był komunikat prasowy, nie projekt budżetu. Pozycja poprawiona, dodano oba źródła i wskazanie rozbieżności.",
      kind: "BŁĄD DANYCH",
    },
    {
      date: "22 VII",
      what: "Materiał satyryczny zaklasyfikowany jako informacyjny w liczniku pokrycia.",
      how: "Model tonu v4.1 → v4.2. Przeklasyfikowano 41 pozycji z ostatnich 30 dni.",
      kind: "BŁĄD MODELU",
    },
    {
      date: "14 VII",
      what: "Frekwencja jednego posła zawyżona o 3 pkt.",
      how: "Podwójne zliczenie głosowania reasumowanego. Poprawiono algorytm i przeliczono cały rok.",
      kind: "BŁĄD LICZENIA",
    },
    {
      date: "9 VII",
      what: "Uchwała przypisana do niewłaściwej gminy o podobnej nazwie.",
      how: "Rozróżnienie po kodzie TERYT, nie po nazwie. Zgłoszone przez czytelnika.",
      kind: "BŁĄD PRZYPISANIA",
    },
    {
      date: "2 VII",
      what: "Prognoza opublikowana bez pasma niepewności.",
      how: "Pasmo dodane retroaktywnie; wpis w rejestrze trafności oznaczony jako skorygowany.",
      kind: "BŁĄD PREZENTACJI",
    },
  ],

  publicPromises: [
    {
      label: "CZEGO NIE ROBIMY",
      value:
        "Nie profilujemy osób fizycznych, nie liczymy sentymentu wobec ludzi, nie sprzedajemy danych o czytelnikach i nie prowadzimy targetowania reklam.",
    },
    {
      label: "CO OBIECUJEMY",
      value:
        "Warstwa darmowa nie zostanie okrojona po to, by wypchnąć kogokolwiek do planu płatnego. Zakres z tej strony jest zobowiązaniem, a nie promocją.",
    },
    {
      label: "JAK NAS SPRAWDZIĆ",
      value:
        "Rejestr korekt, rejestr trafności prognoz, dziennik zmian modeli i status źródeł są publiczne i pobieralne. Zgłoszenie błędu jest dostępne przy każdej pozycji.",
    },
  ],
};
