import { useNavigate } from "react-router-dom";
import orbiVideo from "@/assets/Orbi.mov";
import orbiThoughtExpansionVideo from "@/assets/orbi-thought-expansion.mov";
import orbiRecordVideo from "@/assets/RecordButton.mp4";
import rippleVideo from "@/assets/ripple.mp4";
import logoCodex from "@/assets/Codex.png";
import logoCursor from "@/assets/logo-cursor.png";
import logoClaudeCode from "@/assets/logo-claude-code.png";
import logoSwift from "@/assets/logo-swift.png";
import { display } from "@/components/v2/PageShell";

const ORBI_TOOL_LOGOS = [
  { label: "Codex", src: logoCodex, fit: "contain" as const, pad: true },
  { label: "Cursor", src: logoCursor, fit: "cover" as const },
  {
    label: "Claude Code",
    src: logoClaudeCode,
    fit: "contain" as const,
    pad: true,
  },
  {
    label: "Xcode",
    src: "https://cdn.simpleicons.org/xcode/147EFB",
    fit: "contain" as const,
    pad: true,
  },
  { label: "SwiftUI", src: logoSwift, fit: "cover" as const },
] as const;

/**
 * Orbi AI case study: structure mirrored from Mira.ai
 * (hero > intro/meta > problem > solution > outcomes > pillars > narratives).
 * @see https://www.pearl-sequeira.com/mira.ai
 */

const body = "text-[17px] sm:text-[18px] leading-[1.75] text-zinc-300";
const muted = "text-[16px] sm:text-[17px] leading-[1.7] text-zinc-400";
const metaLabel = "text-[13px] font-medium text-zinc-500";
const h2 =
  "text-[22px] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-[24px]";

const META = {
  roles: ["Design engineer", "Product builder"],
  platform: "iOS native mobile app",
} as const;


const NARRATIVES = [
  {
    title: "One place for every stray thought",
    body: "Stop splitting ideas across Apple Notes, sticky notes, voice memos, and random screenshots. Orbi gives your thinking a single home you can open anytime.",
  },
  {
    title: "Hear your ideas back",
    body: "Orbi doesn't just store transcripts. It narrates your notes back to you. Hearing your own thinking again is often what turns a rough capture into something worth publishing.",
  },
  {
    title: "Built for the repurposing loop",
    body: "Capture once, return when you're ready to write. Your past thoughts become the source material for posts, scripts, and newsletters, without starting from zero.",
  },
] as const;

