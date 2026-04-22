"use client";

import { openCookiePreferences } from "@/components/CookieConsent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] cursor-pointer"
    >
      Cookie-instellingen openen
    </button>
  );
}
