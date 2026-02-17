import type { ReactNode } from "react";
import { ResumeDownloadButton } from "@/components/resume/ResumeDownloadButton";
import {
  formatDate,
  getAllBlogPosts,
  getResumeMetadata,
  getSiteProfile,
  getSocialConfig
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type EducationEntry = {
  degree: string;
  graduation: string;
  institution: string;
  gpa: string;
  certificatePath: string;
};

type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectEntry = {
  title: string;
  description: string;
  date: string;
  subtext?: string;
  image?: string;
  links: ProjectLink[];
};

const EDUCATION: EducationEntry[] = [
  {
    degree: "MS in Computer Science",
    graduation: "May 2023",
    institution: "New York University (Courant Institute of Mathematical Sciences)",
    gpa: "3.8/4.0",
    certificatePath: "/assets/MS_Degree_Certificate_Tejas_Mahajan.pdf"
  },
  {
    degree: "BE in Computer Engineering",
    graduation: "May 2018",
    institution: "University of Pune (Maharashtra Institute of Technology)",
    gpa: "3.8/4.0",
    certificatePath: "/assets/BE_Degree_Certificate_Tejas_Mahajan.pdf"
  }
];

const INTERESTS = [
  "Computer Vision",
  "Reinforcement Learning",
  "MLOps",
  "Agentic Systems",
  "Backend Software Development",
  "Generative AI",
  "Distributed Systems",
  "Large Language Models",
];

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Software Engineer (Data Team)",
    company: "MerQube, Inc",
    location: "San Francisco, USA",
    period: "July 2023 - Present",
    highlights: [
      "Migrated equity reference and end-of-day pricing pipelines to a new provider platform with zero downtime.",
      "Built a scalable options data platform with ingestion, monitoring, and a unified access layer for multi-asset index development.",
      "Automated validation checks for end-of-day prices and corporate actions across providers, improving consistency and override control."
    ]
  },
  {
    role: "Perception Software Intern (Acoustic ML Team)",
    company: "Zipline International",
    location: "South San Francisco, USA",
    period: "June 2022 - Aug 2022",
    highlights: [
      "Analyzed large flight-data corpora to identify spatial and temporal causes of false positives between airborne and ground objects.",
      "Fine-tuned intruder detection models with hard negatives to reduce false positives while preserving sensitivity."
    ]
  },
  {
    role: "Data Scientist",
    company: "Karza Technologies Pvt. Ltd. (Acquired by Perfios Technologies Pvt. Ltd.)",
    location: "Mumbai, India",
    period: "Sept 2018 - Mar 2020",
    highlights: [
      "Delivered an end-to-end OCR pipeline for KYC documents using synthetic data generation, validation, and training modules.",
      "Built a lightweight CTC-based text recognition reformulation to improve latency-versus-quality trade-offs.",
      "Shipped deep learning inference on AWS Lambda and GPU instances with compute, memory, and latency optimization."
    ]
  },
  {
    role: "Machine Learning Intern",
    company: "Marsplay (Acquired by Foxy)",
    location: "New Delhi, India",
    period: "Aug 2018 - Mar 2019",
    highlights: [
      "Developed and fine-tuned fashion image object detection models spanning 20 classes across upper/lower body clothes and footwear.",
      "Extracted dominant colors from detected objects and mapped them to their closest color names.",
      "Deployed the models as REST APIs packaged as dockerized microservices."
    ]
  }
];

