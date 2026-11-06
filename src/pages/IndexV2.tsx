import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageShell, { display, ThemeToggleIcons } from "@/components/v2/PageShell";
import { useSmoothScroll } from "@/components/v2/useSmoothScroll";
import ProfileTiltCard from "@/components/v2/ProfileTiltCard";
import { loadCalEmbed } from "@/lib/calEmbed";
import {
  v2NelsonChild,
  v2NelsonPage,
  v2NelsonShell,
  v2NelsonStagger,
} from "@/components/v2/motion";
import {
  PROFILE_GITHUB_URL,
  PROFILE_LINKEDIN_URL,
  PROFILE_SUBSTACK_URL,
  PROFILE_X_URL,
} from "@/config/profileLinks";
import {
  AI_TOOLS_BUILT,
  HIGHLIGHTS,
  type Project,
} from "@/data/projects";
import { BUILT_TOOLS } from "@/data/builtTools";
import {
  RESOURCES_TRUSTED_BY,
  WORKED_AT,
  type CompanyLogo,
} from "@/data/companyLogos";
import {
  DESIGN_SYSTEM_COURSE,
  FLORENCE_HERO,
  FLORENCE_URL,
} from "@/data/designSystems";
import { TESTIMONIALS } from "@/data/testimonials";
import logoClaude from "@/assets/logo-claude.png";
import logoCursor from "@/assets/logo-cursor.png";
import logoClaudeCode from "@/assets/logo-claude-code.png";
import logoFigma from "@/assets/logo-figma.png";
import logoReact from "@/assets/logo-react.png";
import logoGithub from "@/assets/logo-github.png";
import logoSwift from "@/assets/logo-swift.png";
import florenceLaunchVideo from "@/assets/florence-launch.mp4";
import logoX from "@/assets/logo-x.jpg";


/** Uniform logo tiles drifting sideways in a seamless loop (paused on hover). */
const LogoRow = ({
  title,
  logos,
  duration = 24,
}: {
  title: string;
  logos: CompanyLogo[];
  duration?: number;
}) => (
  <div>
    <p className="text-[13px] leading-[1.5] text-zinc-400 opacity-70">{title}</p>
    <div className="v2-logo-row mt-2.5 overflow-hidden">
      <ul
        className="v2-logo-marquee flex w-max"
        // Six copies: each half of the strip holds three sets, so it always
        // fills the row and the -50% loop stays seamless at any width.
        style={{ animationDuration: `${duration * 3}s` }}
      >
        {[0, 1, 2, 3, 4, 5].map((copy) =>
          logos.map((logo) => (
            <li
              key={`${copy}-${logo.label}`}
              title={logo.label}
              aria-hidden={copy > 0 ? true : undefined}
              className="mr-7 flex h-6 shrink-0 items-center"
            >
              <img
                src={logo.src}
                alt={copy > 0 ? "" : logo.label}
                style={{ height: logo.height }}
                className={`w-auto max-w-none ${logo.darkInk ? "v2-logo-dark-ink" : ""}`}
              />
            </li>
          )),
        )}
      </ul>
    </div>
  </div>
);

const TrustedBy = ({ className = "" }: { className?: string }) => (
  <div className={`space-y-5 ${className}`}>
    <LogoRow title="Worked At" logos={WORKED_AT} />
    <LogoRow title="Resources Trusted By" logos={RESOURCES_TRUSTED_BY} duration={28} />
  </div>
);



const SUBSTACK_FEED = "https://johnrodrigues.substack.com/feed";

type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  excerpt: string;
};

type FeedTab =
  | "work"
  | "experiments"
  | "systems"
  | "tools"
  | "blog"
  | "testimonials"
  | "resume"
  | "mentorship";

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

const FEED_TABS: { id: FeedTab; label: string; shortLabel?: string }[] = [
  { id: "work", label: "Work" },
  { id: "resume", label: "Resume" },
  { id: "testimonials", label: "Testimonials", shortLabel: "Praise" },
  { id: "blog", label: "Blog" },
  { id: "tools", label: "Tools" },
  { id: "mentorship", label: "Mentorship" },
  { id: "experiments", label: "AI Experiments", shortLabel: "Experiments" },
  { id: "systems", label: "AI Design Systems", shortLabel: "Systems" },
];

const COURSE_URL = "https://www.humanaistudio.io/academy";
/** Course launch banner at the top of the page. Off while job hunting. */
const SHOW_COURSE_PROMO = false;
/** Course link in the top nav. */
const SHOW_COURSE_NAV = true;

/** Tabs tucked into the nav's "More" dropdown. */
const MORE_TAB_IDS = new Set<FeedTab>(["mentorship", "experiments", "systems"]);
const RESUME_PDF_URL = "/JohnRodriguesResume.pdf";

const FEED_TAB_CLASS =
  "v2-feed-tab flex shrink-0 items-center text-[13px] font-normal leading-[1.5] transition-[color,opacity]";

const PROJECT_FEED_TABS = new Set<FeedTab>(["work", "experiments"]);

const FEED_BY_TAB: Record<"work" | "experiments", Project[]> = {
  work: HIGHLIGHTS,
  experiments: AI_TOOLS_BUILT,
};

