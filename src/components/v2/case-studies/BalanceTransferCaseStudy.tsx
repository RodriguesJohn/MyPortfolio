import type { ReactNode } from "react";
import balanceT from "@/assets/BalanceT.gif";
import btProcess from "@/assets/BTProcess.png";
import workspace from "@/assets/Workspace.png";
import userResearch from "@/assets/UserResearch.png";
import process1 from "@/assets/Process1.png";
import process2 from "@/assets/Process2.png";
import btUserFlow from "@/assets/BTUserFlow.png";
import wire1 from "@/assets/Wire1.png";
import flow2 from "@/assets/Flow2.png";
import ui1 from "@/assets/UI1.png";
import ui2 from "@/assets/UI2.png";
import ui3 from "@/assets/UI3.gif";
import ui4 from "@/assets/UI4.gif";
import ui5 from "@/assets/UI5.png";
import ui6 from "@/assets/UI6.png";
import ui7 from "@/assets/UI7.png";
import ui8 from "@/assets/UI8.png";
import ui9 from "@/assets/UI9.png";
import ui10 from "@/assets/UI10.png";
import bt1 from "@/assets/BT1.png";

const body = "text-[17px] sm:text-[18px] leading-[1.7] text-zinc-300";
const bodyMuted = "text-[17px] sm:text-[18px] leading-[1.7] text-zinc-400";
const h2 = "mb-4 text-[19px] font-semibold tracking-tight text-zinc-50";
const h3 = "mb-4 text-[17px] font-semibold tracking-tight text-zinc-100";
const mediaWrap =
  "overflow-hidden rounded-2xl bg-zinc-900/80 ring-1 ring-white/[0.08] sm:rounded-3xl";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="mb-10 sm:mb-12">
    <h3 className={h2}>{title}</h3>
    {children}
  </section>
);

const Figure = ({ src, alt }: { src: string; alt: string }) => (
  <div className={`${mediaWrap} my-6`}>
    <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
  </div>
);

/** Strong blur for confidential research imagery */
const FigureConfidential = ({ src }: { src: string }) => (
  <figure className={`${mediaWrap} my-6`}>
    <div className="relative overflow-hidden bg-zinc-950">
      <img
        src={src}
        alt=""
        className="w-full scale-[1.12] blur-2xl motion-reduce:blur-md"
        loading="lazy"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
    <figcaption className="border-t border-white/[0.06] px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
      Confidential · sessions anonymized
    </figcaption>
  </figure>
);

