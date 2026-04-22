import { Hero } from "@/components/sections/Hero";
import { CredentialsStrip } from "@/components/sections/CredentialsStrip";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Specializations } from "@/components/sections/Specializations";
import { TreatmentsPreview } from "@/components/sections/TreatmentsPreview";
import { WhyMassage } from "@/components/sections/WhyMassage";
import { TestimonialsList } from "@/components/sections/TestimonialsList";
import { CtaBand } from "@/components/sections/CtaBand";
import { getFeaturedTestimonials } from "@/content/testimonials";

export default function HomePage() {
  return (
    <>
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
