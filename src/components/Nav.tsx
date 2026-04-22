import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";
import { BookingButton } from "@/components/BookingButton";
import { primaryNav } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--color-border)]">
      <Container>
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link
            href="/"
            aria-label="So'Relax — home"
            className="group flex items-center gap-3 no-underline text-[var(--color-text-primary)]"
          >
            <Image
              src="/Logo.svg"
              alt=""
              width={64}
              height={64}
              priority
              className="h-12 w-12 sm:h-16 sm:w-16"
            />
            <span className="font-serif text-xl sm:text-2xl tracking-tight leading-none">
              So&rsquo;Relax
              <span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] text-[var(--color-text-secondary)] mt-1 font-medium">
                Massagetherapie Aarschot
              </span>
            </span>
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:flex items-center gap-8">
            {primaryNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent-primary)]"
              >
                {item.label}
              </Link>
            ))}
            <BookingButton variant="primary" size="md">
              Afspraak maken
            </BookingButton>
          </nav>

          <details className="lg:hidden relative">
            <summary
              aria-label="Menu openen"
              className="list-none cursor-pointer flex items-center justify-center h-10 w-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-primary)] [&::-webkit-details-marker]:hidden group-open:bg-[var(--color-surface)]"
            >
              <MenuIcon className="h-5 w-5 group-open:hidden" />
              <CloseIcon className="h-5 w-5 hidden group-open:block" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] w-[min(88vw,22rem)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-subtle)] p-2">
              <nav aria-label="Mobiele navigatie" className="flex flex-col">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-[15px] font-medium text-[var(--color-text-primary)] no-underline rounded-[var(--radius-sm)] hover:bg-[var(--color-bg)]"
                  >
                    {item.label}
                  </Link>
                ))}
                <BookingButton variant="primary" size="md" className="mt-2">
                  Afspraak maken
                </BookingButton>
              </nav>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
