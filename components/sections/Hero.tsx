import type { SocialProfile } from "@/lib/content";

type HeroProps = {
  name: string;
  tagline: string;
  affiliation?: string;
  avatarSrc?: string;
  socials: SocialProfile[];
};

export function Hero({ name, tagline, affiliation, avatarSrc, socials }: HeroProps) {
  return (
    <section className="grid gap-8 rounded-2xl border border-border/40 bg-card/80 p-6 shadow-glow md:grid-cols-[1fr_180px] md:p-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">whoami</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">{name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{tagline}</p>
        {affiliation ? <p className="mt-2 text-sm text-muted">{affiliation}</p> : null}

        <ul className="mt-6 flex flex-wrap gap-3">
          {socials.map((profile) => (
            <li key={profile.href}>
              <a
                className="inline-flex items-center rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                href={profile.href}
                rel="noreferrer"
                target="_blank"
              >
                {profile.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {avatarSrc ? (
        <div className="justify-self-start md:justify-self-end">
          <img
            alt={`${name} profile image`}
            className="h-40 w-40 rounded-2xl border border-border/40 object-cover"
            height={160}
            src={avatarSrc}
            width={160}
          />
        </div>
      ) : null}
    </section>
  );
}
