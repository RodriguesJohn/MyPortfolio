import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "@/assets/PP.jpg";
import PageShell, { display } from "@/components/v2/PageShell";
import { PROFILE_LINKEDIN_URL } from "@/config/profileLinks";
import { HIGHLIGHTS } from "@/data/projects";

import chaseLogo from "@/assets/ChaseLightMOde.png";
import citiLogo from "@/assets/Citi.svg.png";
import stanfordLogo from "@/assets/Standford.png";
import googleLogo from "@/assets/GoogleLogog.png";
import metaLogo from "@/assets/Meta-Emblem.png";

const APPLE_LOGO_WHITE = "https://cdn.simpleicons.org/apple/ffffff";

type ReaderLogo = {
  name: string;
  src: string;
  className?: string;
  style?: React.CSSProperties;
};

const READER_LOGOS: ReaderLogo[] = [
  { name: "Apple", src: APPLE_LOGO_WHITE, className: "h-[18px] w-[18px] sm:h-5 sm:w-5" },
  { name: "Google", src: googleLogo },
  { name: "Meta", src: metaLogo },
  {
    name: "JPMorgan Chase",
    src: chaseLogo,
    className: "h-[18px] w-auto max-w-[52px] sm:h-5 sm:max-w-[58px]",
    style: { filter: "brightness(3.8) contrast(1.08)" },
  },
  { name: "Citi", src: citiLogo },
  { name: "Stanford", src: stanfordLogo },
];

/** Set to `true` to show the “3 Ways I Can Help” cards on /v2. */
const SHOW_THREE_WAYS_SECTION = false;

const SUBSTACK_FEED = "https://johnrodrigues.substack.com/feed";

type LatestPost = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  excerpt: string;
};

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

const useLatestSubstackPost = () => {
  const [post, setPost] = useState<LatestPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchLatest = () => {
      fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          SUBSTACK_FEED
        )}`
      )
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          const item = data?.items?.[0];
          if (!item) return;
          const text = (item.description || "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          const excerpt =
            text.length > 160 ? text.slice(0, 160).trim() + "…" : text;
          const cover =
            item.thumbnail ||
            item.enclosure?.link ||
            (item.content || item.description || "").match(
              /<img[^>]+src="([^"]+)"/i
            )?.[1] ||
            undefined;
          setPost({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            thumbnail: cover,
            excerpt,
          });
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    fetchLatest();
    const id = window.setInterval(fetchLatest, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return { post, loading };
};

const ThinkingDots = () => (
  <span
    aria-hidden="true"
    className="inline-flex items-baseline gap-[3px] ml-1.5"
    style={{ transform: "translateY(4px)" }}
  >
    {[0, 0.18, 0.36].map((delay) => (
      <span
        key={delay}
        className="block h-[5px] w-[5px] rounded-full bg-zinc-300"
        style={{
          animation: "thinkingDot 1.3s ease-in-out infinite",
          animationDelay: `${delay}s`,
        }}
      />
    ))}
  </span>
);

const ClaudeLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="inline-block align-[-3px] mr-1 h-[15px] w-[15px]"
    fill="#D97757"
    style={{
      transformOrigin: "center",
      animation: "logoRotate 14s linear infinite",
    }}
  >
    <path d="M12 1.5c.6 0 1 4 1 10.5s-.4 10.5-1 10.5-1-4-1-10.5S11.4 1.5 12 1.5zM1.5 12c0-.6 4-1 10.5-1s10.5.4 10.5 1-4 1-10.5 1S1.5 12.6 1.5 12z" />
    <path
      transform="rotate(45 12 12)"
      d="M12 4c.4 0 .7 2.7.7 7s-.3 7-.7 7-.7-2.7-.7-7 .3-7 .7-7zM4 12c0-.4 2.7-.7 7-.7s7 .3 7 .7-2.7.7-7 .7-7-.3-7-.7z"
    />
  </svg>
);

const CursorLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="inline-block align-[-3px] mr-1 h-[15px] w-[15px]"
    fill="currentColor"
    style={{
      transformOrigin: "center",
      animation: "logoTilt 3.4s ease-in-out infinite",
    }}
  >
    <path d="M4 3.5l16 8.5-7 1.8L11 21z" />
  </svg>
);

const CodexLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="inline-block align-[-3px] mr-1 h-[15px] w-[15px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinejoin="round"
    style={{
      transformOrigin: "center",
      animation: "logoPulse 4.2s ease-in-out infinite",
    }}
  >
    <path d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4z" />
  </svg>
);

const Spacer = () => (
  <div
    aria-hidden="true"
    className="my-10 h-px w-full"
    style={{
      backgroundImage:
        "linear-gradient(90deg, rgba(244,244,245,0.18) 0%, rgba(244,244,245,0) 100%)",
    }}
  />
);

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

/** Same as `enter` but no blur — avoids clipping when paired with horizontal overflow (subtitle). */
const enterNoBlur = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  animation: `entranceItemNoBlur 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, opacity",
});

