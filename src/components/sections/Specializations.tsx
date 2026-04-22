import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, MuscleIcon, NeckIcon, SparkIcon } from "@/components/ui/Icons";

const specializations = [
  {
    title: "Spieren & gewrichten",
    description:
      "Gerichte therapeutische massages bij chronische spier- en gewrichts­pijnen, sportblessures en overbelasting.",
    href: "/behandelingen#triggerpoints",
    icon: <MuscleIcon className="h-6 w-6" />,
  },
  {
    title: "Nek, schouder & rug",
    description:
      "De meest gevraagde behandeling: verlichting van pijn die ontstaat door stress, werkhouding of chronische spanning.",
    href: "/behandelingen#rug-nek-schouder",
    icon: <NeckIcon className="h-6 w-6" />,
  },
  {
    title: "Fibromyalgie",
    description:
      "Zachte, aangepaste technieken — fibromassage en lymfedrainage — voor wie leeft met chronische bindweefselpijn.",
    href: "/behandelingen#lymfedrainage-cellulite-fibromassage",
    icon: <SparkIcon className="h-6 w-6" />,
  },
];

export function Specializations() {
  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
            Specialisatie
          </p>
          <h2 className="mt-3">Waar Tanja in thuis is.</h2>
          <p className="mt-5 text-[var(--color-text-secondary)]">
            Geen spa-aanbod, maar gerichte therapeutische zorg. De drie gebieden waar
            klanten haar het vaakst voor vinden.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {specializations.map((item) => (
            <li
              key={item.title}
              className="group flex flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-7 transition-colors duration-150 hover:border-[var(--color-accent-primary)]"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-accent-primary)]"
              >
                {item.icon}
              </span>
              <h3 className="mt-5">{item.title}</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">{item.description}</p>
              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-primary)] no-underline"
              >
                Meer over deze behandeling
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