const Highlight = ({
  title,
  items,
}: {
  title?: string;
  items: { tone?: "negative" | "positive"; text: string }[];
}) => (
  <div className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/[0.09] sm:p-6">
    {title ? <p className={h3}>{title}</p> : null}
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
              item.tone === "positive" ? "bg-emerald-500/80" : "bg-red-500/80"
            }`}
            aria-hidden
          />
          <p className="text-[15px] leading-relaxed text-zinc-400">{item.text}</p>
        </li>
      ))}
    </ul>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="my-4 space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" aria-hidden />
        <p className={bodyMuted}>{item}</p>
      </li>
    ))}
  </ul>
);

const BalanceTransferCaseStudy = () => (
  <div className="w-full">
    <Section title="What was my role & responsibility?">
      <p className={`${body} mb-6`}>
        I conducted discovery, research, ideation, and designed the UI and prototype to
        deliver a solution that made balance transfers accessible.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "I was responsible for leading and designing the end-to-end mobile experience for balance transfers.",
          "I collaborated with the Creative Director, UX Writer, Product Managers, and Developers.",
          "I facilitated a design audit and led design critique meetings.",
          "I designed the UI, defined design systems and interaction patterns, and managed developer handoff.",
        ].map((text) => (
          <div
            key={text}
            className="rounded-xl bg-white/[0.04] px-4 py-3.5 text-[15px] leading-relaxed text-zinc-400 ring-1 ring-white/[0.08]"
          >
            {text}
          </div>
        ))}
      </div>
    </Section>

    <Section title="What outcome was accomplished?">
      <BulletList
        items={[
          "I designed an accessible balance transfer experience for 20 million users.",
          "By conducting a design audit and user research, I created a mobile experience that solved the problems found in the existing web version.",
          "I designed the UI with consideration for Human Interface Guidelines and incorporated Apple features such as app clip.",
        ]}
      />
      <blockquote className="my-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-[15px] italic leading-relaxed text-zinc-400 ring-1 ring-white/[0.06]">
        After redesigning the user flow, customers found the improved balance transfer
        feature more intuitive and user-friendly compared to the previous web experience.
        With a user base of 20 million on the Citi Mobile App, even a 1% increase in
        conversion rates could potentially result in an additional $2 million in revenue
        for Citi.
      </blockquote>
      <Figure src={balanceT} alt="Balance Transfer Animation" />
    </Section>

    <Section title="What was the opportunity space here?">
      <p className={body}>
        No balance transfer experience was available for mobile, while balance transfer
        was available only on web. With{" "}
        <strong className="font-semibold text-zinc-100">20 million users</strong>, this
        was an opportunity to make the experience accessible for customers.
      </p>
    </Section>

    <Section title="Process">
      <Figure src={btProcess} alt="Balance Transfer Process" />
    </Section>

    <Section title="How did it start?">
      <p className={`${body} mb-6`}>
        After product partners flagged that balance transfer was missing on mobile and
        web conversions were dropping, I did not jump straight to translating web to
        mobile. I facilitated a workshop with web screens to understand{" "}
        <strong className="font-semibold text-zinc-100">
          what problem we were solving
        </strong>
        . The team identified key pain points in UI, content, and user flow.
      </p>
      <Figure src={workspace} alt="Workshop screens" />
      <div className="mt-6">
        <Highlight
          title="Key takeaways and insights"
          items={[
            {
              tone: "negative",
              text: "The call to action on each of the screens were confusing to the users",
            },
            {
              tone: "negative",
              text: "Multiple balance transfer features made it confusing for the users",
            },
            {
              tone: "negative",
              text: "The user flow had complicated interaction patterns",
            },
          ]}
        />
      </div>
    </Section>

    <Section title="User Research">
      <p className={`${body} mb-4`}>
        I framed questions for the UX research team to validate pain points:
      </p>
      <BulletList
        items={[
          "Are you able to understand how to initiate the balance transfer?",
          "Is the progress bar easy to understand?",
          "Do you understand how your transaction fees are applied?",
          "Which part of the experience do you find most challenging?",
          "Are the call to action and navigation easy to understand and navigate?",
        ]}
      />
      <p className={`${body} mb-6`}>
        I worked with Citi research partners to conduct interviews and observation.
      </p>
      <FigureConfidential src={userResearch} />
      <div className="mt-6">
        <Highlight
          title="Key takeaways and insights"
          items={[
            { tone: "negative", text: "Users found it challenging to understand the CTA" },
            {
              tone: "negative",
              text: "Navigation was complicated, especially with multiple balance transfer experiences",
            },
            { tone: "negative", text: "Users felt overwhelmed with information" },
            {
              tone: "positive",
              text: "Transfer fees were easy to understand and users found them helpful",
            },
            {
              tone: "positive",
              text: "The progress bar indication was easy to understand for users",
            },
            {
              tone: "positive",
              text: "Users understood how to initiate the balance transfer",
            },
          ]}
        />
      </div>
      <p className={`${body} mt-6`}>
        Based on this, I ideated user flows and low-fidelity concepts, collaborating with
        UX writers and developers to refine ideas.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Figure src={process1} alt="Low-fidelity concepts" />
        <Figure src={process2} alt="Concept exploration" />
      </div>
    </Section>

    <Section title="User Flow">
      <p className={`${body} mb-6`}>
        The team had confusion around the end-to-end flow and what information we asked
        from users. I mapped the complete mobile flow so we could visualize the journey
        and make better product decisions together.
      </p>
      <Figure src={btUserFlow} alt="User flow diagram" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Figure src={wire1} alt="Wireframe flow" />
        <Figure src={flow2} alt="Flow diagram" />
      </div>
    </Section>

    <Section title="UI Design & Decision Highlights">
      <Figure src={ui1} alt="UI Design" />

      <div className="mb-10">
        <h3 className={h3}>Compliance and sensitive data security decision</h3>
        <p className={`${body} mb-6`}>
          I sought feedback from legal and compliance throughout. We initially wanted the
          amount on the home screen, but were required to verify the creditor first. The
          design shows the creditor name first and requests the amount only after
          verification.
        </p>
        <Figure src={ui2} alt="Compliance design comparison" />
      </div>

      <div className="mb-10">
        <h3 className={h3}>Verifying Creditors</h3>
        <p className={`${body} mb-6`}>
          I designed a modal listing verified creditors for quick selection. Users can add
          creditors manually; unverified entries are marked clearly on the summary screen
          until Citi completes verification.
        </p>
        <Figure src={ui3} alt="Creditor verification interaction" />
      </div>

      <div className="mb-10">
        <h3 className={h3}>Balance good design practice vs legal constraints</h3>
        <p className={`${body} mb-6`}>
          Prototypes helped legal visualize options. I pushed back where needed to advocate
          for good design while meeting compliance requirements.
        </p>
        <Figure src={ui4} alt="Design and legal constraints comparison" />
        <p className={`${body} mt-6`}>
          The modal-based design was accepted by legal, preserving conversion while
          delivering a strong app experience.
        </p>
        <Figure src={ui5} alt="Before and after design comparison" />
      </div>
    </Section>

    <Section title="UI System & Guides">
      <p className={`${body} mb-6`}>
        Aligned the visuals with Citi&apos;s design system and guidelines.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Figure src={ui6} alt="Design system, Color" />
        <Figure src={ui7} alt="Design system, Spacing" />
        <Figure src={ui8} alt="Design system, Components" />
        <Figure src={ui9} alt="Design system, Typography" />
        <div className="sm:col-span-2">
          <Figure src={ui10} alt="Design system, Grids" />
        </div>
      </div>
    </Section>

    <Section title="Conclusion">
      <p className={`${body} mb-6`}>
        This project shows how research and mobile-first thinking can transform complex
        financial workflows. Rather than translating web, we addressed real customer pain
        points while meeting compliance. The redesigned feature makes balance transfer
        more intuitive for Citi&apos;s 20 million mobile users.
      </p>
      <Figure src={bt1} alt="Balance Transfer App" />
    </Section>
  </div>
);

export default BalanceTransferCaseStudy;
