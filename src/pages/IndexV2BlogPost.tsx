import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageShell, { display } from "@/components/v2/PageShell";
import { COURSE_CTA, COURSE_URL, findPost } from "@/blog/posts";

export const BlogCourseCta = () => (
  <aside className="mt-14 flex flex-col gap-4 rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
    <p className="text-[16px] font-semibold tracking-tight text-zinc-50" style={display}>
      {COURSE_CTA.line}
    </p>
    <a
      href={COURSE_URL}
      className="v2-explore-cta inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
    >
      {COURSE_CTA.label} →
    </a>
  </aside>
);

const IndexV2BlogPost = () => {
  const { slug } = useParams();
  const post = findPost(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} | John Rodrigues`;
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <PageShell>
      <article className="mx-auto w-[92%] max-w-[720px] pb-[200px]">
        <header className="pt-20 sm:pt-24">
          <Link to="/blog" className="text-[12px] text-zinc-500 transition-colors hover:text-zinc-300">
            ← All articles
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.12em] text-zinc-500">
            <time dateTime={post.date}>{post.dateLabel}</time>
          </p>
          <h1
            className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight text-zinc-50 sm:text-[36px]"
            style={display}
          >
            {post.title}
          </h1>
          {post.description ? (
            <p className="mt-4 text-[17px] leading-[1.6] text-zinc-400">{post.description}</p>
          ) : null}
          <aside className="mt-6 rounded-xl bg-white/[0.04] p-4 text-[14px] leading-[1.6] text-zinc-300 ring-1 ring-white/[0.08]">
            <strong className="text-zinc-50">Note:</strong> {COURSE_CTA.note}{" "}
            <a href={COURSE_URL} className="font-semibold text-zinc-50 underline underline-offset-4">
              {COURSE_CTA.noteLabel} →
            </a>
          </aside>
        </header>

        <div className="v2-blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <BlogCourseCta />
      </article>
    </PageShell>
  );
};

export default IndexV2BlogPost;
