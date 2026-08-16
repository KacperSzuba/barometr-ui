import type {
  Guards,
  InterestProfile,
  Presentation,
  SignalSettings,
  Sources,
  TeamSettings,
} from "@/lib/data/types";

export const interestProfile: InterestProfile = {
  profiles: ["Regulacje", "Konkurencja", "+ nowy profil"],

  fields: [
    {
      label: "PKD I BRANŻA",
      hint: "4 kody z KRS",
      options: ["35.14", "35.13", "43.21", "71.12", "+ DODAJ"],
      selected: "35.14",
    },
    {
      label: "POZIOM GEOGRAFICZNY",
      hint: "hierarchia TERYT",
      options: ["KRAJ", "WOJEWÓDZTWO", "POWIAT", "GMINA", "PROMIEŃ OD ADRESU"],
      selected: "WOJEWÓDZTWO",
    },
    {
      label: "WOJEWÓDZTWA",
      hint: "2 z 16",
      options: ["ŚLĄSKIE", "MAŁOPOLSKIE", "+ DODAJ"],
      selected: "ŚLĄSKIE",
    },
    {
      label: "PROMIEŃ OD ADRESU",
      hint: "ul. Portowa 14, Gliwice",
      options: ["300 M", "1 KM", "3 KM", "10 KM"],
      selected: "10 KM",
    },
  ],

  sentence: `ZAKRES: PKD 35.14 + 3 kody dodatkowe · województwa śląskie i małopolskie
+ promień 10 km od siedziby · 6 gmin obserwowanych osobno`,

  watched: [
    {
      kind: "AKTY I PROJEKTY",
      count: "18 pozycji",
      items: ["DRUK 412", "DRUK 388", "DRUK 501", "ROZP. TARYFOWE", "+14"],
    },
    {
      kind: "KOMISJE",
      count: "3 pozycje",
      items: ["Energii i Klimatu", "Finansów Publicznych", "Gospodarki"],
    },
    {
      kind: "OSOBY W ROLACH PUBLICZNYCH",
      count: "9 pozycji",
      items: ["wiceministra MKiŚ", "przewodniczący Komisji Energii", "prezes URE", "+6"],
    },
    {
      kind: "SPÓŁKI I IZBY",
      count: "44 pozycje",
      items: ["Izba Obrotu Energią", "41 spółek obrotu", "2 izby regionalne"],
    },
    {
      kind: "SŁOWA KLUCZOWE",
      count: "11 fraz",
      items: ["„odbiorca wrażliwy”", "„taryfa zatwierdzona”", "„sprzedaż rezerwowa”", "+8"],
    },
    {
      kind: "GMINY (TERYT)",
      count: "6 jednostek",
      items: ["Gliwice", "Zabrze", "Knurów", "Pyskowice", "+2"],
    },
  ],

  muteColumns: ["TYP", "CO WYCISZONE", "DLACZEGO", "DO KIEDY", "AKCJA"],

  mutes: [
    {
      type: "TEMAT",
      tone: "neutral",
      what: "Wybory samorządowe — sondaże",
      why: "Poza zakresem pracy zespołu regulacyjnego",
      until: "31 XII 2026",
      action: "PRZEDŁUŻ",
    },
    {
      type: "ŹRÓDŁO",
      tone: "amber",
      what: "Kanał Telegram „energia-alerty”",
      why: "Wysoki poziom recyklingu, 82% duplikatów",
      until: "30 IX 2026",
      action: "ODCISZ",
    },
    {
      type: "ENCJA",
      tone: "neutral",
      what: "Spółka Enerpol SA (my)",
      why: "Nie chcemy alertów o samych sobie w digestach",
      until: "bezterminowo",
      action: "ZMIEŃ",
    },
    {
      type: "TEMAT",
      tone: "neutral",
      what: "Ciepłownictwo komunalne",
      why: "Osobny profil „Konkurencja” to obsługuje",
      until: "15 VIII 2026",
      action: "ODCISZ",
    },
    {
      type: "SŁOWO",
      tone: "accent",
      what: "Fraza „blackout”",
      why: "Generowała 90% trafień z portali plotkarskich",
      until: "1 XI 2026",
      action: "PRZEDŁUŻ",
    },
  ],
};

