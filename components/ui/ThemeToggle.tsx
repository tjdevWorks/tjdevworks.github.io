"use client";

import type { ReactNode } from "react";
import type { ThemeMode } from "@/lib/content";

type ThemeToggleProps = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const OPTIONS: Array<{ mode: ThemeMode; icon: ReactNode; label: string }> = [
  {
    mode: "light",
    label: "Light mode",
    icon: (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M12 4.5a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm0 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM5.5 11a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1Zm13 0a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1ZM7.4 7.4a1 1 0 0 1 1.4 0l.7.7a1 1 0 1 1-1.4 1.4l-.7-.7a1 1 0 0 1 0-1.4Zm8.7 8.7a1 1 0 0 1 1.4 0l.7.7a1 1 0 1 1-1.4 1.4l-.7-.7a1 1 0 0 1 0-1.4ZM12 17.5a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm-4-1.4a1 1 0 0 1 1.4 1.4l-.7.7a1 1 0 0 1-1.4-1.4l.7-.7Zm9.5-8.7a1 1 0 0 1 1.4 1.4l-.7.7a1 1 0 1 1-1.4-1.4l.7-.7Z" fill="currentColor" />
      </svg>
    )
  },
  {
    mode: "dark",
    label: "Dark mode",
    icon: (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M20.25 14.34a8.26 8.26 0 0 1-10.59-10.6 1 1 0 0 0-1.3-1.28A10.25 10.25 0 1 0 21.53 15.7a1 1 0 0 0-1.28-1.36Z" fill="currentColor" />
      </svg>
    )
  },
  {
    mode: "system",
    label: "System theme",
    icon: (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H13v2h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2H6.5A2.5 2.5 0 0 1 4 13.5v-8Zm2.5-.5a.5.5 0 0 0-.5.5v8c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11Z" fill="currentColor" />
      </svg>
    )
  }
];

export function ThemeToggle({ mode, setMode }: ThemeToggleProps) {
  return (
    <div aria-label="Theme" className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/85 p-1" role="radiogroup">
      {OPTIONS.map((option) => {
        const selected = mode === option.mode;

        return (
          <button
            key={option.mode}
            aria-checked={selected}
            aria-label={option.label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              selected ? "bg-accent text-white" : "text-muted hover:bg-accent/10"
            }`}
            onClick={() => setMode(option.mode)}
            role="radio"
            type="button"
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
}
