import { useNavigate } from "react-router-dom";
import PageShell from "@/components/v2/PageShell";
import { AI_TOOLS_BUILT, V2_WORK_PROJECTS, type Project } from "@/data/projects";

import chaseLogo from "@/assets/ChaseLightMOde.png";
import citiLogo from "@/assets/Citi.svg.png";
import tocaLogo from "@/assets/toca White.png";

const BRAND_LOGOS = [
  { name: "JPMorgan Chase", src: chaseLogo },
  { name: "Citi", src: citiLogo },
  { name: "TOCA Football", src: tocaLogo },
];

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

const ENTERPRISE_PROJECT_SLUGS = [
  "digital-commercial-banking",
  "ai-insights-citi",
  "balance-transfer-citi",
  "toca-football",
];

const ENTERPRISE_PROJECTS = V2_WORK_PROJECTS.filter((project) =>
  ENTERPRISE_PROJECT_SLUGS.includes(project.slug),
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (project.href) {
      window.open(project.href, "_blank", "noreferrer");
    } else {
      navigate(`/v2/work/${project.slug}`);
    }
  };

  return (
    <article
      className="group cursor-pointer"
      onClick={handleClick}
      style={{
        opacity: 0,
        transform: "translateY(10px)",
        filter: "blur(4px)",
        animation: `entranceItem 700ms cubic-bezier(0.22, 1, 0.36, 1) ${
          index * 50
        }ms forwards`,
      }}
    >
      <div
        className="relative aspect-[16/11] rounded-2xl overflow-hidden ring-1 ring-white/[0.08] transition-transform duration-500 group-hover:scale-[1.01]"
        style={{ backgroundColor: project.media.bg ?? "#18181b" }}
      >
        {project.media.type === "video" ? (
          <video
            src={project.media.src}
            poster={"poster" in project.media ? project.media.poster : undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full ${
              project.media.fit === "contain" ? "object-contain" : "object-cover"
            }`}
            style={{ objectPosition: project.media.objectPosition }}
          />
        ) : (
          <img
            src={project.media.src}
            alt={project.name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${
              project.media.fit === "contain" ? "object-contain" : "object-cover"
            }`}
            style={{ objectPosition: project.media.objectPosition }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {project.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-medium tracking-[0.06em] uppercase text-zinc-100 ring-1 ring-white/15">
            {project.tag}
          </span>
        )}
      </div>

      <div className="mt-3 px-1">
        <p className="text-[17px] leading-snug sm:text-[18px]">
          <span className="font-semibold text-zinc-50 group-hover:text-white transition-colors">
            {project.name}
          </span>
        </p>
        <p className="mt-1 text-[15px] text-zinc-500 sm:text-[16px]">
          {project.meta} · {project.year}
        </p>
      </div>
    </article>
  );
};

const ProjectLane = ({
  title,
  projects,
  delay,
}: {
  title: string;
  projects: Project[];
  delay: number;
}) => (
  <section className="space-y-5" style={enter(delay)}>
    <h2 className="text-[18px] font-medium tracking-tight text-zinc-100/85 sm:text-[20px]">
      {title}
    </h2>
    <div
      className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
      aria-label={title}
    >
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="w-[90%] max-w-[640px] shrink-0 snap-start sm:w-[520px] lg:w-[620px]"
        >
          <ProjectCard project={project} index={i} />
        </div>
      ))}
    </div>
  </section>
);

const IndexV2Work = () => {
  const navigate = useNavigate();

  return (
    <PageShell>
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <section className="pt-20 sm:pt-24 pb-6">
          <button
            type="button"
            onClick={() => navigate("/v2")}
            className="group inline-flex items-center gap-2 mb-10 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
            style={enter(0)}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-white/10 group-hover:ring-white/25 group-hover:bg-white/[0.06] transition-all">
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            Back
          </button>

          <p
            className="text-[11px] tracking-[0.18em] uppercase text-zinc-500"
            style={enter(40)}
          >
            Portfolio
          </p>
          <h1
            className="mt-3 text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.2] text-zinc-50"
            style={enter(80)}
          >
            My work
          </h1>
          <p
            className="mt-2 max-w-xl text-[16px] text-zinc-400 leading-[1.6]"
            style={enter(160)}
          >
            Case studies, shipped products, and AI tools I&apos;ve designed and built.
          </p>
        </section>

        <section className="mb-10" style={enter(200)}>
          <p className="text-[10px] tracking-[0.22em] uppercase text-zinc-500 mb-4">
            Worked With
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div
              className="flex items-center gap-12 w-max"
              style={{ animation: "brandMarquee 32s linear infinite" }}
            >
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((b, i) => (
                <img
                  key={`${b.name}-${i}`}
                  src={b.src}
                  alt={b.name}
                  className="v2-brand-logo h-5 w-auto object-contain flex-shrink-0"
                  style={{
                    filter: "brightness(0) invert(1)",
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>
            <style>{`
              @keyframes brandMarquee {
                from { transform: translateX(0); }
                to   { transform: translateX(-50%); }
              }
            `}</style>
          </div>
        </section>

        <main className="space-y-16 pb-[200px]">
          <ProjectLane
            title="AI Products Designed, Developed and Shipped (10+)"
            projects={AI_TOOLS_BUILT}
            delay={240}
          />
          <ProjectLane
            title="Product Design Work"
            projects={ENTERPRISE_PROJECTS}
            delay={320}
          />
        </main>
      </div>
    </PageShell>
  );
};

export default IndexV2Work;
