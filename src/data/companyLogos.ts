// Logos are trimmed to their exact edges (src/assets/logos), so sizing by
// height alone is predictable and nothing gets cropped.
import appleLogo from "@/assets/logos/apple.png";
import metaLogo from "@/assets/logos/meta.png";
import googleLogo from "@/assets/logos/google.png";
import chaseLogo from "@/assets/logos/chase.png";
import citiLogo from "@/assets/logos/citi.png";
import tocaLogo from "@/assets/logos/toca.png";
import notableLogo from "@/assets/logos/notable.png";
import intercomLogo from "@/assets/intercom-2.svg";

export type CompanyLogo = {
  src: string;
  label: string;
  /** Height in px. Wordmarks share one cap height; symbols sit a touch taller to match visually. */
  height: number;
  /** Dark-ink marks that need flipping to white on dark backgrounds. */
  darkInk?: boolean;
};

export const WORKED_AT: CompanyLogo[] = [
  { src: chaseLogo, label: "JPMorgan Chase", height: 11, darkInk: true },
  { src: citiLogo, label: "Citi", height: 17 },
  { src: tocaLogo, label: "Toca", height: 13, darkInk: true },
  { src: notableLogo, label: "Notable", height: 12 },
];

export const RESOURCES_TRUSTED_BY: CompanyLogo[] = [
  { src: appleLogo, label: "Apple", height: 17, darkInk: true },
  { src: intercomLogo, label: "Intercom", height: 18 },
  { src: googleLogo, label: "Google", height: 15 },
  { src: metaLogo, label: "Meta", height: 14 },
];
