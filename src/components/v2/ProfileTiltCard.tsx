import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import profileVideo from "@/assets/profile-video.mp4";
import logoCursor from "@/assets/logo-cursor.png";
import logoClaude from "@/assets/logo-claude.png";
import logoClaudeCode from "@/assets/logo-claude-code.png";
import logoFigma from "@/assets/logo-figma.png";
import logoReact from "@/assets/logo-react.png";
import logoGithub from "@/assets/logo-github.png";
import logoSwift from "@/assets/logo-swift.png";
import {
  v2ProfileBack,
  v2ProfileFloat,
  v2ProfileFront,
  v2ProfileMid,
  v2ProfileStack,
  v2SpringSoft,
} from "@/components/v2/motion";

const handwritten = {
  fontFamily: "'Kalam', 'Nothing You Could Do', cursive",
};

const HIGHLIGHT_NOTES = [
  "Orbi AI — AI note taker for creators",
  "20M+ users shipped across banks",
  "JPMC commercial banking platform",
  "Design system agent for JPMC",
  "OllieAI + Outfix AI experiments",
  "AI Design Academy curriculum",
];

const TOOLBOX_LOGOS = [
  { src: logoCursor, label: "Cursor" },
  { src: logoClaudeCode, label: "Claude Code" },
  { src: logoClaude, label: "Claude" },
  { src: logoFigma, label: "Figma" },
  { src: logoReact, label: "React" },
  { src: logoGithub, label: "GitHub" },
  { src: logoSwift, label: "Swift" },
] as const;

