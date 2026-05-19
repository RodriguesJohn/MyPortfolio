import orbiVideo from "@/assets/EvaAIV2.mov";
import { PROFILE_LINKEDIN_URL } from "@/config/profileLinks";

const body = "text-[17px] sm:text-[18px] leading-[1.75] text-zinc-300";
const h2 = "mb-4 text-[19px] font-semibold tracking-tight text-zinc-50";

const ORBI_TOOLS = [
  "Figma",
  "Claude",
  "Codex",
  "Cursor",
  "Xcode",
  "SwiftUI",
  "Whisper",
  "TestFlight",
];

const OrbiCaseStudy = () => (
  <div className="w-full">
    <section className="mb-10 sm:mb-12">
      <h2 className={h2}>Overview</h2>
      <p className={body}>
        Orbi AI is a voice-first productivity app for iOS, shipped to TestFlight. I
        framed the problem, set product direction, and designed and built the core
        experience end to end. Most AI tools are strong at conversation but weak at
        turning intent into work you can track. Classic task apps push manual entry,
        and goals often sit apart from daily tasks even when they are related. People
        spread thinking across notes, Notion, sticky notes, and multiple to-do apps;
        on the move, a passing thought rarely has one reliable place to land. Orbi
        closes that gap with voice capture that structures what you say into goals and
        tasks, proactive follow-ups so the product reaches out instead of waiting to
        be opened, and less overhead than building and sorting lists by hand. The work
        ran from early framing through prototype, TestFlight, and iteration on real
        usage.
      </p>
    </section>

    <section className="mb-10 sm:mb-12">
      <h2 className={h2}>My role</h2>
      <p className={`${body} mb-4`}>
        Product designer, researcher, prototyper, strategist, and design engineer on
        a personal 0→1 build.
      </p>
      <ul className="space-y-2.5">
        {[
          "Owned product direction, UX, UI, interaction design, and prototyping.",
          "Led user research and translated findings into the agent and task model.",
          "Designed proactive follow-ups, voice capture, and goal and task flows.",
          "Shipped to TestFlight and iterated from real usage.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500"
              aria-hidden
            />
            <p className="text-[16px] leading-relaxed text-zinc-400">{item}</p>
          </li>
        ))}
      </ul>
    </section>

    <section className="mb-10 sm:mb-12">
      <h2 className={h2}>Tool stack</h2>
      <ul className="flex flex-wrap gap-2">
        {ORBI_TOOLS.map((tool) => (
          <li
            key={tool}
            className="rounded-full bg-white/[0.04] px-3.5 py-2 text-[14px] font-medium text-zinc-200 ring-1 ring-white/[0.08]"
          >
            {tool}
          </li>
        ))}
      </ul>
    </section>

    <section className="mb-10 sm:mb-12">
      <h2 className={h2}>Product preview</h2>
      <div className="overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/[0.08] sm:rounded-3xl">
        <video
          src={orbiVideo}
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </section>

    <section className="border-t border-white/[0.06] pt-8 sm:pt-10">
      <p className={body}>
        Thank you for reading. To work together,{" "}
        <a
          href="mailto:rodriguesjohnbaptist@gmail.com"
          className="text-zinc-100 underline underline-offset-[3px] decoration-zinc-600 hover:decoration-zinc-100"
        >
          email me
        </a>{" "}
        or connect on{" "}
        <a
          href={PROFILE_LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-100 underline underline-offset-[3px] decoration-zinc-600 hover:decoration-zinc-100"
        >
          LinkedIn
        </a>
        .
      </p>
    </section>
  </div>
);

export default OrbiCaseStudy;