export const signalSettings: SignalSettings = {
  fields: [
    {
      label: "CZUŁOŚĆ ALERTÓW",
      hint: "globalnie dla profilu",
      options: ["TYLKO KRYTYCZNE", "WAŻNE", "WSZYSTKO"],
      selected: "WAŻNE",
    },
    {
      label: "MINIMALNY PRÓG ISTOTNOŚCI",
      hint: "skala 0–1",
      options: ["0,50", "0,60", "0,75", "0,85", "0,95"],
      selected: "0,75",
    },
    {
      label: "MINIMALNA LICZBA ŹRÓDEŁ",
      hint: "zanim uznamy za sygnał",
      options: ["1", "2", "3", "5"],
      selected: "2",
    },
    {
      label: "LIMIT DZIENNY POWIADOMIEŃ",
      hint: "nadwyżka idzie do digestu",
      options: ["3", "5", "10", "BEZ LIMITU"],
      selected: "5",
    },
  ],

  thresholdImpact: {
    "0,50": [214, 100],
    "0,60": [118, 55],
    "0,75": [41, 19],
    "0,85": [12, 6],
    "0,95": [3, 2],
  },

  rules: [
    {
      name: "Krytyczne w naszym regionie",
      state: "AKTYWNA",
      tone: "emerald",
      logic: `JEŚLI pkd = 35.14 AND region = ŚLĄSKIE AND istotność ≥ 0,85
TO SMS + push (nadpisuje godziny ciszy)`,
    },
    {
      name: "Zmiana treści obserwowanego aktu",
      state: "AKTYWNA",
      tone: "emerald",
      logic: `JEŚLI akt ∈ obserwowane AND typ = diff
TO e-mail natychmiast + webhook do CRM`,
    },
    {
      name: "Uwaga konkurencji w konsultacjach",
      state: "AKTYWNA",
      tone: "emerald",
      logic: `JEŚLI autor_uwagi ∈ lista_spółek OR autor_uwagi ∈ izby
TO digest dzienny, bez SMS`,
    },
    {
      name: "Cisza instytucji",
      state: "TESTOWA",
      tone: "amber",
      logic: `JEŚLI brak_stanowiska > 7 dni AND pokrycie > 50 materiałów
TO e-mail + Slack #regulacje`,
    },
    {
      name: "Sesje rad w naszych gminach",
      state: "WYCISZONA",
      tone: "neutral",
      logic: `JEŚLI gmina ∈ lista AND typ ∈ {MPZP, opłaty, budżet}
TO digest tygodniowy`,
    },
  ],
};

