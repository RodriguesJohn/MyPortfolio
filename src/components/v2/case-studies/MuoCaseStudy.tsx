import muoVideo from "@/assets/Orbi.mov";
import thoughtExpansionVideo from "@/assets/orbi-thought-expansion.mov";
import recordVideo from "@/assets/RecordButton.mp4";
import rippleVideo from "@/assets/ripple.mp4";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudyPoint,
  CaseStudySection,
  CaseStudySplash,
  CaseStudyVideo,
} from "@/components/v2/case-studies/EditorialCaseStudy";

/** Muo: the original voice-first AI note taker (iOS). */
const MuoCaseStudy = () => (
  <CaseStudyPage>
    <CaseStudySplash
      titleLines={["AI note taker,", "Muo"]}
      details={[
        { label: "iOS native app" },
        { label: "Design Engineer, Product Builder" },
        { label: "2025" },
      ]}
    />

    <CaseStudyHero>
      <video
        src={muoVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="block h-auto w-full"
        aria-label="Muo demo: AI note taker for creators"
      />
    </CaseStudyHero>

    <CaseStudySection
      titleLines={["An AI note taker", "for creators"]}
      paragraphs={[
        "Capture voice notes, thoughts, and ideas, then organize and repurpose them into content when you’re ready. I designed and built Muo as a native iOS app with Swift, Cursor, Claude Code and Codex.",
      ]}
    />

    <CaseStudySection
      titleLines={["Capture now,", "lose it later"]}
      paragraphs={[
        "A creator’s best thinking happens away from the desk: on a walk, between tasks, mid-conversation. Capture now, use later. But voice memos, notes, and drafts live in different apps. When they sit down to write, the thread is gone. They remember having the idea, not what it was.",
        "67M+ creators globally. Up to 70% of uncaptured thinking fades within 24 hours. Roughly one full day per week goes to finding information already saved somewhere else. On mobile, capture is fast. Retrieval is not.",
      ]}
    />

    <CaseStudySection
      titleLines={["Speak it once,", "find it again"]}
      paragraphs={[
        "Muo is built for that gap. Speak a thought on a walk, between meetings, whenever it hits, and Muo captures it. Everything lives in one seamless interface you can open anytime, so your ideas stop disappearing into app silos.",
        "Muo also narrates your notes back to you. Hearing your own thinking again makes it easier to spot what is worth keeping, connect ideas you forgot were related, and turn raw captures into content you can actually ship: posts, scripts, newsletters, whatever you are building next.",
      ]}
    />
    <CaseStudyVideo src={recordVideo} label="Muo record demo" />

    <CaseStudySection
      titleLines={["Explore", "your thoughts"]}
      paragraphs={[
        "Capture is only half the job. Muo lets you come back to your thinking, open a note, and move through it in a seamless interface. Expand a thought, follow where it leads, and see how ideas connect instead of staying buried in a list.",
        "The goal is navigation, not filing. You should be able to explore what you already captured the same way you think: fluid, visual, and easy to pick back up.",
      ]}
    />
    <CaseStudyVideo src={thoughtExpansionVideo} label="Muo thought expansion demo" />

    <CaseStudySection titleLines={["Built for the", "repurposing loop"]}>
      <CaseStudyPoint title="One place for every stray thought">
        Stop splitting ideas across Apple Notes, sticky notes, voice memos, and
        random screenshots. Muo gives your thinking a single home you can open
        anytime.
      </CaseStudyPoint>
      <CaseStudyPoint title="Hear your ideas back">
        Muo doesn&apos;t just store transcripts. It narrates your notes back to
        you. Hearing your own thinking again is often what turns a rough capture
        into something worth publishing.
      </CaseStudyPoint>
      <CaseStudyPoint title="Capture once, write later">
        Return when you&apos;re ready to write. Your past thoughts become the
        source material for posts, scripts, and newsletters, without starting
        from zero.
      </CaseStudyPoint>
    </CaseStudySection>
    <CaseStudyVideo src={rippleVideo} label="Muo ripple interaction demo" />

    <CaseStudySection
      titleLines={["Dream", "outcome"]}
      paragraphs={[
        "Muo becomes the place creators trust with their thinking. Every stray thought lands in one home, stays findable, and is ready to turn into content when they are. Capture is instant. Navigation feels like thought itself. Creators stop losing their best work before it ever gets made.",
      ]}
    />
  </CaseStudyPage>
);

export default MuoCaseStudy;
