import { useRef } from "react";
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

const brandIcon = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const CodexMark = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinejoin="round"
  >
    <path d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4z" />
  </svg>
);

const IndexV2WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const leadIsSlides = Boolean(project?.slidesUrl);
  const isOrbiCaseStudy = project?.slug === "orbi-ai";
  const hasBalanceTransferCaseStudy = project?.slug === "balance-transfer-citi";

  const slidesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

  if (isOrbiCaseStudy) {
    return (
      <div className="fixed inset-0 bg-[#020305]">
        <iframe
          title="Orbi AI Agentic Second Brain"
          src="/orbi-website/index.html"
          className="block h-full w-full border-0 bg-[#020305]"
          allow="autoplay; fullscreen"
        />
      </div>
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

  const renderOrbiShipActions = (delay = 320) =>
    isOrbiCaseStudy ? (
      <div
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        style={enterNoBlur(delay)}
      >
        {project.appStoreUrl ? (
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-50 px-4 py-2.5 text-[13px] font-semibold text-zinc-950 transition hover:bg-white active:scale-[0.99]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.37 1.43c0 1.14-.42 2.17-1.25 3.08-.9.98-1.92 1.54-3.02 1.45-.14-1.09.39-2.25 1.15-3.08.84-.92 2.25-1.6 3.12-1.45Zm3.6 15.37c-.48 1.1-.71 1.59-1.32 2.56-.86 1.33-2.07 2.99-3.57 3.01-1.34.01-1.69-.87-3.5-.86-1.82.01-2.2.88-3.54.87-1.5-.02-2.65-1.52-3.51-2.85-2.41-3.72-2.66-8.08-1.18-10.39 1.06-1.65 2.72-2.62 4.29-2.62 1.6 0 2.61.88 3.94.88 1.28 0 2.07-.88 3.92-.88 1.4 0 2.88.76 3.93 2.08-3.45 1.89-2.89 6.82.54 8.2Z" />
            </svg>
            App Store
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        ) : null}
        {project.macDownloadUrl ? (
          <a
            href={project.macDownloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] px-4 py-2.5 text-[13px] font-semibold text-zinc-100 ring-1 ring-white/[0.12] transition hover:bg-white/[0.10] active:scale-[0.99]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download Mac App
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        ) : null}
      </div>
    ) : null;

  const pageX = "px-5 sm:px-8 lg:px-10";
  const textCol = "mx-auto w-full max-w-[48rem]";
  const metaLabel = "text-[11px] tracking-[0.18em] uppercase text-zinc-500";
  const pageTitle =
    "mt-3 text-[30px] font-semibold leading-[1.12] tracking-tight text-zinc-50 sm:text-[38px]";
  const sectionTitle = "mb-4 text-[19px] font-semibold tracking-tight text-zinc-50";

  return (
    <PageShell>
      <div className={`mx-auto w-full ${pageX} max-w-[min(100%,1280px)]`}>
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
              className="relative z-[40] mx-auto w-full max-w-[min(100%,72rem)]"
              aria-labelledby="case-study-slides-label"
            >
              {isOrbiCaseStudy ? (
                <div className={`${textCol} mb-10 sm:mb-12`}>
                  <div
                    className="flex flex-wrap items-center gap-x-3 gap-y-2"
                    style={enter(40)}
                  >
                    <p className={metaLabel}>Case study</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium leading-none text-emerald-600 ring-1 ring-emerald-500/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Shipped
                    </span>
                  </div>
                  <h1 className={pageTitle} style={enter(80)}>
                    {project.name} {project.meta}
                  </h1>
                  <p
                    className="mt-4 max-w-[58rem] text-[17px] leading-[1.65] text-zinc-400 sm:text-[18px]"
                    style={enter(120)}
                  >
                    Orbi AI is an AI-native second brain for capturing thoughts,
                    organizing notes, and building a knowledge base you own. It works like
                    an agent-ready Obsidian, able to retrieve, reason, and act on your
                    personal, project, and business context.
                  </p>
                  {renderOrbiShipActions(160)}
                </div>
              ) : null}
              <p
                id="case-study-slides-label"
                className={`mx-auto mb-4 w-full max-w-[48rem] ${metaLabel}`}
                style={enter(isOrbiCaseStudy ? 200 : 40)}
              >
                {isOrbiCaseStudy ? "Demo" : "Case study"}
              </p>
              <div
                className="mx-auto w-full max-w-[48rem]"
                style={enter(isOrbiCaseStudy ? 240 : 80)}
              >
                {isOrbiCaseStudy
                  ? renderHeroMedia({
                      className:
                        "aspect-[3840/2060] w-full rounded-xl sm:rounded-2xl",
                    })
                  : renderSlidesFrame()}
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
                {!isOrbiCaseStudy ? (
                  <>
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
                  </>
                ) : null}
                {isOrbiCaseStudy ? (
                  <>
                    {renderScopeCards({
                      delay: 320,
                      className: "mt-2",
                      noEntranceBlur: true,
                    })}
                    <section className="mt-10 sm:mt-12" style={enterNoBlur(330)}>
                      <h2 className={sectionTitle}>Tools</h2>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          {
                            name: "Claude Code",
                            logo: brandIcon("claude", "D97757"),
                          },
                          {
                            name: "Xcode",
                            logo: brandIcon("xcode", "147EFB"),
                          },
                          {
                            name: "Codex",
                            icon: <CodexMark />,
                          },
                        ].map((tool) => (
                          <span
                            key={tool.name}
                            className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-300 ring-1 ring-white/[0.09]"
                          >
                            {"logo" in tool ? (
                              <img
                                src={tool.logo}
                                alt=""
                                className="h-4 w-4 object-contain"
                                loading="lazy"
                              />
                            ) : (
                              tool.icon
                            )}
                            {tool.name}
                          </span>
                        ))}
                      </div>
                    </section>
                    <section className="mt-10 sm:mt-12" style={enterNoBlur(340)}>
                      <h2 className={sectionTitle}>Problem</h2>
                      <p className={bodyTextMuted}>
                        Your knowledge is everywhere. Your AI has none of it. Every time
                        you switch models, agents, or tools, you start from zero.
                      </p>
                      <div className="mt-7 grid gap-4 lg:grid-cols-2">
                        {[
                          {
                            title: "Scattered Context",
                            body:
                              "Context doesn't travel. When you switch between LLMs, agents, or projects, everything resets. AI builders feel this hardest, stitching together Obsidian, MCPs, and Claude Code just to give one agent enough context to be useful. The moment they switch models, it breaks.",
                          },
                          {
                            title: "Notes That Go Nowhere",
                            body:
                              "47% of professionals spend 1-5 hours a day searching for information they already captured. The notes exist. The links exist. The ideas exist. They just don't connect, so nothing compounds.",
                          },
                          {
                            title: "No Knowledge Infrastructure",
                            body:
                              "54% of organizations use more than five platforms to document and share information. There is no source of truth that agents, tools, or teammates can build on. The AI-powered knowledge base market is growing at 34% CAGR because every team building with AI eventually hits this wall.",
                          },
                          {
                            title: "The Momentum Problem",
                            body:
                              "You're in flow. A thought hits mid-sentence. You stop to open an app, find the right folder, and decide where it goes. By the time you're back, the thread is gone. The cost is not just the 30 seconds. It is the idea that never made it. Knowledge workers capture just enough to feel organized, but not enough to actually build on.",
                          },
                        ].map((pillar) => (
                          <article
                            key={pillar.title}
                            className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.09] sm:p-6"
                          >
                            <h3 className="text-[18px] font-semibold tracking-tight text-zinc-100 sm:text-[20px]">
                              {pillar.title}
                            </h3>
                            <p className="mt-2 text-[16px] leading-[1.75] text-zinc-400 sm:text-[17px]">
                              {pillar.body}
                            </p>
                          </article>
                        ))}
                      </div>
                    </section>
                    <section className="mt-10 sm:mt-12" style={enterNoBlur(350)}>
                      <h2 className={sectionTitle}>How Orbi Solves This</h2>
                      <div className="space-y-10">
                        {[
                          {
                            title: "Capture Without Breaking Flow",
                            body:
                              "Speak from your phone the moment an idea appears. Orbi captures the thought before the context disappears.",
                          },
                          {
                            title: "Own the Knowledge Layer",
                            body:
                              "Your notes live as local markdown files, organized into a workspace you control instead of another locked chat history.",
                          },
                          {
                            title: "Make It Agent-Ready",
                            body:
                              "Orbi turns scattered notes into retrievable context that agents can reason over and use when you need action.",
                          },
                        ].map((item) => (
                          <article
                            key={item.title}
                            className="border-t border-white/[0.09] pt-6"
                          >
                            <div className="max-w-[42rem]">
                              <h3 className="text-[18px] font-semibold tracking-tight text-zinc-100 sm:text-[20px]">
                                {item.title}
                              </h3>
                              <p className="mt-3 text-[16px] leading-[1.7] text-zinc-400 sm:text-[17px]">
                                {item.body}
                              </p>
                            </div>
                            <div className="mt-5 flex aspect-video w-full items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.09]">
                              <div className="text-center">
                                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                                  Video placeholder
                                </p>
                                <p className="mt-1 text-[13px] text-zinc-500">
                                  Drop demo clip here
                                </p>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                    <section className="mt-10 sm:mt-12" style={enterNoBlur(360)}>
                      <h2 className={sectionTitle}>Case Study Deck</h2>
                      {renderSlidesFrame()}
                    </section>
                    <div className="mt-10 sm:mt-12" style={enterNoBlur(400)}>
                      <OrbiCaseStudy />
                    </div>
                  </>
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
