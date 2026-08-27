import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageShell, { display, ThemeToggleIcons } from "@/components/v2/PageShell";
import ProfileTiltCard from "@/components/v2/ProfileTiltCard";
import {
  v2NelsonChild,
  v2NelsonPage,
  v2NelsonShell,
  v2NelsonStagger,
} from "@/components/v2/motion";
import { PROFILE_LINKEDIN_URL, PROFILE_SUBSTACK_URL, PROFILE_X_URL } from "@/config/profileLinks";
import {
  AI_TOOLS_BUILT,
  HIGHLIGHTS,
  type Project,
} from "@/data/projects";
import { BUILT_TOOLS } from "@/data/builtTools";
import {
  DESIGN_SYSTEM_COURSE,
  FLORENCE_HERO,
  FLORENCE_URL,
} from "@/data/designSystems";
import { TESTIMONIALS } from "@/data/testimonials";
import logoCursor from "@/assets/logo-cursor.png";
import logoClaude from "@/assets/logo-claude.png";
import logoClaudeCode from "@/assets/logo-claude-code.png";
import logoFigma from "@/assets/logo-figma.png";
import logoReact from "@/assets/logo-react.png";
import logoGithub from "@/assets/logo-github.png";
import logoSwift from "@/assets/logo-swift.png";
import florenceLaunchVideo from "@/assets/florence-launch.mp4";
import logoX from "@/assets/logo-x.jpg";

const AI_STACK_LOGOS = [
  { src: logoCursor, label: "Cursor", fit: "cover" as const },
  { src: logoClaudeCode, label: "Claude Code", fit: "contain" as const, pad: true },
  { src: logoClaude, label: "Claude", fit: "contain" as const, pad: true },
  { src: logoFigma, label: "Figma", fit: "cover" as const },
  { src: logoReact, label: "React", fit: "contain" as const, pad: true, bare: true },
  { src: logoGithub, label: "GitHub", fit: "cover" as const },
  { src: logoSwift, label: "Swift", fit: "cover" as const },
];



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
  | "testimonials";

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

