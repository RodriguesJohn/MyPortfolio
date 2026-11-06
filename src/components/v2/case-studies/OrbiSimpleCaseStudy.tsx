import { useNavigate } from "react-router-dom";
import orbiHeroVideo from "@/assets/orbi-hero.mp4";
import { display } from "@/components/v2/PageShell";

/**
 * Orbi AI case study. Layout follows omnagarkar.com/GuessCaseStudy on a
 * symmetric 12-column grid: headings in the left half (cols 1–6), all copy in
 * the right half (cols 7–12), full-width hero. One text colour throughout.
 */

const PRODUCT_URL = "https://www.heyorbi.ai/";

const grid = "grid grid-cols-1 gap-x-5 lg:grid-cols-12";
const overline =
  "m-0 text-[12px] font-medium uppercase leading-[1.5] tracking-[0.05em] text-zinc-50";
const smallBody =
  "text-[16px] leading-[1.65] tracking-[-0.01em] text-zinc-50 sm:text-[17px]";
const sectionTitle =
  "block text-[28px] font-medium leading-[1.15] tracking-[-0.035em] sm:text-[32px] lg:text-[36px]";

const OVERVIEW = [
  "Orbi AI is an AI-native content creation workspace for brands and creators. It started as a voice-first iOS app that turned spoken thoughts into tasks. It evolved into one studio where teams take an idea through script, research, video, motion graphics, repurposing, scheduling and analytics, without switching tools.",
  "A second brain holds the user’s real ideas and voice. An Orbi assistant works beside them in every tool: you lead, and Orbi does the work with you.",
  "I designed and built it end to end with Claude Code, and prototyped its agentic features on Anthropic’s API. I’m now building it as a Founder in Residence at Antler.",
];

const PROBLEM = [
  "Content is how brands and creators grow, but making it is broken. One idea passes through five or more apps for writing, editing, video, scheduling and analytics, and context gets lost at every step. AI writing tools produce content that sounds like everyone else, and audiences are starting to trust it less. And ideas disappear: they\u2019re captured in voice memos, notes and chats, then never come back as finished content.",
  "So teams either spend hours stitching tools together or publish AI content that doesn\u2019t sound like them. Orbi fixes this with one workspace, grounded in the user\u2019s own ideas and voice, with agents that work with the team instead of replacing it.",
];

const SectionHeader = ({
  highlight,
  title,
  paragraphs,
}: {
  highlight: string;
  title: string;
  paragraphs: string[];
}) => (
  <section className={`${grid} mt-20 lg:mt-28`}>
    <h2 className="m-0 mb-10 lg:col-span-6 lg:mb-0" style={display}>
      <span className={`${sectionTitle} text-zinc-50`}>
        {highlight}
      </span>
      <span className={`${sectionTitle} text-zinc-50`}>{title}</span>
    </h2>
    <div className="border-t border-white/[0.14] pt-4 lg:col-span-6 lg:col-start-7">
      {paragraphs.map((p, i) => (
        <p key={p} className={`m-0 ${i > 0 ? "mt-5" : ""} ${smallBody}`}>
          {p}
        </p>
      ))}
    </div>
  </section>
);

const OrbiSimpleCaseStudy = () => {
  const navigate = useNavigate();

  return (
    <article className="mx-auto w-full max-w-[1440px] px-6 pb-32 pt-20 sm:px-10 sm:pt-24 lg:px-20 xl:px-28">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="group mb-24 inline-flex items-center gap-2 text-[14px] font-medium text-zinc-50 transition-opacity hover:opacity-70 lg:mb-36"
      >
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to home
      </button>

      {/* Splash */}
      <header className="grid grid-cols-1 items-end gap-x-5 xl:grid-cols-12">
        <h1
          className="m-0 text-[32px] font-medium leading-[1.1] tracking-[-0.04em] sm:text-[40px] xl:col-span-6 xl:text-[48px]"
          style={display}
        >
          <span className="block text-zinc-50">Agentic Content Studio,</span>
          <span className="block text-zinc-50">Orbi AI</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 whitespace-nowrap xl:col-span-6 xl:col-start-7 xl:mt-0 xl:pb-[0.35em]">
          <p className={overline}>Antler Startup Residency</p>
          <p className={overline}>Founder, Design Engineer</p>
          <a
            href={PRODUCT_URL}
            target="_blank"
            rel="noreferrer"
            className="m-0 text-[12px] font-medium uppercase leading-[1.5] tracking-[0.05em] text-zinc-50 underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:decoration-zinc-50"
          >
            Visit the product ↗
          </a>
        </div>
      </header>

      <figure className="m-0 mt-6 overflow-hidden rounded-[16px] [transform:translateZ(0)]">
        <video
          src={orbiHeroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="block h-auto w-full"
          style={{ aspectRatio: "3704/2160" }}
          aria-label="Orbi AI agentic content studio demo"
        />
      </figure>

      <SectionHeader
        highlight="An AI-native studio"
        title="for brands and creators"
        paragraphs={OVERVIEW}
      />

      <SectionHeader
        highlight="Content drives growth,"
        title="but making it is broken"
        paragraphs={PROBLEM}
      />
    </article>
  );
};

export default OrbiSimpleCaseStudy;
