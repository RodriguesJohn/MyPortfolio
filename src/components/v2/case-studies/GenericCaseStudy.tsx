import type { Project } from "@/data/projects";
import {
  CaseStudyHero,
  CaseStudyPage,
  CaseStudySection,
  CaseStudySplash,
} from "@/components/v2/case-studies/EditorialCaseStudy";

/**
 * Editorial template filled from project data, for projects without a
 * hand-written case study. Same layout as the Orbi, JPMorgan and Citi pages.
 */
const GenericCaseStudy = ({ project }: { project: Project }) => {
  const { media } = project;

  const details: { label: string; href?: string }[] = project.scopeCards?.length
    ? project.scopeCards.slice(0, 2).map((c) => ({ label: c.value }))
    : [{ label: project.meta }];
  details.push({ label: project.year });
  const link = project.ctaUrl ?? project.appStoreUrl ?? project.href;
  if (link) {
    details[details.length - 1] = {
      label: project.ctaLabel ?? (project.appStoreUrl ? "App Store" : "Visit the product"),
      href: link,
    };
  }

  const overview = [project.description];
  if (project.longDescription && project.longDescription !== project.description) {
    overview.push(project.longDescription);
  }

  return (
    <CaseStudyPage>
      <CaseStudySplash titleLines={[project.name]} details={details} />

      <CaseStudyHero>
        {media.type === "video" ? (
          <video
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="block h-auto w-full"
            style={{ backgroundColor: media.bg }}
            aria-label={`${project.name} demo`}
          />
        ) : (
          <img
            src={media.src}
            alt={project.name}
            className="block h-auto w-full"
            style={{ backgroundColor: media.bg }}
          />
        )}
      </CaseStudyHero>

      <CaseStudySection titleLines={["Overview", project.meta]} paragraphs={overview} />

      {project.aboutContext ? (
        <CaseStudySection
          titleLines={["Context"]}
          paragraphs={[project.aboutContext]}
        />
      ) : null}

      {project.slidesUrl ? (
        <>
          <CaseStudySection titleLines={["Case study", "deck"]} />
          <div className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-[16px] lg:mt-16">
            <iframe
              src={project.slidesUrl}
              title={`${project.name} case study deck`}
              className="size-full border-0"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            />
          </div>
        </>
      ) : null}
    </CaseStudyPage>
  );
};

export default GenericCaseStudy;