export const presentation: Presentation = {
  fields: [
    {
      label: "DŁUGOŚĆ STRESZCZEŃ",
      hint: "per pozycja",
      options: ["JEDNO ZDANIE", "AKAPIT", "PEŁNE"],
      selected: "AKAPIT",
    },
    {
      label: "POZIOM ŻARGONU PRAWNICZEGO",
      hint: "uproszczony ↔ dosłowny",
      options: ["UPROSZCZONY", "POŚREDNI", "DOSŁOWNY"],
      selected: "POŚREDNI",
    },
    {
      label: "PASMA BŁĘDU I WIELKOŚĆ PRÓBY",
      hint: "wymuszone polityką",
      options: ["ZAWSZE POKAZUJ", "UKRYJ"],
      selected: "ZAWSZE POKAZUJ",
    },
    {
      label: "GĘSTOŚĆ INTERFEJSU",
      hint: "wpływa na liczbę wierszy",
      options: ["LUŹNA", "ZWARTA", "MAKSYMALNA"],
      selected: "ZWARTA",
    },
    {
      label: "TRYB",
      hint: "także automatyczny wg systemu",
      options: ["JASNY", "CIEMNY", "AUTO"],
      selected: "JASNY",
    },
    {
      label: "ROZMIAR CZCIONKI",
      hint: "skalowanie do 200% bez utraty treści",
      options: ["MAŁY", "ŚREDNI", "DUŻY", "BARDZO DUŻY"],
      selected: "ŚREDNI",
    },
  ],

  previews: {
    "JEDNO ZDANIE": {
      UPROSZCZONY:
        "Sprzedawca nie musi już informować odbiorcy 30 dni przed podwyżką — wystarczy publikacja w internecie w dniu zatwierdzenia.",
      POŚREDNI:
        "Skreślono obowiązek informowania odbiorcy 30 dni przed zmianą stawki; wprowadzono publikację w serwisie w dniu zatwierdzenia taryfy.",
      DOSŁOWNY:
        "Uchylono art. 12 ust. 3 w brzmieniu nakładającym obowiązek informacyjny z terminem trzydziestodniowym, wprowadzając obowiązek publikacyjny ze skutkiem na dzień zatwierdzenia.",
    },
    AKAPIT: {
      UPROSZCZONY:
        "Do tej pory sprzedawca energii musiał powiedzieć odbiorcy o podwyżce miesiąc wcześniej. Ten obowiązek zniknął w czwartej wersji projektu — teraz wystarczy, że zmiana pojawi się na stronie w dniu jej zatwierdzenia. Osoby z prawem do ochrony jako odbiorcy wrażliwi mają 14 dni. Zmiana weszła po uwadze izby branżowej z konsultacji.",
      POŚREDNI:
        "Wersja czwarta projektu skreśla ustęp nakładający na sprzedawcę obowiązek poinformowania odbiorcy 30 dni przed zmianą stawki i zastępuje go publikacją w serwisie internetowym w dniu zatwierdzenia taryfy. Dla odbiorcy wrażliwego dodano nowy ustęp 3a z terminem 14 dni. Podstawą zmiany była uwaga nr 118 z konsultacji publicznych.",
      DOSŁOWNY:
        "W wersji czwartej projektu uchylono art. 12 ust. 3, który nakładał na sprzedawcę obowiązek poinformowania odbiorcy o zmianie stawki w terminie nie krótszym niż 30 dni przed jej wejściem w życie, wprowadzając w to miejsce obowiązek publikacji zmiany stawki w serwisie internetowym w dniu jej zatwierdzenia przez organ regulacyjny, oraz dodano ust. 3a przewidujący termin czternastodniowy w odniesieniu do odbiorcy wrażliwego.",
    },
    PEŁNE: {
      UPROSZCZONY:
        "Projekt zmienia zasady informowania o podwyżkach energii. Wcześniej sprzedawca musiał uprzedzić odbiorcę miesiąc wcześniej. Po zmianie wystarczy publikacja na stronie internetowej w dniu, w którym urząd zatwierdzi taryfę. Wyjątek dotyczy odbiorców wrażliwych — oni dostają 14 dni. Zmianę wywołała uwaga izby zrzeszającej 41 spółek sprzedających energię, zgłoszona w konsultacjach 14 czerwca. Resort powtórzył jej argument na posiedzeniu komisji 24 lipca, wskazując koszt operacyjny po stronie sprzedawców.",
      POŚREDNI:
        "Wersja czwarta projektu skreśla art. 12 ust. 3 (obowiązek informowania odbiorcy 30 dni przed zmianą stawki) i wprowadza obowiązek publikacji zmiany w serwisie internetowym w dniu zatwierdzenia taryfy. Dodano ust. 3a: dla odbiorcy wrażliwego stosuje się termin 14 dni. Zmiana odpowiada uwadze nr 118 z 14 VI 2026, zgłoszonej przez izbę branżową reprezentującą 41 spółek obrotu; argument o koszcie operacyjnym powtórzył przedstawiciel resortu na posiedzeniu komisji 24 VII (transkrypt 01:14:22). Projekt nie rozstrzyga statusu jednostek publicznych jako odbiorców wrażliwych.",
      DOSŁOWNY:
        "W wersji czwartej projektu uchylono art. 12 ust. 3 w brzmieniu: „Sprzedawca informuje odbiorcę o zmianie stawki nie później niż 30 dni przed jej wejściem w życie”, wprowadzając brzmienie: „Sprzedawca publikuje zmianę stawki w serwisie internetowym w dniu jej zatwierdzenia”, oraz dodano ust. 3a: „Do odbiorcy wrażliwego stosuje się termin 14 dni”. Zmiana pozostaje w związku z uwagą nr 118 z dnia 14 VI 2026, złożoną w trybie konsultacji publicznych przez izbę gospodarczą reprezentującą 41 przedsiębiorstw obrotu; uzasadnienie kosztu operacyjnego zostało powtórzone przez przedstawiciela organu wnoszącego projekt na posiedzeniu komisji w dniu 24 VII 2026 (transkrypt, znacznik 01:14:22).",
    },
  },

  modules: [
    { name: "Kolejka wpływu (co dotyczy nas)", note: "", state: "WIDOCZNY", tone: "emerald" },
    { name: "Kwartał do przodu", note: "", state: "WIDOCZNY", tone: "emerald" },
    { name: "Mapa interesariuszy", note: "", state: "WIDOCZNY", tone: "emerald" },
    { name: "Porównanie framingu", note: "", state: "ZWINIĘTY", tone: "amber" },
    { name: "Przetargi jako sygnał", note: "", state: "WIDOCZNY", tone: "emerald" },
    { name: "Radar ciszy", note: "", state: "UKRYTY", tone: "neutral" },
  ],

  dashboards: [
    {
      name: "Poniedziałek — zarząd",
      modules: "4 moduły · bez framingu",
      owner: "P. Kaczmarek",
      scope: "ZESPÓŁ",
      tone: "emerald",
    },
    {
      name: "Legal — tylko diffy",
      modules: "2 moduły · pełne teksty",
      owner: "J. Ostrowska",
      scope: "PRYWATNY",
      tone: "neutral",
    },
    {
      name: "Sprzedaż — przetargi",
      modules: "3 moduły · dopasowanie PKD",
      owner: "K. Sowa",
      scope: "ZESPÓŁ",
      tone: "emerald",
    },
    {
      name: "Kryzysowy (szablon)",
      modules: "5 modułów · gęstość maks.",
      owner: "organizacja",
      scope: "WYMUSZONY",
      tone: "amber",
    },
  ],
};