const FEED_TABS: { id: FeedTab; label: string; shortLabel?: string }[] = [
  { id: "work", label: "Work" },
  { id: "experiments", label: "AI Experiments", shortLabel: "Experiments" },
  { id: "systems", label: "AI Design Systems", shortLabel: "Systems" },
  { id: "tools", label: "Tools" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials", shortLabel: "Praise" },
];

const ACADEMY_URL = "https://www.humanaistudio.io/academy";

const FEED_TAB_CLASS =
  "v2-feed-tab shrink-0 pb-3 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors lg:text-[12px]";

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
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[13px] font-medium tracking-tight text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-100 active:scale-[0.99]";

const featuredMediaFrame =
  "v2-featured-media-frame relative w-full overflow-hidden rounded-[20px] bg-zinc-900 ring-1 ring-white/[0.08]";

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

const ToolsTabContent = () => (
  <div className="max-w-[920px] px-0 sm:px-1">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {BUILT_TOOLS.map((tool) => (
        <article
          key={tool.id}
          className="v2-built-tool-card flex min-h-0 flex-col rounded-[20px] p-5 sm:min-h-[280px] sm:p-6 md:min-h-[320px]"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="v2-built-tool-index inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-medium">
              {tool.index}
            </span>
            <p className="max-w-[58%] text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
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
            className="v2-built-tool-title mt-5 text-[22px] font-semibold leading-tight tracking-[-0.02em]"
            style={display}
          >
            {tool.name}
          </h3>
          <p className="v2-built-tool-description mt-3 flex-1 text-[14px] leading-[1.55]">
            {tool.description}
          </p>

          <div className="v2-built-tool-divider mt-6 border-t pt-5">
            <a
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              className="v2-built-tool-cta v2-explore-cta inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition active:translate-y-[1px] active:scale-[0.99]"
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
      className="v2-built-tool-title text-[18px] font-semibold leading-[1.2] tracking-[-0.03em] sm:text-[22px] lg:text-[26px]"
      style={display}
    >
      <span className="block">Design Systems as Infrastructure for Agents,</span>
      <span className="block">Not Just a Component Library</span>
    </h2>

    <p className="v2-built-tool-description mt-8 max-w-[52ch] text-[16px] leading-[1.65] sm:text-[17px]">
      Florence is an AI-ready design system built so agents can read components,
      intent, and rules in one place. Not another static library for humans
      clicking through Figma. Here is a quick look at how it works in practice.
    </p>
    <a
      href={FLORENCE_URL}
      target="_blank"
      rel="noreferrer"
      className="v2-explore-cta mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
    >
      Open Florence
      <ExternalLinkIcon />
    </a>

    <figure className="mt-6">
      <div className="overflow-hidden rounded-[20px] bg-zinc-950 ring-1 ring-white/[0.08]">
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
          className="v2-built-tool-title text-[18px] font-semibold tracking-[-0.02em]"
          style={display}
        >
          Florence
        </h3>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          AI-ready design system
        </p>
      </figcaption>
    </figure>

    <div className="v2-built-tool-description mt-10 space-y-5 text-[17px] leading-[1.7] sm:text-[18px]">
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
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
            Short course · 3 parts
          </p>
          <h3
            className="v2-built-tool-title mt-1.5 text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]"
            style={display}
          >
            Making Design Systems AI-Ready
          </h3>
        </div>
        <a
          href={FLORENCE_URL}
          target="_blank"
          rel="noreferrer"
          className="v2-explore-cta inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
        >
          Explore Florence
          <ExternalLinkIcon />
        </a>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-6">
        <div className="overflow-hidden rounded-[18px] bg-zinc-950 ring-1 ring-white/[0.08]">
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
            <p className="text-[11px] font-medium tabular-nums text-zinc-500">
              Part {lesson.part}
            </p>
            <h4
              className="v2-built-tool-title mt-1 text-[16px] font-semibold tracking-[-0.02em] sm:text-[17px]"
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
                  className={`w-full rounded-[14px] px-3.5 py-3 text-left transition ${
                    active
                      ? "bg-zinc-50 text-zinc-950"
                      : "bg-zinc-900/70 text-zinc-300 ring-1 ring-white/[0.06] hover:bg-zinc-900 hover:text-zinc-100"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${
                      active ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    Part {episode.part}
                  </span>
                  <span
                    className={`mt-1 block text-[13px] font-semibold leading-snug tracking-[-0.02em] ${
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
  <div className="max-w-[860px] px-0 sm:px-1">
    {loading ? (
      <p className="text-[14px] text-zinc-500">Loading articles…</p>
    ) : posts.length === 0 ? (
      <div className="v2-built-tool-card rounded-[20px] p-6">
        <p className="text-[9px] font-mono uppercase tracking-[0.14em] text-zinc-500">
          AI Design Playbook
        </p>
        <h3
          className="v2-built-tool-title mt-2 text-[18px] font-semibold tracking-tight"
          style={display}
        >
          Weekly essays on AI-native product design
        </h3>
        <a
          href={PROFILE_SUBSTACK_URL}
          target="_blank"
          rel="noreferrer"
          className="v2-explore-cta mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
        >
          Read on Substack
          <ExternalLinkIcon />
        </a>
      </div>
    ) : (
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.link}>
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="v2-blog-article-card group flex items-stretch gap-4 rounded-[20px] p-4 sm:gap-5 sm:p-5"
            >
              <div className="relative min-h-[72px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-200/80 sm:min-h-[84px] sm:w-[108px]">
                {post.thumbnail ? (
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 self-center">
                {post.pubDate ? (
                  <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                    {formatPostDate(post.pubDate)}
                  </p>
                ) : null}
                <h3
                  className="v2-built-tool-title mt-1 line-clamp-2 text-[16px] font-semibold sm:text-[17px]"
                  style={display}
                >
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="mt-1.5 line-clamp-2 text-[13px] text-zinc-500">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </a>
          </li>
        ))}
      </ul>
    )}
    <div className="v2-built-tool-card mt-8 flex flex-col gap-3 rounded-[20px] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <p className="v2-built-tool-description text-[14px]">
        Join <span className="v2-built-tool-title font-semibold">4000+</span> readers.
      </p>
      <button
        type="button"
        onClick={onSubscribe}
        className={`${secondaryCtaClass} v2-sidebar-subscribe shrink-0`}
      >
        Subscribe
      </button>
    </div>
  </div>
);

const TestimonialsTabContent = () => (
  <ul className="grid max-w-[1100px] grid-cols-1 gap-4 px-0 sm:grid-cols-2 sm:px-1 lg:grid-cols-3">
    {TESTIMONIALS.map((testimonial) => (
      <li
        key={testimonial.id}
        className="v2-built-tool-card flex h-full flex-col rounded-[20px] p-5 sm:p-6"
      >
        <p className="v2-built-tool-description flex-1 text-[14px] leading-relaxed">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div className="v2-built-tool-divider mt-5 flex items-end justify-between gap-3 border-t pt-4">
          <div className="min-w-0">
            <p className="v2-built-tool-title text-[14px] font-semibold">
              {testimonial.author}
            </p>
            <p className="mt-0.5 text-[12.5px] text-zinc-500">{testimonial.role}</p>
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

const ProjectFeedCard = ({
  project,
  tab,
  index,
  featured,
  onOpen,
}: {
  project: Project;
  tab: FeedTab;
  index: number;
  featured?: boolean;
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
          className={`v2-feed-card-media relative w-full overflow-hidden rounded-[20px] bg-zinc-200 ${
            project.media.aspect
              ? ""
              : featured
                ? "aspect-[16/9]"
                : "aspect-[16/11]"
          }`}
          style={{
            ...(project.media.bg
              ? { backgroundColor: project.media.bg }
              : undefined),
            ...(project.media.aspect
              ? { aspectRatio: project.media.aspect }
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

        <div className="mt-3">
          <h3
            className="v2-built-tool-title text-[17px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[18px]"
            style={display}
          >
            {project.name}
          </h3>
          <p className="mt-1 text-[15px] leading-snug text-zinc-400 sm:text-[16px]">
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
        className="v2-feed-card-media relative aspect-video w-full overflow-hidden rounded-[16px] bg-zinc-200"
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
    <PageShell>
      <div className="mx-auto flex h-auto w-full max-w-[1280px] flex-col overflow-x-hidden px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:px-5 lg:h-[100dvh] lg:overflow-y-hidden lg:overflow-x-visible lg:px-5 lg:pb-0">
        {/* Top spacer — keeps float room outside the clipped overflow box */}
        <div className="h-12 shrink-0 sm:h-16 lg:h-[72px]" aria-hidden="true" />

        <motion.div
          className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-x-hidden sm:gap-5 lg:flex-row lg:items-stretch lg:gap-10 lg:overflow-x-visible"
          variants={v2NelsonShell}
          initial="hidden"
          animate="show"
        >
        {/* Static sidebar — stays put while the feed scrolls */}
        <motion.aside
          className="v2-explore-sidebar relative z-40 shrink-0 overflow-visible border-b border-zinc-800/80 pb-4 lg:w-[260px] lg:border-b-0 lg:border-r lg:pb-2 lg:pl-1.5 lg:pr-6"
          variants={v2NelsonChild}
        >
            <div className="overflow-visible pt-1 pr-0.5 sm:pt-2">
              <ProfileTiltCard />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-zinc-800/80 pt-3 sm:mt-4 sm:pt-4 lg:block lg:space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                  Location
                </dt>
                <dd className="text-[16px] font-bold text-zinc-50">San Francisco</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                  Experience
                </dt>
                <dd className="text-[16px] font-bold text-zinc-50">8+ yrs</dd>
              </div>
              <div className="hidden items-center justify-between gap-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
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
            </dl>

            <div className="mt-5 hidden lg:block lg:mt-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                AI Stack
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                {AI_STACK_LOGOS.map((logo) => (
                  <span
                    key={logo.label}
                    title={logo.label}
                    className={`inline-flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-[7px] ${
                      logo.bare ? "bg-transparent" : "bg-white"
                    } ${logo.pad ? "p-0.5" : ""}`}
                  >
                    <img
                      src={logo.src}
                      alt=""
                      className={`size-full ${
                        logo.fit === "contain" ? "object-contain" : "object-cover"
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-row gap-2 lg:mt-7 lg:flex-col lg:gap-2.5">
              <a
                href={PROFILE_LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="v2-explore-cta v2-explore-cta-beam inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[12px] font-semibold transition active:translate-y-[1px] active:scale-[0.99]"
              >
                <span className="relative z-[1]">Get in touch</span>
              </a>
              <button
                type="button"
                onClick={() => setIsSubscribeOpen(true)}
                className={`${secondaryCtaClass} v2-sidebar-subscribe w-full`}
              >
                Subscribe
              </button>
            </div>
          </motion.aside>

          {/* Dominant scroll column — only this pane scrolls on desktop */}
          <motion.main
            className="scrollbar-hide relative z-0 min-w-0 flex-1 overflow-x-hidden lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
            variants={v2NelsonStagger}
          >
            <div className="sticky top-0 z-30 -mx-1 mb-5 border-b border-zinc-800/80 px-1 pb-0 pt-2 v2-mobile-tab-bar sm:-mx-0 sm:px-0 lg:static lg:mb-6">
              <div className="flex items-end justify-between gap-3">
                <motion.div
                  className="v2-feed-tabs scrollbar-hide min-w-0 flex flex-1 flex-nowrap items-end gap-x-5 overflow-x-auto overflow-y-visible lg:gap-x-8"
                  variants={v2NelsonChild}
                >
                  {FEED_TABS.map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => selectTab(tab.id)}
                        className={`${FEED_TAB_CLASS} ${
                          active
                            ? "v2-feed-tab-active text-zinc-50"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <span className="sm:hidden">{tab.shortLabel ?? tab.label}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                  <a
                    href={ACADEMY_URL}
                    target="_blank"
                    rel="noreferrer"
                    title="Opens Academy in a new tab"
                    className={`${FEED_TAB_CLASS} text-zinc-400 hover:text-zinc-200`}
                  >
                    Academy
                  </a>
                </motion.div>
                <div className="hidden shrink-0 self-center pb-2.5 sm:flex">
                  <ThemeToggleIcons />
                </div>
              </div>
            </div>

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
                  className="flex flex-col gap-8 px-0 pb-6 sm:gap-10 sm:px-1"
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
                        featured={index === 0}
                        onOpen={() => openProject(project)}
                      />
                    </FeedMotionItem>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </motion.div>

        {/* Bottom spacer for the floating chat dock */}
        <div className="hidden h-[104px] shrink-0 lg:block" aria-hidden="true" />
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
                <span className="text-[12px] uppercase tracking-[0.18em] text-zinc-500">
                  Subscribe
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
                <h3 className="text-[20px] font-semibold tracking-tight text-zinc-50">
                  Join My Substack
                </h3>
                <p className="mt-1 text-[14px] text-zinc-400">
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
