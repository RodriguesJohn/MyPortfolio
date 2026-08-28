import { useNavigate } from "react-router-dom";
import dcbImage from "@/assets/dcb-accounts-overview.jpg";
import { display } from "@/components/v2/PageShell";

const body = "text-[17px] sm:text-[18px] leading-[1.75] text-zinc-300";
const muted = "text-[16px] sm:text-[17px] leading-[1.7] text-zinc-400";
const metaLabel = "text-[13px] font-medium text-zinc-500";
const h2 =
  "text-[22px] font-semibold tracking-[-0.02em] text-zinc-50 sm:text-[24px]";

const DCBSimpleCaseStudy = () => {
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
        <p className={metaLabel}>JPMorgan Chase · B2B</p>
        <h1
          className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-zinc-50 sm:text-[48px]"
          style={display}
        >
          Startup Banking by JPMorgan Chase
        </h1>
        <p className={`mx-auto mt-6 max-w-[36rem] ${body}`}>
          Institutional-side B2B banking for commercial users, startups, and
          small businesses managing accounts, cash flow, and lending.
        </p>
      </header>

      <figure className="mt-12 overflow-hidden rounded-[22px] bg-[#e8eef4] ring-1 ring-white/[0.08] sm:mt-14 sm:rounded-[28px]">
        <img
          src={dcbImage}
          alt="Startup Banking by JPMorgan Chase accounts overview"
          className="h-auto w-full object-cover"
          loading="eager"
        />
      </figure>

      <div className="mx-auto mt-16 grid max-w-[40rem] gap-12 text-left sm:mt-20 sm:gap-14">
        <section>
          <h2 className={`${h2} text-center`} style={display}>
            Overview
          </h2>
          <p className={`mt-4 ${body}`}>
            A multi-year initiative to build a digital commercial banking
            platform from scratch for Innovation Economy clients. Founders and
            small business owners needed a place to manage accounts, track cash
            flow, handle lending, and see their full financial picture without
            enterprise-level complexity.
          </p>
          <p className={`mt-4 ${muted}`}>
            I joined in early discovery, when wireframes existed but there was
            no unified product vision. Over the next years I helped shape
            Accounts, then led Lending, while staying connected across
            workstreams on a platform this interconnected.
          </p>
        </section>

        <aside className="rounded-2xl bg-zinc-900 p-5 ring-1 ring-white/[0.08] sm:p-6">
          <p className={`text-center ${muted}`}>
            This work was completed under JPMorgan Chase and remains
            confidential. Detailed process, research artifacts, and deeper case
            study materials are available on request or during a private case
            study walkthrough.
          </p>
        </aside>

        <section>
          <h2 className={`${h2} text-center`} style={display}>
            Roles and responsibilities
          </h2>
          <p className={`mt-4 ${body}`}>
            I started on Accounts, designing how founders would see and manage
            their money when the experience was still early wireframes. The
            challenge was clear: users could find transactions, but not the
            bigger picture. Working inside an existing design system and
            Highcharts constraints, I shaped an accounts overview with
            balance-over-time visualization that pulled checking, lending, and
            connected accounts into one place.
          </p>
          <p className={`mt-4 ${body}`}>
            Research kept surfacing the same friction. Lending was buried inside
            Accounts, so founders got lost just trying to see what they owed.
            I advocated for a dedicated Lending space, and once that landed I
            moved into leading it: home, facility details, transactions,
            auto-pay, and paperless. Along the way I also partnered with the CTO
            on an end-to-end site map of the platform, which forced a clear view
            of how every workstream connected.
          </p>
          <p className={`mt-4 ${muted}`}>
            On a product this interconnected, nothing shipped in isolation. The
            lending tile had to work in Accounts, Dashboard, and Lending at
            once, which meant aligning three teams on one component. My job
            became as much facilitation as craft: proposing patterns, resolving
            disagreements, and keeping design decisions coherent across the
            platform.
          </p>
        </section>

        <section>
          <h2 className={`${h2} text-center`} style={display}>
            Outcomes I drove
          </h2>
          <p className={`mt-4 ${body}`}>
            I helped JPMorgan Chase enter mid-market Innovation Economy startup
            banking in Silicon Valley and beyond: giving founders and growing
            companies a place to bank that felt built for them, not for
            enterprise. Through Accounts and Lending, I shaped how that segment
            could manage cash, credit, and day-to-day money decisions in one
            product.
          </p>
          <p className={`mt-4 ${muted}`}>
            I drove the Accounts overview that made financial context visible,
            advocated for and then led a dedicated Lending experience founders
            could actually find, and owned shared patterns like the lending tile
            across Accounts, Dashboard, and Lending. The outcome I cared about
            was coherence: a clear path for a new client segment to bank with
            JPMorgan, not a pile of disconnected screens.
          </p>
        </section>
      </div>
    </article>
  );
};

export default DCBSimpleCaseStudy;