const ProfileCardContent = ({ large = false }: { large?: boolean }) => (
  <>
    <div className="v2-profile-shader" aria-hidden="true" />
    <div className="v2-profile-shader-noise" aria-hidden="true" />

    <div className="relative z-10">
      <div
        className={`relative overflow-hidden rounded-full bg-zinc-950 ring-2 ring-white/55 ${
          large ? "size-[148px]" : "size-[108px]"
        }`}
      >
        <video
          src={profileVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="John Rodrigues"
          className="absolute inset-0 size-full scale-[1.22] object-cover object-[center_32%]"
        />
      </div>

      <div className={`space-y-1.5 ${large ? "mt-5" : "mt-3.5"}`}>
        <h1
          className={`v2-profile-name leading-none text-white whitespace-normal sm:whitespace-nowrap ${
            large ? "text-[30px]" : "text-[24px]"
          }`}
          style={{ ...handwritten, fontWeight: 700 }}
        >
          John Rodrigues
        </h1>

        <p
          className={`v2-profile-role leading-none text-white/85 ${
            large ? "text-[17px]" : "text-[15px]"
          }`}
          style={{ ...handwritten, fontWeight: 500 }}
        >
          Design Engineer
        </p>

        <p
          className={`pt-1.5 leading-[1.5] text-white/85 ${
            large ? "text-[15px]" : "text-[13.5px]"
          }`}
          style={{
            fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400,
          }}
        >
          I focus on 0→1 AI-native products, design systems, and agentic
          experiences. Founder of Human AI Studio.
        </p>
      </div>
    </div>
  </>
);

const ToolboxNoteContent = () => (
  <>
    <div className="v2-profile-shader v2-profile-shader--note" aria-hidden="true" />
    <div className="v2-profile-shader-noise" aria-hidden="true" />
    <div className="relative z-10 flex h-full flex-col">
      <p
        className="text-[13px] leading-none text-white/70"
        style={{ ...handwritten, fontWeight: 500 }}
      >
        toolbox
      </p>
      <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-4">
        {TOOLBOX_LOGOS.map((logo) => (
          <div key={logo.label} className="flex flex-col items-center gap-1.5">
            <span className="inline-flex size-11 items-center justify-center overflow-hidden rounded-[12px] bg-white/95">
              <img
                src={logo.src}
                alt=""
                className="size-full object-cover"
              />
            </span>
            <span
              className="max-w-full truncate text-center text-[11px] leading-none text-white/90"
              style={{ ...handwritten, fontWeight: 500 }}
            >
              {logo.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </>
);

const HighlightsNoteContent = () => (
  <>
    <div className="v2-profile-shader v2-profile-shader--note" aria-hidden="true" />
    <div className="v2-profile-shader-noise" aria-hidden="true" />
    <div className="relative z-10 flex h-full flex-col">
      <p
        className="text-[13px] leading-none text-white/70"
        style={{ ...handwritten, fontWeight: 500 }}
      >
        work highlights
      </p>
      <ul className="mt-4 space-y-2.5">
        {HIGHLIGHT_NOTES.map((note, index) => (
          <li
            key={note}
            className="flex gap-2 text-[14px] leading-[1.3] text-white"
            style={{
              ...handwritten,
              fontWeight: 500,
              transform: `rotate(${index % 2 === 0 ? 0.5 : -0.8}deg)`,
            }}
          >
            <span className="mt-[0.15em] shrink-0 text-white/55">•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
);

const ProfileTiltCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeCards = () => {
    if (closing) return;
    setClosing(true);
    setExpanded(false);
  };

  useEffect(() => {
    if (!expanded && !closing) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCards();
    };

    const previousOverflow = document.body.style.overflow;
    if (expanded) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded, closing]);

  return (
    <>
      <motion.div
        className="relative z-50 mb-3 w-full max-w-[210px] overflow-visible sm:mb-5 sm:max-w-[230px]"
        initial={{ opacity: 0, y: 18, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={v2SpringSoft}
        style={{ zIndex: expanded || closing ? 90 : 50 }}
      >
        <motion.button
          type="button"
          className="v2-profile-stack group w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left"
          initial="rest"
          animate={expanded ? "rest" : "float"}
          variants={v2ProfileFloat}
          onClick={() => {
            setClosing(false);
            setExpanded(true);
          }}
          aria-expanded={expanded}
          aria-controls={titleId}
          aria-label="Open profile cards"
        >
          <motion.div
            className="v2-profile-stack-inner"
            initial="rest"
            animate={expanded ? "open" : "rest"}
            whileHover={expanded ? undefined : "hover"}
            variants={v2ProfileStack}
          >
            {expanded ? (
              <>
                <div
                  className="v2-profile-stack-card absolute inset-x-4 top-2.5 aspect-[3/4] rounded-[24px] opacity-0"
                  aria-hidden="true"
                />
                <div
                  className="v2-profile-stack-card absolute inset-x-2 top-1 aspect-[3/4] rounded-[24px] opacity-0"
                  aria-hidden="true"
                />
                <div
                  className="v2-profile-stack-card relative overflow-hidden rounded-[24px] p-4 opacity-0"
                  aria-hidden="true"
                >
                  <ProfileCardContent />
                </div>
              </>
            ) : (
              <>
                <motion.div
                  layoutId="v2-profile-about-card"
                  className="v2-profile-stack-card v2-profile-stack-card--back absolute inset-x-4 top-2.5 aspect-[3/4] rounded-[24px]"
                  variants={v2ProfileBack}
                  transition={v2SpringSoft}
                  style={{ zIndex: closing ? 92 : undefined }}
                  aria-hidden="true"
                />
                <motion.div
                  layoutId="v2-profile-highlights-card"
                  className="v2-profile-stack-card v2-profile-stack-card--mid absolute inset-x-2 top-1 aspect-[3/4] rounded-[24px]"
                  variants={v2ProfileMid}
                  transition={v2SpringSoft}
                  style={{ zIndex: closing ? 93 : undefined }}
                  aria-hidden="true"
                />
                <motion.div
                  layoutId="v2-profile-front-card"
                  className="v2-profile-stack-card v2-profile-stack-card--front relative rounded-[24px] shadow-[0_22px_52px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/25"
                  variants={v2ProfileFront}
                  transition={v2SpringSoft}
                  style={{ zIndex: closing ? 94 : undefined }}
                  onLayoutAnimationComplete={() => {
                    if (closing) setClosing(false);
                  }}
                >
                  <div className="v2-profile-card-whiteboard relative h-full overflow-hidden rounded-[24px] p-4">
                    <ProfileCardContent />
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <motion.button
                  type="button"
                  className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/30"
                  style={{ WebkitBackdropFilter: "blur(12px)" }}
                  aria-label="Close profile cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  onClick={closeCards}
                />

                <div
                  id={titleId}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Profile cards"
                  className="relative z-10 flex w-full max-w-[980px] flex-col items-center justify-center gap-4 md:flex-row md:items-stretch md:gap-0"
                >
                  <motion.article
                    layoutId="v2-profile-about-card"
                    className="relative w-full max-w-[260px] rounded-[28px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/25 md:-mr-6 md:mt-8 md:rotate-[-8deg]"
                    transition={v2SpringSoft}
                    style={{ zIndex: 95 }}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="v2-profile-card-whiteboard relative overflow-hidden rounded-[28px] p-5">
                      <ToolboxNoteContent />
                    </div>
                  </motion.article>

                  <motion.article
                    layoutId="v2-profile-front-card"
                    className="relative z-20 w-full max-w-[300px] rounded-[28px] shadow-[0_34px_90px_-28px_rgba(0,0,0,0.6)] ring-1 ring-white/30 md:scale-[1.04]"
                    transition={v2SpringSoft}
                    style={{ zIndex: 96 }}
                  >
                    <div className="v2-profile-card-whiteboard relative overflow-hidden rounded-[28px] p-6">
                      <ProfileCardContent large />
                    </div>
                  </motion.article>

                  <motion.article
                    layoutId="v2-profile-highlights-card"
                    className="relative w-full max-w-[260px] rounded-[28px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/25 md:-ml-6 md:mt-8 md:rotate-[8deg]"
                    transition={v2SpringSoft}
                    style={{ zIndex: 95 }}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="v2-profile-card-whiteboard relative overflow-hidden rounded-[28px] p-5">
                      <HighlightsNoteContent />
                    </div>
                  </motion.article>

                  <button
                    type="button"
                    className="absolute -bottom-14 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/25 md:-bottom-16"
                    onClick={closeCards}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default ProfileTiltCard;