export const sources: Sources = {
  types: [
    {
      name: "Dokumenty instytucji (Sejm, RCL, ISAP, BIP)",
      count: "2 519 źródeł",
      weight: "1,00",
      share: 100,
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Zamówienia publiczne (eZamówienia, TED)",
      count: "2 źródła",
      weight: "0,90",
      share: 90,
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Dane statystyczne (GUS/BDL, PKW)",
      count: "2 źródła",
      weight: "0,85",
      share: 85,
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Rejestry spółek (KRS, CRBR, REGON)",
      count: "3 źródła",
      weight: "0,85",
      share: 85,
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Transkrypcje sesji i konferencji",
      count: "318 kanałów",
      weight: "0,80",
      share: 80,
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Prasa i portale (RSS)",
      count: "428 kanałów",
      weight: "0,55",
      share: 55,
      state: "WŁ.",
      tone: "emerald",
    },
    {
      name: "Media społecznościowe (Bluesky, Telegram)",
      count: "2 klasy",
      weight: "0,30",
      share: 30,
      state: "TYLKO SYGNAŁ",
      tone: "amber",
    },
  ],

  blocked: [
    { name: "Portal plotkarski X", note: "wyciszony jako źródło, nadal liczony w agregatach" },
    { name: "Serwis agregujący Y", note: "92% treści to przedruki" },
    { name: "Kanał Telegram „energia-alerty”", note: "recykling 82%" },
  ],

  limits: [
    { label: "Respektowanie robots.txt — bez wyjątków", value: "ZAWSZE", tone: "emerald" },
    {
      label: "Zastrzeżenia TDM — 41 domen wykluczonych",
      value: "WYKLUCZONE",
      tone: "emerald",
    },
    {
      label: "Treści za logowaniem i grupy prywatne",
      value: "NIE POBIERAMY",
      tone: "emerald",
    },
    {
      label: "Pseudonimizacja danych osobowych z komentarzy",
      value: "AUTOMAT",
      tone: "emerald",
    },
    { label: "Maksymalne obciążenie serwera źródła", value: "1 REQ / 2 S", tone: "neutral" },
  ],
};

