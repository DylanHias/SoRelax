"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users won't fill this out
    if (data.get("company")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

    if (!endpoint) {
      // Backend endpoint not yet configured — keep UX testable locally.
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[ContactForm] NEXT_PUBLIC_CONTACT_ENDPOINT not set — logging only.",
          Object.fromEntries(data.entries()),
        );
      }
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const payload = {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: String(data.get("message") ?? ""),
        company: String(data.get("company") ?? ""),
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(body?.error ?? "Er ging iets mis, probeer het later opnieuw.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Geen verbinding. Controleer je netwerk en probeer opnieuw.");
      setStatus("error");
    }
  }

  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-primary)] font-medium">
        Stuur een bericht
      </p>
      <h2 className="mt-3 text-[1.5rem]">Liever schriftelijk?</h2>
      <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
        Laat gerust een bericht achter — ik probeer binnen één werkdag te antwoorden.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <Field id="name" label="Naam" autoComplete="name" required />
        <Field id="email" label="E-mailadres" type="email" autoComplete="email" required />
        <Field id="phone" label="Telefoon (optioneel)" type="tel" autoComplete="tel" />
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)]">
            Bericht
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[15px] text-[var(--color-text-primary)] focus:border-[var(--color-accent-primary)] focus:outline-none"
          />
        </div>

        {/* Honeypot — hidden from real users */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Bedrijf</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Versturen..." : "Verstuur bericht"}
          </Button>
          {status === "success" && (
            <p role="status" className="text-sm text-[var(--color-success)]">
              Bedankt! Ik neem snel contact op.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage || "Er ging iets mis, probeer het later opnieuw."}
            </p>
          )}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Door dit formulier te versturen ga je akkoord met ons{" "}
          <a href="/privacy" className="text-[var(--color-accent-primary)]">privacybeleid</a>.
        </p>
      </form>
    </Card>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  autoComplete?: string;
};

function Field({ id, label, type = "text", required, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-primary)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[15px] text-[var(--color-text-primary)] focus:border-[var(--color-accent-primary)] focus:outline-none"
      />
    </div>
  );
}