const OrbiSimpleCaseStudy = () => {
  const navigate = useNavigate();

  return (
    <article className="mx-auto w-full max-w-[920px] px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-24 lg:px-10">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="group mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
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
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </span>
        Back to home
      </button>

      <header className="mx-auto max-w-[40rem]">
        <h1
          className="text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-zinc-50 sm:text-[48px]"
          style={display}
        >
          Orbi AI
        </h1>
        <p className={`mx-auto mt-6 max-w-[36rem] ${body}`}>
          An AI note-taker for creators. Capture voice notes, thoughts, and ideas—then
          organize and repurpose them into content when you're ready.
        </p>
        <dl className="mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-6 text-left sm:gap-x-14">
          <div className="min-w-[168px]">
            <dt className={`${metaLabel} text-center`}>Tools</dt>
            <dd className="mt-3 flex flex-wrap justify-center gap-2">
              {ORBI_TOOL_LOGOS.map((tool) => (
                <span
                  key={tool.label}
                  title={tool.label}
                  className="inline-flex size-7 items-center justify-center overflow-hidden rounded-[8px] bg-white/95 ring-1 ring-white/10 sm:size-8 sm:rounded-[9px]"
                >
                  <img
                    src={tool.src}
                    alt={tool.label}
                    className={`size-full ${
                      tool.fit === "contain" ? "object-contain" : "object-cover"
                    } ${tool.pad ? "p-1 sm:p-1.5" : ""}`}
                    loading="lazy"
                  />
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className={`${metaLabel} text-center`}>Role</dt>
            <dd className="mt-2">
              <ul className="space-y-1 text-[15px] font-medium text-zinc-200">
                {META.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className={`${metaLabel} text-center`}>Platform</dt>
            <dd className="mt-2 text-[15px] font-medium text-zinc-200">
              {META.platform}
            </dd>
          </div>
        </dl>
      </header>

      <figure className="mt-12 overflow-hidden rounded-[22px] bg-[#f4f4f5] ring-1 ring-white/[0.08] sm:mt-14 sm:rounded-[28px]">
        <video
          src={orbiVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-auto object-cover"
          aria-label="Orbi AI demo: AI note taker for creators"
        />
      </figure>

      <div className="mx-auto mt-16 grid max-w-[40rem] gap-12 sm:mt-20 sm:gap-14">
        <section>
          <h2 className={h2} style={display}>
            Problem
          </h2>
          <p className={`mt-4 ${body}`}>
            A creator&apos;s best thinking happens away from the desk: on a
            walk, between tasks, mid-conversation. Capture now, use later.{" "}
            <span className="text-zinc-400">
              But voice memos, notes, and drafts live in different apps. When
              they sit down to write, the thread is gone. They remember having
              the idea, not what it was.
            </span>
          </p>
          <p className={`mt-4 ${muted}`}>
            67M+ creators globally. Up to 70% of uncaptured thinking fades
            within 24 hours. Roughly one full day per week goes to finding
            information already saved somewhere else. On mobile, capture is fast.
            Retrieval is not.
          </p>
        </section>

        <section>
          <h2 className={h2} style={display}>
            Solution
          </h2>
          <p className={`mt-4 ${body}`}>
            Orbi AI is built for that gap. Speak a thought on a walk, between
            meetings, whenever it hits, and Orbi captures it. Everything lives in
            one seamless interface you can open anytime, so your ideas stop
            disappearing into app silos.
          </p>
          <p className={`mt-4 ${body}`}>
            Orbi also narrates your notes back to you. Hearing your own thinking
            again makes it easier to spot what is worth keeping, connect ideas
            you forgot were related, and turn raw captures into content you can
            actually ship: posts, scripts, newsletters, whatever you are
            building next.
          </p>
          <figure className="mt-8 overflow-hidden rounded-[22px] bg-[#f4f4f5] ring-1 ring-white/[0.08] sm:mt-10 sm:rounded-[28px]">
            <video
              src={orbiRecordVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-auto w-full object-cover"
              aria-label="Orbi AI record demo"
            />
          </figure>
          <p className={`mt-8 ${muted}`}>
            Capture. Organize. Repurpose. Orbi turns scattered thoughts into
            something you can return to and build on, not another graveyard of
            voice memos you never listen to again.
          </p>
        </section>
      </div>

      <section className="mx-auto mt-16 max-w-[40rem] sm:mt-20">
        <h2 className={h2} style={display}>
          Explore your thoughts
        </h2>
        <p className={`mt-4 ${body}`}>
          Capture is only half the job. Orbi lets you come back to your thinking,
          open a note, and move through it in a seamless interface. Expand a
          thought, follow where it leads, and see how ideas connect instead of
          staying buried in a list.
        </p>
        <p className={`mt-4 ${muted}`}>
          The goal is navigation, not filing. You should be able to explore what
          you already captured the same way you think: fluid, visual, and easy
          to pick back up.
        </p>
        <figure className="mt-8 overflow-hidden rounded-[22px] bg-[#f4f4f5] ring-1 ring-white/[0.08] sm:mt-10 sm:rounded-[28px]">
          <video
            src={orbiThoughtExpansionVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-auto w-full object-cover"
            aria-label="Orbi AI thought expansion demo"
          />
        </figure>
      </section>

      <section className="mx-auto mt-16 max-w-[40rem] space-y-12 sm:mt-20 sm:space-y-14">
        {NARRATIVES.map((item, index) => (
          <div key={item.title}>
            <h3
              className="text-[22px] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-[24px]"
              style={display}
            >
              {item.title}
            </h3>
            <p className={`mt-3 ${muted}`}>{item.body}</p>
            {index === NARRATIVES.length - 1 ? (
              <figure className="mt-8 overflow-hidden rounded-[22px] bg-[#f4f4f5] ring-1 ring-white/[0.08] sm:mt-10 sm:rounded-[28px]">
                <video
                  src={rippleVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-auto w-full object-cover"
                  aria-label="Orbi AI ripple interaction demo"
                />
              </figure>
            ) : null}
          </div>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-[40rem] sm:mt-20">
        <h2 className={h2} style={display}>
          Dream outcome
        </h2>
        <p className={`mt-4 ${body}`}>
          Orbi becomes the place creators trust with their thinking. Every stray
          thought lands in one home, stays findable, and is ready to turn into
          content when they are. Capture is instant. Navigation feels like
          thought itself. Creators stop losing their best work before it ever
          gets made.
        </p>
        <figure className="mt-8 overflow-hidden rounded-[22px] bg-[#f4f4f5] ring-1 ring-white/[0.08] sm:mt-10 sm:rounded-[28px]">
          <video
            src={orbiVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-auto w-full object-cover"
            aria-label="Orbi AI main demo"
          />
        </figure>
      </section>

    </article>
  );
};

export default OrbiSimpleCaseStudy;
