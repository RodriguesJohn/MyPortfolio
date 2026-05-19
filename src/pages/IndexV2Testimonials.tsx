import PageShell from "@/components/v2/PageShell";
import { TESTIMONIALS } from "@/data/testimonials";

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

const IndexV2Testimonials = () => (
  <PageShell>
    <div className="mx-auto w-[92%] max-w-[1100px]">
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
          Testimonials
        </h1>
        <p
          className="mt-2 max-w-xl text-[16px] text-zinc-400 leading-[1.6]"
          style={enter(160)}
        >
          What collaborators, clients, and peers have said about working together.
        </p>
      </section>

      <ul
        className="grid grid-cols-1 gap-4 pb-[200px] sm:grid-cols-2 lg:grid-cols-3"
        style={enter(220)}
      >
        {TESTIMONIALS.map((testimonial, i) => (
          <li
            key={testimonial.id}
            className="flex h-full flex-col rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/[0.08]"
            style={enter(260 + i * 50)}
          >
            <p className="flex-1 text-[14px] leading-relaxed text-zinc-400">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/[0.06] pt-4">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-zinc-100">
                  {testimonial.author}
                </p>
                <p className="text-[12.5px] text-zinc-500">{testimonial.role}</p>
              </div>
              {testimonial.companyLogo ? (
                <img
                  src={testimonial.companyLogo}
                  alt=""
                  className="h-5 w-auto max-w-[56px] shrink-0 object-contain opacity-90"
                  style={testimonial.logoStyle}
                  loading="lazy"
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </PageShell>
);

export default IndexV2Testimonials;
