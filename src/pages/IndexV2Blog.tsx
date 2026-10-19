import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell, { display } from "@/components/v2/PageShell";
import { COURSE_CTA, COURSE_URL, POSTS } from "@/blog/posts";
import { BlogCourseCta } from "./IndexV2BlogPost";

const enter = (delay = 0): React.CSSProperties => ({
  opacity: 0,
  transform: "translateY(12px)",
  filter: "blur(6px)",
  animation: `entranceItem 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
  willChange: "transform, filter, opacity",
});

const IndexV2Blog = () => {
  useEffect(() => {
    document.title = "Blog | John Rodrigues";
  }, []);

  return (
    <PageShell>
      <div className="mx-auto w-[92%] max-w-[720px] pb-[200px]">
        <section className="pt-20 pb-8 sm:pt-24">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500" style={enter(0)}>
            Portfolio
          </p>
          <h1
            className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight text-zinc-50 sm:text-[32px]"
            style={{ ...display, ...enter(80) }}
          >
            Blog
          </h1>
          <p className="mt-2 text-[16px] leading-[1.6] text-zinc-400" style={enter(160)}>
            Articles on AI, design systems, and design engineering.
          </p>
          <a
            href={COURSE_URL}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/[0.04] py-1 pl-1 pr-3.5 text-[12px] ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.07]"
            style={enter(220)}
          >
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-500">
              New
            </span>
            <span className="font-semibold text-zinc-200">{COURSE_CTA.label}</span>
            <span className="text-zinc-500" aria-hidden="true">→</span>
          </a>
        </section>

        <ul className="flex flex-col gap-3">
          {POSTS.map((post, i) => (
            <li key={post.slug} style={enter(280 + i * 60)}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.07]"
              >
                <span className="text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                  {post.dateLabel}
                </span>
                <h2
                  className="mt-2 text-[18px] font-semibold tracking-tight text-zinc-50"
                  style={display}
                >
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-zinc-400">
                  {post.description}
                </p>
                <span className="mt-4 inline-block text-[13px] font-medium text-zinc-200 group-hover:text-white">
                  Read more →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <BlogCourseCta />
      </div>
    </PageShell>
  );
};

export default IndexV2Blog;
