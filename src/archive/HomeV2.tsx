// ARCHIVED (2026-11-06): homepage V2 experiment, no longer routed. Kept for reference.
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell, { ThemeToggleIcons, display } from "@/components/v2/PageShell";
import { HIGHLIGHTS, type Project } from "@/data/projects";
import {
  RESOURCES_TRUSTED_BY,
  WORKED_AT,
  type CompanyLogo,
} from "@/data/companyLogos";
import {
  PROFILE_GITHUB_URL,
  PROFILE_LINKEDIN_URL,
  PROFILE_SUBSTACK_URL,
  PROFILE_X_URL,
} from "@/config/profileLinks";

/**
 * Homepage V2 ("The Index"). An editorial, single-colour redesign that sits
 * beside the current homepage at /v2. Projects read as a typographic index;
 * on desktop, hovering a row swaps the sticky preview on the right.
 */

const grid = "grid grid-cols-1 gap-x-5 lg:grid-cols-12";
const overline =
  "m-0 text-[12px] font-medium uppercase leading-[1.5] tracking-[0.05em] text-zinc-50";
const body =
  "text-[16px] leading-[1.65] tracking-[-0.01em] text-zinc-50 sm:text-[17px]";
const rule = "border-t border-white/[0.14]";
const linkUnderline =
  "underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:decoration-zinc-50";

const pad = (n: number) => String(n).padStart(2, "0");

const ProjectMedia = ({
  project,
  aspect,
  className = "",
}: {
  project: Project;
  /** Override the project's own aspect ratio (keeps grid rows even). */
  aspect?: string;
  className?: string;
}) => {
  const { media } = project;
  const fit = media.fit === "contain" ? "object-contain" : "object-cover";
  const style = media.objectPosition
    ? { objectPosition: media.objectPosition }
    : undefined;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[16px] [transform:translateZ(0)] ${className}`}
      style={{
        aspectRatio: aspect ?? media.aspect ?? "16/10",
        backgroundColor: media.bg ?? "#0a0a0a",
      }}
    >
      {media.type === "video" ? (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 size-full ${fit}`}
          style={style}
          aria-label={`${project.name} preview`}
        />
      ) : (
        <img
          src={media.src}
          alt={`${project.name} preview`}
          className={`absolute inset-0 size-full ${fit}`}
          style={style}
          loading="lazy"
        />
      )}
    </div>
  );
};

