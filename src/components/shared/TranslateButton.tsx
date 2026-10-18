"use client";

import { useEffect, useSyncExternalStore } from "react";

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";
const COOKIE = "googtrans";
const SOURCE = "bn";
const TARGET = "en";
const COOKIE_VALUE = `/${SOURCE}/${TARGET}`;

type GoogleTranslateElement = new (
  options: {
    pageLanguage: string;
    includedLanguages: string;
    autoDisplay: boolean;
  },
  elementId: string
) => unknown;

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: GoogleTranslateElement } };
  }
}

/** Google stores the active translation in the `googtrans` cookie. */
const isEnglishActive = () =>
  document.cookie
    .split(";")
    .some((entry) => entry.trim() === `${COOKIE}=${COOKIE_VALUE}`);

const writeGoogTransCookie = (value: string) => {
  const isClearing = value === "";
  const expires = isClearing ? ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const { hostname } = window.location;

  // Google reads the cookie from both the bare host and the dotted domain.
  const scopes = ["", `;domain=${hostname}`, `;domain=.${hostname}`];

  for (const scope of scopes) {
    try {
      document.cookie = `${COOKIE}=${value};path=/${scope}${expires}`;
    } catch {
      // Some hosts (localhost, IPs) reject a `domain` attribute — ignore.
    }
  }
};

// External store backed by the cookie, so React can read it without
// an effect and without a server/client hydration mismatch.
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const notify = () => {
  for (const listener of listeners) {
    listener();
  }
};

const getSnapshot = () => isEnglishActive();
const getServerSnapshot = () => false;

const loadGoogleTranslate = () => {
  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate) {
      return;
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: SOURCE,
        includedLanguages: TARGET,
        autoDisplay: false,
      },
      ELEMENT_ID
    );
  };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
};

/**
 * Toggles the whole page between Bengali and English using Google's
 * website translator. The choice is persisted in the `googtrans` cookie,
 * so it survives navigations and reloads.
 */
const TranslateButton = () => {
  const isEnglish = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Only pay for the external script once English is actually selected.
  useEffect(() => {
    if (isEnglish) {
      loadGoogleTranslate();
    }
  }, [isEnglish]);

  const toggle = () => {
    writeGoogTransCookie(isEnglish ? "" : COOKIE_VALUE);
    notify();

    // The widget only re-applies the language on a fresh page load.
    window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={isEnglish ? "বাংলায় দেখুন" : "View in English"}
        title={isEnglish ? "বাংলায় দেখুন" : "View in English"}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
        </svg>

        <span className="hidden sm:inline">
          {isEnglish ? "বাংলা" : "English"}
        </span>
      </button>

      {/* Google renders its widget surface here; hidden via globals.css. */}
      <div id={ELEMENT_ID} aria-hidden="true" />
    </>
  );
};

export default TranslateButton;