const parseSubstackItem = (item: {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  enclosure?: { link?: string };
}): SubstackPost | null => {
  if (!item.title || !item.link) return null;

  const text = (item.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const excerpt =
    text.length > 160 ? `${text.slice(0, 160).trim()}…` : text;
  const thumbnail =
    item.thumbnail ||
    item.enclosure?.link ||
    (item.content || item.description || "").match(
      /<img[^>]+src="([^"]+)"/i,
    )?.[1] ||
    undefined;

  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate || "",
    thumbnail,
    excerpt: excerpt.replace(/&amp;/g, "&"),
  };
};

const formatPostDate = (pubDate: string) => {
  if (!pubDate) return "";
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const useSubstackPosts = () => {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = () => {
      fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          SUBSTACK_FEED,
        )}&count=20`,
      )
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          const parsed = (data?.items ?? [])
            .map(parseSubstackItem)
            .filter((post: SubstackPost | null): post is SubstackPost =>
              Boolean(post),
            );
          setPosts(parsed);
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    fetchPosts();
    const id = window.setInterval(fetchPosts, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return { posts, loading };
};

const FeedMotionItem = ({
  children,
}: {
  children: React.ReactNode;
  index: number;
}) => (
  <motion.div
    layout
    variants={v2NelsonChild}
  >
    {children}
  </motion.div>
);

const secondaryCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-100 active:scale-[0.99]";

const featuredMediaFrame =
  "v2-featured-media-frame relative w-full overflow-hidden rounded-[12px] bg-zinc-900 ring-1 ring-white/[0.08]";

const getFeedLabel = (project: Project, tab: FeedTab, index: number) => {
  if (index === 0 && tab === "work") return "Featured · Shipped";
  if (project.tag) return project.tag;
  if (tab === "experiments") return "AI Experiments";
  if (tab === "systems") return "AI Design Systems";
  return "Work";
};

const ExternalLinkIcon = () => (
  <svg
    className="size-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M17 7H8M17 7V16" />
  </svg>
);

const TOOL_STACK = [
  { src: logoClaude, label: "Claude Code", pad: true },
  { src: logoClaudeCode, label: "Codex", pad: true },
  { src: logoCursor, label: "Cursor" },
  { src: logoFigma, label: "Figma" },
  { src: logoReact, label: "React", pad: true },
  { src: logoGithub, label: "GitHub" },
  { src: logoSwift, label: "Swift" },
];

const ToolsTabContent = () => (
  <div className="max-w-[920px] px-0 sm:px-1">
    <section className="mb-10">
      <h2
        className="v2-built-tool-title text-[15px] font-medium leading-[1.5]"
        style={display}
      >
        Tool Stack
      </h2>
      <p className="text-[15px] leading-[1.5] text-zinc-400">
        What I design, prototype, and ship with every day.
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-5">
        {TOOL_STACK.map((tool) => (
          <li key={tool.label} className="flex min-w-12 flex-col items-center gap-2">
            <span className="inline-flex size-12 items-center justify-center overflow-hidden rounded-[12px] bg-white ring-1 ring-inset ring-black/[0.06]">
              <img
                src={tool.src}
                alt=""
                className={`size-full ${tool.pad ? "object-contain p-2" : "object-cover"}`}
              />
            </span>
            <span className="whitespace-nowrap text-[13px] leading-none text-zinc-400">
              {tool.label}
            </span>
          </li>
        ))}
      </ul>
    </section>

    <h2
      className="v2-built-tool-title mb-5 text-[15px] font-medium leading-[1.5]"
      style={display}
    >
      Tools I've Built
    </h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {BUILT_TOOLS.map((tool) => (
        <article
          key={tool.id}
          className="v2-built-tool-card flex min-h-0 flex-col rounded-[12px] p-5 sm:min-h-[280px] sm:p-6 md:min-h-[320px]"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="v2-built-tool-index inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-medium">
              {tool.index}
            </span>
            <p className="max-w-[58%] text-right text-[13px] font-medium text-zinc-500">
              {tool.tag}
            </p>
          </div>

          <div
            className="mt-5 inline-flex size-12 items-center justify-center overflow-hidden rounded-[14px]"
            style={{ backgroundColor: tool.icon.bg }}
          >
            <img
              src={tool.icon.src}
              alt=""
              className={`size-full ${
                tool.icon.fit === "contain" ? "object-contain" : "object-cover"
              } ${tool.icon.pad ? "p-2" : ""} ${
                tool.icon.mono ? "brightness-0" : ""
              }`}
              loading="lazy"
            />
          </div>

          <h3
            className="v2-built-tool-title mt-5 text-[22px] font-medium leading-tight"
            style={display}
          >
            {tool.name}
          </h3>
          <p className="v2-built-tool-description mt-3 flex-1 text-[15px] leading-[1.55]">
            {tool.description}
          </p>

          <div className="v2-built-tool-divider mt-6 border-t pt-5">
            <a
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              className="v2-built-tool-cta v2-explore-cta inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition active:translate-y-[1px] active:scale-[0.99]"
            >
              {tool.ctaLabel}
              <ExternalLinkIcon />
            </a>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const MENTORSHIP_SESSIONS = [
  {
    id: "intro",
    index: "01",
    tag: "15 Min",
    price: "Free",
    title: "Quick chat",
    description:
      "A short call to talk through your portfolio, career questions, or a project you're working on.",
    topics: ["Portfolio feedback", "Career questions", "Project direction"],
    calLink: "john-rodrigues-vj4aia/mentorship",
    ctaLabel: "Book a free chat",
  },
  {
    id: "mentorship",
    index: "02",
    tag: "30 Min",
    price: "$99",
    title: "Mentorship session",
    description:
      "A focused session on design, AI, and shipping products end to end, shaped around where you want to grow.",
    topics: ["Design engineering", "AI-native workflows", "Shipping end to end"],
    calLink: "john-rodrigues-vj4aia/30min",
    ctaLabel: "Book for $99",
  },
];

const MentorshipTabContent = () => {
  useEffect(loadCalEmbed, []);

  return (
  <div className="max-w-[920px] px-0 pb-8 sm:px-1">
    <h2
      className="v2-built-tool-title text-[15px] font-medium leading-[1.2]"
      style={display}
    >
      Book time with me
    </h2>
    <p className="v2-built-tool-description mt-3 text-[15px] leading-[1.6]">
      Talk design, AI, and building products. Pick the session that fits where
      you are right now.
    </p>

    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {MENTORSHIP_SESSIONS.map((session) => (
        <article
          key={session.id}
          className="v2-built-tool-card flex min-h-0 flex-col rounded-[12px] p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="v2-built-tool-index inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-medium">
              {session.index}
            </span>
            <p className="text-right text-[13px] font-medium text-zinc-500">
              {session.tag}
            </p>
          </div>

          <div className="mt-6 flex items-baseline justify-between gap-4">
            <h3
              className="v2-built-tool-title text-[22px] font-medium leading-tight"
              style={display}
            >
              {session.title}
            </h3>
            <span
              className="v2-built-tool-title shrink-0 text-[22px] font-medium leading-tight"
              style={display}
            >
              {session.price}
            </span>
          </div>
          <p className="v2-built-tool-description mt-3 text-[15px] leading-[1.55]">
            {session.description}
          </p>

          <ul className="mt-5 flex flex-1 flex-col gap-2">
            {session.topics.map((topic) => (
              <li
                key={topic}
                className="v2-built-tool-description flex items-center gap-2.5 text-[13px]"
              >
                <span className="size-1 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                {topic}
              </li>
            ))}
          </ul>

          <div className="v2-built-tool-divider mt-6 border-t pt-5">
            <button
              type="button"
              data-cal-link={session.calLink}
              data-cal-config='{"layout":"month_view","overlayCalendar":"true"}'
              className="v2-built-tool-cta v2-explore-cta inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition active:translate-y-[1px] active:scale-[0.99]"
            >
              {session.ctaLabel}
            </button>
          </div>
        </article>
      ))}
    </div>
  </div>
  );
};

const DesignSystemsTabContent = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const lesson = DESIGN_SYSTEM_COURSE[activeLesson] ?? DESIGN_SYSTEM_COURSE[0];
  const embedSrc = lesson.youtubeId
    ? `https://www.youtube.com/embed/${lesson.youtubeId}${
        lesson.youtubeStart ? `?start=${lesson.youtubeStart}` : ""
      }`
    : undefined;

  return (
  <div className="mx-auto max-w-[860px] px-0 pb-8 sm:px-1">
    <h2
      className="v2-built-tool-title text-[15px] font-medium leading-[1.2]"
      style={display}
    >
      <span className="block">Design Systems as Infrastructure for Agents,</span>
      <span className="block">Not Just a Component Library</span>
    </h2>

    <p className="v2-built-tool-description mt-8 max-w-[52ch] text-[15px] leading-[1.65]">
      Florence is an AI-ready design system built so agents can read components,
      intent, and rules in one place. Not another static library for humans
      clicking through Figma. Here is a quick look at how it works in practice.
    </p>
    <a
      href={FLORENCE_URL}
      target="_blank"
      rel="noreferrer"
      className="v2-explore-cta mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
    >
      Open Florence
      <ExternalLinkIcon />
    </a>

    <figure className="mt-6">
      <div className="overflow-hidden rounded-[12px] bg-zinc-950 ring-1 ring-white/[0.08]">
        <video
          src={florenceLaunchVideo}
          controls
          controlsList="nodownload"
          playsInline
          preload="metadata"
          className="block h-auto w-full"
          aria-label={FLORENCE_HERO.alt}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <figcaption className="px-1 pt-4">
        <h3
          className="v2-built-tool-title text-[15px] font-medium"
          style={display}
        >
          Florence
        </h3>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          AI-ready design system
        </p>
      </figcaption>
    </figure>

    <div className="v2-built-tool-description mt-10 space-y-5 text-[15px] leading-[1.7]">
      <p>
        Current design systems are broken for AI. They were built for humans
        clicking through Figma and Storybook. Agents do not work that way.
      </p>
      <p>
        The component architecture is opaque. Naming is inconsistent. Tokens
        live in one place, guidelines in another, usage examples somewhere
        else. The core design is scattered across files no model can hold in
        one pass.
      </p>
      <p>
        So when I ask an agent to build from the system, it guesses. It invents
        variants. It misses constraints. Not because the model is weak,
        because the system was never structured for it to read.
      </p>
      <p>
        I built Florence to fix that. An AI-ready design system where
        components, intent, and rules sit in one place agents can actually use.
      </p>
    </div>

    <section className="mt-14 sm:mt-16">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b v2-divider border-zinc-800/50 pb-4">
        <div>
          <p className="text-[13px] font-medium text-zinc-500">
            Short Course · 3 Parts
          </p>
          <h3
            className="v2-built-tool-title mt-1.5 text-[22px] font-medium"
            style={display}
          >
            Making Design Systems AI-Ready
          </h3>
        </div>
        <a
          href={FLORENCE_URL}
          target="_blank"
          rel="noreferrer"
          className="v2-explore-cta inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
        >
          Explore Florence
          <ExternalLinkIcon />
        </a>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-6">
        <div className="overflow-hidden rounded-[12px] bg-zinc-950 ring-1 ring-white/[0.08]">
          <div className="relative aspect-video">
            {embedSrc ? (
              <iframe
                key={lesson.id}
                src={embedSrc}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : null}
          </div>
          <div className="px-4 py-3.5 sm:px-5">
            <p className="text-[13px] font-medium tabular-nums text-zinc-500">
              Part {lesson.part}
            </p>
            <h4
              className="v2-built-tool-title mt-1 text-[15px] font-medium"
              style={display}
            >
              {lesson.title}
            </h4>
            <p className="v2-built-tool-description mt-1 text-[13px] leading-relaxed text-zinc-500">
              {lesson.description}
            </p>
          </div>
        </div>

        <ol className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
          {DESIGN_SYSTEM_COURSE.map((episode, index) => {
            const active = index === activeLesson;
            return (
              <li key={episode.id} className="min-w-[9.5rem] shrink-0 lg:min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveLesson(index)}
                  className={`w-full rounded-[10px] px-3.5 py-3 text-left transition ${
                    active
                      ? "bg-zinc-50 text-zinc-950"
                      : "bg-zinc-900/70 text-zinc-300 ring-1 ring-white/[0.06] hover:bg-zinc-900 hover:text-zinc-100"
                  }`}
                >
                  <span
                    className={`text-[13px] font-medium ${
                      active ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    Part {episode.part}
                  </span>
                  <span
                    className={`mt-1 block text-[13px] font-medium leading-snug ${
                      active ? "text-zinc-950" : "text-zinc-200"
                    }`}
                    style={display}
                  >
                    {episode.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  </div>
  );
};

