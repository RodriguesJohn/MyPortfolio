import PageShell from "@/components/v2/PageShell";
import { TOOL_STACK } from "@/data/toolStack";

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

const IndexV2ToolStack = () => (
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
          My tool stack
        </h1>
        <p
          className="mt-2 text-[16px] text-zinc-400 leading-[1.6]"
          style={enter(160)}
        >
          Design, AI, and code tools I use to ship products end to end.
        </p>
      </section>

      <div className="space-y-10" style={enter(220)}>
        {TOOL_STACK.map((category, ci) => (
          <section key={category.id} style={enter(260 + ci * 60)}>
            <h2 className="text-[11px] tracking-[0.18em] uppercase text-zinc-500 mb-3">
              {category.label}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {category.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-2 text-[14px] font-medium text-zinc-200 ring-1 ring-white/[0.08]"
                >
                  {tool.logo ? (
                    <img
                      src={tool.logo}
                      alt=""
                      className="h-4 w-4 shrink-0 object-contain"
                      loading="lazy"
                    />
                  ) : null}
                  {tool.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  </PageShell>
);

export default IndexV2ToolStack;
