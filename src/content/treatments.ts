export type Treatment = {
  id: string;
  name: string;
  category: "therapeutic" | "relaxation";
  shortDescription: string;
  longDescription?: string;
  indications: string[];
  priceAmount: number;
  priceType: "from" | "fixed";
  duration: string;
  salonizedLink: string;
  order: number;
};

const treatments: Treatment[] = [
  {
    id: "rug-nek-schouder",
    name: "Rug-, nek- en schoudermassage",
    category: "therapeutic",
    shortDescription:
      "Gerichte behandeling van de meest voorkomende spanningsgebieden. Verlicht pijn en herstelt bewegingsvrijheid.",
    longDescription:
      "Een diepgaande therapeutische massage van de volledige rug, nek en schouders. Tanja werkt met gerichte druk op verkrampte spieren en triggerpoints om pijnklachten te verlichten die ontstaan door werkhouding, stress of chronische overbelasting.",
    indications: ["Nekpijn", "Stijve schouders", "Spanningshoofdpijn", "Lage rugpijn"],
    priceAmount: 55,
    priceType: "fixed",
    duration: "60 min",
    salonizedLink: "/afspraak",
    order: 1,
  },
  {
    id: "voetreflexologie",
    name: "Voetreflexologie",
    category: "therapeutic",
    shortDescription:
      "Drukpuntmassage op de voeten die inwerkt op reflexzones van het hele lichaam.",
    longDescription:
      "Via gerichte druk op specifieke reflexzones in de voeten wordt het zelfgenezend vermogen van het lichaam gestimuleerd. Bijzonder effectief bij spanning, slaapproblemen, spijsverterings- of hormonale klachten.",
    indications: ["Stress", "Slaapproblemen", "Vermoeidheid", "Spijsverteringsklachten"],
    priceAmount: 70,
    priceType: "fixed",
    duration: "60 min",
    salonizedLink: "/afspraak",
    order: 2,
  },
  {
    id: "deep-tissue-cupping",
    name: "Deep tissue of cupping",
    category: "therapeutic",
    shortDescription:
      "Diepe weefselmassage of droge cupping om vastzittende spieren en bindweefsel los te maken.",
    longDescription:
      "Bij So'Relax werken we uitsluitend met droge cupping. De vacuümcups tillen de oppervlakkige spierlagen op, stimuleren doorbloeding en maken fasciale verklevingen los. Effectief bij chronische rug-, nek- en schouderpijn.",
    indications: ["Chronische spierpijn", "Fasciale verklevingen", "Sportblessures", "Doorbloedingsproblemen"],
    priceAmount: 45,
    priceType: "from",
    duration: "45–60 min",
    salonizedLink: "/afspraak",
    order: 3,
  },
  {
    id: "lymfedrainage-cellulite-fibromassage",
    name: "Lymfedrainage, cellulite­behandeling of fibromassage",
    category: "therapeutic",
    shortDescription:
      "Zachte, stuwende massagetechnieken die de lymfestroom activeren en vochtophopingen helpen afvoeren.",
    longDescription:
      "Manuele lymfedrainage stimuleert de afvoer van afvalstoffen en vocht. Fibromassage is een zachtere, ritmische variant, bijzonder geschikt voor mensen met fibromyalgie die geen diepe druk verdragen.",
    indications: ["Fibromyalgie", "Oedeem", "Cellulitis", "Herstel na operatie"],
    priceAmount: 40,
    priceType: "from",
    duration: "45–60 min",
    salonizedLink: "/afspraak",
    order: 4,
  },
  {
    id: "triggerpoints",
    name: "Triggerpoint­behandeling",
    category: "therapeutic",
    shortDescription:
      "Gerichte druk op pijnpunten om uitstralingspijn en bewegingsbeperking te verlichten.",
    longDescription:
      "Triggerpoints zijn overprikkelde punten in spieren die pijn kunnen uitstralen naar andere zones van het lichaam. Door precieze druk worden ze gedeactiveerd, waardoor hoofdpijn, schouderklachten of heupklachten kunnen verdwijnen.",
    indications: ["Uitstralingspijn", "Migraine / hoofdpijn", "Chronische spierknopen", "Sportblessures"],
    priceAmount: 45,
    priceType: "from",
    duration: "45–60 min",
    salonizedLink: "/afspraak",
    order: 5,
  },
  {
    id: "zweedse-massage",
    name: "Zweedse massage",
    category: "relaxation",
    shortDescription:
      "Klassieke ontspanningsmassage met vloeiende, lange bewegingen voor diepe rust.",
    longDescription:
      "De meest bekende vorm van ontspanningsmassage. Lange strijkingen, kneedbewegingen en lichte druk zorgen voor diepe ontspanning, betere doorbloeding en een gevoel van algeheel welzijn.",
    indications: ["Stress", "Algemene spanning", "Vermoeidheid", "Slaapkwaliteit"],
    priceAmount: 70,
    priceType: "from",
    duration: "60 min",
    salonizedLink: "/afspraak",
    order: 6,
  },
  {
    id: "hotstone-massage",
    name: "Hotstone massage",
    category: "relaxation",
    shortDescription:
      "Warme basaltstenen dringen diep in de spieren en brengen lichaam en geest tot volledige rust.",
    longDescription:
      "Gladde, verwarmde basaltstenen worden op specifieke punten gelegd en gebruikt tijdens de massage. De diepe warmte ontspant de spieren sneller en dieper dan handen alleen kunnen, ideaal bij koude voeten, vermoeidheid of chronische spanning.",
    indications: ["Diepe ontspanning", "Slechte doorbloeding", "Chronische vermoeidheid", "Winterdip"],
    priceAmount: 95,
    priceType: "fixed",
    duration: "75 min",
    salonizedLink: "/afspraak",
    order: 7,
  },
  {
    id: "balinese-swastha",
    name: "Balinese of Swastha massage",
    category: "relaxation",
    shortDescription:
      "Een rijke, krachtige massage met warme olie die oosterse technieken en acupressuur combineert.",
    longDescription:
      "De Balinese massage combineert zachte strijkingen, acupressuur, reflexologie en aromatherapie met warme natuurlijke oliën. Brengt het lichaam in balans en activeert de eigen energiestroom.",
    indications: ["Energietekort", "Spanning in het hele lichaam", "Huidverzorging", "Algemene balans"],
    priceAmount: 80,
    priceType: "fixed",
    duration: "75 min",
    salonizedLink: "/afspraak",
    order: 8,
  },
];

export function getTreatments(): Treatment[] {
  return [...treatments].sort((a, b) => a.order - b.order);
}

export function getTreatmentsByCategory(category: Treatment["category"]): Treatment[] {
  return getTreatments().filter((t) => t.category === category);
}
