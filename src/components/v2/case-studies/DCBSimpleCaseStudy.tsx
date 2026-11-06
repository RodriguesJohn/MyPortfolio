import dcbImage from "@/assets/dcb-accounts-overview.jpg";
import {
  CaseStudyHero,
  CaseStudyNote,
  CaseStudyPage,
  CaseStudySection,
  CaseStudySplash,
} from "@/components/v2/case-studies/EditorialCaseStudy";

const OVERVIEW = [
  "A multi-year initiative to build a digital commercial banking platform from scratch for Innovation Economy clients. Founders and small business owners needed a place to manage accounts, track cash flow, handle lending, and see their full financial picture without enterprise-level complexity.",
  "I joined in early discovery, when wireframes existed but there was no unified product vision. Over the next years I helped shape Accounts, then led Lending, while staying connected across workstreams on a platform this interconnected.",
];

const ROLES = [
  "I started on Accounts, designing how founders would see and manage their money when the experience was still early wireframes. The challenge was clear: users could find transactions, but not the bigger picture. Working inside an existing design system and Highcharts constraints, I shaped an accounts overview with balance-over-time visualization that pulled checking, lending, and connected accounts into one place.",
  "Research kept surfacing the same friction. Lending was buried inside Accounts, so founders got lost just trying to see what they owed. I advocated for a dedicated Lending space, and once that landed I moved into leading it: home, facility details, transactions, auto-pay, and paperless. Along the way I also partnered with the CTO on an end-to-end site map of the platform, which forced a clear view of how every workstream connected.",
  "On a product this interconnected, nothing shipped in isolation. The lending tile had to work in Accounts, Dashboard, and Lending at once, which meant aligning three teams on one component. My job became as much facilitation as craft: proposing patterns, resolving disagreements, and keeping design decisions coherent across the platform.",
];

const OUTCOMES = [
  "I helped JPMorgan Chase enter mid-market Innovation Economy startup banking in Silicon Valley and beyond: giving founders and growing companies a place to bank that felt built for them, not for enterprise. Through Accounts and Lending, I shaped how that segment could manage cash, credit, and day-to-day money decisions in one product.",
  "I drove the Accounts overview that made financial context visible, advocated for and then led a dedicated Lending experience founders could actually find, and owned shared patterns like the lending tile across Accounts, Dashboard, and Lending. The outcome I cared about was coherence: a clear path for a new client segment to bank with JPMorgan, not a pile of disconnected screens.",
];

const DCBSimpleCaseStudy = () => (
  <CaseStudyPage>
    <CaseStudySplash
      titleLines={["Startup Banking,", "JPMorgan Chase"]}
      details={[
        { label: "JPMorgan Chase · B2B" },
        { label: "Accounts & Lending" },
        { label: "2020–21" },
      ]}
    />

    <CaseStudyHero>
      <img
        src={dcbImage}
        alt="Startup Banking by JPMorgan Chase accounts overview"
        className="block h-auto w-full"
        loading="eager"
      />
    </CaseStudyHero>

    <CaseStudySection
      titleLines={["Digital banking", "for the Innovation Economy"]}
      paragraphs={OVERVIEW}
    />
    <CaseStudySection
      titleLines={["From Accounts", "to leading Lending"]}
      paragraphs={ROLES}
    />
    <CaseStudySection
      titleLines={["A place to bank", "built for founders"]}
      paragraphs={OUTCOMES}
    />

    <CaseStudyNote>
      This work was completed under JPMorgan Chase and remains confidential.
      Detailed process, research artifacts, and deeper case study materials are
      available on request or during a private case study walkthrough.
    </CaseStudyNote>
  </CaseStudyPage>
);

export default DCBSimpleCaseStudy;