const PROJECTS: ProjectEntry[] = [
  {
    title: "Understanding Effective and Emotional Components in Advertisements",
    description:
      "Explored neural architectures for predicting advertisement effectiveness and affective dimensions (arousal & valence) from multimodal visual data.",
    date: "2018-05-01",
    subtext: "Accepted as a paper at the CVPR 2018 Ads Workshop.",
    links: [
      {
        label: "Paper",
        href: "/assets/Understanding_Emotional_and_Effective_Components_in_Adverstisements.pdf"
      }
    ]
  },
  {
    title: "Cartoonizer",
    description:
      "An ML-powered app that stylizes real-world images and videos into expressive cartoon visuals.",
    date: "2020-08-01",
    image: "/images/cartoonizer_app_banner.png",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/experience-ml/cartoonize"
      }
    ]
  },
  {
    title: "TEASEL: A Transformer-based Speech-Prefixed Language Model",
    description:
      "Implementation of the TEASEL paper, demonstrating speech-conditioned Transformer prefixing for efficient multimodal sentiment prediction.",
    date: "2021-12-01",
    subtext: "Implementation of a research paper.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/tjdevWorks/TEASEL"
      },
      {
        label: "Paper",
        href: "https://arxiv.org/pdf/2109.05522"
      }
    ]
  },
  {
    title: "Exploring the Potential of Federated Learning for Medical Image Analysis in Non-IID Settings",
    description:
      "Implemented a federated learning extension of ConVIRT to study privacy-preserving contrastive representation learning for medical image analysis under IID and Non-IID data distributions.",
    date: "2022-12-01",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/tjdevWorks/ConVIRT-Federated"
      },
      {
        label: "Paper",
        href: "/assets/ML_Healthcare.pdf"
      }
    ]
  },
  {
    title: "Helios AI (xAI Hackathon)",
    description:
      "Helios AI transforms solar farms from reactive assets into self-monitoring, self-diagnosing systems dramatically reducing inspection time and unlocking continuous, autonomous operations.",
    date: "2025-12-01",
    links: [
      {
        label: "Project Page",
        href: "https://devpost.com/software/helios-ai"
      },
      {
        label: "YouTube",
        href: "https://youtu.be/43ytCqKj-ds"
      }
    ]
  }
];

type AccomplishmentEntry = {
  title: string;
  details: string[];
  links: Array<{ label: string; href: string }>;
};

const ACCOMPLISHMENTS: AccomplishmentEntry[] = [
  {
    title: "Deep Learning Auto Tagging Competition (HackerEarth)",
    details: ["Competitive challenge on automatic image tagging."],
    links: [
      {
        label: "Leaderboard",
        href: "https://www.hackerearth.com/challenges/competitive/hackerearth-deep-learning-challenge-auto-tag-images-gala/leaderboard/auto-tag-images-of-the-gala-9e47fb31/"
      }
    ]
  },
  {
    title: "Udacity Artificial Intelligence Nanodegree",
    details: ["Credential and full course information."],
    links: [
      {
        label: "Certificate",
        href: "https://www.udacity.com/certificate/LCKYMCCT"
      },
      {
        label: "Course",
        href: "https://www.udacity.com/course/ai-artificial-intelligence-nanodegree--nd898"
      }
    ]
  },
  {
    title: "Udacity Deep Learning Nanodegree",
    details: ["Credential and full course information."],
    links: [
      {
        label: "Certificate",
        href: "https://www.udacity.com/certificate/TVKDSKNG"
      },
      {
        label: "Course",
        href: "https://www.udacity.com/course/deep-learning-nanodegree--nd101"
      }
    ]
  }
];

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
        {icon}
      </span>
      <h2 className="font-serif text-3xl font-semibold md:text-4xl">{title}</h2>
    </div>
  );
}

function iconForSocial(label: string) {
  const key = label.toLowerCase();

  if (key.includes("github")) {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 8 0Z" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("linkedin")) {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
        <path d="M0 1.15C0 .52.52 0 1.15 0h13.7C15.48 0 16 .52 16 1.15v13.7c0 .63-.52 1.15-1.15 1.15H1.15A1.15 1.15 0 0 1 0 14.85V1.15ZM4.9 13.37V6.16H2.5v7.2H4.9ZM3.7 5.18c.84 0 1.36-.55 1.36-1.24-.02-.71-.52-1.24-1.34-1.24-.82 0-1.36.53-1.36 1.24 0 .69.52 1.24 1.32 1.24h.02Zm2.53 8.19h2.4V9.35c0-.22.02-.44.08-.6.18-.44.58-.9 1.27-.9.9 0 1.26.68 1.26 1.68v3.84h2.4V9.25c0-2.2-1.17-3.22-2.73-3.22-1.26 0-1.82.69-2.13 1.17h.02V6.16h-2.4c.03.69 0 7.2 0 7.2Z" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("twitter") || key === "x") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.2-8.3L1 2h6.2l4.3 5.7L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("medium")) {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M4.37 7.17a.46.46 0 0 0-.15-.43L3.1 5.4V5.2h3.5l2.7 5.92 2.38-5.92H15v.2l-.96.92a.29.29 0 0 0-.1.28v6.8a.29.29 0 0 0 .1.28l.94.92v.2h-4.74v-.2l.97-.94c.09-.09.09-.11.09-.28V8.9l-2.7 6.87h-.36L5.1 8.9v4.6c-.03.22.04.44.2.59l1.26 1.54v.2H3v-.2l1.26-1.54c.15-.15.22-.37.19-.59V8.2a.56.56 0 0 0-.08-.5Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M3.9 12a5.1 5.1 0 0 1 5.1-5.1h3V5H9a7 7 0 0 0 0 14h3v-1.9H9A5.1 5.1 0 0 1 3.9 12Zm6.1 1h4v-2h-4v2Zm5-8h-3v1.9h3a5.1 5.1 0 0 1 0 10.2h-3V19h3a7 7 0 0 0 0-14Z" fill="currentColor" />
    </svg>
  );
}

