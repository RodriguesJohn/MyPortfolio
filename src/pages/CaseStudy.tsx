import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { PasswordProtect } from "@/components/PasswordProtect";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aiInsightsVideo from "@/assets/AI Insights App.mp4";
import citiAIIntegration from "@/assets/CitiAIIngration.webp";
import aiCapExploration from "@/assets/AICapExploration.png";
import card4 from "@/assets/Card_4.webp";
import grid from "@/assets/Grid.webp";
import typography from "@/assets/Typograpghy.webp";
import heroInsights from "@/assets/HeroInsights.webp";
import balanceTransferVideo from "@/assets/BalanceTransferApp.mp4";
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
import toca1 from "@/assets/Toca1.png";
import group404 from "@/assets/Group 404.png";
import workinP from "@/assets/WorkinP.png";
import uxResearch from "@/assets/UX research.png";
import tocaWire from "@/assets/TocaWire.png";
import toca7 from "@/assets/Toca7.png";
import toca8 from "@/assets/Toca 8.png";
import modal from "@/assets/modal.png";
import cl from "@/assets/cl.png";
import toca11Video from "@/assets/Toca11.mov";
import pamVideo from "@/assets/PAM.mp4";
import p5Image from "@/assets/P5.png";
import group41 from "@/assets/MediatationApp/Group 41.svg";
import group42 from "@/assets/MediatationApp/Group 42.svg";
import group43 from "@/assets/MediatationApp/Group 43.svg";
import group44 from "@/assets/MediatationApp/Group 44.svg";
import group3 from "@/assets/MediatationApp/Group 3.svg";
import group4 from "@/assets/MediatationApp/Group 4.svg";
import dotsSvg from "@/assets/MediatationApp/dots.svg";
import slide16_9_7 from "@/assets/MediatationApp/Slide 16_9 - 7.svg";
import watchOSVideo from "@/assets/MediatationApp/watchOS.mp4";
import uxAgentVideo from "@/assets/V2UXAgent.mp4";
import uxAgentPGImage from "@/assets/UXAgent.png";
import aiVoiceVideo from "@/assets/AIVoice.mov";
import dcbImage from "@/assets/DCB.png";
import meditationUntitled1 from "@/assets/MediatationApp/Untitled.png";
import meditationUntitled2 from "@/assets/MediatationApp/Untitled (1).png";
import meditationUntitled3 from "@/assets/MediatationApp/Untitled (2).png";
import meditationUntitled4 from "@/assets/MediatationApp/Untitled (3).png";
import meditationUntitled5 from "@/assets/MediatationApp/Untitled (4).png";
import meditationUntitled6 from "@/assets/MediatationApp/Untitled (5).png";
import meditationUntitled7 from "@/assets/MediatationApp/Untitled (6).png";
import meditationUntitled8 from "@/assets/MediatationApp/Untitled (7).png";
import meditationUntitled9 from "@/assets/MediatationApp/Untitled (8).png";
import meditationUntitled10 from "@/assets/MediatationApp/Untitled (9).png";
import meditationUntitled11 from "@/assets/MediatationApp/Untitled (10).png";
import conceptGif1 from "@/assets/MediatationApp/1_viA2iU98RoFMbNXpG4ilIw.gif";
import conceptGif2 from "@/assets/MediatationApp/1_tLAwbwmNswY5n3L2qK9_LA.gif";
import conceptGif3 from "@/assets/MediatationApp/1_viA2iU98RoFMbNXpG4ilIw (1).gif";
import dribbbleShot1 from "@/assets/Dribbble shot - 1.jpg";
import untitled1 from "@/assets/Untitled.png";
import untitled2 from "@/assets/Untitled (1).png";
import untitled3 from "@/assets/Untitled (2).png";
import untitled4 from "@/assets/Untitled (3).png";
import untitled5 from "@/assets/Untitled (4).png";
import untitled6 from "@/assets/Untitled (5).png";
import untitled7 from "@/assets/Untitled (6).png";
import untitled8 from "@/assets/Untitled (7).png";
import untitled9 from "@/assets/Untitled (8).png";
import untitled10 from "@/assets/Untitled (9).png";
import untitled11 from "@/assets/Untitled (10).png";
import untitled12 from "@/assets/Untitled (11).png";
import untitled13 from "@/assets/Untitled (12).png";
import untitled14 from "@/assets/Untitled (13).png";
import untitled15 from "@/assets/Untitled (14).png";
import untitled16 from "@/assets/Untitled (15).png";
import screenshot2023 from "@/assets/Screenshot 2023-06-06 at 7.57.05 PM.png";
import citiLogo from "@/assets/Citi.svg.png";

// Reusable components
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mb-16 ${className}`}>{children}</section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground tracking-tight">{children}</h2>
);

const SectionText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-lg leading-relaxed text-muted-foreground/80 ${className}`}>{children}</p>
);

const HighlightCard = ({ icon, title, children, accentColor = '#003B70' }: { icon?: React.ReactNode; title?: string; children: React.ReactNode; accentColor?: string }) => (
  <Card className="p-8 bg-muted/20 border-l-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]" style={{ borderLeftColor: accentColor }}>
    <div className="flex items-start gap-4">
      {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
      <div className="flex-1">
        {title && <h3 className="text-lg font-semibold mb-3 text-foreground">{title}</h3>}
        <div className="text-base leading-relaxed text-muted-foreground/90">{children}</div>
      </div>
    </div>
  </Card>
);

const OutcomeCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-muted/40 via-muted/20 to-background shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
    {/* Left accent bar with Citi brand color */}
    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#003B70] via-[#004A8F] to-[#003B70]" />
    
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground))_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none" />
    
    <div className="relative p-10 lg:p-12">
      {/* Icon badge */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 mb-8 group-hover:bg-foreground/10 transition-colors">
        <Lightbulb className="h-8 w-8 text-foreground/80" />
      </div>
      
      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-bold mb-8 text-foreground tracking-tight">
        Outcome
      </h3>
      
      {/* Content */}
      <div className="text-lg leading-relaxed text-muted-foreground/90">
        {children}
      </div>
    </div>
  </div>
);

const QuoteCard = ({ children, accentColor = '#003B70' }: { children: React.ReactNode; accentColor?: string }) => (
  <Card className="p-8 bg-muted/20 border-l-4" style={{ borderLeftColor: accentColor }}>
    <blockquote className="text-xl font-medium text-foreground leading-relaxed pl-4">
      {children}
    </blockquote>
  </Card>
);

const DetailCard = ({ label, value }: { label: string; value: string }) => (
  <Card className="p-6 hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-0">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{label}</h3>
      <p className="text-lg font-medium text-foreground leading-snug">{value}</p>
    </CardContent>
  </Card>
);

const ProsConsCard = ({ title, items, type }: { title: string; items: string[]; type: "pros" | "cons" }) => (
  <Card className="p-6 h-full">
    <h3 className="text-base font-semibold mb-5 text-foreground">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          {type === "pros" ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <p className="text-base leading-relaxed text-muted-foreground/90">{item}</p>
        </li>
      ))}
    </ul>
  </Card>
);

