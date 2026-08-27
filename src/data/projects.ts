// Highlights
import orbiHero from "@/assets/rbai-hero.png";
import outfixVideo from "@/assets/OutfixV2.mp4";
import outfixHero from "@/assets/outfixHero.png";
import ollieVideo from "@/assets/OllieAIDemo.mp4";
import uxAgentVideo from "@/assets/V2UXAgent.mp4";
import aiMentorVideo from "@/assets/AIMentor.mp4";
import vibespaceVideo from "@/assets/vibespace.mp4";
import designSystemAgentVideo from "@/assets/automate-design-systems-ai-agents.mp4";
import cardMotionVideo from "@/assets/Card.mp4";
import aiSummaryVideo from "@/assets/AISummary.mp4";
import appleNotesMcpVideo from "@/assets/IMG_7590.mov";
import florenceImage from "@/assets/florence-design-system.jpg";
import florenceF2Video from "@/assets/florence-f2.mp4";
import dcbImage from "@/assets/dcb-accounts-overview.jpg";

// Past Work
import noScrollImage from "@/assets/NoScrollApp.png";
import aiInsightsVideo from "@/assets/AI Insights App.mp4";
import tocaVideo from "@/assets/MyTocaApp.mp4";
import balanceTransferVideo from "@/assets/BT.mp4";

export type Media =
  | {
      type: "video";
      src: string;
      poster?: string;
      fit?: "cover" | "contain";
      bg?: string;
      /** Soft matte around the media so light UIs separate from the page. */
      pad?: boolean;
      objectPosition?: string;
      /** CSS aspect-ratio value, e.g. "16/9" or "4/3". */
      aspect?: string;
    }
  | {
      type: "image";
      src: string;
      fit?: "cover" | "contain";
      bg?: string;
      /** Soft matte around the media so light UIs separate from the page. */
      pad?: boolean;
      objectPosition?: string;
      /** CSS aspect-ratio value, e.g. "16/9" or "4/3". */
      aspect?: string;
    };

export type ProjectScopeCard = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  meta: string;
  description: string;
  longDescription?: string;
  aboutContext?: string;
  scopeCards?: ProjectScopeCard[];
  slidesUrl?: string;
  appStoreUrl?: string;
  macDownloadUrl?: string;
  media: Media;
  tag?: string;
  href?: string;
  /** Switch to this feed tab on the home page instead of navigating away. */
  feedTab?:
    | "work"
    | "experiments"
    | "systems"
    | "tools"
    | "blog"
    | "testimonials";
  /** External CTA on the work detail page (does not replace in-app navigation). */
  ctaUrl?: string;
  ctaLabel?: string;
};

const orbiAI: Project = {
  slug: "orbi-ai",
  name: "Orbi AI",
  year: "2026",
  meta: "AI note taker for creators",
  description:
    "iOS app for creators. Capture voice notes, thoughts, and ideas — then organize and repurpose them into content later.",
  slidesUrl:
    "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdeck%2FkmEskNJDRsWB58Pm89LvtZ%2FCaseStudyPresentation---Orbi-AI%3Fnode-id%3D1-306%26scaling%3Dmin-zoom%26content-scaling%3Dfixed",
  appStoreUrl: "https://apps.apple.com/us/app/orbi-voice-tasks-reminders/id6754195534",
  macDownloadUrl: "https://apps.apple.com/us/app/orbi-voice-tasks-reminders/id6754195534",
  scopeCards: [
    { label: "Type", value: "Personal project" },
    { label: "Type", value: "0 → 1" },
    { label: "Status", value: "Shipped" },
    { label: "Year", value: "2026" },
  ],
  media: {
    type: "image",
    src: orbiHero,
    fit: "cover",
    bg: "#f4f4f5",
    objectPosition: "center center",
  },
};

const olliAI: Project = {
  slug: "olli-ai",
  name: "OllieAI",
  year: "2025",
  meta: "Figma plugin · Claude Code",
  description:
    "Bridge between Claude Code and the Figma canvas. Prompts in chat → generated frames and components.",
  ctaUrl:
    "https://www.figma.com/community/plugin/1599300216747325998/ollie-ai-for-figma",
  ctaLabel: "Get the plugin",
  media: {
    type: "video",
    src: ollieVideo,
    fit: "cover",
  },
};