export const teamSettings: TeamSettings = {
  defaults: [
    {
      name: "Profil dla nowego członka zespołu",
      note: "„Regulacje”, digest dzienny 07:00, język PL",
      state: "ZDEFINIOWANY",
      tone: "emerald",
    },
    { name: "Wymuszone 2FA", note: "passkey spełnia wymóg", state: "WYMUSZONE", tone: "emerald" },
    {
      name: "Wymuszone SSO SAML/OIDC",
      note: "add-on nieaktywny",
      state: "NIEAKTYWNE",
      tone: "amber",
    },
    {
      name: "Blokada eksportu dla roli gość",
      note: "nadpisuje ustawienie indywidualne",
      state: "WYMUSZONA",
      tone: "emerald",
    },
    {
      name: "Pasma błędu zawsze widoczne",
      note: "nie da się wyłączyć na poziomie użytkownika",
      state: "WYMUSZONE",
      tone: "emerald",
    },
    {
      name: "Godziny ciszy dla zespołu",
      note: "21:00–07:00, nadpisanie tylko krytyczne",
      state: "DOMYŚLNE",
      tone: "neutral",
    },
    {
      name: "Retencja widoków i eksportów",
      note: "24 miesiące, potem archiwizacja",
      state: "POLITYKA",
      tone: "neutral",
    },
  ],

  exportFields: [
    { label: "FORMAT DOMYŚLNY", options: ["PDF", "CSV", "XLSX", "JSON"], selected: "PDF" },
    {
      label: "STREFA CZASOWA RAPORTÓW",
      options: ["EUROPE/WARSAW", "UTC", "PER UŻYTKOWNIK"],
      selected: "EUROPE/WARSAW",
    },
    {
      label: "FORMAT DAT I LICZB",
      options: ["PL (31 XII 2026, 1 234,56)", "ISO (2026-12-31)"],
      selected: "PL (31 XII 2026, 1 234,56)",
    },
    { label: "JĘZYK INTERFEJSU I RAPORTÓW", options: ["PL", "EN", "PL + EN"], selected: "PL" },
  ],

  templateColumns: ["SZABLON", "HARMONOGRAM", "ODBIORCY", "FORMAT"],

  templates: [
    {
      name: "Przegląd regulacyjny",
      sections: "4 sekcje · bez framingu",
      cadence: "pon. 07:00",
      to: "zarząd + legal · 7 osób",
      format: "PDF",
      tone: "emerald",
    },
    {
      name: "Przetargi z dopasowaniem",
      sections: "2 sekcje · tabela",
      cadence: "pt. 16:00",
      to: "sprzedaż · 5 osób",
      format: "XLSX",
      tone: "emerald",
    },
    {
      name: "Raport framingu",
      sections: "3 sekcje · wykresy + tabela danych",
      cadence: "1. dzień mies.",
      to: "komunikacja · 3 osoby",
      format: "PDF",
      tone: "emerald",
    },
    {
      name: "Wsad do strategii",
      sections: "6 sekcji · prognozy z pasmem",
      cadence: "kwartalnie",
      to: "zarząd · 4 osoby",
      format: "PDF+CSV",
      tone: "neutral",
    },
    {
      name: "Dla rady nadzorczej",
      sections: "2 sekcje · streszczenia jednozdaniowe",
      cadence: "na żądanie",
      to: "lista 9 osób",
      format: "PDF",
      tone: "amber",
    },
  ],

  branding: [
    { label: "Logo i kolory w raportach PDF", value: "WŁĄCZONE" },
    { label: "Własna domena portalu (barometr.enerpol.example)", value: "ADD-ON" },
    { label: "White-label: usunięcie naszej marki z raportów", value: "ENTERPRISE" },
    { label: "Znak wodny z odbiorcą na eksportach", value: "WYMUSZONY" },
  ],
};

