import { Children, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import ProfileShader from "@/components/v2/ProfileShader";
import PanelParticles from "@/components/v2/PanelParticles";
import StrokeText from "@/components/v2/StrokeText";
import {
  v2NelsonChild,
  v2NelsonFade,
  v2NelsonShell,
  v2NelsonY,
} from "@/components/v2/motion";
import profilePhoto from "@/assets/profile-photo.jpeg";

const sans = {
  fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
};

/** One heading level: name in full ink, roles a step quieter at the same size. */
const HEADING_LINES = [
  { text: "John Rodrigues", className: "v2-side-panel-title" },
  { text: "Senior Product Designer", className: "v2-side-panel-subtitle" },
  { text: "Design Engineer", className: "v2-side-panel-subtitle" },
];

/** The panel surface rises in first, then hands off to its contents' stagger. */
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      y: v2NelsonY,
      opacity: v2NelsonFade,
      delayChildren: 0.12,
      staggerChildren: 0.08,
    },
  },
};

/** Gradient + particles settle in last, slowly, once the text has landed. */
const horizonVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Exploration (/v2): one tall framed panel in place of the slim sidebar.
 * Intro text up top, then the CTAs (`children`) and `footer` (the logo rows),
 * with a shader gradient fading up from the bottom of the panel.
 *
 * Entrance follows nelson.co: each line blurs in, fades and rises 16px on a
 * critically damped spring, staggered 80ms top to bottom.
 */
const SidePanel = ({
  children,
  footer,
  card,
}: {
  children?: ReactNode;
  footer?: ReactNode;
  /** Sits in the gradient at the bottom, above the (fixed) chat dock on desktop. */
  card?: ReactNode;
}) => {
  const [replay, setReplay] = useState(0);

  return (
  <motion.section
    className="v2-side-panel relative flex h-full min-h-[640px] flex-col overflow-hidden rounded-[28px] px-7 pb-7 pt-7 lg:min-h-0 lg:pb-[88px]"
    variants={panelVariants}
  >
    <motion.div
      className="pointer-events-none absolute inset-0"
      variants={horizonVariants}
      aria-hidden="true"
    >
      {/* Progressive gradient: shader fading up into the panel surface */}
      <div className="v2-side-panel-horizon absolute inset-x-0 bottom-0 h-[46%] opacity-[0.55]">
        <ProfileShader shift={1.7} />
      </div>
      {/* Dust motes drifting up through the gradient */}
      <div className="v2-side-panel-horizon absolute inset-x-0 bottom-0 h-[46%]">
        <PanelParticles />
      </div>
    </motion.div>

    <motion.span
      className="v2-side-panel-avatar relative z-10 block size-12 overflow-hidden rounded-full"
      variants={v2NelsonChild}
    >
      <img
        src={profilePhoto}
        alt=""
        className="absolute inset-0 size-full origin-[58%_10%] scale-[1.2] object-cover"
      />
    </motion.span>

    {/* Each line draws its outline letter by letter, then fills; hover redraws. */}
    <h1
      className="relative z-10 mt-5 whitespace-nowrap text-[22px] leading-[1.18] tracking-[-0.025em]"
      style={{ ...sans, fontWeight: 500 }}
      onMouseEnter={() => setReplay((n) => n + 1)}
    >
      {HEADING_LINES.map((line, i) => (
        <StrokeText
          key={line.text}
          text={line.text}
          className={line.className}
          delay={0.25 + i * 0.18}
          drawDuration={1.6}
          stagger={0.05}
          fillDelay={0.2}
          strokeColor="#A78BFA"
          strokeWidth={0.8}
          replayKey={replay}
        />
      ))}
    </h1>

    <motion.p
      className="v2-side-panel-body relative z-10 mt-7 max-w-[290px] text-[14px] leading-[1.5] [text-wrap:pretty]"
      style={sans}
      variants={v2NelsonChild}
    >
      8+ years, based in the SF Bay Area. Previously at JPMorgan Chase,
      Citibank, and Toca. Founded Human AI Studio.
    </motion.p>

    {children && (
      <motion.div
        className="relative z-10 mt-6 flex flex-col gap-2.5"
        variants={v2NelsonShell}
      >
        {Children.map(children, (child) => (
          <motion.div className="flex" variants={v2NelsonChild}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )}

    {footer && (
      <motion.div
        className="v2-side-panel-logos relative z-10 mt-6 border-t pt-5"
        variants={v2NelsonChild}
      >
        {footer}
      </motion.div>
    )}

    {card && (
      <motion.div className="relative z-10 mt-auto pt-6" variants={v2NelsonChild}>
        {card}
      </motion.div>
    )}
  </motion.section>
  );
};

export default SidePanel;