const CaseStudy = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const isAIInsights = projectId === "1" || !projectId;
  const isBalanceTransfer = projectId === "3";
  const isAIDataVision = projectId === "4";
  const isToca = projectId === "5";
  const isPAM = projectId === "6";
  const is3DPrinting = projectId === "7";
  const isMeditationWatchOS = projectId === "10";
  const isDigitalBanking = projectId === "11" || projectId === "16";
  const isVRLearning = projectId === "12";
  const isUXAgent = projectId === "13";
  const isAIProductivityOS = projectId === "15";

  const handleTabChange = (tab: string) => {
    navigate('/');
  };

  // Check if it's a project that has a case study or should show "coming soon"
  const hasCaseStudy = isAIInsights || isBalanceTransfer || isToca || isPAM || isMeditationWatchOS || isUXAgent || isAIProductivityOS || isDigitalBanking;
  const isComingSoon = isAIDataVision || is3DPrinting || isVRLearning;

  // Get the case study title for coming soon projects
  const getComingSoonTitle = () => {
    if (isAIDataVision) return "AI Data Vision";
    if (is3DPrinting) return "3D Printing Management App";
    if (isDigitalBanking) return "Digital Commercial Banking Platform";
    if (isVRLearning) return "VR Learning Platform";
    return "Case Study";
  };

  if (isComingSoon) {
    const caseStudyTitle = getComingSoonTitle();
    
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-12 group pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">{caseStudyTitle}</h1>
            <p className="text-xl text-muted-foreground">
              Detailed project breakdown and design process coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasCaseStudy && !isComingSoon) {
    const caseStudyTitle = "Case Study";
    
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-12 group pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">{caseStudyTitle}</h1>
            <p className="text-xl text-muted-foreground">
              Detailed project breakdown and design process coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Balance Transfer Case Study
  if (isBalanceTransfer) {
    const balanceTransferDetails = [
      { label: "My Role", value: "Product Designer" },
      { label: "Responsibility", value: "UI & Interaction Design" },
      { label: "Timeline", value: "Ongoing" },
      { label: "Nature of project", value: "Feature Design" },
    ];

    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-12 group pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
              Balance Transfer iOS App
            </h1>
            <p className="text-sm text-muted-foreground/70 italic mb-6">Case study in progress</p>
            <SectionText className="text-xl">
              Balance transfer feature designed for around <strong className="text-foreground font-semibold">20M Citi Mobile experience</strong> so that the users can transfer balance from their previous creditor to Citi.
            </SectionText>
          </div>

          {/* Hero Video */}
          <div className="mb-16 rounded-2xl overflow-hidden bg-muted/20">
            <video
              src={balanceTransferVideo}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {balanceTransferDetails.map((detail, idx) => (
              <DetailCard key={idx} label={detail.label} value={detail.value} />
            ))}
          </div>

          {/* Role & Responsibility */}
          <Section>
            <SectionTitle>What was my role & responsibility?</SectionTitle>
            <SectionText className="mb-6">
              I conducted discovery, research, ideation, and designed the UI and prototype to deliver a solution that made balance transfers accessible.
            </SectionText>
            <div className="grid md:grid-cols-2 gap-4">
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
                I was responsible for leading and designing the end-to-end mobile experience for balance transfers.
              </HighlightCard>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
                I collaborated with the Creative Director, UX Writer, Product Managers, and Developers.
              </HighlightCard>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
                I facilitated a design audit and led design critique meetings.
              </HighlightCard>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
                I designed the UI, defined design systems and interaction patterns, and managed developer handoff.
              </HighlightCard>
            </div>
          </Section>

          {/* Outcome */}
          <Section>
            <SectionTitle>What outcome was accomplished?</SectionTitle>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">
                  I designed an accessible balance transfer experience for 20 million users.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">
                  By conducting a design audit and user research, I created a mobile experience that solved the problems found in the existing web version.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">
                  I designed the UI with consideration for Human Interface Guidelines and incorporated Apple features such as app clip.
                </p>
              </li>
            </ul>
            <Card className="p-8 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
              <p className="text-xl font-medium text-foreground leading-relaxed pl-4 italic">
                "After redesigning the user flow, customers found the improved balance transfer feature more intuitive and user-friendly compared to the previous web experience. With a user base of 20 million on the Citi Mobile App, even a 1% increase in conversion rates could potentially result in an additional $2 million in revenue for Citi. This enhancement not only streamlines the balance transfer process but also empowers users to manage their balance transfer effortlessly at their fingertips"
              </p>
            </Card>
            <div className="rounded-xl overflow-hidden bg-muted/20 mt-8">
              <img
                src={balanceT}
                alt="Balance Transfer Animation"
                className="w-full h-auto"
              />
            </div>
          </Section>

          {/* Opportunity Space */}
          <Section>
            <SectionTitle>What was the Opportunity space here?</SectionTitle>
            <SectionText>
              No balance transfer experience was available for mobile experience, while balance transfer was available only on web. Since there were <strong className="text-foreground font-semibold">20 million users</strong>, this was an opportunity to make this experience accessible for the customers.
            </SectionText>
          </Section>

          {/* Process */}
          <Section>
            <SectionTitle>Process</SectionTitle>
            <div className="rounded-xl overflow-hidden bg-muted/20">
              <img
                src={btProcess}
                alt="Balance Transfer Process"
                className="w-full h-auto"
              />
            </div>
          </Section>

          {/* How did it start */}
          <Section>
            <SectionTitle>How did it start?</SectionTitle>
            <SectionText className="mb-6">
              After receiving an initiation from product partners saying that we don't currently have balance transfer on mobile app and there is a missed opportunity here, and we are also seeing a drop in balance transfers on the web. Instead of directly jumping into the mobile app design and translating web to mobile, I wanted to understand <strong className="text-foreground font-semibold">what's the problem we are trying to solve here?</strong> That's why I facilitated a workshop where I brought in the screens from the web experience. I along with the team identified some of the key pain points in the UI, content and user flow, which helped.
            </SectionText>
            {/* Image placeholder */}
            <div className="rounded-xl overflow-hidden bg-muted/20 mb-8 aspect-video flex items-center justify-center">
              <img
                src={workspace}
                alt="Workshop screens"
                className="w-full h-full object-cover"
              />
            </div>
            <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Key takeaways and Insights</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">The call to action on each of the screens were confusing to the users</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">Multiple balance transfer features made it confusing for the users</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">The user flow had complicated interaction patterns</p>
                </li>
              </ul>
            </HighlightCard>
          </Section>

          {/* User Research */}
          <Section>
            <SectionTitle>User Research</SectionTitle>
            <SectionText className="mb-6">
              Based on this I framed these following questions to work with UX research team and validate some of the pain points users are facing:
            </SectionText>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">Are you able to understand how to initiate the balance transfer?</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">Is the progress bar easy to understand?</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">Do you understand how your transaction fees are applied?</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">Which part of the experience do you find most challenging?</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">Are the call to action and navigation easy to understand and navigate?</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-foreground mt-2 text-xl leading-none">•</span>
                <p className="text-lg leading-relaxed text-muted-foreground/80">And more</p>
              </li>
            </ul>
            <SectionText className="mb-6">
              Based on these questions I worked with the Citi research partners to conduct interviews and observe.
            </SectionText>
            {/* Image placeholder */}
            <div className="rounded-xl overflow-hidden bg-muted/20 mb-8 aspect-video flex items-center justify-center">
              <img
                src={userResearch}
                alt="User research sessions"
                className="w-full h-full object-cover blur-[3px]"
              />
            </div>
            <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Key takeaways and Insights</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">Users found it challenging to understand the CTA</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">Navigation was complicated especially multiple balance transfer experience</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">Users felt it overwhelming with information</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🟢</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">Transfer fees was easy to understand and users found it helpful</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🟢</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">The progress bar indication was easy to understand for the users</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🟢</span>
                  <p className="text-base leading-relaxed text-muted-foreground/90">Users understood how to initiate the balance transfer</p>
                </li>
              </ul>
            </HighlightCard>
            <SectionText className="mt-6">
              Based on this, I started to ideate a user flow and low-fidelity concepts to gather feedback, and collaborated with cross-functional teams such as UX writers and developers to refine the ideas.
            </SectionText>
            {/* Image placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="rounded-xl overflow-hidden bg-muted/20 aspect-video flex items-center justify-center">
                <img
                  src={process1}
                  alt="Low-fidelity concepts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20 aspect-video flex items-center justify-center">
                <img
                  src={process2}
                  alt="Concepts"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Section>

          {/* User Flow */}
          <Section>
            <SectionTitle>User Flow</SectionTitle>
            <SectionText className="mb-6">
              The design team had confusion around the end-to-end flow and what information we were asking from users. While most of the information was available from the web experience, I wanted to map out the complete flow for the mobile app. This helped both the team and me visualize the user journey, enabling us to make better product decisions together.
            </SectionText>
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={btUserFlow}
                  alt="User flow diagram"
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={wire1}
                    alt="Wireframe flow"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={flow2}
                    alt="Flow diagram"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* UI Design & Decision Highlights */}
          <Section>
            <SectionTitle>UI Design & Decision Highlights</SectionTitle>
            <div className="rounded-xl overflow-hidden bg-muted/20 mb-8">
              <img
                src={ui1}
                alt="UI Design"
                className="w-full h-auto"
              />
            </div>

            {/* Compliance and Security */}
            <div className="mb-12">
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Compliance and sensitive data security decision</h3>
              <SectionText className="mb-6">
                While designing, I consistently sought feedback from the legal and compliance teams, which significantly influenced our design decisions. Initially, we intended to display the amount to be gathered on the home screen. However, I received feedback indicating the necessity to verify the creditor before requesting sensitive financial details such as the amount. Consequently, I structured the design to first display the creditor's name on the home screen and prompt for the amount only after the creditor has been verified.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mb-6">
                <img
                  src={ui2}
                  alt="Compliance design comparison"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Verifying Creditors */}
            <div className="mb-12">
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Verifying Creditors</h3>
              <SectionText className="mb-6">
                I designed a modal-based interaction that displays a list of already verified creditors, allowing users to select from existing entries without the need to type the full creditor name. If a creditor does not appear in the list, users have the option to add the creditor manually. These manually added creditors are subsequently verified by Citi's administrative team. Until verification is complete, such creditors are marked as "Unverified" on the summary screen, ensuring transparency and maintaining trust in the balance transfer process.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mb-6">
                <img
                  src={ui3}
                  alt="Creditor verification interaction"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Balance good design vs legal constraints */}
            <div className="mb-12">
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Balance good design practice vs legal constraints</h3>
              <SectionText className="mb-6">
                The proposed prototypes helped the legal team visualize different options. I pushed back on some suggestions to advocate for good design. The prototype also enabled the legal team to evaluate and share their feedback.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mb-6">
                <img
                  src={ui4}
                  alt="Design and legal constraints comparison"
                  className="w-full h-auto"
                />
              </div>
              <SectionText>
                Here is the before-and-after solution. The proposed modal-based design was accepted by the legal team, which allowed us to deliver an app experience that maintained high conversion rates.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={ui5}
                  alt="Before and after design comparison"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          {/* UI System & Guides */}
          <Section>
            <SectionTitle>UI System & Guides</SectionTitle>
            <SectionText>
              Aligned the visuals with Citi's design system and guidelines.
            </SectionText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={ui6}
                  alt="Design system - Color"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={ui7}
                  alt="Design system - Spacing"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={ui8}
                  alt="Design system - Components"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={ui9}
                  alt="Design system - Typography"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20 md:col-span-2">
                <img
                  src={ui10}
                  alt="Design system - Grids"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Section>

          {/* Conclusion */}
          <Section>
            <SectionTitle>Conclusion</SectionTitle>
            <SectionText className="mb-8">
              This project demonstrates how strategic design thinking and user-centered research can transform complex financial workflows. By starting with user problems and business needs rather than simply translating existing web experiences, I was able to create a mobile-first balance transfer experience that addresses real customer pain points while maintaining compliance and legal requirements. The redesigned balance transfer feature showcases the potential for mobile apps to not just replicate web functionality, but to fundamentally improve how users interact with financial services, making complex processes more intuitive and accessible for Citi's 20 million mobile app users.
            </SectionText>
            <div className="rounded-xl overflow-hidden bg-muted/20">
              <img
                src={bt1}
                alt="Balance Transfer App"
                className="w-full h-auto"
              />
            </div>
          </Section>

          {/* Footer */}
          <Section>
            <SectionText>
              Thank you for reading. If you'd like to work with me, get in touch:{" "}
              <a 
                href="/" 
                className="text-foreground font-semibold hover:underline"
              >
                Contact me
              </a>
            </SectionText>
          </Section>
          </div>
        </div>
      </div>
    );
  }

  // Toca Case Study
  if (isToca) {
    const tocaDetails = [
      { label: "My Role", value: "Lead Product Designer" },
      { label: "Responsibility", value: "Product Discovery, UX Research, Stakeholder Alignment, UI Design, Interaction Design" },
      { label: "Timeline", value: "6 months" },
      { label: "Nature of project", value: "Commercial Project" },
    ];

    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-12 group pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
                Soccer Training App
              </h1>
              <SectionText className="text-xl">
                My Toca app is one stop app designed to provide players with insights from their training. Players get to see their progress w.r.t session completion, celebrate the pathway progress overall player development, past session insights, and revisit their best moments at a TOCA Center.
              </SectionText>
            </div>

            {/* Hero Video */}
            <div className="mb-16 rounded-2xl overflow-hidden bg-muted/20">
              <video
                src={toca11Video}
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Project Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {tocaDetails.map((detail, idx) => (
                <DetailCard key={idx} label={detail.label} value={detail.value} />
              ))}
            </div>

            {/* About the Company */}
            <Section>
              <SectionTitle>About the Company</SectionTitle>
              <SectionText>
                TOCA is a Global soccer-focused experience brand, that recently secured $25 million to accelerate expansion.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-8">
                <img
                  src={toca1}
                  alt="Toca App Screens"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Problem, Team, Tools - 4 Column Grid */}
            <Section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Problem */}
                <div className="lg:col-span-2">
                  <SectionTitle>Problem</SectionTitle>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <div>
                        <p className="text-lg font-semibold mb-2 text-foreground">Customer-facing problem:</p>
                        <p className="text-lg leading-relaxed text-muted-foreground/80">
                          TOCA customers found a lack of ways to track their training progress. The trainers manually tracked the progress which wasn't efficient.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <div>
                        <p className="text-lg font-semibold mb-2 text-foreground">Business-facing hypothetical problem:</p>
                        <p className="text-lg leading-relaxed text-muted-foreground/80">
                          The business noticed they lost customers once the training was completed. This product would act as a way to retain customers and convert them to <strong className="text-foreground font-semibold">lifelong customers</strong>.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Team */}
                <div>
                  <SectionTitle>Team</SectionTitle>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Chief Innovation Officer</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Founder</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Product Manager</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Front and Backend Developer</p>
                    </li>
                  </ul>
                </div>

                {/* Tools */}
                <div>
                  <SectionTitle>Tools</SectionTitle>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Notion - For Documentation</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Figma</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-foreground mt-2 text-xl leading-none">•</span>
                      <p className="text-lg leading-relaxed text-muted-foreground/80">Jira - Project Management</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Impact */}
            <Section>
              <SectionTitle>Impact</SectionTitle>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Designed the end-to-end product experience.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Brought clarity and structure to the product design process by facilitating workshops.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Advocate, and educate executives about user experience design.
                  </p>
                </li>
              </ul>
            </Section>

            {/* Project and Sprint Planning */}
            <Section>
              <SectionTitle>Project and Sprint Planning</SectionTitle>
              <SectionText className="mb-6">
                The executives had done their research and concluded they wanted to create an app to improve the customer and trainer experience.
              </SectionText>
              <SectionText>
                So we started with creating a sprint plan shown below to execute the vision.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-8">
                <img
                  src={group404}
                  alt="Sprint Plan"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Product Discovery */}
            <Section>
              <SectionTitle>Product Discovery</SectionTitle>
              <SectionText className="mb-6">
                To understand the product from the business perspective, we hosted <strong className="text-foreground font-semibold">2 hours long</strong> brainstorming sessions.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mb-6">
                <img
                  src={workinP}
                  alt="Brainstorming Session"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                We asked questions such as:
              </SectionText>
              <ol className="space-y-2 mb-6 list-decimal list-inside">
                <li className="text-lg leading-relaxed text-muted-foreground/80">What are the business goals?</li>
                <li className="text-lg leading-relaxed text-muted-foreground/80">What's the competitive advantage of this product?</li>
                <li className="text-lg leading-relaxed text-muted-foreground/80">Who is the primary and secondary user?</li>
                <li className="text-lg leading-relaxed text-muted-foreground/80">Who are the stakeholders who would use this app?</li>
              </ol>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Key Findings</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90"><strong className="text-foreground font-semibold">Business Goals:</strong> Retain and create an engaging experience for the customers</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90"><strong className="text-foreground font-semibold">Competitive advantage:</strong> Gamified and personalized training.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90"><strong className="text-foreground font-semibold">Users:</strong> Parents and Kids (trainee)</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90"><strong className="text-foreground font-semibold">Other stakeholders:</strong> Trainer</p>
                  </li>
                </ul>
              </HighlightCard>
            </Section>

            {/* Scope */}
            <Section>
              <SectionTitle>Scope</SectionTitle>
              <SectionText>
                We identified the app has two directions, one is <strong className="text-foreground font-semibold">customer-facing</strong> and the second is trainer-facing. For the scope of this project, we focused on the customer-facing direction.
              </SectionText>
            </Section>

            {/* Hypothesis */}
            <Section>
              <SectionTitle>Hypothesis</SectionTitle>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                Gamified mobile app to track progress and provide users the insights on their training will help players succeed in training and retain more customers for TOCA Football.
              </HighlightCard>
              <SectionText className="mt-6">
                Conducting the workshop and product discovery helped us get the context of the product from the business perspective, we wanted to understand the user's perspective and bring the user's insights to the product development.
              </SectionText>
            </Section>

            {/* User Research */}
            <Section>
              <SectionTitle>User Research</SectionTitle>
              <SectionText className="mb-6">
                <strong className="text-foreground font-semibold">Contextual Enquiry</strong>
              </SectionText>
              <SectionText className="mb-6">
                I made a visit to the nearest training center to observe the player experience, I also spoke to the program manager and captured valuable insights.
              </SectionText>
              <SectionText className="mb-6">
                Due to the limited time and budget, we captured the user's insights from past customer research. We captured one quote from the parent Interview, which helped us to validate the need.
              </SectionText>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                "I wish I have a training map for my child" - Insights from the parent.
              </HighlightCard>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={uxResearch}
                  alt="UX Research"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                The training center already had ongoing training, which we had to understand to translate those operations into a digital experience. We spoke to various program managers and mapped out the program architecture.
              </SectionText>
              <SectionText>
                We also identified the primary and secondary users.
              </SectionText>
              <div className="mt-6 space-y-2">
                <p className="text-lg leading-relaxed text-muted-foreground/80">
                  <strong className="text-foreground font-semibold">Primary User:</strong> Player | Trainee.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground/80">
                  <strong className="text-foreground font-semibold">Second user:</strong> Parent
                </p>
              </div>
            </Section>

            {/* Training Program Discovery */}
            <Section>
              <SectionTitle>Training Program Discovery</SectionTitle>
              <SectionText className="mb-6">
                The training programs had a pathway, sessions, and skill sessions. The following image shows how they are related.
              </SectionText>
              <SectionText>
                Based on this discovery we created wireframes and user flows to capture stakeholder feedback.
              </SectionText>
            </Section>

            {/* Aligning The Stakeholder Directions */}
            <Section>
              <SectionTitle>Aligning The Stakeholder Directions</SectionTitle>
              <SectionText className="mb-6">
                Since this product had multiple stakeholders, creating wireframes helped us capture feedback at the early stage and helped us to create alignment between multiple product partners.
              </SectionText>
              <SectionText>
                After going through 4+ product iterations we designed the following prototypes.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={tocaWire}
                  alt="Wireframes"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Product Prototype */}
            <Section>
              <SectionTitle>Product Prototype</SectionTitle>
              <SectionText className="mb-6">
                The product prototype showed users the pathway and sessions they are on. It also showed users the key training metrics like Goals, best streak, balls, and session details.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={toca7}
                  alt="Product Prototype"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Product Features */}
            <Section>
              <SectionTitle>Product Features</SectionTitle>
              
              {/* Pathway and session Insights */}
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Pathway and session Insights</h3>
                    <SectionText>
                      Each pathway had 4 to 5 sessions, the interface displayed session details under the pathway.
                    </SectionText>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                    <img
                      src={toca8}
                      alt="Pathway and session Insights"
                      className="w-full h-auto max-w-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Actionable Feedback */}
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                    <img
                      src={modal}
                      alt="Actionable Feedback"
                      className="w-full h-auto max-w-xs"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Actionable Feedback</h3>
                    <SectionText>
                      When the user clicked on the session details, the player could see feedback from the trainer and actional steps to improve their skills.
                    </SectionText>
                  </div>
                </div>
              </div>

              {/* Sense Of Completion */}
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Sense Of Completion</h3>
                    <SectionText>
                      The interface would celebrate users' journey when they completed the pathways, to celebrate the user's journey.
                    </SectionText>
                  </div>
                  <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                    <img
                      src={cl}
                      alt="Sense Of Completion"
                      className="w-full h-auto max-w-xs"
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Outcome */}
            <Section>
              <SectionTitle>Outcome</SectionTitle>
              <SectionText className="mb-6">
                We designed an Interactive prototype to capture user feedback and communicate the product vision between the cross-disciplinary teams.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <video
                  src={toca11Video}
                  className="w-full h-auto"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </Section>

            {/* Next Steps */}
            <Section>
              <SectionTitle>Next Steps</SectionTitle>
              <SectionText className="mb-6">
                We designed the end-to-end product experience for TOCA's training center. I stopped at this stage to transition to my next role in another company. However, these were the planned next steps.
              </SectionText>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Usability testing to validate the ease of use.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    User testing to validate the product direction.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Developer handoff document.
                  </p>
                </li>
              </ul>
            </Section>

            {/* Conclusion */}
            <Section>
              <SectionTitle>Conclusion</SectionTitle>
              <SectionText className="mb-8">
                Through product discovery, user, and stakeholder research we designed an end-end customer-facing product experience for the TOCA's training center to provide a personalized training experience for the customers.
              </SectionText>
              
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Learnings</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Design is teamwork, and working with cross-disciplinary teams helped me understand the need to understand the various product partner to define the design direction.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">
                    Working in a startup can be challenging especially the ambiguity throughout the process, we can clarify ambiguity by asking good questions.
                  </p>
                </li>
              </ul>
            </Section>

            {/* Footer */}
            <Section>
              <SectionText>
                Thank you for reading. If you'd like to work with me, get in touch:{" "}
                <a 
                  href="/" 
                  className="text-foreground font-semibold hover:underline"
                >
                  Contact me
                </a>
              </SectionText>
            </Section>
          </div>
        </div>
      </div>
    );
  }

  // PAM Case Study
  if (isPAM) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-12 group pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
                Redesigning Please Assist Me App
              </h1>
            </div>

            {/* About the Product */}
            <Section>
              <SectionTitle>About the Product</SectionTitle>
              <SectionText className="mb-6">
                Please Assist Me is a comprehensive mobile app that allows users to outsource all household chores through one platform.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={dribbbleShot1}
                  alt="PAM App"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Problem Statement */}
            <Section>
              <SectionTitle>Problem Statement</SectionTitle>
              <QuoteCard accentColor="#E63946">
                Americans today are suffering from high levels of stress and less expendable time, the PAM app is designed to solve this problem and help users have a work life balance. According to Huffington post over 55% of working Americans state that household organisation is a constant source of stress.
              </QuoteCard>
              <SectionText className="mt-6">
                While over $5 Billion was spent last year on demand home services, in order to manage all household needs, users must use multiple apps, this requires coordinating various times & getting each new contract up to speed on preference.
              </SectionText>
            </Section>

            {/* Overview */}
            <Section>
              <SectionTitle>Overview</SectionTitle>
              <SectionText>
                PAM is designed to handle all household chores. Users no longer need to manage multiple providers, and all tasks are completed by a dedicated personal assistant team.
              </SectionText>
            </Section>

            {/* My Role */}
            <Section>
              <SectionTitle>My Role</SectionTitle>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Work directly with the CEO, Stephanie Cummings, to build the design roadmap strategy.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Conduct user research, create wireframes, present design work, and perform UI and Interaction design.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Collaborate with company advisors to define the UX strategy.</p>
                </li>
              </ul>
              <SectionText>
                <strong className="text-foreground font-semibold">Work Duration:</strong> 5 Months
              </SectionText>
            </Section>

            {/* Tool box */}
            <Section>
              <SectionTitle>Tool box</SectionTitle>
              <ul className="space-y-2">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Sketch, Figma, Invision, Miro, app flow</p>
                </li>
              </ul>
            </Section>

            {/* Prototype */}
            <Section>
              <SectionTitle>Prototype</SectionTitle>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <video
                  src={pamVideo}
                  className="w-full h-auto"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </Section>

            {/* Approach */}
            <Section>
              <SectionTitle>Approach</SectionTitle>
              <SectionText className="mb-6">
                When we joined the team, we were the first user experience design team. It was challenging to know where to start, so we followed the Double Diamond mental model and defined our strategy.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={untitled1}
                  alt="Double Diamond Process"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mt-6">
                The first version of the MVP has already been built and the problem statement has been defined. Our strategy was to first understand the business goals, company's vision, and user pain points before heading into the current app design critique session.
              </SectionText>
            </Section>

            {/* Understanding the business goals and needs */}
            <Section>
              <SectionTitle>Understanding the business goals and needs</SectionTitle>
              <SectionText className="mb-6">
                We went through various company documents, the business plan, and survey data, and also conducted the competitor analysis.
              </SectionText>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Insights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Highlight the companies <strong className="text-foreground font-semibold">unique selling proposition</strong>, <strong className="text-foreground font-semibold">value</strong>, and <strong className="text-foreground font-semibold">vision</strong> during the on-boarding process</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Provide multiple services in one app</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Allow the users outsource household work</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Make the process of order — submit- leave notes — review easier</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Help users keep track of their orders</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Real time customer review is the key component</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Solve the problem of managing multiple services</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Clearly show the user the pricing for the service</p>
                  </li>
                </ul>
              </HighlightCard>
              <SectionText className="mt-6">
                We also discussed PAM operations with Stephanie and how users are currently using the service.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={untitled2}
                  alt="PAM Operations Discussion"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Understanding the users pain points and their needs */}
            <Section>
              <SectionTitle>Understanding the users pain points and their needs</SectionTitle>
              <SectionText className="mb-6">
                Once we understood the company's needs and goals, we wanted to hear from the users and understand their pain points and frustration. Our focused group was made of busy professionals, so it was challenging to find time to talk to the users, however we managed to talk to few users and make the user persona to understand their pain points and needs.
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={untitled3}
                    alt="User Persona 1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={untitled4}
                    alt="User Persona 2"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Interview insights</h3>
                <p className="text-base leading-relaxed text-muted-foreground/90">
                  The user interviews highlighted needs of a standard channel of <strong className="text-foreground font-semibold">communication</strong>, <strong className="text-foreground font-semibold">easy tracking</strong> of the services, <strong className="text-foreground font-semibold">customising</strong> the services, and something that is <strong className="text-foreground font-semibold">quick and easy</strong> to use and has an effective way of providing <strong className="text-foreground font-semibold">feedback</strong> on services that they use.
                </p>
              </HighlightCard>
            </Section>

            {/* Destruct to construct: App design critique sessions */}
            <Section>
              <SectionTitle>Destruct to construct: App design critique sessions</SectionTitle>
              <SectionText className="mb-6">
                We conducted a design critique session on the first version of the app to identify areas for improvement. We reviewed each screen and identified usability and user interface issues. This process also helped us to formulate better questions.
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={untitled5}
                    alt="Design Critique Session 1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={untitled6}
                    alt="Design Critique Session 2"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <SectionText className="mb-6">
                Our insights and notes included:
              </SectionText>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">The app lacks an onboarding experience that introduces the company and its value.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Customizing services is not a user-friendly experience.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">The app contains a lot of educational elements that need to be gamified.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">The app is text-heavy and lacks visual communication.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">The app does not provide a way to manage multiple services or track orders.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">The app lacks delight and aesthetics.</p>
                </li>
              </ul>
            </Section>

            {/* Organising information */}
            <Section>
              <SectionTitle>Organising information</SectionTitle>
              <SectionText className="mb-6">
                We gathered all this information and organized it into three categories: <strong className="text-foreground font-semibold">rose</strong> (good things about the app), <strong className="text-foreground font-semibold">thorn</strong> (pain points), and <strong className="text-foreground font-semibold">bud</strong> (key opportunities).
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={untitled7}
                  alt="Rose, Thorn, Bud Analysis"
                  className="w-full h-auto"
                />
              </div>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Insights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Key opportunities include improving order tracking and effective communication of payments.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Improving the flow of feedback provision and visual communication can enhance user experience.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-foreground mt-1">•</span>
                    <p className="text-base leading-relaxed text-muted-foreground/90">Improving the app flow, making pricing clear, making the add-ons experience better, and mapping the customer journey are other areas to focus on.</p>
                  </li>
                </ul>
              </HighlightCard>
              <SectionText className="mt-6 mb-6">
                We created journey maps of our users to better understand their pain points, thoughts, emotions, knowledge, and goals. This helped us gain a deeper understanding of their pain points and what they were looking for in our service.
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={untitled8}
                    alt="Journey Map 1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={untitled9}
                    alt="Journey Map 2"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Section>

            {/* What users feel, think, see their pain points */}
            <Section>
              <SectionTitle>What users feel, think, see their pain points</SectionTitle>
              <SectionText className="mb-6">
                To better understand user pain points and their feelings while using our service, we created an empathy map. Users appreciated the quick responses they received, but expressed a desire for more efficient methods. We noticed a recurring need for customization.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={untitled10}
                  alt="Empathy Map"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Filtering down the features */}
            <Section>
              <SectionTitle>Filtering down the features</SectionTitle>
              <SectionText className="mb-6">
                At this point we had direction on what we needed to improve and what were the customers needed. In the developer and UX designers meetings we decided on <strong className="text-foreground font-semibold">must have</strong>, <strong className="text-foreground font-semibold">should have</strong>, <strong className="text-foreground font-semibold">could have</strong>, and <strong className="text-foreground font-semibold">won't features</strong>, based on the users needs, business goals, timeline, and budget. We created the following matrix and finalised the features before prototyping.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={untitled11}
                  alt="Feature Prioritization Matrix"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Mapping the information flow */}
            <Section>
              <SectionTitle>Mapping the information flow</SectionTitle>
              <SectionText className="mb-6">
                The onboarding experience included login and sign up. During the sign up process we show users the company's vision, and we ensure that the users learn more about the bundle service since the bundle service was more profitable for the users as well for the business.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={untitled12}
                  alt="Onboarding Flow"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                The app had thirteen services. We decided to map out these services clearly in order to organize the information and arrange them according to the popularity of the services.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={untitled13}
                  alt="Services Mapping"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                The app contains two paths or flows: one for <strong className="text-foreground font-semibold">bundle customers</strong> and the other for <strong className="text-foreground font-semibold">non-bundle customers</strong>. The experience for bundle customers is slightly different from that of non-bundle customers. Non-bundle customers have an ad-hoc page where they can sign up for the bundle, and the language used in these two experiences differs, as seen in the app wireframes.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={untitled14}
                  alt="Bundle vs Non-bundle Flow"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                We made several modifications to the app content and possible interactions on the app interface. We discussed these changes in workshops and collected all the necessary feedback before moving on to wireframing. Some ideas were accepted while others were rejected. This step helped to clarify the app flow, possible layout, and content.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={screenshot2023}
                  alt="Ideation Workshop"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                Ideation on paper helped us to filter down the content, interactions and the app flow in a quick and easy way at its initial stage.
              </SectionText>
              <QuoteCard accentColor="#E63946">
                fail fast learn quick
              </QuoteCard>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#E63946">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Outcomes</h3>
                <p className="text-base leading-relaxed text-muted-foreground/90">
                  Through the ideation meetings the team got the better understanding of the business operations.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground/90 mt-4">
                  Initially we considered the users goals, needs, and pain points; however, we missed considering the operations of the company. This process helped the team to clearly understand the service operations.
                </p>
              </HighlightCard>
            </Section>

            {/* Wire-framing and prototyping */}
            <Section>
              <SectionTitle>Wire-framing and prototyping</SectionTitle>
              <SectionText className="mb-6">
                We wanted to handoff deliverables to the visual designer so we created the mid-fidelity prototypes to clearly communicate the user interface and the app flow.
              </SectionText>
            </Section>

            {/* App Flow - Developing Navigational Flow */}
            <Section>
              <SectionTitle>App Flow - Developing Navigational Flow</SectionTitle>
              <SectionText className="mb-6">
                The app had a complex interactions and many screens to navigate; we used overflow to map out the app flow and effectively communicated our idea.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={untitled15}
                  alt="App Flow Map"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mt-6">
                This approach helped the team to finalise the content, patterns, and app flow at the same time.
              </SectionText>
            </Section>

            {/* Interaction Explorations */}
            <Section>
              <SectionTitle>Interaction Explorations</SectionTitle>
              <SectionText>
                We created many iterations to make it the app delightful and communicate the information to the users in an effective and clear way. While some interactions went ahead, some didn't, but we learnt what works and doesn't through this process (part of the design process).
              </SectionText>
            </Section>

            {/* High Fidelity */}
            <Section>
              <SectionTitle>High Fidelity</SectionTitle>
              <SectionText className="mb-6">
                We had visual designers on the team who took care of the high-fidelity prototypes, however I tried to some make high fidelity prototypes on my own. The goal for the visual design was to bring in the companies brand experience in the app and maintain visual consistency throughout the app.
              </SectionText>
              <SectionText className="mb-6">
                These were some of the high fidelity mockups we recommended to the visual designer on the team.
              </SectionText>
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Initial Concepts</h3>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={untitled16}
                  alt="Initial High Fidelity Concepts"
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground mt-12">New Concept</h3>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={dribbbleShot1}
                  alt="PAM App New Concept"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Outcomes and summary */}
            <Section>
              <SectionTitle>Outcomes and summary</SectionTitle>
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Value Added to the Company</h3>
              <SectionText className="mb-6">
                During design, we improved app flow, content, interactions, and visual design. This included redesigning the app and passing the designs to the developer. To avoid confusion, we prioritized app features, filtering them based on user needs, business goals, and feasibility. This process solved most problems early on, even with over 130 screens.
              </SectionText>
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground mt-12">Future Work</h3>
              <SectionText>
                Future work would be conducting the usability test to validate out prototypes, implement micro interaction and motion to make the app a bit less text heavy, provide information to the users when needed, bring in some delight in the app, and create better deliverables for the developers.
              </SectionText>
            </Section>

            {/* My learnings */}
            <Section>
              <SectionTitle>My learnings</SectionTitle>
              <SectionText className="mb-6">
                One great thing about working for startups is the exposure you get to multiple parts of the design process. During my internship, I had the opportunity to work directly with the CEO. This gave me a better understanding of the business and its operations, which helped me to decide the app flow.
              </SectionText>
              <SectionText>
                The most important lesson I learned during this internship was the value of teamwork. Working with people from different cultures and backgrounds was initially challenging, but over time we learned to collaborate effectively. I also learned the importance of toning down my energy and working collaboratively with my team to add value to the company.
              </SectionText>
            </Section>

            {/* Footer */}
            <Section>
              <SectionText>
                Thank you for reading. If you'd like to work with me, get in touch:{" "}
                <a
                  href="/"
                  className="text-foreground font-semibold hover:underline"
                >
                  Contact me
                </a>
              </SectionText>
            </Section>
          </div>
        </div>
      </div>
    );
  }

  // Mindful WatchOS Case Study
  if (isMeditationWatchOS) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-12 group pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
                Mindful WatchOS App Case Study
              </h1>
            </div>

            {/* About Mindful App */}
            <Section>
              <SectionTitle>About Mindful App</SectionTitle>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={group41}
                  alt="Mindful App"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <video
                  src={watchOSVideo}
                  className="w-full h-auto"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <SectionText>
                This WatchOS app is designed to motivate university students to do micro meditation tasks and facilitate making friends on campus.
              </SectionText>
            </Section>

            {/* Problem */}
            <Section>
              <SectionTitle>Problem</SectionTitle>
              <SectionText>
                Student on campus experienced a <strong className="text-foreground font-semibold">lack of ways to make friends</strong> on campus. Based on our campus observation, there is a <strong className="text-foreground font-semibold">lack of healthy habits</strong> due to their busy schedules.
              </SectionText>
            </Section>

            {/* Hypothesis */}
            <Section>
              <SectionTitle>Hypothesis</SectionTitle>
              <QuoteCard accentColor="#000000">
                How might we design a habit-building experience for students to practice mindful meditation and, as a reward, connect them with other students on campus?
              </QuoteCard>
            </Section>

            {/* Impact */}
            <Section>
              <SectionTitle>Impact</SectionTitle>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#000000">
                <p className="text-base leading-relaxed text-muted-foreground/90 mb-4">
                  <strong className="text-foreground font-semibold">676</strong> students came to know about a mindful app in which <strong className="text-foreground font-semibold">25</strong> students showed interest i.e <strong className="text-foreground font-semibold">4%</strong>.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground/90">
                  Out of 25 students 14 users completed the task (i.e <strong className="text-foreground font-semibold">56%</strong>), among the <strong className="text-foreground font-semibold">14</strong> students <strong className="text-foreground font-semibold">9 (64%)</strong> students completed two tasks, and made friends.
                </p>
              </HighlightCard>
            </Section>

            {/* My Role and Responsibilities */}
            <Section>
              <SectionTitle>My Role and Responsibilities</SectionTitle>
              <ul className="space-y-3">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Conducting UX Research</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Designing the user Interface and Visual Direction</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Creating Interaction prototype</p>
                </li>
              </ul>
            </Section>

            {/* Tools and Background */}
            <Section>
              <SectionTitle>Tools and Background</SectionTitle>
              <SectionText className="mb-4">
                <strong className="text-foreground font-semibold">Design Strategy Tools:</strong> Build Measure Learn, the right it thinking framework, hooked model.
              </SectionText>
              <SectionText className="mb-4">
                <strong className="text-foreground font-semibold">Software Tools:</strong> Sketch, Figma, Flinto, Principle, Protopie.
              </SectionText>
              <SectionText>
                <strong className="text-foreground font-semibold">Background:</strong> Conceptual project designed for user guidance with the help of our advisor, Mike Begley, at Jefferson University as part of my master's program.
              </SectionText>
            </Section>

            {/* Prototype */}
            <Section>
              <SectionTitle>Prototype</SectionTitle>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <video
                  src={watchOSVideo}
                  className="w-full h-auto"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </Section>

            {/* Process */}
            <Section>
              <SectionTitle>Process</SectionTitle>
              <SectionText className="mb-6">
                We began this project by brainstorming with four other designers. To explore various ideas, we implemented brainstorming facilitation cards.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled1}
                  alt="Brainstorming Session"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                Based on our brainstorming session, we came up with the following design directions:
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Quick</strong> and easy like Tinder.
                </HighlightCard>
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Convenient</strong> like an ATM.
                </HighlightCard>
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Connecting</strong> like Match.com.
                </HighlightCard>
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Invested</strong> like Legos.
                </HighlightCard>
              </div>
              <SectionText className="mb-6">
                In order to execute on this design direction, we explored HOOKED model.
              </SectionText>
              <SectionText className="mb-6">
                The Hooked model is a framework for creating habit-forming products. It consists of four main stages: trigger, action, variable reward, and investment.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled2}
                  alt="Hooked Model Framework"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                Based on that exploration, we came up with the following trigger, action, reward, and investment.
              </SectionText>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-foreground">Trigger</th>
                      <th className="text-left p-4 font-semibold text-foreground">Action</th>
                      <th className="text-left p-4 font-semibold text-foreground">Investment</th>
                      <th className="text-left p-4 font-semibold text-foreground">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-4 text-muted-foreground/80">Feeling stressed</td>
                      <td className="p-4 text-muted-foreground/80">uses the watchApp</td>
                      <td className="p-4 text-muted-foreground/80">personalized meditation tasks</td>
                      <td className="p-4 text-muted-foreground/80">Feels good</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-muted-foreground/80">Need to make a friend</td>
                      <td className="p-4 text-muted-foreground/80"></td>
                      <td className="p-4 text-muted-foreground/80"></td>
                      <td className="p-4 text-muted-foreground/80">Makes new friend</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <SectionText className="mb-6">
                In order to understand and the users journey and pain point I created storyboard.
              </SectionText>
              <SectionText className="mb-6">
                Storyboard helped us to visualize and empathize with the user's pain points, actions, and triggers. I utilized this method to capture feedback from the advisors and the team.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled3}
                  alt="Storyboard"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* What are the riskiest assumption? */}
            <Section>
              <SectionTitle>What are the riskiest assumption?</SectionTitle>
              <SectionText className="mb-6">
                I used risk evaluation metrics to identify and test them. Here are some of the assumptions we identified.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled4}
                  alt="Risk Evaluation Metrics"
                  className="w-full h-auto"
                />
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Students on campus will do mindfulness exercises.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Students will be excited to make friends and will make efforts to meet them.</p>
                </li>
              </ul>
              <SectionText className="mb-6">
                To evaluate our assumptions, I conducted a social experiment.
              </SectionText>
              <SectionText className="mb-6">
                We utilized the method of prototyping called Pretotyping. Its approach involves evaluating the idea even before building a product or prototype. This strategy was developed by Alberto Savoia.
              </SectionText>
              <SectionText className="mb-6">
                I created a poster and an event on social media. We asked people to follow the mindful Instagram page. Once they followed us, we sent them quick mindful tasks. Once they completed them, we connected them to a new friend.
              </SectionText>
              <SectionText className="mb-6">
                Pretotyping method: Fake Door + Mechanical Turk
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled5}
                  alt="Pretotyping Experiment"
                  className="w-full h-auto"
                />
              </div>
              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} accentColor="#000000">
                <p className="text-base leading-relaxed text-muted-foreground/90 mb-4">
                  <strong className="text-foreground font-semibold">676</strong> students came to know about mindful app in which <strong className="text-foreground font-semibold">25</strong> students showed interest i.e <strong className="text-foreground font-semibold">4%</strong>, out of 25 students 14 users completed the task i.e <strong className="text-foreground font-semibold">56%</strong>, among the <strong className="text-foreground font-semibold">14</strong> students <strong className="text-foreground font-semibold">9 (64%)</strong> students completed two tasks and made friends.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground/90 mb-4 italic">
                  "I felt good, usually people forget to take a break and when people do this it feels soothing"
                </p>
                <p className="text-base leading-relaxed text-muted-foreground/90 italic">
                  "Three tasks for one friend is bit too much"
                </p>
              </HighlightCard>
            </Section>

            {/* Features Identification */}
            <Section>
              <SectionTitle>Features Identification</SectionTitle>
              <SectionText className="mb-6">
                Based on the experiment, let's identify some features for the app. We have identified some must-have and should-have features.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled6}
                  alt="Feature Prioritization"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                Some of the must-have features include onboarding, micro meditation tasks, community, location and time details, control over not sharing private data, analytics on completed tasks, and terms and conditions.
              </SectionText>
              <SectionText className="mb-6">
                I started to sketch out the ideas on paper which helped me understand the things missing the app and understand the app flow better. I used these sketches to communicate my idea with the stakeholders and get feedback.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6 flex items-center justify-center">
                <img
                  src={meditationUntitled7}
                  alt="Paper Sketches"
                  className="w-auto h-auto max-w-md"
                />
              </div>
            </Section>

            {/* Testing the concept */}
            <Section>
              <SectionTitle>Testing the concept</SectionTitle>
              <SectionText className="mb-6">
                We created the wireframes to get early qualitative feedback from the users, we conducted user testing and documented the feedback.
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={meditationUntitled8}
                    alt="Wireframes 1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={meditationUntitled9}
                    alt="Wireframes 2"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Section>

            {/* Visual direction exploration */}
            <Section>
              <SectionTitle>Visual direction exploration</SectionTitle>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6 mb-6">
                <img
                  src={meditationUntitled10}
                  alt="Visual Direction Exploration"
                  className="w-full h-auto"
                />
              </div>
              <SectionText className="mb-6">
                I concluded for the product visual direction to be:
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Calm</strong>
                </HighlightCard>
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Quick</strong>
                </HighlightCard>
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Simple</strong>
                </HighlightCard>
                <HighlightCard accentColor="#000000">
                  <strong className="text-foreground font-semibold">Luxuries</strong>
                </HighlightCard>
              </div>
              <SectionText className="mb-6">
                I explored various concepts
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={conceptGif1}
                    alt="Concept 1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={conceptGif2}
                    alt="Concept 2"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20">
                  <img
                    src={conceptGif3}
                    alt="Concept 3"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <SectionText>
                I utilized Human Interface Guidelines and resources to design the WatchUI.
              </SectionText>
            </Section>

            {/* Onboarding Experience */}
            <Section>
              <SectionTitle>Onboarding Experience</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground/60 mb-2">Onboarding Screen 1: Splash Screen</p>
                  <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                    <img
                      src={group42}
                      alt="Onboarding Screen 1"
                      className="w-auto h-auto max-w-xs"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/60 mb-2">Onboarding Screen 2: Educating users about the rewards associated with the app.</p>
                  <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                    <img
                      src={group44}
                      alt="Onboarding Screen 2"
                      className="w-auto h-auto max-w-xs"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/60 mb-2">Onboarding Screen 3: Communicate the value associated with the app</p>
                  <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                    <img
                      src={group43}
                      alt="Onboarding Screen 3"
                      className="w-auto h-auto max-w-xs"
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Meditation Task UI */}
            <Section>
              <SectionTitle>Meditation Task UI</SectionTitle>
              <SectionText className="mb-6">
                I started to sketch out the ideas on paper which helped me understand the things missing
              </SectionText>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
                <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                  <img
                    src={group3}
                    alt="Meditation Task UI 1"
                    className="w-auto h-auto max-w-xs"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                  <img
                    src={group4}
                    alt="Meditation Task UI 2"
                    className="w-auto h-auto max-w-xs"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                  <img
                    src={dotsSvg}
                    alt="Meditation Task UI 3"
                    className="w-auto h-auto max-w-xs"
                  />
                </div>
              </div>
            </Section>

            {/* UI Design System */}
            <Section>
              <SectionTitle>UI Design System</SectionTitle>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <img
                  src={slide16_9_7}
                  alt="UI Design System"
                  className="w-full h-auto"
                />
              </div>
            </Section>

            {/* Prototype */}
            <Section>
              <SectionTitle>Prototype</SectionTitle>
              <SectionText className="mb-6">
                Using the designed UI and following human interface guidelines for reference, I put together this prototype to communicate the product concept. I used Protopie to create this interactive prototype.
              </SectionText>
              <div className="rounded-xl overflow-hidden bg-muted/20 mt-6">
                <video
                  src={watchOSVideo}
                  className="w-full h-auto"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </Section>

            {/* Conclusion */}
            <Section>
              <SectionTitle>Conclusion</SectionTitle>
              <SectionText className="mb-6">
                Finally, the concept for a mindful app was designed to help students on campus remember to do mindfulness exercises and also to help them make friends.
              </SectionText>
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground">Next Steps</h3>
              <SectionText className="mb-6">
                This project is intended to explore and implement various design strategies to meet its purpose. As the next step, I plan to build a Minimum Viable Product (MVP) with SwiftUI, test it with people, and make this product available to students on campus to help build healthy habits.
              </SectionText>
              <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-foreground mt-12">Key Learning</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">I learned the approach of creating products with human behavior in mind.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">I learned how to use various frameworks like Hooked Model to build habit-forming products.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">I learned how to leverage Apple's human interface guidelines while designing for watchOS.</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">I learned how to design products with constant feedback.</p>
                </li>
              </ul>
            </Section>

            {/* Footer */}
            <Section>
              <SectionText>
                Thank you for reading. If you'd like to work with me, get in touch:{" "}
                <a
                  href="/"
                  className="text-foreground font-semibold hover:underline"
                >
                  Contact me
                </a>
              </SectionText>
            </Section>
          </div>
        </div>
      </div>
    );
  }

  if (isUXAgent) {
    // UX AI Agent Case Study
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-12 group pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {/* Case Study Available on Request Notice */}
            <div className="mb-8 p-4 bg-muted/30 border border-border/50 rounded-lg">
              <p className="text-sm font-medium text-foreground">
                Case study available upon request
              </p>
            </div>
            
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
                UX AI Agent
              </h1>
              
              {/* Overview */}
              <Section>
                <SectionTitle>Overview</SectionTitle>
                <SectionText>
                  UX agent helps you do automated UX audits for your websites and make recommendations to improve conversion rates.
                </SectionText>
              </Section>
            </div>

            {/* Image at Bottom */}
            <div className="mt-12 rounded-xl overflow-hidden bg-muted/20">
              <img
                src={uxAgentPGImage}
                alt="UX AI Agent"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Footer */}
            <Section>
              <SectionText>
                Thank you for reading. If you'd like to work with me, get in touch:{" "}
                <a
                  href="/"
                  className="text-foreground font-semibold hover:underline"
                >
                  Contact me
                </a>
              </SectionText>
            </Section>
          </div>
        </div>
      </div>
    );
  }

  // Eva AI Case Study
  if (isAIProductivityOS) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-12 group pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
                Eva AI- Personal Assistant | iOS Mobile App
              </h1>
              
              {/* Video */}
              <div className="rounded-xl overflow-hidden bg-muted/20 mb-12">
                <video
                  src={aiVoiceVideo}
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>

            {/* Product Overview */}
            <Section>
              <SectionTitle>Product Overview</SectionTitle>
              <SectionText>
                Eva AI is a productivity OS iOS app designed to help you stay productive and efficient by managing your goals, tasks, and captured thoughts with the power of AI. Voice input makes task tracking effortless, eliminating the need for manual entry. The AI understands your intent and automatically categorizes your tasks and goals, so you don't have to do it yourself. The app is built to help people stay on track with their goals, manage tasks seamlessly, and remain organized.
              </SectionText>
            </Section>

            {/* Why Should This Product Exist */}
            <Section>
              <SectionTitle>Why Should This Product Exist</SectionTitle>
              <SectionText>
                Most AI productivity tools fall into two extremes: chat-focused interfaces or traditional to-do lists that require manual entry. Chat-based tools are good at conversation, but they rarely <strong>translate intent into actionable, trackable work</strong>. On the other hand, existing task managers rely heavily on manual input, which increases cognitive load and friction when the user is on the go, leaving users with fragmented workflows.
              </SectionText>
            </Section>

            {/* My Role, Scope and Tool Stack */}
            <Section>
              <SectionTitle>My Role, Scope and Tool Stack</SectionTitle>
              <SectionText className="mb-4">
                <strong>Role:</strong> Product Designer, Researcher, Prototyper, Strategist and Design Engineer.
              </SectionText>
              <SectionText className="mb-4">
                <strong>Scope:</strong> 0→1 ownership of product direction, UX, UI, interaction design, user research, and prototyping.
              </SectionText>
              <SectionText>
                <strong>Tool Stack:</strong> Figma, SwiftUI, Cursor, Xcode, Google AI Studio, Gemini API, ElevenLabs, plus extensive sketching with pen and paper.
              </SectionText>
            </Section>

            {/* Propose */}
            <Section>
              <SectionTitle>Propose</SectionTitle>
              <SectionText>
                This project explores how AI-native, voice-first interactions can reduce cognitive load by turning human intent into actionable work. It represents an end-to-end product effort from problem framing and direction-setting to prototyping, shipping, and learning from real user behavior to refine the experience over time.
              </SectionText>
            </Section>

            {/* Motivation */}
            <Section>
              <SectionTitle>Motivation</SectionTitle>
              <SectionText className="mb-6">
                I found myself constantly juggling handwritten notes, sticky notes, documents, Notion, multiple to-do list apps, and even ChatGPT. Everything felt scattered. Sometimes I'd be on the go and have a thought I wanted to capture quickly, but there was no easy or consistent way to do it.
              </SectionText>
              <SectionText className="mb-6">
                Most to-do apps are designed to track tasks, while goals are treated as something separate. When I tried existing tools, I noticed that tasks and goals often lived in different places and even when they were connected, I couldn't use voice to capture what was on my mind. The friction of manually entering and organizing everything made the experience feel heavy and fragmented.
              </SectionText>
              <SectionText className="mb-6">
                This gap is what motivated me to create this app.
              </SectionText>
              <blockquote className="border-l-4 border-foreground/20 pl-6 py-2 my-6 italic text-foreground/90">
                <p className="text-base lg:text-lg">
                  <strong>How might we design a system that can track both tasks and goals through an easy-to-use, voice-first interface, one that understands user intent and reduces the cognitive load of manually creating and managing lists?</strong>
                </p>
              </blockquote>
            </Section>

            {/* Footer */}
            <Section>
              <SectionText>
                Thank you for reading. If you'd like to work with me, get in touch:{" "}
                <a 
                  href="/" 
                  className="text-foreground font-semibold hover:underline"
                >
                  Contact me
                </a>
              </SectionText>
            </Section>

          </div>
        </div>
      </div>
    );
  }

  // Digital Commercial Banking Case Study
  if (isDigitalBanking) {
    const digitalBankingDetails = [
      { label: "My Role", value: "Senior Product Designer" },
      { label: "Responsibility", value: "Accounts, Lending Experience, Design System" },
      { label: "Timeline", value: "2+ Years" },
      { label: "Initiative", value: "~$27M Platform Build" },
    ];

    return (
      <PasswordProtect
        password="AccessJohnPortfolio"
        storageKey="digital-banking-auth"
      >
      <div className="min-h-screen bg-background pt-24">
        <Header activeTab={undefined} onTabChange={handleTabChange} />
        <div className="py-16 px-6 lg:px-16">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-12 group pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
                Digital Commercial Banking Platform
              </h1>
              <SectionText className="text-xl">
                A ~$27M initiative to build a digital commercial banking platform from scratch for Innovation Economy clients, including startups and small businesses who needed a place to manage accounts, track cash flow, handle lending, and see their full financial picture.
              </SectionText>
            </div>

            {/* Hero Image */}
            <div className="mb-16 rounded-2xl overflow-hidden bg-muted/20">
              <img
                src={dcbImage}
                alt="Digital Commercial Banking Platform"
                className="w-full h-auto"
              />
            </div>

            {/* Project Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {digitalBankingDetails.map((detail, idx) => (
                <DetailCard key={idx} label={detail.label} value={detail.value} />
              ))}
            </div>

            {/* The Opportunity */}
            <Section>
              <SectionTitle>The Opportunity</SectionTitle>
              <SectionText className="mb-6">
                When Silicon Valley Bank collapsed in March 2023, thousands of startups needed a new bank overnight. Many turned to J.P. Morgan, but the bank wasn't ready for them.
              </SectionText>
              <SectionText className="mb-6">
                J.P. Morgan had robust solutions for enterprise clients, but nothing built for startups and small businesses. These founders needed something different: a platform where they could manage accounts, track cash flow, handle lending, and see their full financial picture without navigating enterprise-level complexity.
              </SectionText>
              <SectionText>
                That gap became a ~$27M initiative to build a digital commercial banking platform from scratch for Innovation Economy clients. I joined when the project was in early discovery. Wireframes existed, but there was no unified product vision. Over the next two years, I helped shape what this platform became.
              </SectionText>
            </Section>

            {/* My Role */}
            <Section>
              <SectionTitle>My Role</SectionTitle>
              <SectionText className="mb-6">
                I started on the Accounts experience, designing how founders would view and manage their financial accounts. Within months, my scope expanded. I was pulled into a strategic project with the CTO to create an end-to-end site map of the entire platform, a task that required me to understand every workstream and how they connected.
              </SectionText>
              <SectionText className="mb-8">
                Today, I lead the Lending experience. But I stay actively involved across workstreams because on a platform this interconnected, design decisions in one area ripple into others.
              </SectionText>

              <h3 className="text-lg font-semibold mb-4 text-foreground">What I owned:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Accounts overview and data visualization</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Lending home page, detail pages, and transaction views</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Auto-pay and paperless features</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">Lending tile component (used across the entire platform)</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-foreground mt-2 text-xl leading-none">•</span>
                  <p className="text-lg leading-relaxed text-muted-foreground/80">End-to-end site map with the CTO</p>
                </li>
              </ul>
            </Section>

            {/* Understanding the Users */}
            <Section>
              <SectionTitle>Understanding the Users</SectionTitle>
              <SectionText className="mb-8">
                Our users are startup founders and small business owners. They're not finance professionals. They're building products, raising funding, managing teams. Somewhere in between, they need to manage their company's money.
              </SectionText>
              <SectionText className="mb-8">
                Through user research, we identified three core problems:
              </SectionText>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="p-6 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Navigation was broken</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Users couldn't find their way to lending information. The path required going through Accounts, which made sense to internal teams but confused users.
                  </p>
                </Card>
                <Card className="p-6 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Language was a barrier</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Too much financial jargon. Terms like "facility" and "utilization" meant nothing to founders who just wanted to know what they owed and when.
                  </p>
                </Card>
                <Card className="p-6 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">No central hub for loans</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Users with multiple loans had no single place to see them all. They had to visit individual pages, creating stress and making it easy to miss important details.
                  </p>
                </Card>
              </div>

              <Card className="p-8 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
                <blockquote className="text-xl font-medium text-foreground leading-relaxed pl-4 italic">
                  "I just want to know what I owe and when it's due. Why do I have to click through five screens to find that?"
                </blockquote>
                <p className="text-sm text-muted-foreground/70 mt-4 pl-4">Research participant</p>
              </Card>
            </Section>

            {/* Accounts: Building the Foundation */}
            <Section>
              <SectionTitle>Accounts: Building the Foundation</SectionTitle>
              <SectionText className="mb-6">
                When I joined, the Accounts experience was basic wireframes, a transaction list without context. Users could see individual transactions, but they couldn't visualize their overall financial picture or understand how different accounts related.
              </SectionText>
              <SectionText className="mb-6">
                I designed the accounts overview, which brought together multiple account types in one view: checking accounts, lending accounts, and external connected accounts. The centerpiece was a <strong className="text-foreground font-semibold">balance over time visualization</strong> that helped founders see how their money moved.
              </SectionText>

              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} title="The Constraint">
                <p>I couldn't design from scratch. I had to work within the existing design system and use High Charts components. This meant solving the problem with what was buildable, not what was ideally possible.</p>
              </HighlightCard>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-foreground">My process:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-4">
                    <span className="text-foreground mt-2 text-xl leading-none">1.</span>
                    <p className="text-lg leading-relaxed text-muted-foreground/80">Competitor research to understand how other platforms handled account visualization</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-foreground mt-2 text-xl leading-none">2.</span>
                    <p className="text-lg leading-relaxed text-muted-foreground/80">User research to validate what founders actually needed</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-foreground mt-2 text-xl leading-none">3.</span>
                    <p className="text-lg leading-relaxed text-muted-foreground/80">Wireframing and sharing concepts with PM for feedback</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-foreground mt-2 text-xl leading-none">4.</span>
                    <p className="text-lg leading-relaxed text-muted-foreground/80">Multiple iterations, high-fidelity designs, and working with the design system team for implementation</p>
                  </li>
                </ul>
              </div>
            </Section>

            {/* The Pivot to Lending */}
            <Section>
              <SectionTitle>The Pivot to Lending</SectionTitle>
              <SectionText className="mb-6">
                The research insight about navigation changed my trajectory on this project.
              </SectionText>
              <SectionText className="mb-6">
                Users were struggling to find lending information because it was buried inside Accounts. Every time they needed to check a loan, they had to navigate through screens that weren't relevant to their task. This wasn't a small usability issue. It was a structural problem.
              </SectionText>
              <SectionText className="mb-8">
                <strong className="text-foreground font-semibold">I advocated for giving lending its own dedicated space.</strong> Based on the research, users didn't want to dig through Accounts to manage loans. They wanted a direct path: a lending home page where everything lived.
              </SectionText>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30">
                  <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Before
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Dashboard → Accounts → Dig for Lending details
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Users got lost in the navigation</p>
                </Card>
                <Card className="p-6 bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30">
                  <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    After
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Dashboard → Lending home directly
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Clear, direct path to loan information</p>
                </Card>
              </div>

              <SectionText className="mt-8">
                This proposal was accepted, and I transitioned from Accounts to leading the Lending experience.
              </SectionText>
            </Section>

            {/* Designing the Lending Experience */}
            <Section>
              <SectionTitle>Designing the Lending Experience</SectionTitle>
              <SectionText className="mb-8">
                The lending home page became my primary focus. The goal was simple: give founders one place to manage all their loans: see balances, track due dates, understand utilization, take action.
              </SectionText>

              <h3 className="text-lg font-semibold mb-4 text-foreground">What I designed:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded">In Progress</span>
                    <p className="text-base text-muted-foreground/90">Lending home page: The centralized hub</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">Shipped</span>
                    <p className="text-base text-muted-foreground/90">Facility detail pages</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">Shipped</span>
                    <p className="text-base text-muted-foreground/90">Transaction details</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">Shipped</span>
                    <p className="text-base text-muted-foreground/90">Auto-pay feature</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">Shipped</span>
                    <p className="text-base text-muted-foreground/90">Paperless feature</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">Shipped</span>
                    <p className="text-base text-muted-foreground/90">Lending tile component</p>
                  </div>
                </div>
              </div>

              <SectionText>
                This work required constant coordination. The lending tile, for example, had to appear in Accounts, on the Dashboard, and within Lending itself. That meant aligning with three workstreams on a single component, agreeing on visual treatment, interaction patterns, and data display. I led those conversations, proposed solutions when teams disagreed, and made sure the final component worked everywhere.
              </SectionText>
            </Section>

            {/* Solving the Multiple Loans Problem */}
            <Section>
              <SectionTitle>Solving the Multiple Loans Problem</SectionTitle>
              <SectionText className="mb-6">
                The hardest design challenge in Lending was handling multiple loans.
              </SectionText>
              <SectionText className="mb-6">
                Every loan is different: different terms, different balances, different due dates. But users needed to see them together in one view without getting overwhelmed. This was an information hierarchy problem: how do you show variety and complexity without creating clutter?
              </SectionText>
              <SectionText className="mb-8">
                I explored several approaches. A tabbed interface felt too hidden, and users might miss loans. A long scrolling list felt overwhelming. A card-based layout worked better, but the cards needed careful hierarchy so users could scan quickly and find what mattered.
              </SectionText>

              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} title="The Solution">
                <p className="mb-4">A modular loan component that:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Displays key information at a glance (balance, due date, utilization)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Shows loan-specific KPIs without overwhelming the view</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Allows easy navigation between multiple loans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Scales whether you have one loan or ten</span>
                  </li>
                </ul>
              </HighlightCard>

              <SectionText className="mt-8">
                I designed this component to be flexible enough for the design system. It's now being contributed back so other teams can reuse it across the platform.
              </SectionText>
            </Section>

            {/* Simplifying the Language */}
            <Section>
              <SectionTitle>Simplifying the Language</SectionTitle>
              <SectionText className="mb-6">
                One research finding that shaped my work: users didn't understand the terminology. Words like "facility," "utilization," and "disbursement" meant something to bankers but nothing to founders.
              </SectionText>
              <SectionText className="mb-8">
                I partnered with content design to simplify language across the lending experience. We audited every label, description, and instruction. We rewrote them in plain terms that a founder could scan and understand immediately.
              </SectionText>

              <Card className="p-8 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
                <blockquote className="text-xl font-medium text-foreground leading-relaxed pl-4">
                  This wasn't just a copy task. Language is part of the interface. Confusing words create cognitive load just like confusing layouts. Simplifying content was a design decision.
                </blockquote>
              </Card>
            </Section>

            {/* Design System Contributions */}
            <Section>
              <SectionTitle>Design System Contributions</SectionTitle>
              <SectionText className="mb-8">
                I didn't just design screens. I contributed to the system that other designers build on.
              </SectionText>

              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Lending tile component</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Designed as a reusable pattern with documented states, variants, and usage guidelines. It now appears across Accounts, Dashboard, and Lending.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Data visualization patterns</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Working within High Charts constraints, I established patterns for how we display financial data: balance over time, loan utilization, KPIs. These patterns are documented for consistency.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Modular loan component</h3>
                  <p className="text-base leading-relaxed text-muted-foreground/90">
                    Currently being added to the design system with full specs for responsive behavior and accessibility.
                  </p>
                </Card>
              </div>
            </Section>

            {/* How I Collaborated */}
            <Section>
              <SectionTitle>How I Collaborated</SectionTitle>
              <SectionText className="mb-8">
                Building a platform this complex required constant collaboration.
              </SectionText>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">With my PM</h3>
                  <SectionText>
                    Our relationship was a partnership, not a handoff. They brought business context and user problems; I brought research insights and design perspectives. We defined requirements together, debating priorities, questioning assumptions, aligning on what to build. I didn't wait for specs; I was part of shaping them.
                  </SectionText>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">With engineering</h3>
                  <SectionText>
                    I learned to design within constraints. When I proposed custom components early on, engineers pushed back. They weren't in the design system and would delay the timeline. Instead of fighting it, I adapted. I referenced existing High Charts components, worked with the design system team to extend what existed, and found solutions that met user needs without creating engineering debt.
                  </SectionText>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Across workstreams</h3>
                  <SectionText>
                    I coordinated with three teams: Accounts, Lending, and the CLP/Dashboard team. We had weekly syncs to align on shared components and patterns. When other designers flagged that my lending tile wasn't consistent with their account tiles, I didn't just adjust my work. I proposed a unified approach that worked for everyone.
                  </SectionText>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Proactive contributions</h3>
                  <SectionText>
                    Beyond my immediate scope, I initiated the site map project with the CTO because I saw that teams were designing in isolation without a shared view of the product. I proposed the lending hub based on research, not because someone asked me to. When content was confusing users, I partnered with content design to fix it rather than treating it as someone else's problem.
                  </SectionText>
                </div>
              </div>
            </Section>

            {/* What Shipped */}
            <Section>
              <SectionTitle>What Shipped</SectionTitle>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Accounts</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Accounts overview bringing together multiple account types</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Balance over time data visualization</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Lending</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Facility detail pages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Transaction details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Auto-pay feature</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Paperless feature</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Lending tile component</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">In Progress</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="h-5 w-5 rounded-full border-2 border-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Lending home page (proposing to leadership)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-5 w-5 rounded-full border-2 border-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">Modular loan component (being added to design system)</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-4 mt-6 text-foreground">Platform</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-muted-foreground/90">End-to-end site map created with the CTO</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </Section>

            {/* Reflection */}
            <Section>
              <SectionTitle>Reflection</SectionTitle>
              <SectionText className="mb-6">
                This was a two-year effort on a platform that's still evolving. The work taught me that designing at this scale isn't just about screens. It's about systems, alignment, and influence.
              </SectionText>
              <SectionText className="mb-8">
                The hardest parts were coordination and constraints. Aligning three workstreams on a single component. Adapting when engineering said something wasn't buildable. Advocating for the user when product strategy pushed in a different direction.
              </SectionText>

              <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />} title="What I'm proud of">
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>A lending experience that gives founders one place to manage their loans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>A site map that aligned an entire platform</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Components that are now part of the design system other teams build on</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>A process where I wasn't waiting for direction. I was helping shape what we built</span>
                  </li>
                </ul>
              </HighlightCard>
            </Section>

          </div>
        </div>
      </div>
      </PasswordProtect>
    );
  }

  // AI Insights Case Study (default)
  if (isAIInsights) {
    const projectDetails = [
      { label: "My Role", value: "Lead AI Product Designer" },
      { label: "Responsibility", value: "Vision Strategy, UI & Interaction Design, AI Prototyping" },
      { label: "Advisor", value: "Zachary Evetts, Creative Director" },
      { label: "UX Writer", value: "Catherine Hong" },
      { label: "Timeline", value: "4 weeks" },
      { label: "Nature of project", value: "Leadership Proposal & Innovation Initiative" },
    ];

    const pros = [
      "Provides a simpler, less crowded experience for users compared to the current app",
      "Allows for a fresh visual identity that could better resonate with a younger generation",
    ];

    const cons = [
      "High development and maintenance costs for a separate product",
      "Additional friction for customers who prefer a single app experience",
      "Increases product development scope, potentially delaying time-to-market",
    ];

    return (
    <div className="min-h-screen bg-background pt-24">
      <Header activeTab={undefined} onTabChange={handleTabChange} />
      <div className="py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-12 group pl-0 hover:pl-2 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight mb-8">
            Citi AI Insights
          </h1>
          <SectionText className="text-xl">
            Citi AI Insights is an app that helps existing Citi customers improve their financial well-being. It does this by providing insights based on their spending data to help boost their credit scores. Additionally, it supports financial literacy through a conversational AI chat interface. The app leverages Citi's existing resources to promote financial well-being and contextually position Citi's products.
          </SectionText>
        </div>

        {/* Hero Video */}
        <div className="mb-16 rounded-2xl overflow-hidden bg-muted/20">
          <video
            src={aiInsightsVideo}
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {projectDetails.map((detail, idx) => (
            <DetailCard key={idx} label={detail.label} value={detail.value} />
          ))}
        </div>

        {/* Outcome */}
        <Section>
          <OutcomeCard>
            <p className="mb-4">
              Designed a 0→1 AI-native mobile app prototype that was pitched to Citi leadership to demonstrate how AI can improve service efficiency, reduce friction, and unlock new business value. Analysis showed that integrating this AI experience into Citi's existing mobile app workflows.
            </p>
            <p className="mb-4">
              Even 1% conversion could potentially unlock
            </p>
            <div className="inline-flex items-baseline gap-2 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 shadow-sm">
              <strong className="text-3xl lg:text-4xl font-bold text-foreground">~$80M</strong>
              <span className="text-base text-muted-foreground/70">in revenue</span>
            </div>
          </OutcomeCard>
        </Section>

        {/* How Might We */}
        <Section>
          <SectionTitle>How Might We</SectionTitle>
          <SectionText>
            A direction from Citi's leadership: "How might we integrate AI in an existing solution to drive business value and solve some of the problems that the customers are currently facing?"
          </SectionText>
        </Section>

        {/* Design Instinct */}
        <Section>
          <SectionTitle>Design Instinct Kicking In</SectionTitle>
          <SectionText className="mb-6">
            What problems are the users currently facing? We don't have to integrate AI because it's cool. We need to integrate it because it can solve these problems in a much more efficient way. This led to the following question:
          </SectionText>
          <QuoteCard>
            What key problems are users struggling with, and what corresponding pain points are impacting the business's ability to deliver value?
          </QuoteCard>
        </Section>

        {/* Customer Struggles */}
        <Section>
          <SectionTitle>What Are Citi's Customers Struggling With? What Matters to Them?</SectionTitle>
          <SectionText className="mb-6">
            Due to the time constraint and it being a quick 4-week sprint, there was a lack of time to conduct user research. However, I looked into the available data. Without that holding me back, I looked into some of the past research that was done, and these were the findings.
          </SectionText>
          <HighlightCard icon={<Lightbulb className="h-5 w-5 text-foreground" />}>
            <p className="text-xl font-medium text-foreground leading-relaxed pl-4">
              "As a potential Citi customer, I don't know which product best fits my banking needs. As a current customer, I want answers to the questions I have and to know which product is best for me" UX Research
            </p>
          </HighlightCard>
        </Section>

        {/* Business Problem */}
        <Section>
          <SectionTitle>It also needs to solve a business problem right?</SectionTitle>
          <SectionText className="mb-8">
            Knowing how this product solves a business problem can help convince stakeholders.
          </SectionText>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground/80">
                  Through secondary research, I found that Citi's mobile app has around <strong className="text-foreground font-semibold">20 million users</strong>
                </p>
                <a 
                  href="https://www.pymnts.com/news/digital-banking/2024/citi-chief-digital-officer-connects-data-customer-experience/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline mt-1 inline-block"
                >
                  Reference →
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                Customers often don't know which product is best for them, leading to lower conversion rates on product offerings.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                Lower conversion rates ultimately result in reduced revenue.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                <strong className="text-foreground font-semibold">Assumption:</strong> Each customer could generate around $200 in value annually
              </p>
            </li>
          </ul>

          <Card className="p-8 bg-muted/20 border-l-4" style={{ borderLeftColor: '#003B70' }}>
            <p className="text-xl font-medium text-foreground leading-relaxed pl-4">
              <strong>Hypothesis:</strong> Even a 2% increase in product offering conversion could unlock an estimated <strong>$80 million*</strong> in additional annual revenue for Citi. <strong>Assumption:</strong> Each customer could generate around $200 in value annually
            </p>
          </Card>
          
          <p className="text-base leading-relaxed mt-6 italic text-muted-foreground/80">
            That's why solving for overwhelmed users is important for users and Citi's customers
          </p>
        </Section>

        {/* Product Integration */}
        <Section>
          <SectionTitle>How can this product be integrated?</SectionTitle>
          <SectionText className="mb-6">
            A standalone product might not be feasible given the scale at which Citi operates, so I explored how this could be integrated into Citi's current iOS Mobile App. I explored different places where the Citi Insights chat could exist to drive the most input and outcome without increasing the scope.
          </SectionText>
          <div className="rounded-xl overflow-hidden bg-muted/20">
            <img
              src={citiAIIntegration}
              alt="Citi AI Integration"
              className="w-full h-auto"
            />
          </div>
        </Section>

        {/* Jobs to be Done */}
        <Section>
          <SectionTitle>What are some of the Jobs to be Done?</SectionTitle>
          <p className="text-sm text-muted-foreground/70 italic mb-8">
            Note: Due to the short timeline and limited resources, some user needs were assumed. Ideally, these needs would be derived from user data analysis and 1:1 interviews.
          </p>
          <div className="overflow-x-auto">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-foreground">JTBD Type</th>
                      <th className="text-left p-4 font-semibold text-foreground">Customer needs</th>
                      <th className="text-left p-4 font-semibold text-foreground">AI feature match</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-4 font-medium text-foreground">Primary</td>
                      <td className="p-4 text-muted-foreground/90">Understand their current credit scores and stay on track with their credit score growth</td>
                      <td className="p-4 text-muted-foreground/90">Personalized insights on change in the credit score.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-foreground">Emotional</td>
                      <td className="p-4 text-muted-foreground/90">Feel understood & heard</td>
                      <td className="p-4 text-muted-foreground/90">Recommendations based on the users goals, LLM to chat Interface</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </Section>

        {/* AI Capabilities */}
        <Section>
          <SectionTitle>AI Capabilities & Industry Trends</SectionTitle>
          <SectionText className="mb-8">
            ChatGPT's API can be leveraged to build a conversational AI experience and deliver personalized recommendations. With consumers increasingly getting used to interacting with ChatGPT, creating a chat-based AI experience will align naturally with evolving user behavior.
          </SectionText>
          <div className="rounded-xl overflow-hidden bg-muted/20">
            <img
              src={aiCapExploration}
              alt="AI Capabilities Exploration"
              className="w-full h-auto"
            />
          </div>
          
          <SectionText className="mt-8 mb-6">
            I explored various sketches with the following goals in mind:
          </SectionText>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <div>
                <p className="text-lg font-semibold mb-2 text-foreground">Prioritize credit score</p>
                <p className="text-base text-muted-foreground/80 italic">Why? A strong credit score is a critical part of building long-term wealth for users.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <div>
                <p className="text-lg font-semibold mb-2 text-foreground">Personalize the experience</p>
                <p className="text-base text-muted-foreground/80 italic">How can we better understand what's important to users — specifically, their financial goals?</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <div>
                <p className="text-lg font-semibold mb-2 text-foreground">Recommend the right products</p>
                <p className="text-base text-muted-foreground/80 italic">How do we surface tailored product recommendations that genuinely fit user needs?</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <div>
                <p className="text-lg font-semibold mb-2 text-foreground">Introduce a Personalized AI Assistant</p>
                <p className="text-base text-muted-foreground/80 italic">Allow users to interact directly with an AI assistant to better understand which products and services are best suited for them.</p>
              </div>
            </li>
          </ul>
        </Section>

        {/* Exploring Concepts */}
        <Section>
          <SectionTitle>UI designs</SectionTitle>
          <div className="mb-8">
            <div className="rounded-xl overflow-hidden bg-muted/20 mb-6">
              <img
                src={heroInsights}
                alt="Hero Insights"
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={card4}
                  alt="Card design"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={grid}
                  alt="Grid design"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={typography}
                  alt="Typography design"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Outcome */}
        <Section>
          <SectionTitle>Outcome</SectionTitle>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                The project was presented to Citi's leadership and head of design, receiving positive feedback.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                Even with limited resources and unclear goals, I led the vision and strategy for Citi's AI Insights app.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                If implemented, this solution could position Citi not just as a banking provider, but as an AI-powered financial partner unlocking an estimated $80M in additional revenue.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                I effectively collaborated with cross-functional partners by creating wireframes, high-fidelity UI, and a prototype to communicate the vision clearly.
              </p>
            </li>
          </ul>
        </Section>

        {/* Next Steps */}
        <Section>
          <SectionTitle>Next Steps</SectionTitle>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                Implement the designs and measure outcomes through user testing and research.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-foreground mt-2 text-xl leading-none">•</span>
              <p className="text-lg leading-relaxed text-muted-foreground/80">
                Continue iterating until at least a 1% increase in conversion is achieved.
              </p>
            </li>
          </ul>
        </Section>

        {/* Conclusion */}
        <Section>
          <SectionTitle>Conclusion</SectionTitle>
          <SectionText className="mb-8">
            This project demonstrates how strategic design thinking and AI integration can transform financial services. By starting with user problems and business needs rather than technology trends, I was able to create a vision that addresses real customer pain points while unlocking significant business value. The Citi AI Insights app concept showcases the potential for AI to not just enhance existing products, but to fundamentally reimagine how financial institutions can serve their customers, positioning Citi as an AI-powered financial partner that helps users build long-term wealth through personalized insights and guidance.
          </SectionText>
          <div className="rounded-xl overflow-hidden bg-muted/20">
            <video
              src={aiInsightsVideo}
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </Section>

        {/* Footer */}
        <Section>
          <SectionText>
            Thank you for reading. If you'd like to work with me, get in touch:{" "}
            <a
              href="/"
              className="text-foreground font-semibold hover:underline"
            >
              Contact me
            </a>
          </SectionText>
        </Section>

        </div>
      </div>
    </div>
  );
  }

  return null;
};

export default CaseStudy;
