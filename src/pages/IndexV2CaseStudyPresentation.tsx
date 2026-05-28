import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageShell, { display } from "@/components/v2/PageShell";

const CASE_STUDY_SLIDES = [
  {
    eyebrow: "Case Study Deck",
    title: "Orbi AI",
    subtitle: "Agentic second brain for voice-first capture, local knowledge, and personal agents.",
    stat: "01 / 04",
  },
  {
    eyebrow: "Problem",
    title: "Thoughts were getting captured, then lost.",
    subtitle: "The opportunity was not another task list. It was context that compounds over time.",
    stat: "02 / 04",
  },
  {
    eyebrow: "System",
    title: "Voice -> Intent -> Trust -> Loop",
    subtitle: "A local markdown knowledge base, AI categorization, and feedback states that make the agent feel reliable.",
    stat: "03 / 04",
  },
  {
    eyebrow: "Outcome",
    title: "Concept to TestFlight in 5 weeks.",
    subtitle: "Designed, built, rebuilt, and shipped across iOS and macOS as a solo design-engineering workflow.",
    stat: "04 / 04",
  },
] as const;

const IndexV2CaseStudyPresentation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [slideIndex, setSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const slide = CASE_STUDY_SLIDES[slideIndex];
  const isPreview = new URLSearchParams(location.search).get("preview") === "1";

  const goToSlide = (direction: 1 | -1) => {
    setSlideIndex(
      (current) =>
        (current + direction + CASE_STUDY_SLIDES.length) % CASE_STUDY_SLIDES.length,
    );
  };

  const copyPreviewLink = async () => {
    const params = new URLSearchParams(location.search);
    params.set("preview", "1");
    params.set("theme", "dark");
    const url = `${window.location.origin}${location.pathname}?${params.toString()}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const deckSectionClass = isPreview
    ? "flex h-dvh flex-col overflow-hidden bg-[#0a0a0a] text-zinc-50"
    : "overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0a0a0a] shadow-[0_24px_80px_-36px_rgba(0,0,0,0.95)]";

  const slideFrameClass = isPreview
    ? "relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,#101014_0%,#070707_52%,#151515_100%)]"
    : "relative aspect-video min-h-[260px] overflow-hidden bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.12),transparent_34%),linear-gradient(135deg,#101014_0%,#070707_52%,#151515_100%)]";

  const deck = (
    <section className={deckSectionClass}>
      <div className={slideFrameClass}>
        <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:left-8 sm:top-8">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          {slide.eyebrow}
        </div>
        <div className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:right-8 sm:top-8">
          {slide.stat}
        </div>
        <div className="absolute inset-x-5 bottom-7 sm:inset-x-8 sm:bottom-10">
          <h2
            className={`max-w-[840px] font-semibold leading-[0.95] tracking-tight text-white ${
              isPreview ? "text-[44px] sm:text-[88px]" : "text-[36px] sm:text-[68px]"
            }`}
            style={display}
          >
            {slide.title}
          </h2>
          <p
            className={`mt-4 max-w-[680px] leading-[1.5] text-zinc-400 ${
              isPreview ? "text-[16px] sm:text-[22px]" : "text-[14px] sm:text-[18px]"
            }`}
          >
            {slide.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1.5">
          {CASE_STUDY_SLIDES.map((item, index) => (
            <button
              key={item.stat}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setSlideIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === slideIndex
                  ? "w-7 bg-zinc-100"
                  : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToSlide(-1)}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.1] hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );

  if (isPreview) {
    return (
      <main className="relative h-dvh overflow-hidden bg-black text-zinc-50">
        <button
          type="button"
          onClick={() => navigate("/v2/case-study-presentation?theme=dark")}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/[0.1] bg-black/40 px-3 py-1.5 text-[12px] font-medium text-zinc-400 backdrop-blur-xl transition-colors hover:text-white"
        >
          Exit preview
        </button>
        {deck}
      </main>
    );
  }

  return (
    <PageShell>
      <main className="mx-auto min-h-screen w-full max-w-5xl px-5 pb-36 pt-8 text-zinc-50 sm:px-8 sm:pt-10">
        <button
          type="button"
          onClick={() => navigate("/v2")}
          className="mb-8 inline-flex items-center gap-2 text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-100"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </span>
          Back
        </button>

        <section className="mb-6">
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-600">
            Presentation
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="text-[34px] font-semibold leading-[0.98] tracking-tight text-zinc-100 sm:text-[48px]"
                style={display}
              >
                Case Study Presentation
              </h1>
              <p className="mt-3 max-w-xl text-[15px] leading-[1.55] text-zinc-500 sm:text-[17px]">
                A custom slide deck space for case studies. Dummy content for now.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/v2/case-study-presentation?theme=dark&preview=1")}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                Preview mode
              </button>
              <button
                type="button"
                onClick={copyPreviewLink}
                className="rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-zinc-100"
              >
                {copied ? "Copied" : "Copy preview link"}
              </button>
            </div>
          </div>
        </section>

        {deck}
      </main>
    </PageShell>
  );
};

export default IndexV2CaseStudyPresentation;
