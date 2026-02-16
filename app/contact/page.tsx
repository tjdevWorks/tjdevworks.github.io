import { MdxContent } from "@/components/content/MdxContent";
import { renderMdx } from "@/lib/mdx";
import { getPageDoc, getSiteConfig, getSocialConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const doc = getPageDoc("contact");

  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    canonicalPath: "/contact"
  });
}

export default async function ContactPage() {
  const doc = getPageDoc("contact");
  const content = await renderMdx(doc.content);
  const site = getSiteConfig();
  const socials = getSocialConfig();

  return (
    <section className="space-y-6">
      <article className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
        <h1 className="font-serif text-4xl font-semibold">{doc.frontmatter.title}</h1>
        {doc.frontmatter.description ? <p className="mt-3 text-muted">{doc.frontmatter.description}</p> : null}
        <div className="mt-6">
          <MdxContent>{content}</MdxContent>
        </div>
      </article>

      <section className="rounded-2xl border border-border/35 bg-card/70 p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold">Direct contact</h2>
        <p className="mt-3 text-muted">Email: <a className="underline decoration-accent underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
        <p className="mt-1 text-muted">Location: {site.location}</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {socials.map((profile) => (
            <li key={profile.href}>
              <a className="rounded-full border border-border/60 px-3 py-1.5 text-sm hover:border-accent" href={profile.href} rel="noreferrer" target="_blank">
                {profile.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