const LogoLine = ({ title, logos }: { title: string; logos: CompanyLogo[] }) => (
  <div className={`${rule} pt-4`}>
    <p className={`${overline} opacity-70`}>{title}</p>
    <ul className="m-0 mt-6 flex list-none flex-wrap items-center gap-x-10 gap-y-6 p-0">
      {logos.map((logo) => (
        <li key={logo.label} className="flex h-7 items-center">
          <img
            src={logo.src}
            alt={logo.label}
            style={{ height: logo.height * 1.35 }}
            className={`w-auto max-w-none ${logo.darkInk ? "v2-logo-dark-ink" : ""}`}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  </div>
);

const HomeV2 = () => {
  const navigate = useNavigate();
  const projects = HIGHLIGHTS;

  useEffect(() => {
    document.title = "John Rodrigues · Product Designer & Design Engineer";
  }, []);

  const open = (project: Project) => {
    if (project.href) {
      window.open(project.href, "_blank", "noopener,noreferrer");
      return;
    }
    navigate(`/work/${project.slug}`);
  };

  return (
    <PageShell>
      {/* Header */}
      <header className="v2-top-nav fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-20 xl:px-28">
          <Link
            to="/v2"
            className="text-[14px] font-medium tracking-[-0.01em] text-zinc-50"
            style={display}
          >
            John Rodrigues
          </Link>
          <nav aria-label="Sections" className="flex items-center gap-5 sm:gap-7">
            <a href="#work" className="text-[14px] text-zinc-50 transition-opacity hover:opacity-70">
              Work
            </a>
            <a href="#about" className="hidden text-[14px] text-zinc-50 transition-opacity hover:opacity-70 sm:inline">
              About
            </a>
            <a href="#contact" className="text-[14px] text-zinc-50 transition-opacity hover:opacity-70">
              Contact
            </a>
            <Link to="/" className="text-[14px] text-zinc-50 opacity-60 transition-opacity hover:opacity-100">
              V1
            </Link>
            <ThemeToggleIcons />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-6 pb-40 pt-28 sm:px-10 sm:pt-32 lg:px-20 xl:px-28">
        {/* Hero */}
        <section className={grid}>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 text-[32px] font-medium leading-[1.08] tracking-[-0.045em] text-zinc-50 sm:text-[44px] lg:col-span-9 xl:text-[56px]"
            style={display}
          >
            I design and ship AI-native products, from first sketch to production
            code.
          </motion.h1>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`${grid} mt-10 lg:mt-12`}
        >
          <div className={`${rule} grid grid-cols-2 gap-x-5 gap-y-5 pt-4 sm:grid-cols-4 lg:col-span-12`}>
            <p className={overline}>Senior Product Designer</p>
            <p className={overline}>Design Engineer</p>
            <p className={overline}>SF Bay Area · 8+ years</p>
            <a
              href={PROFILE_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={`${overline} ${linkUnderline} sm:justify-self-end`}
            >
              Get in touch ↗
            </a>
          </div>
        </motion.section>

        {/* Selected work: large media-first cards */}
        <section id="work" className="scroll-mt-24 pt-20 lg:pt-28">
          <div className={`${rule} flex items-baseline justify-between gap-6 pt-4`}>
            <h2 className={overline}>Selected work</h2>
            <p className={`${overline} opacity-60`}>
              {pad(projects.length)} projects · 2020–2026
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-16 lg:mt-10 lg:grid-cols-2 lg:gap-y-24">
            {projects.map((project, i) => {
              const featured = i === 0;
              return (
                <motion.article
                  key={project.slug}
                  initial={{ y: 24 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={featured ? "lg:col-span-2" : ""}
                >
                  <button
                    type="button"
                    onClick={() => open(project)}
                    className="group block w-full text-left"
                    aria-label={`Open ${project.name}`}
                  >
                    <div className="overflow-hidden rounded-[18px]">
                      <ProjectMedia
                        project={project}
                        aspect={featured ? undefined : "16/11"}
                        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h3
                          className={`m-0 font-medium leading-[1.15] tracking-[-0.03em] text-zinc-50 ${
                            featured ? "text-[26px] sm:text-[32px]" : "text-[22px] sm:text-[24px]"
                          }`}
                          style={display}
                        >
                          {project.name}
                        </h3>
                        <p className="m-0 mt-1.5 text-[15px] leading-[1.5] text-zinc-50 opacity-60">
                          {project.meta}
                        </p>
                      </div>
                      <span className={`${overline} mt-2 shrink-0 opacity-60`}>
                        {project.year}
                      </span>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Companies */}
        <section className={`${grid} pt-28 lg:pt-40`}>
          <h2
            className="m-0 mb-10 text-[28px] font-medium leading-[1.15] tracking-[-0.035em] text-zinc-50 sm:text-[32px] lg:col-span-6 lg:mb-0 lg:text-[36px]"
            style={display}
          >
            <span className="block">Shipped at scale,</span>
            <span className="block">trusted by teams</span>
          </h2>
          <div className="space-y-12 lg:col-span-6 lg:col-start-7">
            <LogoLine title="Worked at" logos={WORKED_AT} />
            <LogoLine title="Resources trusted by" logos={RESOURCES_TRUSTED_BY} />
          </div>
        </section>

        {/* About */}
        <section id="about" className={`${grid} scroll-mt-24 pt-28 lg:pt-40`}>
          <h2
            className="m-0 mb-10 text-[28px] font-medium leading-[1.15] tracking-[-0.035em] text-zinc-50 sm:text-[32px] lg:col-span-6 lg:mb-0 lg:text-[36px]"
            style={display}
          >
            <span className="block">A designer</span>
            <span className="block">who ships</span>
          </h2>
          <div className={`${rule} pt-4 lg:col-span-6 lg:col-start-7`}>
            <p className={`m-0 ${body}`}>
              I&apos;m John, a Senior Product Designer and Design Engineer based in
              the SF Bay Area. For 8+ years I&apos;ve designed products used by
              millions, including a balance transfer flow for 20M+ Citi Mobile
              users and startup banking at JPMorgan Chase.
            </p>
            <p className={`m-0 mt-5 ${body}`}>
              Today I work where design and code meet: prototyping in Cursor and
              Claude Code, shipping in React and Swift, and building agentic
              products like Orbi AI as a Founder in Residence at Antler. I also
              founded Human AI Studio, where I teach designers to build with AI.
            </p>
          </div>
        </section>
      </main>

      {/* Contact */}
      <footer id="contact" className="scroll-mt-24 border-t border-white/[0.14]">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-36 pt-20 sm:px-10 lg:px-20 lg:pt-28 xl:px-28">
          <p className={`${overline} opacity-70`}>Open to senior product design and design engineering roles</p>
          <a
            href={PROFILE_LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-[44px] font-medium leading-[1.02] tracking-[-0.05em] text-zinc-50 transition-opacity hover:opacity-70 sm:text-[64px] xl:text-[96px]"
            style={display}
          >
            Let&apos;s build something ↗
          </a>
          <div className={`${rule} mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-4`}>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: "LinkedIn", href: PROFILE_LINKEDIN_URL },
                { label: "GitHub", href: PROFILE_GITHUB_URL },
                { label: "X", href: PROFILE_X_URL },
                { label: "Substack", href: PROFILE_SUBSTACK_URL },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${overline} ${linkUnderline}`}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
            <p className={`${overline} opacity-60`}>© 2026 John Rodrigues</p>
          </div>
        </div>
      </footer>
    </PageShell>
  );
};

export default HomeV2;
