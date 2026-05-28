// Highlights
import orbiVideo from "@/assets/EvaAIV2.mov";
import outfixVideo from "@/assets/OutfixV2.mp4";
import outfixHero from "@/assets/outfixHero.png";
import ollieVideo from "@/assets/OllieAIDemo.mp4";
import uxAgentVideo from "@/assets/V2UXAgent.mp4";
import aiMentorVideo from "@/assets/AIMentor.mp4";
import aiCapExplorationImage from "@/assets/AICapExploration.png";
import figmaWorkspaceImage from "@/assets/FigmaWorkspace.jpg";
import cardMotionVideo from "@/assets/Card.mp4";
import aiSummaryVideo from "@/assets/AISummary.mp4";
import appleLogoImage from "@/assets/Apple-Logo.png";

// Past Work
import noScrollImage from "@/assets/NoScrollApp.png";
import aiInsightsVideo from "@/assets/AI Insights App.mp4";
import tocaVideo from "@/assets/MyTocaApp.mp4";
import balanceTransferVideo from "@/assets/BT.mp4";
import dcbImage from "@/assets/DCB.png";

export type Media =
  | {
      type: "video";
      src: string;
      poster?: string;
      fit?: "cover" | "contain";
      bg?: string;
      objectPosition?: string;
    }
  | {
      type: "image";
      src: string;
      fit?: "cover" | "contain";
      bg?: string;
      objectPosition?: string;
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
};

const orbiAI: Project = {
  slug: "orbi-ai",
  name: "Orbi AI",
  year: "2026",
  meta: "Agentic Second Brain",
  description:
    "Voice-first iOS productivity app with proactive follow-ups, shipped to the App Store.",
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
    type: "video",
    src: "/orbi-website/OrbiDemo.web.mp4",
    fit: "contain",
    bg: "#09090b",
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
  media: { type: "video", src: ollieVideo },
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
    bg: "#0a0a0a",
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
    { label: "Timeline", value: "Ongoing" },
    { label: "Nature", value: "Feature Design" },
  ],
  media: {
    type: "video",
    src: balanceTransferVideo,
    fit: "contain",
    bg: "#0a0a0a",
    objectPosition: "center center",
  },
};

export const HIGHLIGHTS: Project[] = [
  orbiAI,
  {
    slug: "digital-commercial-banking",
    name: "Digital Commercial Banking Platform",
    year: "2020–21",
    meta: "JPMorgan Chase · B2B",
    description:
      "Designed institutional-side B2B banking platform for commercial users at JPMorgan Chase.",
    media: { type: "image", src: dcbImage },
  },
  citiAiInsights,
  outfixAI,
  citiBalanceTransfer,
  olliAI,
];

/** Shown on /v2/work under “AI tools I built” */
export const AI_TOOLS_BUILT: Project[] = [
  orbiAI,
  {
    slug: "oliver-ai",
    name: "OliverAI",
    year: "2025",
    meta: "AI mentor · Learning agent",
    description:
      "AI mentor experience for guided practice, conversation, and personalized learning support.",
    media: { type: "video", src: aiMentorVideo, fit: "cover" },
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
      type: "image",
      src: aiCapExplorationImage,
      fit: "cover",
      objectPosition: "center",
    },
    href: "https://www.theaidesignacademy.com/",
  },
  {
    slug: "design-system-agent-jpmc",
    name: "Design system Agent for JPMC",
    year: "2025",
    meta: "Enterprise agent · Design systems",
    description:
      "Agent concept for accelerating enterprise design-system work, documentation, and component production.",
    media: {
      type: "image",
      src: figmaWorkspaceImage,
      fit: "cover",
      objectPosition: "center",
    },
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
      type: "image",
      src: appleLogoImage,
      fit: "contain",
      bg: "#f7f7f7",
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
