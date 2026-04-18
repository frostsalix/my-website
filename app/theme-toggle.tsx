"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

const STORAGE_KEY = "frostsalix-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const nextTheme = getPreferredTheme();
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function applyTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    const doc = document as DocumentWithTransition;
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(() => applyTheme(nextTheme));
      return;
    }

    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light paper background" : "Switch to dark ink background"}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
    >
      <span className="sr-only">Theme toggle</span>
      {theme === "dark" ? (
        <svg
          className="theme-toggle__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M20.8 14.7a9.2 9.2 0 1 1-11.5-11.5 8.2 8.2 0 1 0 11.5 11.5Z" fill="currentColor" stroke="none" />
        </svg>
      ) : (
        <svg
          className="theme-toggle__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
          <g>
            <path d="M12 1.8v2.4" />
            <path d="M12 19.8v2.4" />
            <path d="M1.8 12h2.4" />
            <path d="M19.8 12h2.4" />
            <path d="M4.4 4.4l1.7 1.7" />
            <path d="M17.9 17.9l1.7 1.7" />
            <path d="M19.6 4.4l-1.7 1.7" />
            <path d="M6.1 17.9l-1.7 1.7" />
          </g>
        </svg>
      )}
    </button>
  );
}