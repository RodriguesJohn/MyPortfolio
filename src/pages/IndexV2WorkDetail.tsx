import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageShell from "@/components/v2/PageShell";
import BalanceTransferCaseStudy from "@/components/v2/case-studies/BalanceTransferCaseStudy";
import OrbiCaseStudy from "@/components/v2/case-studies/OrbiCaseStudy";
import { getProjectBySlug } from "@/data/projects";

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

/** Avoid filter on children so deck-focus blur on the wrapper stays visible */
const enterNoBlur = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  animation: `entranceItemNoBlur 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, opacity",
});

const IndexV2WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const leadIsSlides = Boolean(project?.slidesUrl);
  const isOrbiCaseStudy = project?.slug === "orbi-ai";
  const hasBalanceTransferCaseStudy = project?.slug === "balance-transfer-citi";

  const slidesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [blurText, setBlurText] = useState(Boolean(project?.slidesUrl));

  useEffect(() => {
    if (!leadIsSlides) {
      setBlurText(false);
      return;
    }

    const updateBlur = () => {
      const slideEl = slidesRef.current;
      const textEl = textRef.current;
      if (!slideEl || !textEl) return;

      const slideRect = slideEl.getBoundingClientRect();
      const textRect = textEl.getBoundingClientRect();
      const vh = window.innerHeight;

      const deckStillDominant = slideRect.bottom > vh * 0.48;
      const textNotYetReadable = textRect.top > vh * 0.22;

      setBlurText(deckStillDominant && textNotYetReadable);
    };

    updateBlur();
    window.addEventListener("scroll", updateBlur, { passive: true });
    window.addEventListener("resize", updateBlur);
    return () => {
      window.removeEventListener("scroll", updateBlur);
      window.removeEventListener("resize", updateBlur);
    };
  }, [leadIsSlides, slug]);

  if (!project) {
    return (
      <PageShell>
        <div className="mx-auto w-[90%] max-w-[500px] pt-32 pb-40">
          <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-500">404</p>
          <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-zinc-50">
            Project not found
          </h1>
          <p className="mt-2 text-[15px] text-zinc-400">
            That slug doesn't match any project.{" "}
            <button
              onClick={() => navigate("/v2/work")}
              className="text-zinc-50 underline underline-offset-[3px] decoration-zinc-600 hover:decoration-zinc-50"
            >
              Back to My Work
            </button>
          </p>
        </div>
      </PageShell>
    );
  }

  const bodyText = "text-[19px] sm:text-[20px] leading-[1.7] text-zinc-300";
  const bodyTextMuted = "text-[19px] sm:text-[20px] leading-[1.7] text-zinc-400";

  const renderScopeCards = (opts?: {
    delay?: number;
    className?: string;
    /** Use inside slide-led blur wrapper so entrance animation doesn't reset filter */
    noEntranceBlur?: boolean;
  }) =>
    project.scopeCards && project.scopeCards.length > 0 ? (
      <ul
        className={`flex flex-wrap gap-2.5 sm:gap-3 ${opts?.className ?? ""}`}
        style={
          opts?.noEntranceBlur
            ? enterNoBlur(opts?.delay ?? 180)
            : enter(opts?.delay ?? 180)
        }
        aria-label="Project scope"
      >
        {project.scopeCards.map((card) => (
          <li
            key={card.label}
            className="min-w-[8.25rem] flex-1 rounded-xl bg-white/[0.04] px-3.5 py-3 ring-1 ring-white/[0.09] sm:min-w-[9rem] sm:px-4 sm:py-3.5"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              {card.label}
            </p>
            <p className="mt-1.5 text-[15px] font-medium leading-snug text-zinc-100 sm:text-[16px]">
              {card.value}
            </p>
          </li>
        ))}
      </ul>
    ) : null;

  const renderHeroMedia = (opts: { className: string; enterStyle?: React.CSSProperties }) => (
    <div
      className={`relative overflow-hidden ring-1 ring-white/[0.08] ${opts.className}`}
      style={{ backgroundColor: project.media.bg ?? "#18181b", ...opts.enterStyle }}
    >
      {project.media.type === "video" ? (
        <video
          src={project.media.src}
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
          className={`absolute inset-0 h-full w-full ${
            project.media.fit === "contain" ? "object-contain" : "object-cover"
          }`}
          style={{ objectPosition: project.media.objectPosition }}
        />
      )}
    </div>
  );

  const renderSlidesFrame = () =>
    project.slidesUrl ? (
      <div className="relative w-full max-h-[min(92vh,calc(100vw*9/16))] aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/[0.10] sm:rounded-3xl">
        <iframe
          src={project.slidesUrl}
          title={`${project.name} case study`}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen; clipboard-read; clipboard-write"
          allowFullScreen
        />
      </div>
    ) : null;

  const pageX = "px-5 sm:px-8 lg:px-10";
  const textCol = "mx-auto w-full max-w-[40rem]";
  const metaLabel = "text-[11px] tracking-[0.18em] uppercase text-zinc-500";
  const pageTitle =
    "mt-3 text-[30px] font-semibold leading-[1.12] tracking-tight text-zinc-50 sm:text-[38px]";
  const sectionTitle = "mb-4 text-[19px] font-semibold tracking-tight text-zinc-50";

  return (
    <PageShell>
      <div className={`mx-auto w-full ${pageX} max-w-[min(100%,1024px)]`}>
        <section className="pt-20 sm:pt-24">
          <div>
            <button
              type="button"
              onClick={() => navigate("/v2/work")}
              className="group mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
              style={enter(0)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-white/10 transition-all group-hover:bg-white/[0.06] group-hover:ring-white/25">
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
              Back to work
            </button>
          </div>

          {leadIsSlides ? (
            <div
              ref={slidesRef}
              className="relative z-[40] mx-auto w-full max-w-[min(100%,56rem)]"
              aria-labelledby="case-study-slides-label"
            >
              <p
                id="case-study-slides-label"
                className={`mb-4 ${metaLabel}`}
                style={enter(40)}
              >
                Case study
              </p>
              <div className="w-full" style={enter(80)}>
                {renderSlidesFrame()}
              </div>
            </div>
          ) : (
            renderHeroMedia({
              className:
                "mb-10 aspect-[16/10] min-h-[240px] rounded-2xl sm:mb-12 sm:min-h-[320px] sm:rounded-3xl",
              enterStyle: enter(80),
            })
          )}
        </section>

        {leadIsSlides ? (
          <div className="relative mt-12 sm:mt-16">
            <div ref={textRef}>
              <div className={textCol} style={enterNoBlur(160)}>
                <p className={metaLabel} style={enterNoBlur(200)}>
                  {project.meta}
                </p>
                <h1 className={pageTitle} style={enterNoBlur(240)}>
                  {project.name}
                </h1>
                {renderScopeCards({
                  delay: 280,
                  className: "mt-6",
                  noEntranceBlur: true,
                })}
                {isOrbiCaseStudy ? (
                  <div className="mt-10 sm:mt-12" style={enterNoBlur(320)}>
                    <OrbiCaseStudy />
                  </div>
                ) : (
                  <p className={`mt-5 ${bodyText}`} style={enterNoBlur(320)}>
                    {project.description}
                  </p>
                )}
              </div>

              {!isOrbiCaseStudy ? (
                <>
                  <section
                    className={`${textCol} mb-10 pt-12 sm:mb-14 sm:pt-14`}
                    style={enterNoBlur(380)}
                  >
                    <h2 className={sectionTitle}>About</h2>
                    <p className={bodyText}>
                      {project.longDescription ?? project.description}
                    </p>
                    {project.aboutContext ? (
                      <p className={`mt-5 ${bodyTextMuted}`}>{project.aboutContext}</p>
                    ) : null}
                  </section>

                  <section className={`${textCol} mb-10 sm:mb-12`} style={enterNoBlur(440)}>
                    <h2 className="mb-4 text-[13px] font-medium tracking-wide text-zinc-500">
                      Product
                    </h2>
                    {renderHeroMedia({
                      className:
                        "aspect-[16/10] w-full min-h-[240px] rounded-2xl sm:min-h-[320px] sm:rounded-3xl",
                    })}
                  </section>
                </>
              ) : null}
            </div>
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 z-10 transition-[opacity,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                blurText
                  ? "opacity-100 backdrop-blur-[18px] backdrop-saturate-[0.85] bg-black/25"
                  : "opacity-0 backdrop-blur-none bg-transparent"
              }`}
            />
          </div>
        ) : (
          <>
            <section className={`${textCol} pb-8`}>
              <p className={metaLabel} style={enter(160)}>
                {project.meta}
              </p>
              <h1 className={pageTitle} style={enter(200)}>
                {project.name}
              </h1>
              {renderScopeCards({ delay: 220, className: "mt-6" })}
              <p className={`mt-5 ${bodyText}`} style={enter(260)}>
                {project.description}
              </p>
            </section>

            <section className={`mb-10 ${textCol} sm:mb-12`} style={enter(360)}>
              <h2 className={sectionTitle}>About</h2>
              <p className={bodyText}>
                {project.longDescription ?? project.description}
              </p>
              {project.aboutContext ? (
                <p className={`mt-5 ${bodyTextMuted}`}>{project.aboutContext}</p>
              ) : null}
            </section>
          </>
        )}

        {hasBalanceTransferCaseStudy ? (
          <section className={`${textCol} mb-12 mt-12 sm:mt-14`} style={enter(440)}>
            <h2 className={sectionTitle}>Case study</h2>
            <BalanceTransferCaseStudy />
          </section>
        ) : !leadIsSlides ? (
          <section className="mb-12" style={enter(440)}>
            <h2 className="mb-4 text-[19px] font-semibold tracking-tight text-zinc-50">
              Case study
            </h2>
            <div
              className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 text-center sm:rounded-3xl"
              style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <div>
                <p className="text-[14px] text-zinc-400">Case study coming soon.</p>
                <p className="mt-1 text-[12px] text-zinc-500">
                  Drop slides, screens, or a Loom into this section.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <div className="h-[200px]" />
      </div>
    </PageShell>
  );
};

export default IndexV2WorkDetail;