const getFeaturedCards = (root: HTMLDivElement) =>
  [...root.querySelectorAll<HTMLElement>("[data-feature-card]")];

const nearestFeaturedIndex = (root: HTMLDivElement, cards: HTMLElement[]) => {
  const scrollLeft = root.scrollLeft;
  let nearest = 0;
  let nearestDist = Infinity;
  for (let i = 0; i < cards.length; i++) {
    const d = Math.abs(cards[i].offsetLeft - scrollLeft);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = i;
    }
  }
  return nearest;
};

const syncFeaturedCarousel = (
  root: HTMLDivElement,
  options?: { sectionBlurred?: boolean },
) => {
  const cards = getFeaturedCards(root);
  if (!cards.length) return;

  const sectionBlurred = options?.sectionBlurred ?? false;
  const rootRect = root.getBoundingClientRect();
  const viewportCenter = rootRect.left + rootRect.width / 2;
  const active = nearestFeaturedIndex(root, cards);

  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const offset = Math.abs(cardCenter - viewportCenter);
    const normalized = Math.min(1, offset / (rootRect.width * 0.52));
    const scale = sectionBlurred ? 1 : 1 - normalized * 0.07;
    const opacity = sectionBlurred ? 1 : 1 - normalized * 0.32;
    const blurPx = sectionBlurred ? 0 : normalized * 3.5;

    card.style.transform = `scale(${scale.toFixed(3)})`;
    card.style.opacity = opacity.toFixed(3);
    card.style.filter = blurPx > 0.2 ? `blur(${blurPx.toFixed(1)}px)` : "none";
    card.style.transformOrigin = "center center";

    const video = card.querySelector("video");
    if (!video) return;
    if (i === active) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
};

const secondaryCtaClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[13px] font-medium tracking-tight text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-100 active:scale-[0.99]";

const FEATURED_AUTO_INTERVAL_MS = 7000;
const FEATURED_INTERACTION_COOLDOWN_MS = 14000;

const featuredMediaFrame =
  "relative w-full aspect-[16/11] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/[0.08]";

/** Slightly narrower than full width so the next slide peeks in */
const FEATURED_CARD_WIDTH = "calc(100% - 2rem)";

