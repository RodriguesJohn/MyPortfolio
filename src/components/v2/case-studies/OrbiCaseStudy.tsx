import { PROFILE_LINKEDIN_URL } from "@/config/profileLinks";

const orbiVideo = "/orbi-website/OrbiDemo.web.mp4";

const body = "text-[17px] sm:text-[18px] leading-[1.75] text-zinc-300";
const muted = "text-[16px] sm:text-[17px] leading-[1.7] text-zinc-400";
const h2 = "mb-4 text-[20px] font-semibold tracking-tight text-zinc-50";
const h3 = "mb-3 text-[15px] font-semibold tracking-tight text-zinc-100";

const ORBI_TOOLS = [
  "Figma",
  "Claude",
  "Codex",
  "Xcode",
  "SwiftUI",
  "OpenAI Whisper API",
  "GPT-4",
  "Anthropic API",
  "iCloud",
  "Markdown",
  "Apple Pay",
  "App Store",
];

const Section = ({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) => (
  <section className="mb-11 sm:mb-14">
    {kicker ? (
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {kicker}
      </p>
    ) : null}
    <h2 className={h2}>{title}</h2>
    {children}
  </section>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-zinc-500" aria-hidden />
        <p className={muted}>{item}</p>
      </li>
    ))}
  </ul>
);

const NumberedList = ({ items }: { items: { title: string; body: React.ReactNode }[] }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={item.title} className="rounded-2xl bg-white/[0.035] p-4 ring-1 ring-white/[0.08]">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-zinc-100">
          {item.title}
        </h3>
        <p className={`${muted} mt-2`}>{item.body}</p>
      </div>
    ))}
  </div>
);

