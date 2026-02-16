"use client";

import { useEffect, useMemo, useState } from "react";
import type { NavItem, ThemeMode } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { THEME_STORAGE_KEY, applyTheme, getSystemTheme } from "@/components/ui/theme";

type HeaderProps = {
  navItems: NavItem[];
  siteName: string;
};

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "dark";
}

export function Header({ navItems, siteName }: HeaderProps) {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    setMode(getInitialMode());
  }, []);

  useEffect(() => {
    applyTheme(mode);
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);

    if (mode !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = () => {
      document.documentElement.setAttribute("data-theme", getSystemTheme());
    };

    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);

  const title = useMemo(() => siteName, [siteName]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-background/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          <a className="truncate text-sm font-bold tracking-[0.14em] uppercase" href="/">
            {title}
          </a>

          <div className="justify-self-center">
            <Nav items={navItems} />
          </div>

          <div className="justify-self-end">
            <ThemeToggle mode={mode} setMode={setMode} />
          </div>
        </div>
      </div>
    </header>
  );
}
