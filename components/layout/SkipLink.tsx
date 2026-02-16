export function SkipLink() {
  return (
    <a
      className="sr-only z-50 rounded bg-card px-4 py-2 text-sm font-semibold text-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
