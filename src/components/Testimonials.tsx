import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <h2 className="text-2xl font-semibold mb-8 text-foreground">What clients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900/50 rounded-lg p-6 border-[0.5px] border-border/30 dark:border-border/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <p className="text-base leading-relaxed mb-4 text-muted-foreground/80">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="pt-4 border-t border-border/30">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground/70 mt-1">{testimonial.role}</p>
                {testimonial.companyLogo ? (
                  <div className="mt-4 flex items-center">
                    <img
                      src={testimonial.companyLogo}
                      alt=""
                      className="h-5 w-auto object-contain"
                      style={testimonial.logoStyle}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
