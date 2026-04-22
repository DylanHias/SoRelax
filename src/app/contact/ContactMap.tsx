"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function ContactMap() {
  const [showInteractive, setShowInteractive] = useState(false);

  const query = encodeURIComponent(siteConfig.contact.mapsQuery);

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      {showInteractive ? (
        <iframe
          title={`Kaart van ${siteConfig.contact.street}, ${siteConfig.contact.city}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full"
        />
      ) : (
        <div className="relative">
          <div
            aria-hidden="true"
            className="h-[420px] w-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, #EFE9DD 0 14px, #E5DFD4 14px 28px)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]/55 backdrop-blur-[2px]">
            <div className="max-w-md rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center shadow-[var(--shadow-subtle)]">
              <p className="text-sm text-[var(--color-text-secondary)]">
                De interactieve kaart laadt externe inhoud van Google Maps.
              </p>
              <Button
                type="button"
                variant="primary"
                className="mt-4"
                onClick={() => setShowInteractive(true)}
              >
                Toon interactieve kaart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
