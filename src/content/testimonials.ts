import testimonialsData from "../../content/testimonials/testimonials.json";

export type Testimonial = {
  id: string;
  clientName: string;
  body: string;
  featured: boolean;
};

function normalize(
  raw: (typeof testimonialsData)["testimonials"][number],
): Testimonial {
  return {
    id: raw.id,
    clientName: raw.clientName,
    body: raw.body,
    featured: Boolean(raw.featured),
  };
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.testimonials.map(normalize);
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getTestimonials().filter((t) => t.featured);
}