const OrbiCaseStudy = () => (
  <div className="w-full">
    <Section title="Overview">
      <p className={body}>
        Orbi AI is an AI-native second brain. You speak your thoughts; it captures,
        connects, and organizes them into a knowledge graph that lives locally on your
        device in plain markdown files you own. The longer you use it, the more valuable
        it gets. Unlike a to-do list, it compounds.
      </p>
      <p className={`${body} mt-5`}>
        You can chat with your own knowledge base, retrieve context from months ago, and
        connect it to any agent you want. It is not a note-taking app. It is an
        agent-ready second brain, designed for people who think faster than any tool
        they have tried.
      </p>
    </Section>

    <Section title="My Role">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Product Designer",
          "iOS + macOS Engineer",
          "Product Manager",
          "Primary User",
          "Timeline: 5 weeks concept to shipped app",
          "Rebuild: 2 weeks for the second brain pivot",
          "Platforms: iOS + macOS",
          "Status: Shipped on the App Store.",
          "Pricing: $9.99/month",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl bg-white/[0.035] px-4 py-3 text-[14px] font-medium text-zinc-200 ring-1 ring-white/[0.08]"
          >
            {item}
          </div>
        ))}
      </div>
      <p className={`${body} mt-5`}>
        Solo. No handoffs. No PM. No dedicated engineer. Every design decision, every
        engineering decision, every product call, made by one person in sync from day
        one.
      </p>
    </Section>

    <Section title="The Problem" kicker="Two broken things. One product.">
      <p className={body}>
        The pivot did not come from a research sprint. It came from running into two
        separate walls: one as a builder, one as a user of my own app.
      </p>
      <NumberedList
        items={[
          {
            title: "Signal from users",
            body:
              "Early Orbi users were capturing thoughts, not to-dos. The voice input was useful, but a thought that gets captured and then lost is no better than a sticky note. The real problem was context management.",
          },
          {
            title: "Signal from myself",
            body:
              "I was building my own second brain in Obsidian. To connect it to AI, I was learning systems engineering just to think better. Every person I brought into that workflow needed a tutorial. That is broken UX.",
          },
          {
            title: "The collision",
            body:
              "Voice capture already existed in Orbi. Local markdown files were the right storage layer: private, portable, no lock-in. A knowledge graph could surface the connections between thoughts automatically.",
          },
          {
            title: "The commodity problem",
            body:
              "A voice to-do list at $9.99 competes with Apple Reminders, Todoist, and paper. A second brain that holds years of your thinking and becomes more valuable over time has no obvious substitute.",
          },
        ]}
      />
    </Section>

    <Section title="The Journey" kicker="I built the wrong thing for the right reason.">
      <NumberedList
        items={[
          {
            title: "The original build",
            body:
              "I was losing track of tasks across multiple projects: building with AI, working at JPMorgan, and shipping side projects. Voice capture felt like the right input, so I designed the infrastructure, built it in Swift, and shipped it into people's hands.",
          },
          {
            title: "The honest failure",
            body:
              "Usage dropped. I found myself taking to-dos on paper because it was faster and lower friction. The product was not broken, but it had no moat. Charging $9.99 for a voice to-do list felt like the wrong value exchange.",
          },
          {
            title: "The signal hits",
            body:
              "I was struggling with Obsidian while watching Orbi users capture thoughts into the voice input. Two problems, same solution space. That is when the direction became clear.",
          },
          {
            title: "The rebuild",
            body:
              "Once I had clarity, I moved fast. I ran parallel Codex sessions to design and build iOS and macOS simultaneously. Voice capture fed local markdown files, the knowledge graph generated from the file structure, and AI chat layered on top of the user's notes.",
          },
        ]}
      />
    </Section>

    <Section title="Design Decisions and Tradeoffs" kicker="Every constraint was a choice.">
      <BulletList
        items={[
          <>
            <span className="font-medium text-zinc-100">Local markdown over a cloud database:</span>{" "}
            less storage control and observability, but users own portable files that can connect
            to any future agent.
          </>,
          <>
            <span className="font-medium text-zinc-100">iCloud sync over a custom backend:</span>{" "}
            less flexibility, but zero infrastructure cost, Apple reliability, and trust from day
            one.
          </>,
          <>
            <span className="font-medium text-zinc-100">Build first, research second:</span>{" "}
            I gave up a validated upfront problem statement and gained real signal from actual usage.
          </>,
          <>
            <span className="font-medium text-zinc-100">Solo over a team:</span> every decision
            happened in minutes, with no translation loss between design and engineering intent.
          </>,
          <>
            <span className="font-medium text-zinc-100">
              AI-generated knowledge graph over a designed one:
            </span>{" "}
            less visual control, but emergent structure that reflects how the user actually thinks.
          </>,
        ]}
      />
    </Section>

    <Section title="The Agentic System" kicker="How it works when a user speaks to Orbi.">
      <NumberedList
        items={[
          {
            title: "Input: Voice → Text",
            body:
              "User speaks. OpenAI Whisper API transcribes. Apple Speech was tried first, but latency and robotic response broke the trust signal. Whisper solved it.",
          },
          {
            title: "Process: Intent → Confidence",
            body:
              "GPT-4 classifies intent against a system prompt with strict rules. The prompt is what makes a probabilistic model deterministic enough to trust.",
          },
          {
            title: "Output: Categorize → Summarize → Clarify",
            body:
              "The agent categorizes the input, summarizes it into the knowledge base, and surfaces clarifying questions when intent is unclear.",
          },
          {
            title: "Feedback loop: State → Continuity",
            body:
              "Orbi carries state across three layers: heard, thinking, ready. In a probabilistic system, silence reads as failure. The orb tells the user what is happening.",
          },
        ]}
      />
      <p className={`${body} mt-5`}>
        The system prompt is not just an engineering decision. It is the product&apos;s
        core design constraint. Voice → Intent → Trust → Loop.
      </p>
    </Section>

    <Section title="Design Thesis" kicker="The graph isn't designed. It emerges.">
      <p className={body}>
        For Orbi&apos;s knowledge graph, I defined the context: the folder structure, the
        markdown files, and the connection rules. Then I let the agent generate the
        visual. The graph builds itself from the user&apos;s actual thinking.
      </p>
      <p className={`${body} mt-5`}>
        I call this probabilistic UX: you set the constraints, and the AI produces the
        interface. The designer&apos;s role shifts from crafting pixels to crafting rules
        that generate the experience.
      </p>
      <blockquote className="mt-6 rounded-2xl border-l-2 border-zinc-500 bg-white/[0.035] px-5 py-4 text-[18px] leading-relaxed text-zinc-200">
        “This actually looks like your brain. A lot of things going around, connected
        together.”
      </blockquote>
    </Section>

    <Section title="The Build" kicker="Designed and built end-to-end.">
      <p className={body}>
        I started in Figma and quickly hit the ceiling of static prototyping for
        multimodal voice UI. You cannot prototype latency, probabilistic state, or an
        agent loop in a design tool. The real design moved into Claude, Codex, and
        Xcode.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/[0.08] sm:rounded-3xl">
        <video
          src={orbiVideo}
          className="h-auto w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {ORBI_TOOLS.map((tool) => (
          <li
            key={tool}
            className="rounded-full bg-white/[0.04] px-3.5 py-2 text-[14px] font-medium text-zinc-200 ring-1 ring-white/[0.08]"
          >
            {tool}
          </li>
        ))}
      </ul>
      <BulletList
        items={[
          "Concept in Figma.",
          "Multimodal testing hit the ceiling.",
          "Moved to Claude + Xcode pair coding.",
          "Voice latency solved with Whisper API.",
          "Parallel Codex sessions for iOS + macOS rebuild.",
          "App Store shipped.",
        ]}
      />
    </Section>

    <Section title="User Signal" kicker="Shipped. Listened. Shaped by real users.">
      <p className={body}>
        I did not run a research sprint before building. I shipped, watched, and let
        real usage define what the product needed to become. The feedback came through
        the community, and it was more honest than any interview I could have scheduled.
      </p>
      <BulletList
        items={[
          <>
            <span className="font-medium text-zinc-100">“Long task lists feel like homework.”</span>{" "}
            Design response: three cards for today, showing only what matters now.
          </>,
          <>
            <span className="font-medium text-zinc-100">“Default UI feels boxed in.”</span>{" "}
            Design response: six personalization themes so Orbi feels like yours.
          </>,
          <>
            <span className="font-medium text-zinc-100">
              “I don&apos;t think there&apos;s anything like this yet.”
            </span>
          </>,
        ]}
      />
    </Section>

    <Section title="What I Learned">
      <BulletList
        items={[
          "The real differentiator in AI is not the UI. It is how much cognitive work the agent does for the user.",
          "Build first, research second. Two weeks with real users taught me more than a discovery sprint could have.",
          "When the product beats itself, that is the signal. Paper beat my app, and that honesty forced the pivot.",
          "Being the most constrained person in the room is a velocity advantage.",
          "Static design tools have a ceiling with AI-native products.",
          "Parallel agents change the velocity equation entirely.",
        ]}
      />
    </Section>

    <Section title="What's Next">
      <BulletList
        items={[
          "Now: App Store live. Real users. The loop is working.",
          "Next: polish the first-time user experience and expand the macOS workflow.",
          "The bigger bet: a proactive accountability partner that follows up, nudges, and keeps the loop going without you asking.",
          "MCP support: connecting Orbi to everyday tools so context gets stored automatically, not just manually captured.",
        ]}
      />
    </Section>

    <Section title="Closing">
      <p className={body}>
        I am not a traditional designer. I do not wireframe, prototype, design, and
        hand off to an engineer. I work in sync with the build from day one, and
        increasingly, I am the build.
      </p>
      <p className={`${body} mt-5`}>
        Orbi went from concept to shipped app in 5 weeks. The second brain rebuild took
        two. That velocity is not a shortcut. It is what becomes possible when design
        and engineering stop being separate roles and start being the same thought.
      </p>
      <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        Designer + Engineer · Solo · 5 Weeks · Figma → Claude → Xcode → App Store
      </p>
    </Section>

    <section className="border-t border-white/[0.06] pt-8 sm:pt-10">
      <h2 className={h2}>Image Placement Notes</h2>
      <p className={muted}>
        The deck embedded above carries the slide-based visuals for the hero, insight,
        themes, AI system, orb feedback loop, build process, evolution, user signal,
        agentic loop, learnings, and roadmap. The knowledge graph screenshot should be
        added separately when the final asset is exported from the Figma canvas.
      </p>
    </section>

    <section className="mt-10 border-t border-white/[0.06] pt-8 sm:pt-10">
      <p className={body}>
        Thank you for reading. To work together,{" "}
        <a
          href="mailto:rodriguesjohnbaptist@gmail.com"
          className="text-zinc-100 underline decoration-zinc-600 underline-offset-[3px] hover:decoration-zinc-100"
        >
          email me
        </a>{" "}
        or connect on{" "}
        <a
          href={PROFILE_LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-100 underline decoration-zinc-600 underline-offset-[3px] hover:decoration-zinc-100"
        >
          LinkedIn
        </a>
        .
      </p>
    </section>
  </div>
);

export default OrbiCaseStudy;
