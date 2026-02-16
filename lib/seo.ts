import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/paths";
import { getSeoDefaults } from "@/lib/content";

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
};

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const defaults = getSeoDefaults();
  const title = options.title ?? defaults.defaultTitle;
  const description = options.description ?? defaults.defaultDescription;
  const canonical = options.canonicalPath ? absoluteUrl(options.canonicalPath) : undefined;
  const image = options.ogImage ?? defaults.defaultOgImage;
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: canonical
      ? {
          canonical
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: canonical ?? absoluteUrl("/"),
      images: [imageUrl],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      creator: defaults.twitterHandle,
      title,
      description,
      images: [imageUrl]
    }
  };
}
