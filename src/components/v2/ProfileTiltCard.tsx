import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  PROFILE_GITHUB_URL,
  PROFILE_LINKEDIN_URL,
  PROFILE_SUBSTACK_URL,
  PROFILE_X_URL,
} from "@/config/profileLinks";
import { AnimatePresence, motion } from "framer-motion";
import ProfileShader from "@/components/v2/ProfileShader";
import {
  RESOURCES_TRUSTED_BY,
  WORKED_AT,
  type CompanyLogo,
} from "@/data/companyLogos";
import profilePhoto from "@/assets/profile-photo.jpeg";
import {
  v2ProfileBack,
  v2ProfileFloat,
  v2ProfileFront,
  v2ProfileMid,
  v2ProfileStack,
  v2SpringSoft,
} from "@/components/v2/motion";

const sans = {
  fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
};

const HELPFUL_LINKS = [
  { label: "Resume", href: "/JohnRodriguesResume.pdf" },
  { label: "Course", href: "https://www.humanaistudio.io/academy" },
  { label: "GitHub", href: PROFILE_GITHUB_URL },
  { label: "LinkedIn", href: PROFILE_LINKEDIN_URL },
  { label: "Substack", href: PROFILE_SUBSTACK_URL },
  { label: "X", href: PROFILE_X_URL },
];

const ProfileCardContent = ({ large = false }: { large?: boolean }) => (
  <>
    <ProfileShader />

    <div className="relative z-10">
      <div
        className={`relative overflow-hidden rounded-full bg-zinc-950 ring-2 ring-white/55 ${
          large ? "size-[112px]" : "size-[80px]"
        }`}
      >
        <img
          src={profilePhoto}
          alt="John Rodrigues"
          className="absolute inset-0 size-full origin-[58%_10%] scale-[1.2] object-cover"
        />
      </div>

      <div className={`space-y-1.5 ${large ? "mt-5" : "mt-3.5"}`}>
        <h1
          className={`v2-profile-name leading-none text-white whitespace-normal sm:whitespace-nowrap ${
            "text-[20px]"
          }`}
          style={{ ...sans, fontWeight: 500 }}
        >
          John Rodrigues
        </h1>

        <p
          className={`v2-profile-role leading-[1.25] text-white/85 ${
            "text-[13px]"
          }`}
          style={{ ...sans, fontWeight: 400 }}
        >
          Senior Product Designer
          <br />
          Design Engineer
        </p>

        <p
          className={`pt-1.5 leading-[1.5] text-white/85 [text-wrap:pretty] ${
            "text-[13px]"
          }`}
          style={{ ...sans, fontWeight: 400 }}
        >
          8+ years, based in the SF Bay Area. Previously at JPMorgan Chase,
          Citibank, and Toca. Founded Human AI Studio.
        </p>
      </div>
    </div>
  </>
);

const CompanyLogoGroup = ({
  title,
  logos,
}: {
  title: string;
  logos: CompanyLogo[];
}) => (
  <div>
    <p
      className="text-[13px] leading-none text-white/70"
      style={{ ...sans, fontWeight: 500 }}
    >
      {title}
    </p>
    <ul className="mt-4 grid grid-cols-2 items-center gap-x-4 gap-y-4">
      {logos.map((logo) => (
        <li key={logo.label} className="flex h-6 items-center" title={logo.label}>
          <img
            src={logo.src}
            alt={logo.label}
            style={{ height: logo.height }}
            className="w-auto max-w-full object-contain object-left brightness-0 invert"
          />
        </li>
      ))}
    </ul>
  </div>
);

const CompaniesNoteContent = () => (
  <>
    <ProfileShader shift={3} />
    <div className="relative z-10 flex h-full flex-col gap-7">
      <CompanyLogoGroup title="Worked At" logos={WORKED_AT} />
      <CompanyLogoGroup title="Resources Trusted By" logos={RESOURCES_TRUSTED_BY} />
    </div>
  </>
);

