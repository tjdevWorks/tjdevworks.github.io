import type { ThemeMode } from "@/lib/content";

export const THEME_STORAGE_KEY = "theme-mode";

export function getSystemTheme(): Exclude<ThemeMode, "system"> {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(mode: ThemeMode): Exclude<ThemeMode, "system"> {
  if (mode === "system") {
    return getSystemTheme();
  }

  return mode;
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === "undefined") {
    return;
  }

  const resolved = resolveTheme(mode);
  document.documentElement.setAttribute("data-theme", resolved);
}
