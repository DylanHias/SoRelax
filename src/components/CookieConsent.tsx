"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const KEY = "sorelax-consent";
const VERSION = 1;
const CHANGE_EVENT = "sorelax-consent-change";
const OPEN_EVENT = "sorelax-consent-open";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};
export type StoredConsent = ConsentCategories & { ts: number; v: number };

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(analytics: boolean, marketing: boolean): StoredConsent {
  const stored: StoredConsent = {
    necessary: true,
    analytics,
    marketing,
    ts: Date.now(),
    v: VERSION,
  };
  window.localStorage.setItem(KEY, JSON.stringify(stored));
  window.dispatchEvent(new CustomEvent<StoredConsent>(CHANGE_EVENT, { detail: stored }));
  return stored;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useConsent(): StoredConsent | null {
  return useSyncExternalStore(
    subscribe,
    () => readStored(),
    () => null,
  );
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

type Status = "ssr" | "decided" | "undecided";
function getStatusSnapshot(): Status {
  if (typeof window === "undefined") return "ssr";
  return readStored() ? "decided" : "undecided";
}
function getStatusServerSnapshot(): Status {
  return "ssr";
}

export function CookieConsent() {
  const status = useSyncExternalStore(subscribe, getStatusSnapshot, getStatusServerSnapshot);
  const [forceOpen, setForceOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      const existing = readStored();
      setAnalytics(existing?.analytics ?? false);
      setMarketing(existing?.marketing ?? false);
      setDetails(true);
      setForceOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const acceptAll = useCallback(() => {
    writeStored(true, true);
    setForceOpen(false);
  }, []);
  const rejectAll = useCallback(() => {
    writeStored(false, false);
    setForceOpen(false);
  }, []);
  const savePrefs = useCallback(() => {
    writeStored(analytics, marketing);
    setForceOpen(false);
  }, [analytics, marketing]);

  const open = forceOpen || status === "undecided";
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:left-6 md:right-auto md:bottom-6 md:max-w-md"
    >
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-subtle)]">
        <h2
          id="cookie-consent-title"
          className="font-serif text-xl text-[var(--color-text-primary)]"
        >
          Cookies op deze site
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Wij gebruiken enkel noodzakelijke cookies om de site te laten werken.
          Analytische en marketing-cookies plaatsen we pas na jouw toestemming.
          Meer info in ons{" "}
          <a href="/cookies" className="text-[var(--color-accent-primary)]">
            cookiebeleid
          </a>
          .
        </p>

        {details && (
          <div className="mt-5 space-y-3 border-t border-[var(--color-border)] pt-5">
            <ConsentRow
              title="Noodzakelijk"
              description="Vereist voor de basiswerking van de site (bv. je cookievoorkeur zelf). Kan niet worden uitgeschakeld."
              checked
              disabled
            />
            <ConsentRow
              title="Analyse"
              description="Helpt ons begrijpen welke pagina's bezocht worden. Momenteel gebruiken we cookieless analytics — deze optie is reservering voor later."
              checked={analytics}
              onChange={setAnalytics}
            />
            <ConsentRow
              title="Marketing"
              description="Wordt momenteel niet gebruikt. Reservering voor eventuele toekomstige inbedding van externe widgets."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-primary-hover)] cursor-pointer"
          >
            Accepteren
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] cursor-pointer"
          >
            Weigeren
          </button>
          {details ? (
            <button
              type="button"
              onClick={savePrefs}
              className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] cursor-pointer"
            >
              Voorkeuren opslaan
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] underline underline-offset-4 transition-colors hover:text-[var(--color-accent-primary)] cursor-pointer"
            >
              Voorkeuren
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 flex-none cursor-pointer accent-[var(--color-accent-primary)] disabled:cursor-not-allowed disabled:opacity-60"
      />
      <span className="flex-1">
        <span className="block font-medium text-[var(--color-text-primary)]">{title}</span>
        <span className="mt-0.5 block text-[var(--color-text-secondary)]">{description}</span>
      </span>
    </label>
  );
}
