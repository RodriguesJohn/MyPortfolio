import { marked } from "marked";

export const COURSE_URL = "/design-engineering-course/";

// Every article leads with the Design Engineering Course, whatever the post says.
export const COURSE_CTA = {
  note: "The Design Engineering Course is open: go from designing screens to shipping real products with Claude Code, Cursor, and AI-ready design systems. Self-paced, with a community of designers.",
  noteLabel: "See the course",
  line: "Ready to design it, build it, and ship it with AI?",
  label: "Join the Design Engineering Course",
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  tags: string[];
  image: string | null;
  html: string;
};

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

// Posts only use flat `key: value` frontmatter (strings, booleans, JSON arrays).
const parseValue = (raw: string): unknown => {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith('"') || value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

const parseFrontmatter = (source: string) => {
  const normalized = source.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return { data: {} as Record<string, unknown>, content: normalized };
  const closing = normalized.indexOf("\n---\n", 4);
  const data: Record<string, unknown> = {};
  for (const line of normalized.slice(4, closing).split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    data[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }
  return { data, content: normalized.slice(closing + 5) };
};

const files = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const POSTS: BlogPost[] = Object.entries(files)
  .map(([path, source]) => {
    const { data, content } = parseFrontmatter(source);
    const date = String(data.date);
    return {
      slug: path.replace(/^.*\/|\.md$/g, ""),
      title: String(data.title),
      description: String(data.description ?? ""),
      date,
      dateLabel: DATE_FMT.format(new Date(`${date}T00:00:00Z`)),
      tags: (data.tags as string[]) ?? [],
      image: (data.image as string) ?? null,
      draft: Boolean(data.draft),
      html: marked.parse(content, { async: false }) as string,
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const findPost = (slug: string | undefined) => POSTS.find((post) => post.slug === slug);
