import florenceHero from "@/assets/florence-design-system.jpg";

export const FLORENCE_URL = "https://www.humanaistudio.io/florence";

export type DesignSystemEpisode = {
  id: string;
  part: string;
  title: string;
  description: string;
  /** Drop in a local import or remote URL when ready */
  videoSrc?: string;
  posterSrc?: string;
  /** YouTube video id for embed */
  youtubeId?: string;
  /** Optional start time in seconds */
  youtubeStart?: number;
};

/** Three-part short course: manifesto + two deep dives */
export const DESIGN_SYSTEM_COURSE: DesignSystemEpisode[] = [
  {
    id: "part-1",
    part: "01",
    title: "Design systems as infrastructure for agents",
    description: "The manifesto. Why component libraries fail agents.",
    youtubeId: "2IYfsPch3a8",
    youtubeStart: 9,
  },
  {
    id: "part-2",
    part: "02",
    title: "Why design systems break for agents",
    description:
      "Where tokens, components, and docs leave models guessing.",
    youtubeId: "OqrxSgWpRvs",
  },
  {
    id: "part-3",
    part: "03",
    title: "What an AI-ready system actually needs",
    description:
      "Structure agents can parse. Intent next to the component.",
    youtubeId: "O-F7nxE2IEo",
  },
];

/** @deprecated Prefer DESIGN_SYSTEM_COURSE */
export const DESIGN_SYSTEM_MANIFESTO_VIDEO = {
  youtubeId: DESIGN_SYSTEM_COURSE[0].youtubeId!,
  start: DESIGN_SYSTEM_COURSE[0].youtubeStart ?? 0,
  title: DESIGN_SYSTEM_COURSE[0].title,
} as const;

/** @deprecated Prefer DESIGN_SYSTEM_COURSE */
export const DESIGN_SYSTEM_SERIES = DESIGN_SYSTEM_COURSE.slice(1);

export const FLORENCE_HERO = {
  src: florenceHero,
  alt: "Florence AI-ready design system",
  href: FLORENCE_URL,
};