const outfixAI: Project = {
  slug: "outfitx-ai",
  name: "Outfix AI Project",
  year: "2025",
  meta: "AI styling · 0 to 1 product",
  description:
    "AI styling product exploration for outfit intelligence, visual taste, and assisted wardrobe workflows.",
  slidesUrl:
    "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdeck%2FeRoGgpMtsBRLJyrgTTM8Hf%2FCase-Study-%257C-Outfix-AI%3Fnode-id%3D1-859%26viewport%3D22%252C198%252C0.2%26t%3DELVdFBt1BLLPABKe-1%26scaling%3Dmin-zoom%26content-scaling%3Dfixed%26page-id%3D0%253A1",
  scopeCards: [
    { label: "Type", value: "Founder build" },
    { label: "Stage", value: "0 → 1" },
    { label: "Status", value: "Live" },
    { label: "Year", value: "2025" },
  ],
  media: {
    type: "video",
    src: outfixVideo,
    poster: outfixHero,
    fit: "contain",
    bg: "#000000",
    objectPosition: "center center",
    aspect: "1816/1080",
  },
  tag: "Live",
};

const citiAiInsights: Project = {
  slug: "ai-insights-citi",
  name: "AI Builder Academy",
  year: "2023",
  meta: "Citi · Consumer banking",
  description:
    "AI insights surface inside the Citi consumer banking app. Shipped to 20M+ users.",
  media: { type: "video", src: aiInsightsVideo },
};

const citiBalanceTransfer: Project = {
  slug: "balance-transfer-citi",
  name: "Balance Transfer, Citi",
  year: "2022",
  meta: "Citi · Consumer banking",
  description:
    "Balance transfer feature for ~20M Citi Mobile users, transferring balances from prior creditors to Citi on iOS.",
  longDescription:
    "End-to-end mobile balance transfer: discovery, research, UI, and prototype through developer handoff. Mobile-first redesign solving web flow pain points at scale.",
  aboutContext:
    "Shipped inside Citi Mobile for consumer banking. Collaborated with creative direction, UX writing, product, legal/compliance, and engineering.",
  scopeCards: [
    { label: "My Role", value: "Product Designer" },
    { label: "Responsibility", value: "UI & Interaction Design" },
    { label: "Timeline", value: "Shipped" },
    { label: "Nature", value: "Feature Design" },
  ],
  media: {
    type: "video",
    src: balanceTransferVideo,
    fit: "cover",
    bg: "#0a0a0a",
    objectPosition: "center center",
    aspect: "1976/1080",
  },
};

export const HIGHLIGHTS: Project[] = [
  orbiAI,
  {
    slug: "florence-design-system",
    name: "Florence",
    year: "2026",
    meta: "AI-ready design system",
    description:
      "Agent-ready design system with documented components, guidelines, and patterns for AI-native product work.",
    feedTab: "systems",
    media: {
      type: "video",
      src: florenceF2Video,
      poster: florenceImage,
      fit: "contain",
      bg: "#0a0a0a",
      objectPosition: "center center",
      aspect: "1024/682",
    },
  },
  {
    slug: "digital-commercial-banking",
    name: "Startup Banking by JPMorgan Chase",
    year: "2020–21",
    meta: "JPMorgan Chase · B2B",
    description:
      "Designed institutional-side B2B banking platform for commercial users at JPMorgan Chase.",
    media: {
      type: "image",
      src: dcbImage,
      fit: "contain",
      bg: "#c8c8c8",
      objectPosition: "center center",
      aspect: "4/3",
    },
  },
  outfixAI,
  citiBalanceTransfer,
  olliAI,
];

