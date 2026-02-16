import type { SocialProfile } from "@/lib/content";

type FooterProps = {
  copyrightName: string;
  socials?: SocialProfile[];
};

export function Footer({ copyrightName, socials = [] }: FooterProps) {
  return (
    <footer className="border-t border-border/30 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} {copyrightName}. All rights reserved.</p>
        {socials.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {socials.map((profile) => (
              <li key={profile.href}>
                <a className="underline decoration-accent underline-offset-4" href={profile.href} rel="noreferrer" target="_blank">
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
