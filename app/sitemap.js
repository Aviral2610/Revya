import { PUBLIC_PAGES, absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date();

  return PUBLIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority
  }));
}
