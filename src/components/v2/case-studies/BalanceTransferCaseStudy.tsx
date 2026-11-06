import balanceTransferVideo from "@/assets/BT.mp4";
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
import {
  CaseStudyFigure,
  CaseStudyFigureRow,
  CaseStudyHero,
  CaseStudyLabel,
  CaseStudyList,
  CaseStudyPage,
  CaseStudyPoint,
  CaseStudyQuote,
  CaseStudySection,
  CaseStudySplash,
} from "@/components/v2/case-studies/EditorialCaseStudy";

const BalanceTransferCaseStudy = () => (
  <CaseStudyPage>
    <CaseStudySplash
      titleLines={["Balance Transfer,", "Citi Mobile for iOS"]}
      details={[
        { label: "Citibank · iOS" },
        { label: "Product Designer" },
        { label: "Shipped · 20M+ users" },
      ]}
    />

    <CaseStudyHero>
      <video
        src={balanceTransferVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="block h-auto w-full"
        style={{ aspectRatio: "1976/1080" }}
        aria-label="Citi balance transfer demo"
      />
    </CaseStudyHero>

    <CaseStudySection
      titleLines={["My role", "and responsibility"]}
      paragraphs={[
        "I conducted discovery, research, ideation, and designed the UI and prototype to deliver a solution that made balance transfers accessible.",
      ]}
    >
      <CaseStudyList
        items={[
          "I was responsible for leading and designing the end-to-end mobile experience for balance transfers.",
          "I collaborated with the Creative Director, UX Writer, Product Managers, and Developers.",
          "I facilitated a design audit and led design critique meetings.",
          "I designed the UI, defined design systems and interaction patterns, and managed developer handoff.",
        ]}
      />
    </CaseStudySection>

    <CaseStudySection titleLines={["What the work", "accomplished"]}>
      <CaseStudyList
        items={[
          "I designed an accessible balance transfer experience for 20 million users.",
          "By conducting a design audit and user research, I created a mobile experience that solved the problems found in the existing web version.",
          "I designed the UI with consideration for Human Interface Guidelines and incorporated Apple features such as app clip.",
        ]}
      />
      <div className="mt-10">
        <CaseStudyQuote>
          After redesigning the user flow, customers found the improved balance
          transfer feature more intuitive and user-friendly compared to the
          previous web experience. With a user base of 20 million on the Citi
          Mobile App, even a 1% increase in conversion rates could potentially
          result in an additional $2 million in revenue for Citi.
        </CaseStudyQuote>
      </div>
    </CaseStudySection>
    <CaseStudyFigure src={balanceT} alt="Balance transfer animation" />

    <CaseStudySection
      titleLines={["The opportunity", "space"]}
      paragraphs={[
        "No balance transfer experience was available for mobile, while balance transfer was available only on web. With 20 million users, this was an opportunity to make the experience accessible for customers.",
      ]}
    />
    <CaseStudyFigure src={btProcess} alt="Balance transfer process" />

    <CaseStudySection
      titleLines={["How it", "started"]}
      paragraphs={[
        "After product partners flagged that balance transfer was missing on mobile and web conversions were dropping, I did not jump straight to translating web to mobile. I facilitated a workshop with web screens to understand what problem we were solving. The team identified key pain points in UI, content, and user flow.",
      ]}
    >
      <CaseStudyLabel>Key takeaways</CaseStudyLabel>
      <CaseStudyList
        items={[
          "The call to action on each of the screens was confusing to users.",
          "Multiple balance transfer features made it confusing for users.",
          "The user flow had complicated interaction patterns.",
        ]}
      />
    </CaseStudySection>
    <CaseStudyFigure src={workspace} alt="Workshop screens" />

    <CaseStudySection
      titleLines={["User", "research"]}
      paragraphs={[
        "I framed questions for the UX research team to validate pain points, then worked with Citi research partners to conduct interviews and observation.",
      ]}
    >
      <CaseStudyLabel>Questions we asked</CaseStudyLabel>
      <CaseStudyList
        items={[
          "Are you able to understand how to initiate the balance transfer?",
          "Is the progress bar easy to understand?",
          "Do you understand how your transaction fees are applied?",
          "Which part of the experience do you find most challenging?",
          "Are the call to action and navigation easy to understand and navigate?",
        ]}
      />
    </CaseStudySection>
    <CaseStudyFigure src={userResearch} alt="User research sessions" confidential />

    <CaseStudySection
      titleLines={["What we", "learned"]}
      paragraphs={[
        "Based on this, I ideated user flows and low-fidelity concepts, collaborating with UX writers and developers to refine ideas.",
      ]}
    >
      <CaseStudyLabel>What wasn&apos;t working</CaseStudyLabel>
      <CaseStudyList
        items={[
          "Users found it challenging to understand the CTA.",
          "Navigation was complicated, especially with multiple balance transfer experiences.",
          "Users felt overwhelmed with information.",
        ]}
      />
      <div className="mt-10">
        <CaseStudyLabel>What worked</CaseStudyLabel>
        <CaseStudyList
          items={[
            "Transfer fees were easy to understand and users found them helpful.",
            "The progress bar indication was easy to understand.",
            "Users understood how to initiate the balance transfer.",
          ]}
        />
      </div>
    </CaseStudySection>
    <CaseStudyFigureRow>
      <CaseStudyFigure src={process1} alt="Low-fidelity concepts" />
      <CaseStudyFigure src={process2} alt="Concept exploration" />
    </CaseStudyFigureRow>

    <CaseStudySection
      titleLines={["User", "flow"]}
      paragraphs={[
        "The team had confusion around the end-to-end flow and what information we asked from users. I mapped the complete mobile flow so we could visualize the journey and make better product decisions together.",
      ]}
    />
    <CaseStudyFigure src={btUserFlow} alt="User flow diagram" />
    <CaseStudyFigureRow>
      <CaseStudyFigure src={wire1} alt="Wireframe flow" />
      <CaseStudyFigure src={flow2} alt="Flow diagram" />
    </CaseStudyFigureRow>

    <CaseStudySection titleLines={["UI design and", "decision highlights"]}>
      <CaseStudyPoint title="Compliance and sensitive data security">
        I sought feedback from legal and compliance throughout. We initially
        wanted the amount on the home screen, but were required to verify the
        creditor first. The design shows the creditor name first and requests the
        amount only after verification.
      </CaseStudyPoint>
    </CaseStudySection>
    <CaseStudyFigure src={ui1} alt="UI design" />
    <CaseStudyFigure src={ui2} alt="Compliance design comparison" />

    <CaseStudySection titleLines={["Verifying", "creditors"]}>
      <CaseStudyPoint title="A modal of verified creditors">
        I designed a modal listing verified creditors for quick selection. Users
        can add creditors manually; unverified entries are marked clearly on the
        summary screen until Citi completes verification.
      </CaseStudyPoint>
    </CaseStudySection>
    <CaseStudyFigure src={ui3} alt="Creditor verification interaction" />

    <CaseStudySection titleLines={["Good design", "within legal constraints"]}>
      <CaseStudyPoint title="Prototypes to align legal">
        Prototypes helped legal visualize options. I pushed back where needed to
        advocate for good design while meeting compliance requirements.
      </CaseStudyPoint>
      <CaseStudyPoint title="The outcome">
        The modal-based design was accepted by legal, preserving conversion while
        delivering a strong app experience.
      </CaseStudyPoint>
    </CaseStudySection>
    <CaseStudyFigure src={ui4} alt="Design and legal constraints comparison" />
    <CaseStudyFigure src={ui5} alt="Before and after design comparison" />

    <CaseStudySection
      titleLines={["UI system", "and guides"]}
      paragraphs={["Aligned the visuals with Citi’s design system and guidelines."]}
    />
    <CaseStudyFigureRow>
      <CaseStudyFigure src={ui6} alt="Design system, color" />
      <CaseStudyFigure src={ui7} alt="Design system, spacing" />
      <CaseStudyFigure src={ui8} alt="Design system, components" />
      <CaseStudyFigure src={ui9} alt="Design system, typography" />
    </CaseStudyFigureRow>
    <CaseStudyFigure src={ui10} alt="Design system, grids" />

    <CaseStudySection
      titleLines={["Conclusion"]}
      paragraphs={[
        "This project shows how research and mobile-first thinking can transform complex financial workflows. Rather than translating web, we addressed real customer pain points while meeting compliance. The redesigned feature makes balance transfer more intuitive for Citi’s 20 million mobile users.",
      ]}
    />
    <CaseStudyFigure src={bt1} alt="Balance transfer app" />
  </CaseStudyPage>
);

export default BalanceTransferCaseStudy;