const BlogTabContent = ({
  posts,
  loading,
  onSubscribe,
}: {
  posts: SubstackPost[];
  loading: boolean;
  onSubscribe: () => void;
}) => (
  <div className="px-0 sm:px-1">
    <div className="mb-5 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2
          className="v2-built-tool-title text-[15px] font-medium leading-[1.5]"
          style={display}
        >
          Writing
        </h2>
        <p className="text-[15px] leading-[1.5] text-zinc-400">
          Articles on AI, product, and design, read by 6K+ readers.
        </p>
      </div>
      <Link
        to="/blog"
        className="group inline-flex shrink-0 items-center gap-1 text-[15px] leading-[1.5] text-zinc-400 transition-colors hover:text-zinc-200"
      >
        View all
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
    {loading ? (
      <p className="text-[15px] text-zinc-500">Loading articles…</p>
    ) : posts.length === 0 ? (
      <div className="v2-built-tool-card rounded-[12px] p-6">
        <p className="text-[13px] text-zinc-500">
          AI Design Playbook
        </p>
        <h3
          className="v2-built-tool-title mt-2 text-[15px] font-medium"
          style={display}
        >
          Weekly essays on AI-native product design
        </h3>
        <a
          href={PROFILE_SUBSTACK_URL}
          target="_blank"
          rel="noreferrer"
          className="v2-explore-cta mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
        >
          Read on Substack
          <ExternalLinkIcon />
        </a>
      </div>
    ) : (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.link} className="min-w-0">
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="v2-built-tool-card group flex h-full flex-col overflow-hidden rounded-[12px] p-2 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-zinc-900">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
                <h3
                  className="v2-built-tool-title line-clamp-2 text-[15px] font-normal leading-[1.5]"
                  style={display}
                >
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="v2-built-tool-description line-clamp-2 text-[15px] leading-[1.5]">
                    {post.excerpt}
                  </p>
                ) : null}
                {post.pubDate ? (
                  <p className="mt-auto pt-3 text-[15px] leading-[1.5] text-zinc-400">
                    {formatPostDate(post.pubDate)}
                  </p>
                ) : null}
              </div>
            </a>
          </li>
        ))}
      </ul>
    )}
    <div className="v2-built-tool-card mt-8 flex flex-col gap-3 rounded-[12px] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <p className="v2-built-tool-description text-[15px]">
        Join <span className="v2-built-tool-title font-medium">6000+</span> readers.
      </p>
      <button
        type="button"
        onClick={onSubscribe}
        className={`${secondaryCtaClass} v2-sidebar-subscribe shrink-0`}
      >
        Join Newsletter
      </button>
    </div>
  </div>
);

