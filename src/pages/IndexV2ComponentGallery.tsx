import PageShell, { display } from "@/components/v2/PageShell";

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  animation: `entranceItemNoBlur 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, opacity",
});

const IndexV2ComponentGallery = () => (
  <PageShell>
    <div className="mx-auto w-full max-w-[960px] px-3 pb-[140px] pt-16 sm:px-4 lg:px-5">
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500"
        style={enter(0)}
      >
        Design engineering
      </p>
      <h1
        className="mt-2 text-[28px] font-bold tracking-[-0.02em] leading-[1.1] text-zinc-50 sm:text-[32px]"
        style={{ ...display, ...enter(80) }}
      >
        Component gallery
      </h1>
      <p
        className="mt-3 max-w-[36rem] text-[15px] leading-[1.55] text-zinc-500"
        style={enter(140)}
      >
        Interactive UI patterns, motion studies, and interface experiments —
        built in code. This gallery is coming together; check back soon.
      </p>

      <div
        className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        style={enter(220)}
      >
        {["Buttons", "Cards", "Motion", "Forms", "Navigation", "Feedback"].map(
          (label) => (
            <div
              key={label}
              className="flex aspect-[4/3] items-end rounded-[14px] bg-zinc-900/60 p-4 ring-1 ring-zinc-800/80"
            >
              <span className="text-[13px] font-medium text-zinc-400">
                {label}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  </PageShell>
);

export default IndexV2ComponentGallery;
