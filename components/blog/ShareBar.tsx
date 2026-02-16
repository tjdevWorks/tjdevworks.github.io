"use client";

import { useState } from "react";

type ShareBarProps = {
  title: string;
  url: string;
};

function encoded(value: string): string {
  return encodeURIComponent(value);
}

function iconX() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.3L1 2h6.2l4.3 5.7L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" fill="currentColor" />
    </svg>
  );
}

function iconLinkedIn() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
      <path d="M0 1.15C0 .52.52 0 1.15 0h13.7C15.48 0 16 .52 16 1.15v13.7c0 .63-.52 1.15-1.15 1.15H1.15A1.15 1.15 0 0 1 0 14.85V1.15ZM4.9 13.37V6.16H2.5v7.2H4.9ZM3.7 5.18c.84 0 1.36-.55 1.36-1.24-.02-.71-.52-1.24-1.34-1.24-.82 0-1.36.53-1.36 1.24 0 .69.52 1.24 1.32 1.24h.02Zm2.53 8.19h2.4V9.35c0-.22.02-.44.08-.6.18-.44.58-.9 1.27-.9.9 0 1.26.68 1.26 1.68v3.84h2.4V9.25c0-2.2-1.17-3.22-2.73-3.22-1.26 0-1.82.69-2.13 1.17h.02V6.16h-2.4c.03.69 0 7.2 0 7.2Z" fill="currentColor" />
    </svg>
  );
}

function iconLink() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M8 5a3 3 0 0 0 0 6h2V9H8a1 1 0 1 1 0-2h2V5H8Zm6 0h-2v2h2a1 1 0 1 1 0 2h-2v2h2a3 3 0 1 0 0-6Zm-5 5h6v2H9v-2Z" fill="currentColor" />
    </svg>
  );
}

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const twitter = `https://twitter.com/intent/tweet?text=${encoded(title)}&url=${encoded(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded(url)}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside aria-label="Share" className="mt-10 rounded-2xl border border-border/40 bg-card/75 p-4 md:p-5">
      <p className="text-sm font-semibold">Share this article</p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
          href={twitter}
          rel="noreferrer"
          target="_blank"
        >
          {iconX()} X
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
          href={linkedin}
          rel="noreferrer"
          target="_blank"
        >
          {iconLinkedIn()} LinkedIn
        </a>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
          onClick={onCopy}
          type="button"
        >
          {iconLink()} {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </aside>
  );
}
