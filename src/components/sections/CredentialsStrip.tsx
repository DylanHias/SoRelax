import { Container } from "@/components/ui/Container";
import { CredentialBadge } from "@/components/ui/CredentialBadge";
import { CertificateIcon, HandsIcon, LeafIcon, ShieldCheckIcon } from "@/components/ui/Icons";

const credentials = [
  { icon: <ShieldCheckIcon className="h-5 w-5" />, label: "Erkend therapeut bij BMF" },
  { icon: <CertificateIcon className="h-5 w-5" />, label: "Gecertificeerd pijncoach" },
  { icon: <LeafIcon className="h-5 w-5" />, label: "Natuurlijke CHI-producten" },
  { icon: <HandsIcon className="h-5 w-5" />, label: "Behandeling op maat" },
];

export function CredentialsStrip() {
  return (
    <section aria-label="Kwalificaties" className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container>
        <ul className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-8 md:py-10">
          {credentials.map((item) => (
            <li key={item.label}>
              <CredentialBadge icon={item.icon} label={item.label} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
