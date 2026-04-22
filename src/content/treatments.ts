import treatmentsData from "../../content/treatments/treatments.json";

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
};

function normalize(raw: (typeof treatmentsData)["treatments"][number]): Treatment {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category as Treatment["category"],
    shortDescription: raw.shortDescription,
    longDescription: raw.longDescription || undefined,
    indications: (raw.indications ?? []).filter(Boolean),
    priceAmount: raw.priceAmount,
    priceType: raw.priceType as Treatment["priceType"],
    duration: raw.duration,
    salonizedLink: raw.salonizedLink,
  };
}

export function getTreatments(): Treatment[] {
  return treatmentsData.treatments.map(normalize);
}

export function getTreatmentsByCategory(category: Treatment["category"]): Treatment[] {
  return getTreatments().filter((t) => t.category === category);
}
