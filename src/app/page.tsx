import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CredentialsStrip } from "@/components/sections/CredentialsStrip";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Specializations } from "@/components/sections/Specializations";
import { TreatmentsPreview } from "@/components/sections/TreatmentsPreview";
import { WhyMassage } from "@/components/sections/WhyMassage";
import { TestimonialsList } from "@/components/sections/TestimonialsList";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getFeaturedTestimonials } from "@/content/testimonials";
import { getSettings } from "@/content/settings";
import { localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema(getSettings())} />
      <Hero />
      <CredentialsStrip />
      <AboutTeaser />
      <Specializations />
      <TreatmentsPreview />
      <WhyMassage />
      <TestimonialsList items={getFeaturedTestimonials()} />
      <CtaBand />
    </>
  );
}
