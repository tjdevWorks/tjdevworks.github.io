"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/content";

type NavProps = {
  items: NavItem[];
};

export function Nav({ items }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main Navigation" className="relative">
      <button
        aria-controls="site-nav-items"
        aria-expanded={open}
        className="rounded-md border border-border/60 px-3 py-2 text-sm font-medium md:hidden"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>
      <ul
        className={`${open ? "flex" : "hidden"} absolute right-0 top-12 w-52 flex-col gap-1 rounded-xl border border-border/60 bg-card/95 p-3 shadow-glow md:static md:flex md:w-auto md:flex-row md:items-center md:justify-center md:border-none md:bg-transparent md:p-0 md:shadow-none`}
        id="site-nav-items"
      >
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <a
                className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-accent/15 text-foreground" : "text-muted hover:bg-accent/10 hover:text-foreground"
                }`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
