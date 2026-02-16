export default function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-border/35 bg-card/70 p-6 text-center md:p-8">
      <h1 className="font-serif text-4xl font-semibold">404</h1>
      <p className="mt-3 text-muted">This page could not be found.</p>
      <a className="mt-4 inline-block underline decoration-accent underline-offset-4" href="/">
        Return home
      </a>
    </section>
  );
}
