import appleNotesIcon from "@/assets/Apple-Logo.png";
import ollieIcon from "@/assets/OllieAIV1.png";

export type BuiltTool = {
  id: string;
  index: string;
  tag: string;
  name: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: {
    src: string;
    bg: string;
    fit?: "cover" | "contain";
    pad?: boolean;
    /** Force logo to solid black via CSS filter */
    mono?: boolean;
  };
};

export const BUILT_TOOLS: BuiltTool[] = [
  {
    id: "apple-notes-mcp",
    index: "01",
    tag: "Open source · MCP server",
    name: "Apple Notes MCP",
    description:
      "Connect AI assistants to Apple Notes so you can read, create, search, update, and delete notes through natural conversation.",
    href: "https://github.com/RodriguesJohn/applenotesmcp",
    ctaLabel: "View on GitHub",
    icon: {
      src: appleNotesIcon,
      bg: "#FFFFFF",
      fit: "contain",
      pad: true,
      mono: true,
    },
  },
  {
    id: "ollie-ai-figma",
    index: "02",
    tag: "Figma plugin · AI design assistant",
    name: "Ollie AI for Figma",
    description:
      "Use Ollie AI directly inside Figma as an AI design assistant for prompting, exploring, and supporting design work without leaving the canvas.",
    href: "https://www.figma.com/community/plugin/1599300216747325998/ollie-ai-for-figma",
    ctaLabel: "View Figma plugin",
    icon: {
      src: ollieIcon,
      bg: "#C4B5FD",
      fit: "cover",
    },
  },
];
