import PageShell from "@/components/v2/PageShell";

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

const SESSIONS = [
  {
    id: "intro",
    label: "30 min call",
    title: "Quick chat",
    description:
      "A short call to talk through your portfolio, career questions, or a project you're working on.",
    href: "https://cal.com/john-rodrigues-rqt2lg/30min",
    cta: "Book a 30 min call",
  },
  {
    id: "mentorship",
    label: "Mentorship",
    title: "Mentorship session",
    description:
      "A focused session on design, AI, and shipping products end to end, shaped around where you want to grow.",
    href: "https://cal.com/john-rodrigues-vj4aia/mentorship",
    cta: "Book a mentorship session",
  },
];

const IndexV2Mentorship = () => (
  <PageShell>
    <div className="mx-auto w-[92%] max-w-[720px] pb-[200px]">
      <section className="pt-20 sm:pt-24 pb-8">
        <p
          className="text-[11px] tracking-[0.18em] uppercase text-zinc-500"
          style={enter(0)}
        >
          Portfolio
        </p>
        <h1
          className="mt-3 text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.2] text-zinc-50"
          style={enter(80)}
        >
          Mentorship
        </h1>
        <p
          className="mt-2 text-[16px] text-zinc-400 leading-[1.6]"
          style={enter(160)}
        >
          Book time with me to talk design, AI, and building products.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {SESSIONS.map((session, i) => (
          <a
            key={session.id}
            href={session.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.07]"
            style={enter(240 + i * 80)}
          >
            <span className="text-[11px] tracking-[0.18em] uppercase text-zinc-500">
              {session.label}
            </span>
            <span className="mt-2 text-[18px] font-semibold tracking-tight text-zinc-50">
              {session.title}
            </span>
            <span className="mt-2 flex-1 text-[14px] leading-[1.6] text-zinc-400">
              {session.description}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-zinc-200 group-hover:text-white">
              {session.cta}
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  </PageShell>
);

export default IndexV2Mentorship;
