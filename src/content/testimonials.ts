export type Testimonial = {
  id: string;
  clientName: string;
  body: string;
  featured: boolean;
  order: number;
};

const testimonials: Testimonial[] = [
  {
    id: "brigitte",
    clientName: "Brigitte",
    body: "Zeer lieve, vriendelijke dame waardoor je je dan ook direct op je gemak voelt. Na de eerste massage van nek, schouder en rug merkte ik duidelijk een verschil en was de pijn die ik had al wat minder. Daarom heb ik direct een tweede afspraak gemaakt en nu gaat het alleen maar de goede kant op. Dikke duim en dikke mercie.",
    featured: true,
    order: 1,
  },
  {
    id: "yanne",
    clientName: "Yanne",
    body: "Een zeer fijne vrouw die duidelijk veel moeite doet voor haar klanten. Ik voelde me onmiddellijk op mijn gemak bij aankomst. Ik boekte een rug-, schouder- en nekmassage en heb er enorm van genoten. Ik kom zeker terug. Bedankt!",
    featured: true,
    order: 2,
  },
  {
    id: "cliff",
    clientName: "Cliff",
    body: "Elke keer opnieuw wonderen verricht. Mercikes om me telkens terug te verbeteren en vol enthousiasme en vriendelijkheid te ontvangen. Professionele behandeling — aanrader!",
    featured: true,
    order: 3,
  },
  {
    id: "karine",
    clientName: "Karine",
    body: "Een heel fijne dame waar je je onmiddellijk goed bij voelt. Alles zat vast van nek, schouders, rug. Na de massage was het een hele verlichting en had ik minder pijn. Ik heb al onmiddellijk een nieuwe afspraak geboekt.",
    featured: true,
    order: 4,
  },
  {
    id: "birgitta",
    clientName: "Birgitta",
    body: "Door mijn job als kapster heb ik veel last van mijn nek en schouders. Blij dat ik bij Tanja terecht gekomen ben! Gouden handen, stressverlichting en pijn onder controle. Telkens weer heel vriendelijk en professioneel. Echt een aanrader.",
    featured: true,
    order: 5,
  },
  {
    id: "roger",
    clientName: "Roger",
    body: "Goede behandeling voor mijn rugprobleem, zeer tevreden. Dankjewel!",
    featured: false,
    order: 6,
  },
];

export function getTestimonials(): Testimonial[] {
  return [...testimonials].sort((a, b) => a.order - b.order);
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getTestimonials().filter((t) => t.featured);
}