const ResumeTabContent = () => (
  <div className="max-w-[1100px] px-0 sm:px-1">
    <div className="v2-built-tool-card overflow-hidden rounded-[12px]">
      <div className="v2-built-tool-divider flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="v2-built-tool-title text-[15px] font-medium">John Rodrigues Resume</p>
          <p className="mt-0.5 text-[13px] text-zinc-500">One page · PDF · Updated 2026</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="v2-built-tool-description inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-medium ring-1 ring-zinc-500/30 transition hover:bg-zinc-500/10"
          >
            Open
          </a>
          <a
            href={RESUME_PDF_URL}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-black transition hover:bg-zinc-100 active:scale-[0.99]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </a>
        </div>
      </div>
      <object
        data={`${RESUME_PDF_URL}#view=FitH&navpanes=0`}
        type="application/pdf"
        aria-label="John Rodrigues resume"
        className="block h-[78vh] min-h-[520px] w-full bg-white"
      >
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <p className="v2-built-tool-description text-[15px]">
            Your browser can't show the PDF here.
          </p>
          <a
            href={RESUME_PDF_URL}
            download
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black"
          >
            Download resume
          </a>
        </div>
      </object>
    </div>
  </div>
);

const TestimonialsTabContent = () => (
  <ul className="grid max-w-[1100px] grid-cols-1 gap-4 px-0 sm:grid-cols-2 sm:px-1 lg:grid-cols-3">
    {TESTIMONIALS.map((testimonial) => (
      <li
        key={testimonial.id}
        className="v2-built-tool-card flex h-full flex-col rounded-[12px] p-5 sm:p-6"
      >
        <p className="v2-built-tool-description flex-1 text-[15px] leading-relaxed">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div className="v2-built-tool-divider mt-5 flex items-end justify-between gap-3 border-t pt-4">
          <div className="min-w-0">
            <p className="v2-built-tool-title text-[15px] font-medium">
              {testimonial.author}
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-500">{testimonial.role}</p>
          </div>
          {testimonial.companyLogo ? (
            <img
              src={testimonial.companyLogo}
              alt=""
              className="h-5 w-auto max-w-[56px] shrink-0 object-contain opacity-80"
              style={testimonial.logoStyle}
              loading="lazy"
            />
          ) : null}
        </div>
      </li>
    ))}
  </ul>
);