/** Shown on /v2/work under “AI tools I built” */
export const AI_TOOLS_BUILT: Project[] = [
  {
    slug: "design-system-agent-jpmc",
    name: "Design system Agent for JPMC",
    year: "2025",
    meta: "Enterprise agent · Design systems",
    description:
      "Agent concept for accelerating enterprise design-system work, documentation, and component production.",
    media: {
      type: "video",
      src: designSystemAgentVideo,
      fit: "cover",
      objectPosition: "center",
    },
  },
  orbiAI,
  {
    slug: "oliver-ai",
    name: "OliverAI",
    year: "2025",
    meta: "AI mentor · Learning agent",
    description:
      "AI mentor experience for guided practice, conversation, and personalized learning support.",
    media: {
      type: "video",
      src: aiMentorVideo,
      fit: "cover",
      objectPosition: "center 22%",
    },
  },
  olliAI,
  {
    slug: "ai-design-academy",
    name: "AI Design Academy",
    year: "2025",
    meta: "Education · AI workflows",
    description:
      "Hands-on AI design education platform and curriculum for designers learning AI-native workflows.",
    media: {
      type: "video",
      src: vibespaceVideo,
      fit: "cover",
      objectPosition: "center",
    },
    href: "https://www.theaidesignacademy.com/",
  },
  {
    slug: "ux-ai-agent",
    name: "UX AI Agent",
    year: "2025",
    meta: "Agentic UX research",
    description:
      "AI-powered UX design agent. Winner of the OpenAI · Lovable · AGI hackathon.",
    media: { type: "video", src: uxAgentVideo },
    tag: "Hackathon Winner",
  },
  {
    slug: "react-motion-library-skill",
    name: "React Motion library skill",
    year: "2025",
    meta: "Skill · Motion system",
    description:
      "Reusable motion skill and library patterns for React interfaces, transitions, and animation craft.",
    media: {
      type: "video",
      src: cardMotionVideo,
      fit: "cover",
    },
  },
  {
    slug: "newsletter-research-agent",
    name: "Newsletter Research Agent",
    year: "2025",
    meta: "Agent · Research workflow",
    description:
      "Research agent for gathering signals, summarizing sources, and turning raw material into newsletter-ready briefs.",
    media: { type: "video", src: aiSummaryVideo, fit: "cover" },
  },
  outfixAI,
  {
    slug: "apple-notes-mcp",
    name: "Apple Notes MCP",
    year: "2025",
    meta: "MCP · Personal knowledge",
    description:
      "MCP workflow connecting Apple Notes into agentic research, retrieval, and personal knowledge tasks.",
    media: {
      type: "video",
      src: appleNotesMcpVideo,
      fit: "cover",
      objectPosition: "center",
    },
  },
];

export const PAST: Project[] = [
  {
    slug: "no-scroll-ios",
    name: "No Scroll",
    year: "2024",
    meta: "iOS · 4.6★ · 50K users",
    description:
      "Redesigned an attention-management app. Hit 4.6 rating with 50K active users on the App Store.",
    media: { type: "image", src: noScrollImage },
    tag: "Shipped",
    href: "https://apps.apple.com/us/app/no-scroll-limit-screen-time/id6474079216",
  },
  citiAiInsights,
  {
    slug: "toca-football",
    name: "TOCA Football",
    year: "2023–24",
    meta: "$25M raised · Early-stage",
    description:
      "Lead designer through Series funding. Shipped consumer-facing app and end-to-end product surfaces.",
    media: { type: "video", src: tocaVideo },
  },
  citiBalanceTransfer,
];

export const ALL_PROJECTS: Project[] = [...HIGHLIGHTS, ...AI_TOOLS_BUILT, ...PAST];

/** Unified, de-duplicated list for /v2/work grid */
export const V2_WORK_PROJECTS: Project[] = (() => {
  const seen = new Set<string>();
  const out: Project[] = [];
  for (const list of [HIGHLIGHTS, AI_TOOLS_BUILT, PAST]) {
    for (const project of list) {
      if (seen.has(project.slug)) continue;
      seen.add(project.slug);
      out.push(project);
    }
  }
  return out;
})();

export const getProjectBySlug = (slug: string): Project | undefined =>
  ALL_PROJECTS.find((p) => p.slug === slug);