export const guards: Guards = {
  columns: ["BEZPIECZNIK", "WARTOŚĆ", "DLACZEGO TAK", "JAK SIĘ ZMIENIA"],

  guards: [
    {
      name: "Próg agregacji k",
      scope: "skrzynka obywatelska, klastry",
      value: { Pro: "k ≥ 50", Gov: "k ≥ 50" },
      why: {
        Pro: "Poniżej pięćdziesięciu wiadomości w klastrze pojedyncza osoba staje się rozpoznawalna. Klastry poniżej progu nie są pokazywane wcale — nie są też liczone w podsumowaniach.",
        Gov: "Poniżej pięćdziesięciu wiadomości w klastrze pojedyncza osoba staje się rozpoznawalna. Klastry poniżej progu nie są pokazywane wcale — nie są też liczone w podsumowaniach.",
      },
    },
    {
      name: "Retencja treści surowych",
      scope: "wiadomości, transkrypty",
      value: { Pro: "90 dni", Gov: "90 dni" },
      why: {
        Pro: "Surowe wiadomości obywatelskie znikają po 90 dniach; zostają wyłącznie agregaty. Transkrypty publiczne zostają, bo są dokumentem.",
        Gov: "Surowe wiadomości obywatelskie znikają po 90 dniach; zostają wyłącznie agregaty. Transkrypty publiczne zostają, bo są dokumentem.",
      },
    },
    {
      name: "Zakres uprawnień do treści",
      scope: "role i clearance",
      value: { Pro: "agregaty", Gov: "agregaty" },
      why: {
        Pro: "Żadna rola nie ma dostępu do pojedynczej wiadomości obywatela. Casework jest osobnym systemem, poza tym produktem.",
        Gov: "Żadna rola nie ma dostępu do pojedynczej wiadomości obywatela. Casework jest osobnym systemem, poza tym produktem.",
      },
    },
    {
      name: "Blocklist redakcji",
      scope: "źródła prasowe",
      value: { Pro: "dostępna", Gov: "niedostępna" },
      why: {
        Pro: "W planie Pro i Local filtr redakcji jest narzędziem roboczym. Nie zmienia agregatów w porównaniu framingu ani danych publicznych.",
        Gov: "W warstwie Gov brak możliwości blokowania redakcji jest elementem pozycjonowania. Instytucja nie może wyciąć krytycznego tytułu z własnego obrazu rzeczywistości.",
      },
    },
    {
      name: "Dostęp niezależnego monitora",
      scope: "log audytowy",
      value: { Pro: "stały", Gov: "stały" },
      why: {
        Pro: "Monitor widzi każde zapytanie i każdy eksport. Nie da się tego wyłączyć ani ograniczyć czasowo z panelu.",
        Gov: "Monitor widzi każde zapytanie i każdy eksport. Nie da się tego wyłączyć ani ograniczyć czasowo z panelu.",
      },
    },
  ],

  signatures: [
    {
      who: "M. Kowalczyk",
      role: "wnioskodawca · policy advisor, clearance B",
      state: "PODPISANO 27 VII",
      tone: "emerald",
    },
    {
      who: "A. Zieliński",
      role: "inspektor ochrony danych",
      state: "PODPISANO 28 VII",
      tone: "emerald",
    },
    {
      who: "Rada etyki danych",
      role: "opinia wymagana przed wdrożeniem",
      state: "W TOKU",
      tone: "amber",
    },
    {
      who: "Niezależny monitor",
      role: "powiadomiony, prawo weta w 14 dni",
      state: "POWIADOMIONY",
      tone: "neutral",
    },
  ],

  audit: [
    {
      when: "29 VII 09:14",
      what: "Podgląd listy bezpieczników w kontekście warstwy {layer}.",
      who: "P. KACZMAREK · ODCZYT",
    },
    {
      when: "28 VII 15:02",
      what: "Wniosek 2026/041 — drugi podpis (inspektor ochrony danych).",
      who: "A. ZIELIŃSKI · PODPIS",
    },
    {
      when: "27 VII 11:14",
      what: "Złożenie wniosku o obniżenie progu k z 50 do 30 dla powiatów poniżej 40 tys. mieszkańców.",
      who: "M. KOWALCZYK · WNIOSEK",
    },
    {
      when: "24 VII 08:41",
      what: "Odrzucono próbę ustawienia retencji poniżej 90 dni — brak podstawy proceduralnej.",
      who: "SYSTEM · BLOKADA",
    },
    {
      when: "21 VII 16:30",
      what: "Eksport agregatu regionalnego ze znakiem wodnym odbiorcy.",
      who: "J. OSTROWSKA · EKSPORT",
    },
    {
      when: "18 VII 10:05",
      what: "Zmiana wagi źródeł społecznościowych z 0,35 na 0,30 (poziom organizacji).",
      who: "ADMIN · KONFIGURACJA",
    },
  ],
};