function iconSummary() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M5 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14V4H5Zm2 4h8v2H7V8Zm0 4h10v2H7v-2Z" fill="currentColor" />
    </svg>
  );
}

function iconEducation() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-5 9.73V16c0 2.21 2.24 4 5 4s5-1.79 5-4v-3.27l-5 2.73-5-2.73Z" fill="currentColor" />
    </svg>
  );
}

function iconInterests() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="m12 2 2.2 4.6L19 9l-4.8 2.4L12 16l-2.2-4.6L5 9l4.8-2.4L12 2Zm7 12 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2ZM5 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" fill="currentColor" />
    </svg>
  );
}

function iconBriefcase() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M9 4a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a2 2 0 0 0-2-2h-3V6a2 2 0 0 0-2-2H9Zm0 3V6h6v1H9Zm-5 4h16v6a1 1 0 0 1-1 1h-5v-2h-4v2H5a1 1 0 0 1-1-1v-6Z" fill="currentColor" />
    </svg>
  );
}

function iconProjects() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M10 4 8 6H4a2 2 0 0 0-2 2v8a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a2 2 0 0 0-2-2h-10Zm-4 4h14v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8h2Z" fill="currentColor" />
    </svg>
  );
}

function iconBlog() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M4 4h12v2H4V4Zm0 4h16v2H4V8Zm0 4h16v2H4v-2Zm0 4h10v2H4v-2Z" fill="currentColor" />
    </svg>
  );
}

function iconContact() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 2h16v.34L12 12 4 7.34V7Zm0 3.66 7.44 4.34a1 1 0 0 0 1.12 0L20 10.66V17H4v-6.34Z" fill="currentColor" />
    </svg>
  );
}

function iconTrophy() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M7 3a1 1 0 0 0-1 1v2H4a1 1 0 0 0-1 1 5 5 0 0 0 5 5h.08A4.99 4.99 0 0 0 11 14.9V17H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-2.1A4.99 4.99 0 0 0 15.92 12H16a5 5 0 0 0 5-5 1 1 0 0 0-1-1h-2V4a1 1 0 0 0-1-1H7Zm1 5V5h8v3a3 3 0 1 1-6 0 1 1 0 1 0-2 0 3 3 0 1 1-6 0h2a5 5 0 0 0 4 4.9Zm10-2h1.9A3 3 0 0 1 17 10.9 4.97 4.97 0 0 0 18 8V6ZM6 6v2c0 1.06.33 2.04.9 2.85A3 3 0 0 1 4.1 6H6Z" fill="currentColor" />
    </svg>
  );
}

type ExternalSource = "medium" | "substack" | "linkedin" | "x" | "external";

function getSourceFromUrl(url?: string): ExternalSource {
  if (!url) {
    return "external";
  }

  const lower = url.toLowerCase();

  if (lower.includes("medium.com")) return "medium";
  if (lower.includes("substack.com")) return "substack";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "x";

  return "external";
}

function sourceLabel(source: ExternalSource): string {
  if (source === "medium") return "Medium";
  if (source === "substack") return "Substack";
  if (source === "linkedin") return "LinkedIn";
  if (source === "x") return "X";
  return "External";
}

