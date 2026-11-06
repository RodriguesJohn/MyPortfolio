import orbiHeroVideo from "@/assets/orbi-hero.mp4";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  CaseStudySplash,
} from "@/components/v2/case-studies/EditorialCaseStudy";

const PRODUCT_URL = "https://www.heyorbi.ai/";

const OVERVIEW = [
  "Orbi AI is an AI-native content creation workspace for brands and creators. It started as a voice-first iOS app that turned spoken thoughts into tasks. It evolved into one studio where teams take an idea through script, research, video, motion graphics, repurposing, scheduling and analytics, without switching tools.",
  "A second brain holds the user’s real ideas and voice. An Orbi assistant works beside them in every tool: you lead, and Orbi does the work with you.",
  "I designed and built it end to end with Claude Code, and prototyped its agentic features on Anthropic’s API. I’m now building it as a Founder in Residence at Antler.",
];

const PROBLEM = [
  "Content is how brands and creators grow, but making it is broken. One idea passes through five or more apps for writing, editing, video, scheduling and analytics, and context gets lost at every step. AI writing tools produce content that sounds like everyone else, and audiences are starting to trust it less. And ideas disappear: they’re captured in voice memos, notes and chats, then never come back as finished content.",
  "So teams either spend hours stitching tools together or publish AI content that doesn’t sound like them. Orbi fixes this with one workspace, grounded in the user’s own ideas and voice, with agents that work with the team instead of replacing it.",
];

const OrbiSimpleCaseStudy = () => (
  <CaseStudyPage>
    <CaseStudySplash
      titleLines={["Agentic Content Studio,", "Orbi AI"]}
      details={[
        { label: "Antler Startup Residency" },
        { label: "Founder, Design Engineer" },
        { label: "Visit the product", href: PRODUCT_URL },
      ]}
    />

    <CaseStudyHero>
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
    </CaseStudyHero>

    <CaseStudySection
      titleLines={["An AI-native studio", "for brands and creators"]}
      paragraphs={OVERVIEW}
    />
    <CaseStudySection
      titleLines={["Content drives growth,", "but making it is broken"]}
      paragraphs={PROBLEM}
    />
  </CaseStudyPage>
);

export default OrbiSimpleCaseStudy;