const LinksNoteContent = () => (
  <>
    <ProfileShader shift={6} />
    <div className="relative z-10 flex h-full flex-col">
      <p
        className="text-[13px] leading-none text-white/70"
        style={{ ...sans, fontWeight: 500 }}
      >
        Helpful Links
      </p>
      <ul className="mt-4 flex flex-col divide-y divide-white/15">
        {HELPFUL_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3 text-[14px] leading-none text-white transition-opacity hover:opacity-80"
              style={{ ...sans, fontWeight: 500 }}
            >
              {link.label}
              <span
                aria-hidden="true"
                className="text-white/55 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              >
                ↗
              </span>
            </a>
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
        className="relative z-50 mb-3 w-full max-w-[420px] overflow-visible sm:mb-5 lg:max-w-[230px]"
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
                  className="v2-profile-stack-card absolute inset-x-4 top-2.5 bottom-0 lg:bottom-auto lg:aspect-[3/4] rounded-[24px] opacity-0"
                  aria-hidden="true"
                />
                <div
                  className="v2-profile-stack-card absolute inset-x-2 top-1 bottom-0 lg:bottom-auto lg:aspect-[3/4] rounded-[24px] opacity-0"
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
                  className="v2-profile-stack-card v2-profile-stack-card--back absolute inset-x-4 top-2.5 bottom-0 lg:bottom-auto lg:aspect-[3/4] rounded-[24px]"
                  variants={v2ProfileBack}
                  transition={v2SpringSoft}
                  style={{ zIndex: closing ? 92 : undefined }}
                  aria-hidden="true"
                />
                <motion.div
                  layoutId="v2-profile-highlights-card"
                  className="v2-profile-stack-card v2-profile-stack-card--mid absolute inset-x-2 top-1 bottom-0 lg:bottom-auto lg:aspect-[3/4] rounded-[24px]"
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
                className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden p-4 sm:p-6"
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
                  className="scrollbar-hide relative z-10 flex max-h-[calc(100dvh-7.5rem)] w-full max-w-[980px] snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overflow-y-hidden px-[calc((100vw-min(82vw,300px))/2)] py-3 md:max-h-none md:snap-none md:justify-center md:gap-0 md:overflow-visible md:px-0 md:py-0"
                >
                  <motion.article
                    layoutId="v2-profile-about-card"
                    className="relative w-[min(82vw,300px)] shrink-0 snap-center rounded-[28px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/25 md:-mr-6 md:mt-8 md:w-full md:max-w-[260px] md:rotate-[-8deg]"
                    transition={v2SpringSoft}
                    style={{ zIndex: 95 }}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="v2-profile-card-whiteboard relative h-full max-h-[calc(100dvh-8rem)] overflow-hidden rounded-[28px] p-5 md:max-h-none md:pr-8">
                      <CompaniesNoteContent />
                    </div>
                  </motion.article>

                  <motion.article
                    layoutId="v2-profile-front-card"
                    className="relative z-20 w-[min(82vw,300px)] shrink-0 snap-center rounded-[28px] shadow-[0_34px_90px_-28px_rgba(0,0,0,0.6)] ring-1 ring-white/30 md:w-full md:max-w-[300px] md:scale-[1.04]"
                    transition={v2SpringSoft}
                    style={{ zIndex: 96 }}
                  >
                    <div className="v2-profile-card-whiteboard relative h-full max-h-[calc(100dvh-8rem)] overflow-hidden rounded-[28px] p-6 md:max-h-none">
                      <ProfileCardContent large />
                    </div>
                  </motion.article>

                  <motion.article
                    layoutId="v2-profile-highlights-card"
                    className="relative w-[min(82vw,300px)] shrink-0 snap-center rounded-[28px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/25 md:-ml-6 md:mt-8 md:w-full md:max-w-[260px] md:rotate-[8deg]"
                    transition={v2SpringSoft}
                    style={{ zIndex: 95 }}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="v2-profile-card-whiteboard relative h-full max-h-[calc(100dvh-8rem)] overflow-hidden rounded-[28px] p-5 md:max-h-none md:pl-11">
                      <LinksNoteContent />
                    </div>
                  </motion.article>

                  <button
                    type="button"
                    className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/25 md:absolute md:-bottom-16 md:bottom-auto"
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