function sourceIcon(source: ExternalSource) {
  if (source === "medium") return iconForSocial("medium");
  if (source === "linkedin") return iconForSocial("linkedin");
  if (source === "x") return iconForSocial("x");
  if (source === "substack") {
    return (
      <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24">
        <path d="M4 4h16v3H4V4Zm0 6h16v3H4v-3Zm0 6h16v4H4v-4Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24">
      <path d="M8 5a3 3 0 0 0 0 6h2v-2H8a1 1 0 1 1 0-2h2V5H8Zm6 0h-2v2h2a1 1 0 1 1 0 2h-2v2h2a3 3 0 1 0 0-6Zm-5 5h6v2H9v-2Z" fill="currentColor" />
    </svg>
  );
}

export const metadata = buildMetadata({ canonicalPath: "/" });

function parseGithubRepo(url: string): string | null {
  const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (!match) {
    return null;
  }

  return `${match[1]}/${match[2].replace(/\.git$/i, "")}`;
}

async function fetchGithubStars(repo: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json"
      },
      next: { revalidate: 21600 }
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

function formatStars(value: number): string {
  if (value >= 1000) {
    const compact = value / 1000;
    return `${compact >= 10 ? compact.toFixed(0) : compact.toFixed(1)}k`;
  }

  return `${value}`;
}

export default async function HomePage() {
  const profile = getSiteProfile();
  const socials = getSocialConfig();
  const posts = getAllBlogPosts().slice(0, 4).map((entry) => entry.frontmatter);
  const resume = getResumeMetadata();
  const projects = [...PROJECTS].sort(
    (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime()
  );

  const githubRepos = Array.from(
    new Set(
      projects
        .flatMap((project) => project.links)
        .map((link) => parseGithubRepo(link.href))
        .filter((repo): repo is string => repo !== null)
    )
  );

  const githubStarsEntries = await Promise.all(
    githubRepos.map(async (repo) => [repo, await fetchGithubStars(repo)] as const)
  );
  const githubStars = new Map<string, number | null>(githubStarsEntries);

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="text-center lg:text-left">
          <img
            alt={`${profile.config.siteName} profile image`}
            className="mx-auto h-44 w-44 rounded-full border-4 border-white/80 object-cover shadow-glow lg:mx-0"
            height={176}
            src={profile.config.avatarImage}
            width={176}
          />
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-[2.55rem]">{profile.config.siteName}</h1>
          {profile.config.pronouns ? <p className="mt-1 text-sm text-muted">({profile.config.pronouns})</p> : null}
          {profile.config.headline ? (
            <p className="mx-auto mt-4 max-w-[18rem] text-xl font-semibold leading-snug text-accent md:text-2xl lg:mx-0">
              {profile.config.headline}
            </p>
          ) : null}
          {profile.config.company ? <p className="mt-2 text-base text-muted">{profile.config.company}</p> : null}

          <div className="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {socials.map((profileItem) => (
              <a
                key={profileItem.href}
                aria-label={profileItem.label}
                className="m-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
                href={profileItem.href}
                rel="noreferrer"
                target="_blank"
              >
                {iconForSocial(profileItem.label)}
              </a>
            ))}
            <a
              aria-label="Open CV"
              className="m-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 text-[11px] font-bold tracking-wide text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
              href={resume.pdfPath}
              rel="noreferrer"
              target="_blank"
            >
              CV
            </a>
          </div>
        </div>
      </aside>

      <section className="space-y-14">
        <section id="summary">
          <SectionTitle icon={iconSummary()} title="About" />
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-foreground md:text-lg">{profile.summary}</p>
          <div className="mt-6">
            <ResumeDownloadButton label="Download CV" pdfPath={resume.pdfPath} />
          </div>
        </section>

        <section id="education">
          <SectionTitle icon={iconEducation()} title="Education" />

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {EDUCATION.map((entry) => (
              <article key={`${entry.degree}-${entry.institution}`} className="rounded-2xl border border-border/35 bg-card/60 p-5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold leading-tight">{entry.degree}</h3>
                <p className="mt-2 text-sm text-muted">Graduation: {entry.graduation}</p>
                <p className="mt-1 text-sm text-muted">GPA: {entry.gpa}</p>
                <p className="mt-2 text-base text-foreground">{entry.institution}</p>
                <a
                  className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
                  href={entry.certificatePath}
                  rel="noreferrer"
                  target="_blank"
                >
                  View degree certificate
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="interests">
          <SectionTitle icon={iconInterests()} title="Interests" />
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {INTERESTS.map((interest) => (
              <li key={interest} className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-foreground">
                {interest}
              </li>
            ))}
          </ul>
        </section>

        <section id="experience">
          <SectionTitle icon={iconBriefcase()} title="Experience" />

          <div className="relative mt-7 space-y-6 pl-9 before:absolute before:left-3 before:top-0 before:h-full before:w-[2px] before:bg-accent/60">
            {EXPERIENCE.map((entry) => (
              <article key={`${entry.role}-${entry.company}`} className="relative rounded-2xl border border-border/35 bg-card/50 p-6 backdrop-blur-sm">
                <span className="absolute -left-[38px] top-7 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-background text-xs text-accent">
                  {iconBriefcase()}
                </span>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight">{entry.role}</h3>
                    <p className="mt-1 text-lg text-accent">{entry.company}</p>
                    <p className="mt-1 text-sm text-muted">{entry.location}</p>
                  </div>
                  <p className="text-sm text-muted">{entry.period}</p>
                </div>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
                  {entry.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionTitle icon={iconProjects()} title="Projects" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="overflow-hidden rounded-2xl border border-border/35 bg-card/65">
                {project.image ? (
                  <img
                    alt={`${project.title} banner`}
                    className="h-40 w-full object-cover"
                    height={160}
                    loading="lazy"
                    src={project.image}
                    width={640}
                  />
                ) : null}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">{formatDate(project.date)}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted">{project.description}</p>
                  {project.subtext ? <p className="mt-2 text-xs font-medium text-accent">{project.subtext}</p> : null}

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {project.links.map((link) => {
                      const repo = parseGithubRepo(link.href);
                      const stars = repo ? githubStars.get(repo) : null;
                      const label =
                        link.label === "GitHub" && typeof stars === "number"
                          ? `${link.label} (${formatStars(stars)} stars)`
                          : link.label;

                      return (
                      <a
                        key={`${project.title}-${link.label}`}
                        className="inline-flex items-center rounded-full border border-accent/45 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {label}
                      </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="accomplishments">
          <SectionTitle icon={iconTrophy()} title="Accomplishments" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {ACCOMPLISHMENTS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border/35 bg-card/60 p-5 backdrop-blur-sm md:col-span-1">
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                {item.details.map((detail) => (
                  <p key={detail} className="mt-2 text-sm text-muted">
                    {detail}
                  </p>
                ))}
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {item.links.map((link) => (
                    <a
                      key={`${item.title}-${link.label}`}
                      className="inline-flex items-center rounded-full border border-accent/45 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20"
                      href={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="blog">
          <SectionTitle icon={iconBlog()} title="Blog" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-2xl border border-border/35 bg-card/65">
                {post.ogImage ? (
                  <a href={`/blog/${post.slug}`}>
                    <img
                      alt={`${post.title} banner`}
                      className="h-40 w-full object-cover"
                      height={160}
                      loading="lazy"
                      src={post.ogImage}
                      width={640}
                    />
                  </a>
                ) : null}
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted">{formatDate(post.date)} · {post.readingTime ?? "1 min read"}</p>
                    {post.canonicalUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/70 px-2.5 py-1 text-[11px] text-foreground">
                        {sourceIcon(getSourceFromUrl(post.canonicalUrl))}
                        {sourceLabel(getSourceFromUrl(post.canonicalUrl))}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold leading-snug">
                    <a className="hover:text-accent" href={`/blog/${post.slug}`}>
                      {post.title}
                    </a>
                  </h3>
                  {post.description ? <p className="mt-2 text-sm text-muted">{post.description}</p> : null}

                  <div className="mt-4 flex items-center justify-between">
                    <a className="text-sm font-medium text-accent hover:underline" href={`/blog/${post.slug}`}>
                      View details
                    </a>
                    {post.canonicalUrl ? (
                      <a className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent" href={post.canonicalUrl} rel="noreferrer" target="_blank">
                        Open source {sourceIcon(getSourceFromUrl(post.canonicalUrl))}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <SectionTitle icon={iconContact()} title="Contact" />
          <p className="mt-3 text-base text-foreground md:text-lg">
            Email: <a className="underline decoration-accent underline-offset-4" href={`mailto:${profile.config.email}`}>{profile.config.email}</a>
          </p>
          <p className="mt-1 text-sm text-muted">Location: {profile.config.location}</p>
        </section>
      </section>
    </div>
  );
}