const IndexV2 = () => {
  const { post: latestPost } = useLatestSubstackPost();
  const navigate = useNavigate();
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const featuredAutoPausedRef = useRef(false);
  const featuredProgrammaticRef = useRef(false);
  const featuredHoverRef = useRef(false);
  const featuredCooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const featuredSectionRef = useRef<HTMLElement>(null);
  const playbookCardRef = useRef<HTMLDivElement>(null);
  const featuredBlurRef = useRef(0);
  const [blurPlaybook, setBlurPlaybook] = useState(false);
  const [featuredBlurProgress, setFeaturedBlurProgress] = useState(0);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSubscribeClosing, setIsSubscribeClosing] = useState(false);

  useEffect(() => {
    const featured = featuredSectionRef.current;
    const playbook = playbookCardRef.current;
    if (!featured || !playbook) return;

    const updateSectionFocus = () => {
      const vh = window.innerHeight;
      const featuredRect = featured.getBoundingClientRect();
      const playbookRect = playbook.getBoundingClientRect();

      const playbookInFocus =
        playbookRect.top < vh * 0.72 && playbookRect.bottom > vh * 0.12;
      const featuredDominant =
        featuredRect.top < vh * 0.45 &&
        featuredRect.bottom > vh * 0.38 &&
        !playbookInFocus;
      const playbookIsPeeking =
        playbookRect.top > vh * 0.52 && featuredRect.bottom > vh * 0.55;

      setBlurPlaybook(featuredDominant && playbookIsPeeking);

      const scrollMax = Math.max(
        document.documentElement.scrollHeight - vh,
        document.body.scrollHeight - vh,
        0,
      );
      const atPageBottom = window.scrollY >= scrollMax - 32;
      const featuredIsPrimary =
        featuredRect.top < vh * 0.44 && featuredRect.bottom > vh * 0.48;
      const rampStart = vh * 0.9;
      const rampEnd = vh * 0.56;
      let progress = 0;
      if (
        !featuredIsPrimary &&
        playbookRect.top < rampStart &&
        featuredRect.bottom < vh * 0.58
      ) {
        progress = (rampStart - playbookRect.top) / (rampStart - rampEnd);
        progress = Math.max(0, Math.min(1, progress));
      }
      if (atPageBottom && playbookInFocus && !featuredIsPrimary) {
        progress = Math.max(progress, 0.82);
      }

      featuredBlurRef.current = progress;
      setFeaturedBlurProgress(progress);

      const carousel = featuredScrollRef.current;
      if (carousel) syncFeaturedCarousel(carousel, { sectionBlurred: progress > 0.12 });
    };

    updateSectionFocus();
    window.addEventListener("scroll", updateSectionFocus, { passive: true });
    window.addEventListener("resize", updateSectionFocus);

    const observer = new IntersectionObserver(() => updateSectionFocus(), {
      threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
    });
    observer.observe(featured);
    observer.observe(playbook);

    return () => {
      window.removeEventListener("scroll", updateSectionFocus);
      window.removeEventListener("resize", updateSectionFocus);
      observer.disconnect();
    };
  }, [latestPost]);

  const scrollFeaturedTo = (index: number) => {
    const root = featuredScrollRef.current;
    if (!root) return;
    const cards = getFeaturedCards(root);
    if (!cards.length) return;

    const i = ((index % cards.length) + cards.length) % cards.length;
    featuredProgrammaticRef.current = true;
    root.scrollTo({ left: cards[i].offsetLeft, behavior: "smooth" });
  };

  const pauseFeaturedAuto = () => {
    featuredAutoPausedRef.current = true;
    if (featuredCooldownRef.current) clearTimeout(featuredCooldownRef.current);
    featuredCooldownRef.current = setTimeout(() => {
      featuredAutoPausedRef.current = false;
    }, FEATURED_INTERACTION_COOLDOWN_MS);
  };

  useEffect(() => {
    const root = featuredScrollRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const advanceFeatured = () => {
      if (
        featuredAutoPausedRef.current ||
        featuredHoverRef.current ||
        document.hidden
      ) {
        return;
      }
      const cards = getFeaturedCards(root);
      if (cards.length <= 1) return;
      const next = nearestFeaturedIndex(root, cards) + 1;
      scrollFeaturedTo(next);
    };

    const startAuto = () => {
      if (reducedMotion.matches) return;
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(advanceFeatured, FEATURED_AUTO_INTERVAL_MS);
    };

    const stopAuto = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = undefined;
    };

    let raf = 0;
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    const onScrollEnd = () => {
      featuredProgrammaticRef.current = false;
      syncFeaturedCarousel(root, { sectionBlurred: featuredBlurRef.current > 0.12 });
    };

    const onScroll = () => {
      if (!featuredProgrammaticRef.current) pauseFeaturedAuto();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        syncFeaturedCarousel(root, { sectionBlurred: featuredBlurRef.current > 0.12 }),
      );
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(onScrollEnd, 480);
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("scrollend", onScrollEnd);
    root.addEventListener("pointerdown", pauseFeaturedAuto, { passive: true });

    const onVisibility = () => {
      if (document.hidden) stopAuto();
      else startAuto();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onReducedChange = () => {
      if (reducedMotion.matches) stopAuto();
      else startAuto();
    };
    reducedMotion.addEventListener("change", onReducedChange);

    startAuto();
    syncFeaturedCarousel(root, { sectionBlurred: featuredBlurRef.current > 0.12 });

    return () => {
      stopAuto();
      if (featuredCooldownRef.current) clearTimeout(featuredCooldownRef.current);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
      root.removeEventListener("scrollend", onScrollEnd);
      root.removeEventListener("pointerdown", pauseFeaturedAuto);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onReducedChange);
    };
  }, []);

  const scrollFeatured = (direction: -1 | 1) => {
    const root = featuredScrollRef.current;
    if (!root) return;
    const cards = getFeaturedCards(root);
    if (!cards.length) return;

    pauseFeaturedAuto();
    const nearest = nearestFeaturedIndex(root, cards);
    scrollFeaturedTo(nearest + direction);
  };

  const closeSubscribe = () => {
    if (isSubscribeClosing) return;
    setIsSubscribeClosing(true);
    window.setTimeout(() => {
      setIsSubscribeOpen(false);
      setIsSubscribeClosing(false);
    }, 380);
  };

  const featuredBlurPx = featuredBlurProgress * 8;
  const featuredSectionOpacity = 1 - featuredBlurProgress * 0.2;
  const featuredSectionBrightness = 1 - featuredBlurProgress * 0.07;

  return (
    <PageShell>
      <div className="mx-auto w-[90%] max-w-[620px]">
        {/* Hero */}
        <section className="overflow-visible pt-[120px] pb-0">
          <div
            className="mb-8 h-16 w-16 rounded-full overflow-hidden ring-1 ring-zinc-800"
            style={enter(0)}
          >
            <img
              src={profileImage}
              alt="John Rodrigues"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full space-y-3 overflow-visible">
            <h1
              className="text-[27px] sm:text-[32px] font-semibold tracking-[-0.02em] leading-[1.15] text-zinc-50"
              style={{ ...enterNoBlur(80), ...display }}
            >
              John Rodrigues
              <ThinkingDots />
            </h1>
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1"
              style={{ ...enterNoBlur(160), ...display }}
            >
              <span className="text-[16px] sm:text-[18px] font-medium tracking-tight leading-[1.35] text-zinc-500">
                AI Native Product Designer
              </span>
              <span className="h-4 w-px shrink-0 bg-white/25" aria-hidden />
              <span className="text-[16px] sm:text-[18px] font-medium tracking-tight leading-[1.35] text-zinc-500">
                Design Engineer
              </span>
            </div>
            <p
              className="w-full text-[15px] sm:text-[16px] leading-[1.55] text-zinc-500"
              style={{ ...enterNoBlur(240), ...display }}
            >
              I build AI-native products from the ground up, design and code
              together. 10+ years shipping at startups and scale. Based in the SF
              Bay Area.
            </p>
          </div>

          <a
            href={PROFILE_LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="v2-glow-cta mt-5"
            style={enterNoBlur(320)}
          >
            <span className="v2-glow-cta__inner inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium tracking-tight text-zinc-300 transition-colors hover:text-zinc-100 active:scale-[0.99]">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              Get in touch
            </span>
          </a>
        </section>

        <main>
          {SHOW_THREE_WAYS_SECTION ? (
            <>
              <Spacer />
              <section className="my-8" style={enter(320)}>
                <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-zinc-50" style={display}>
                  3 Ways I Can Help
                </h2>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    [
                      {
                        title: "AI Strategy",
                        body: "AI integration, product visioning, functional prototyping, and driving outcomes.",
                        href: undefined,
                      },
                      {
                        title: "0→1 AI Product Design",
                        body: (
                          <>
                            End-to-end builds with <ClaudeLogo />
                            Claude, <CursorLogo />
                            Cursor, <CodexLogo />
                            Codex.
                          </>
                        ),
                        href: undefined,
                      },
                      {
                        title: "Workshops",
                        body: "Hands-on AI workshops for teams — via AI Design Academy (external site).",
                        href: "https://www.theaidesignacademy.com/",
                      },
                    ] as { title: string; body: React.ReactNode; href?: string }[]
                  ).map((card) => {
                    const cardStyle = {
                      backgroundColor: "rgba(255,255,255,0.035)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.30)",
                    };
                    const inner = (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-[18px] font-semibold tracking-tight text-zinc-50">
                            {card.title}
                          </h3>
                          {card.href && (
                            <svg
                              className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17L17 7M8 7h9v9" />
                            </svg>
                          )}
                        </div>
                        <p className="mt-2 text-[14px] leading-[1.6] text-zinc-400">
                          {card.body}
                        </p>
                      </>
                    );
                    return card.href ? (
                      <a
                        key={card.title}
                        href={card.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative block rounded-xl p-4 overflow-hidden transition-colors hover:bg-white/[0.06]"
                        style={cardStyle}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        key={card.title}
                        className="group relative rounded-xl p-4 overflow-hidden"
                        style={cardStyle}
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </section>
              <Spacer />
            </>
          ) : null}

          {/* Featured work — snap lives outside entrance transform (transform breaks snap in WebKit). */}
          <section
            ref={featuredSectionRef}
            className={`@container relative mt-3 mb-8 isolate transition-[filter,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              featuredBlurProgress > 0.72 ? "pointer-events-none select-none" : ""
            }`}
            style={{
              filter:
                featuredBlurProgress > 0.02
                  ? `blur(${featuredBlurPx}px) brightness(${featuredSectionBrightness})`
                  : "none",
              opacity: featuredSectionOpacity,
            }}
            onMouseEnter={() => {
              featuredHoverRef.current = true;
            }}
            onMouseLeave={() => {
              featuredHoverRef.current = false;
            }}
          >
            <div className="mb-3 flex justify-end" style={enter(560)}>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  aria-label="Previous project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-zinc-300 transition hover:bg-white/[0.10] hover:text-white"
                  onClick={() => scrollFeatured(-1)}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-zinc-300 transition hover:bg-white/[0.10] hover:text-white"
                  onClick={() => scrollFeatured(1)}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={featuredScrollRef}
              className="flex w-full min-w-0 snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain py-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
                {HIGHLIGHTS.map((project, index) => {
                  const fitClass =
                    project.media.fit === "contain" ? "object-contain" : "object-cover";
                  const posStyle =
                    "objectPosition" in project.media && project.media.objectPosition
                      ? { objectPosition: project.media.objectPosition }
                      : undefined;
                  return (
                    <div
                      key={project.slug}
                      data-feature-card
                      className="min-w-0 shrink-0 grow-0 snap-start snap-always transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity,filter] motion-reduce:transition-none"
                      style={{
                        flex: `0 0 ${FEATURED_CARD_WIDTH}`,
                        width: FEATURED_CARD_WIDTH,
                        maxWidth: FEATURED_CARD_WIDTH,
                        scrollSnapAlign: "center",
                        scrollSnapStop: "always",
                      }}
                    >
                      <button
                          type="button"
                          onClick={() => navigate(`/v2/work/${project.slug}`)}
                          className="group w-full text-left"
                        >
                          <div
                            className={featuredMediaFrame}
                            style={
                              project.media.bg
                                ? { backgroundColor: project.media.bg }
                                : undefined
                            }
                          >
                            {project.media.type === "video" ? (
                              <video
                                src={project.media.src}
                                poster={
                                  "poster" in project.media
                                    ? project.media.poster
                                    : undefined
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
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            {project.tag ? (
                              <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-zinc-100 ring-1 ring-white/15 backdrop-blur-md">
                                {project.tag}
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-2.5 px-1">
                            <p className="truncate text-[13px] leading-snug sm:text-[14px]">
                              <span className="font-medium tracking-tight text-zinc-50 transition-colors group-hover:text-white">
                                {project.name}
                              </span>
                              <span className="font-normal text-zinc-500 text-[12px] sm:text-[13px]">
                                {" "}
                                · {project.meta} · {project.year}
                              </span>
                            </p>
                          </div>
                        </button>
                    </div>
                  );
                })}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 transition-[opacity,backdrop-filter,background-color] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                opacity: featuredBlurProgress * 0.28,
                backdropFilter:
                  featuredBlurProgress > 0.03
                    ? `blur(${featuredBlurProgress * 12}px)`
                    : "none",
                backgroundColor: `rgba(0,0,0,${featuredBlurProgress * 0.26})`,
              }}
            />
          </section>

          <Spacer />

          {/* Substack — playbook-style card */}
          <section className="my-8 pb-[120px]" style={enterNoBlur(640)}>
            <div
              ref={playbookCardRef}
              className={`relative transition-[box-shadow] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                featuredBlurProgress > 0.35 ? "rounded-2xl ring-1 ring-white/[0.14]" : ""
              }`}
              style={
                featuredBlurProgress > 0.35
                  ? {
                      boxShadow:
                        "0 20px 50px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }
                  : undefined
              }
            >
            <div
              className="relative rounded-2xl overflow-hidden px-2.5 pt-2.5 pb-3 sm:px-3 sm:pt-3 sm:pb-3.5 ring-1 ring-zinc-600/80"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid rgba(161, 161, 170, 0.22)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.35)",
              }}
            >
              {latestPost ? (
                <a
                  href={latestPost.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-stretch gap-3.5 px-5 pt-4 pb-4 sm:gap-4 sm:px-6 sm:pt-5 sm:pb-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/20"
                >
                  <div className="relative w-[92px] flex-shrink-0 overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-white/[0.14] min-h-[68px] sm:w-[104px] sm:min-h-[72px]">
                      {latestPost.thumbnail ? (
                        <img
                          src={latestPost.thumbnail}
                          alt=""
                          className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
                      )}
                  </div>
                  <div className="min-w-0 flex-1 self-center py-1 text-left">
                    <h4
                      className="text-[14px] sm:text-[15px] font-semibold leading-[1.4] tracking-[-0.01em] text-zinc-100 line-clamp-2 group-hover:text-white transition-colors"
                      style={display}
                    >
                      {latestPost.title}
                    </h4>
                    <p className="mt-1 text-[12px] leading-[1.45] text-zinc-500 line-clamp-2">
                      {latestPost.excerpt}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-stretch gap-3.5 px-5 pt-4 pb-4 sm:gap-4 sm:px-6 sm:pt-5 sm:pb-4">
                  <div className="flex w-[92px] flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.04] text-zinc-400 ring-1 ring-white/[0.10] min-h-[68px] sm:w-[104px] sm:min-h-[72px]">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 self-center py-1">
                    <p className="text-[9px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                      AI Design Playbook
                    </p>
                    <h4
                      className="mt-1.5 text-[15px] font-semibold tracking-tight text-zinc-100"
                      style={display}
                    >
                      Weekly essays on AI-native product design
                    </h4>
                  </div>
                </div>
              )}

              <div className="mx-6 border-t border-white/[0.08] sm:mx-7" />

              <div className="flex flex-col gap-2.5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-7 sm:py-5">
                <p className="min-w-0 text-[12.5px] sm:text-[13px] leading-[1.45] text-zinc-400">
                  Join{" "}
                  <span className="font-medium text-zinc-200">4,000+</span> designers
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubscribeOpen(true)}
                  className={`${secondaryCtaClass} shrink-0 self-start sm:self-center`}
                >
                  Subscribe
                </button>
              </div>

              <div className="mx-6 border-t border-white/[0.08] sm:mx-7" />

              <div className="flex items-center justify-between gap-3 px-6 py-4 pb-6 sm:gap-4 sm:px-7 sm:py-5 sm:pb-6">
                {READER_LOGOS.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className={
                      logo.className ??
                      "h-[18px] w-auto max-w-[44px] shrink-0 object-contain sm:h-5 sm:max-w-[48px]"
                    }
                    style={logo.style}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 z-10 rounded-2xl transition-[opacity,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                blurPlaybook
                  ? "opacity-100 backdrop-blur-[10px] bg-black/25"
                  : "opacity-0 backdrop-blur-none bg-transparent"
              }`}
            />
            </div>
          </section>
        </main>
      </div>

      {/* Subscribe modal with Substack iframe */}
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
            className="fixed z-[90] left-1/2 top-1/2 w-[90%] max-w-[440px]"
            style={{
              transformOrigin: "center",
              animation: isSubscribeClosing
                ? "subscribeSink 380ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
                : "subscribeRise 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #1f1f22",
                boxShadow:
                  "0 20px 50px -10px rgba(0,0,0,0.85), 0 8px 20px -4px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <span className="text-[12px] tracking-[0.18em] uppercase text-zinc-500">
                  Subscribe
                </span>
                <button
                  onClick={closeSubscribe}
                  aria-label="Close"
                  className="h-7 w-7 rounded-full hover:bg-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