/** Work feed layout: two-column grid (true) or single large cards (false). */
const FEED_GRID = false;
/** Shared card ratio in grid mode; close to most project videos (~1.7). */
const FEED_GRID_ASPECT = "17/10";

const ProjectFeedCard = ({
  project,
  tab,
  index,
  featured,
  uniformAspect,
  onOpen,
}: {
  project: Project;
  tab: FeedTab;
  index: number;
  featured?: boolean;
  /** Grid mode: every card shares one ratio so rows line up. */
  uniformAspect?: string;
  onOpen: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const fitClass =
    project.media.fit === "contain" ? "object-contain" : "object-cover";
  const posStyle =
    "objectPosition" in project.media && project.media.objectPosition
      ? { objectPosition: project.media.objectPosition }
      : undefined;

  useEffect(() => {
    const root = cardRef.current;
    if (!root || project.media.type !== "video") return;

    const video = root.querySelector("video");
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [project.media.type, project.slug]);

  return (
    <motion.article
      ref={cardRef}
      className="flex flex-col gap-2.5"
      initial={{ opacity: 1 }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left"
      >
        <div
          className={`v2-feed-card-media relative isolate w-full overflow-hidden rounded-[12px] [transform:translateZ(0)] ${
            project.media.fit === "contain" ? "bg-zinc-200" : ""
          } ${
            project.media.aspect || uniformAspect
              ? ""
              : featured
                ? "aspect-[16/9]"
                : "aspect-[16/11]"
          }`}
          style={{
            // Only paint a backdrop when the media letterboxes; under a cover
            // image it bleeds through the anti-aliased rounded corners.
            ...(project.media.bg && project.media.fit === "contain"
              ? { backgroundColor: project.media.bg }
              : undefined),
            ...(uniformAspect || project.media.aspect
              ? { aspectRatio: uniformAspect ?? project.media.aspect }
              : undefined),
          }}
        >
          {project.media.type === "video" ? (
            <video
              src={project.media.src}
              poster={
                "poster" in project.media ? project.media.poster : undefined
              }
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 h-full w-full rounded-[inherit] ${fitClass}`}
              style={posStyle}
            />
          ) : (
            <img
              src={project.media.src}
              alt={project.name}
              className={`absolute inset-0 h-full w-full rounded-[inherit] ${fitClass}`}
              style={posStyle}
            />
          )}
        </div>

        <div className="mt-2.5">
          <h3
            className="v2-built-tool-title text-[14px] font-normal leading-[1.45]"
            style={display}
          >
            {project.name}
          </h3>
          <p className="text-[13px] font-normal leading-[1.45] text-zinc-400">
            {project.meta}
          </p>
        </div>
      </button>
    </motion.article>
  );
};


const ExperimentGalleryCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const fitClass =
    project.media.fit === "contain" ? "object-contain" : "object-cover";
  const posStyle =
    "objectPosition" in project.media && project.media.objectPosition
      ? { objectPosition: project.media.objectPosition }
      : undefined;

  useEffect(() => {
    const root = cardRef.current;
    if (!root || project.media.type !== "video") return;

    const video = root.querySelector("video");
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [project.media.type, project.slug]);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      className="flex w-full flex-col text-left"
      variants={v2NelsonChild}
    >
      <div
        className="v2-feed-card-media relative aspect-video w-full overflow-hidden rounded-[12px] bg-zinc-200"
        style={
          project.media.bg ? { backgroundColor: project.media.bg } : undefined
        }
      >
        {project.media.type === "video" ? (
          <video
            src={project.media.src}
            poster={"poster" in project.media ? project.media.poster : undefined}
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full ${fitClass}`}
            style={posStyle}
          />
        ) : (
          <img
            src={project.media.src}
            alt={project.name}
            className={`absolute inset-0 h-full w-full ${fitClass}`}
            style={posStyle}
          />
        )}
      </div>
    </motion.button>
  );
};


const NavMoreMenu = ({
  tabs,
  activeTab,
  onSelect,
}: {
  tabs: { id: FeedTab; label: string }[];
  activeTab: FeedTab;
  onSelect: (tab: FeedTab) => void;
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeItem = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-stretch">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`${FEED_TAB_CLASS} gap-1 ${
          activeItem
            ? "v2-feed-tab-active text-zinc-50"
            : "text-zinc-400 opacity-70 hover:text-zinc-200 hover:opacity-100"
        }`}
      >
        <span className="relative">
          {activeItem ? activeItem.label : "More"}
          {activeItem && (
            <motion.span
              layoutId="v2-feed-tab-indicator"
              className="v2-feed-tab-indicator pointer-events-none absolute inset-x-0 -bottom-1 h-[1.5px] rounded-full"
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              aria-hidden="true"
            />
          )}
        </span>
        <svg
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className="v2-built-tool-card absolute right-0 top-[calc(100%-4px)] z-50 min-w-[180px] rounded-[10px] p-1"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top right" }}
          >
            {tabs.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onSelect(tab.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center rounded-[6px] px-2.5 py-1.5 text-left text-[13px] leading-[1.5] transition-colors hover:bg-zinc-500/10 ${
                    active ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const IndexV2 = () => {
  const { posts: substackPosts, loading: substackLoading } = useSubstackPosts();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const initialTab =
    tabFromUrl && FEED_TABS.some((tab) => tab.id === tabFromUrl)
      ? (tabFromUrl as FeedTab)
      : "work";
  const [activeTab, setActiveTab] = useState<FeedTab>(initialTab);
  const feedScrollRef = useRef<HTMLElement>(null);
  useSmoothScroll(feedScrollRef);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSubscribeClosing, setIsSubscribeClosing] = useState(false);

  useEffect(() => {
    if (
      tabFromUrl &&
      FEED_TABS.some((tab) => tab.id === tabFromUrl) &&
      tabFromUrl !== activeTab
    ) {
      setActiveTab(tabFromUrl as FeedTab);
    }
  }, [tabFromUrl, activeTab]);

  const feedProjects = PROJECT_FEED_TABS.has(activeTab)
    ? FEED_BY_TAB[activeTab as keyof typeof FEED_BY_TAB]
    : [];


  const selectTab = (tab: FeedTab) => {
    setActiveTab(tab);
    if (tab === "work") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  const openProject = (project: Project) => {
    if (project.feedTab) {
      selectTab(project.feedTab);
      const main = document.querySelector("main");
      main?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (project.href) {
      window.open(project.href, "_blank", "noopener,noreferrer");
      return;
    }
    navigate(`/work/${project.slug}`);
  };

  const closeSubscribe = () => {
    if (isSubscribeClosing) return;
    setIsSubscribeClosing(true);
    window.setTimeout(() => {
      setIsSubscribeOpen(false);
      setIsSubscribeClosing(false);
    }, 380);
  };

  return (
    <PageShell dockAlign="feed">
      {/* Top navigation: fixed, translucent, blurred */}
      <motion.header
        className="v2-top-nav fixed inset-x-0 top-0 z-50"
        variants={v2NelsonChild}
        initial="hidden"
        animate="show"
      >
        <div className="relative mx-auto flex h-14 w-full max-w-[1280px] items-stretch gap-6 px-4 sm:px-5 min-[1180px]:gap-0">
          {/* At wide widths this column matches the sidebar (260px + 40px gap), so the links centre over the feed. */}
          <div className="hidden flex-1 basis-0 items-center md:flex min-[1180px]:w-[300px] min-[1180px]:flex-none">
            <button
              type="button"
              onClick={() => selectTab("work")}
              className="v2-built-tool-title shrink-0 text-[13px] font-medium leading-[1.5]"
              style={display}
              aria-label="John Rodrigues, home"
            >
              JR
            </button>
          </div>
          <div className="flex min-w-0 items-stretch gap-x-5 lg:gap-x-7 min-[1180px]:flex-1 min-[1180px]:justify-center">
          <nav
            aria-label="Sections"
            className="v2-feed-tabs scrollbar-hide flex min-w-0 flex-nowrap items-stretch gap-x-5 overflow-x-auto lg:gap-x-7"
          >
            {FEED_TABS.filter((tab) => !MORE_TAB_IDS.has(tab.id)).map((tab, index) => {
              const active = activeTab === tab.id;
              return (
                <Fragment key={tab.id}>
                  <button
                    type="button"
                    onClick={() => selectTab(tab.id)}
                    className={`${FEED_TAB_CLASS} relative ${
                      active
                        ? "v2-feed-tab-active text-zinc-50"
                        : "text-zinc-400 opacity-70 hover:text-zinc-200 hover:opacity-100"
                    }`}
                  >
                    <span className="relative">
                      <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      {active && (
                        <motion.span
                          layoutId="v2-feed-tab-indicator"
                          className="v2-feed-tab-indicator pointer-events-none absolute inset-x-0 -bottom-1 h-[1.5px] rounded-full"
                          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                  {SHOW_COURSE_NAV && index === 0 && (
                    <a
                      href={COURSE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${FEED_TAB_CLASS} text-zinc-400 opacity-70 hover:text-zinc-200 hover:opacity-100`}
                    >
                      Course
                    </a>
                  )}
                </Fragment>
              );
            })}
          </nav>
          <NavMoreMenu
            tabs={FEED_TABS.filter((tab) => MORE_TAB_IDS.has(tab.id))}
            activeTab={activeTab}
            onSelect={selectTab}
          />
          </div>
          <div className="hidden flex-1 basis-0 items-center justify-end gap-3 sm:flex min-[1180px]:absolute min-[1180px]:inset-y-0 min-[1180px]:right-5">
            <a
              href={PROFILE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
            <a
              href={PROFILE_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <ThemeToggleIcons className="ml-1" />
          </div>
        </div>
      </motion.header>
      <div className="h-14 shrink-0 lg:hidden" aria-hidden="true" />
      {/* Desktop feed panel: from the sidebar's right edge to the window's right edge,
          starting below the nav (centred 1280px container + 20px padding + 260px sidebar). */}
      <div
        className="v2-feed-bg pointer-events-none fixed bottom-0 right-0 top-14 hidden rounded-tl-[20px] lg:block"
        style={{ left: "calc(max(0px, (100vw - 1280px) / 2) + 280px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto flex h-auto w-full max-w-[1280px] flex-col overflow-x-hidden px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:px-5 lg:h-[100dvh] lg:overflow-y-hidden lg:overflow-x-visible lg:px-5 lg:pb-0">
        {/* Top spacer: float room for the tilted profile card; holds the (hidden) launch banner */}
        <div className="flex h-5 shrink-0 items-center justify-center sm:h-6 lg:hidden">
          {SHOW_COURSE_PROMO && (
          <a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-built-tool-card v2-launch-banner group inline-flex max-w-full items-center gap-2 rounded-full py-1 pl-1 pr-3.5 text-[13px] transition active:scale-[0.99]"
          >
            <span className="v2-launch-badge shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[13px] font-medium text-emerald-500">
              New
            </span>
            <span className="v2-built-tool-title truncate font-medium">
              Design Engineering Course launched
            </span>
            <span
              className="v2-built-tool-description shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
          )}
        </div>

        <motion.div
          className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-x-hidden sm:gap-5 lg:flex-row lg:items-stretch lg:gap-10 lg:overflow-x-visible"
          variants={v2NelsonShell}
          initial="hidden"
          animate="show"
        >
        {/* Static sidebar — stays put while the feed scrolls */}
        <motion.aside
          className="v2-explore-sidebar relative z-40 shrink-0 overflow-visible border-b v2-divider border-zinc-800/50 pb-4 lg:w-[260px] lg:border-b-0 lg:pb-2 lg:pt-28 lg:pl-1.5 lg:pr-6"
          variants={v2NelsonChild}
        >
            <div className="flex flex-col gap-2 overflow-visible pt-1 sm:pt-2 lg:block">
              <div className="min-w-0 shrink-0">
                <ProfileTiltCard />
              </div>

              <dl className="flex w-full max-w-[420px] flex-col gap-3 lg:hidden">
                <div className="hidden items-center justify-between gap-4">
                  <dt className="text-[13px] font-medium text-zinc-400">
                    Socials
                  </dt>
                  <dd className="flex items-center gap-1.5 pr-0.5">
                    <a
                      href={PROFILE_X_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X"
                      className="inline-flex size-4 items-center justify-center overflow-hidden rounded-full transition hover:scale-110"
                    >
                      <img
                        src={logoX}
                        alt=""
                        className="size-full object-cover"
                      />
                    </a>
                    <a
                      href={PROFILE_LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex size-4 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:scale-110"
                    >
                      <svg className="size-2 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                      </svg>
                    </a>
                    <a
                      href={PROFILE_SUBSTACK_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Substack"
                      className="inline-flex size-4 items-center justify-center rounded-full bg-[#FF6719] text-white transition hover:scale-110"
                    >
                      <svg className="size-2 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                      </svg>
                    </a>
                  </dd>
                </div>
                <div className="mt-1 flex flex-col gap-2 lg:hidden">
                  <a
                    href={PROFILE_LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="v2-explore-cta v2-explore-cta-beam inline-flex w-full items-center justify-center rounded-full px-3 py-2.5 text-[13px] font-medium transition active:translate-y-[1px] active:scale-[0.99]"
                  >
                    <span className="relative z-[1]">Get in Touch</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsSubscribeOpen(true)}
                    className={`${secondaryCtaClass} v2-sidebar-subscribe w-full px-3 py-2.5 text-[13px]`}
                  >
                    Join 6K+ Readers
                  </button>
                  <TrustedBy className="mt-6" />
                </div>
              </dl>
            </div>

            <div className="mt-4 hidden flex-row gap-2 lg:mt-2 lg:flex lg:flex-col lg:gap-2.5">
              <a
                href={PROFILE_LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="v2-explore-cta v2-explore-cta-beam inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[13px] font-medium transition active:translate-y-[1px] active:scale-[0.99]"
              >
                <span className="relative z-[1]">Get in Touch</span>
              </a>
              <button
                type="button"
                onClick={() => setIsSubscribeOpen(true)}
                className={`${secondaryCtaClass} v2-sidebar-subscribe w-full`}
              >
                Join 6K+ Readers
              </button>
            </div>
            <TrustedBy className="mt-10 hidden lg:block" />

          </motion.aside>

          {/* Dominant scroll column — only this pane scrolls on desktop */}
          <motion.main
            ref={feedScrollRef}
            className="scrollbar-hide relative z-0 min-w-0 flex-1 overflow-x-hidden lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:pt-28 lg:pb-32"
            variants={v2NelsonStagger}
          >
            <AnimatePresence mode="wait">
              {activeTab === "experiments" ? (
                <motion.div
                  key="experiments-gallery"
                  className="grid grid-cols-1 gap-3 px-0 pb-6 sm:grid-cols-2 sm:gap-4 sm:px-1"
                  variants={v2NelsonStagger}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {feedProjects.map((project, index) => (
                    <ExperimentGalleryCard
                      key={project.slug}
                      project={project}
                      index={index}
                      onOpen={() => openProject(project)}
                    />
                  ))}
                </motion.div>
              ) : activeTab === "tools" ? (
                <motion.div
                  key="tools-tab"
                  variants={v2NelsonPage}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <ToolsTabContent />
                </motion.div>
              ) : activeTab === "systems" ? (
                <motion.div
                  key="systems-tab"
                  variants={v2NelsonPage}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <DesignSystemsTabContent />
                </motion.div>
              ) : activeTab === "blog" ? (
                <motion.div
                  key="blog-tab"
                  variants={v2NelsonPage}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <BlogTabContent
                    posts={substackPosts}
                    loading={substackLoading}
                    onSubscribe={() => setIsSubscribeOpen(true)}
                  />
                </motion.div>
              ) : activeTab === "mentorship" ? (
                <motion.div
                  key="mentorship-tab"
                  variants={v2NelsonPage}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <MentorshipTabContent />
                </motion.div>
              ) : activeTab === "resume" ? (
                <motion.div
                  key="resume-tab"
                  variants={v2NelsonPage}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <ResumeTabContent />
                </motion.div>
              ) : activeTab === "testimonials" ? (
                <motion.div
                  key="testimonials-tab"
                  variants={v2NelsonPage}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <TestimonialsTabContent />
                </motion.div>
              ) : (
                <motion.div
                  key={`feed-${activeTab}`}
                  className={
                    FEED_GRID
                      ? "grid grid-cols-1 gap-x-4 gap-y-8 px-0 pb-6 sm:grid-cols-2 sm:gap-y-10 sm:px-1"
                      : "flex flex-col gap-8 px-0 pb-6 sm:gap-10 sm:px-1"
                  }
                  variants={v2NelsonStagger}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {feedProjects.map((project, index) => (
                    <FeedMotionItem
                      key={`${activeTab}-${project.slug}`}
                      index={index}
                    >
                      <ProjectFeedCard
                        project={project}
                        tab={activeTab}
                        index={index}
                        featured={!FEED_GRID && index === 0}
                        uniformAspect={FEED_GRID ? FEED_GRID_ASPECT : undefined}
                        onOpen={() => openProject(project)}
                      />
                    </FeedMotionItem>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </motion.div>

      </div>

      {isSubscribeOpen && (
        <>
          <div
            className="fixed inset-0 z-[80]"
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px) saturate(140%)",
              WebkitBackdropFilter: "blur(8px) saturate(140%)",
              animation: isSubscribeClosing
                ? "popupFadeOut 380ms ease-out forwards"
                : "popupFade 380ms ease-out forwards",
            }}
            onClick={closeSubscribe}
          />
          <div
            className="fixed left-1/2 top-1/2 z-[90] w-[90%] max-w-[440px]"
            style={{
              transformOrigin: "center",
              animation: isSubscribeClosing
                ? "subscribeSink 380ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
                : "subscribeRise 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #1f1f22",
                boxShadow:
                  "0 20px 50px -10px rgba(0,0,0,0.85), 0 8px 20px -4px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center justify-between px-5 pb-3 pt-4">
                <span className="text-[13px] text-zinc-500">
                  Join Newsletter
                </span>
                <button
                  onClick={closeSubscribe}
                  aria-label="Close"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-5 pb-3">
                <h3 className="text-[22px] font-medium text-zinc-50">
                  Join My Substack
                </h3>
                <p className="mt-1 text-[15px] text-zinc-400">
                  Subscribe via Substack. Confirmation will land in your inbox.
                </p>
              </div>
              <div className="bg-white">
                <iframe
                  src="https://johnrodrigues.substack.com/embed"
                  title="Subscribe to John Rodrigues' Substack"
                  className="block w-full border-0"
                  style={{ height: 200 }}
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            </div>
          </div>
          <style>{`
            @keyframes subscribeRise {
              from { opacity: 0; transform: translate(-50%, calc(-50% + 12px)) scale(0.97); }
              to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes subscribeSink {
              from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              to   { opacity: 0; transform: translate(-50%, calc(-50% + 8px)) scale(0.98); }
            }
          `}</style>
        </>
      )}
    </PageShell>
  );
};

export default IndexV2;
