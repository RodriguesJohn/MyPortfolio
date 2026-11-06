import type { ComponentType } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageShell from "@/components/v2/PageShell";
import BalanceTransferCaseStudy from "@/components/v2/case-studies/BalanceTransferCaseStudy";
import OrbiSimpleCaseStudy from "@/components/v2/case-studies/OrbiSimpleCaseStudy";
import MuoCaseStudy from "@/components/v2/case-studies/MuoCaseStudy";
import DCBSimpleCaseStudy from "@/components/v2/case-studies/DCBSimpleCaseStudy";
import GenericCaseStudy from "@/components/v2/case-studies/GenericCaseStudy";
import { getProjectBySlug } from "@/data/projects";

/** Hand-written case studies. Every other project uses the generic template. */
const CASE_STUDIES: Record<string, ComponentType> = {
  "orbi-ai": OrbiSimpleCaseStudy,
  muo: MuoCaseStudy,
  "digital-commercial-banking": DCBSimpleCaseStudy,
  "balance-transfer-citi": BalanceTransferCaseStudy,
};

const IndexV2WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageShell>
        <div className="mx-auto w-[90%] max-w-[500px] pt-32 pb-40">
          <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-500">404</p>
          <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-zinc-50">
            Project not found
          </h1>
          <p className="mt-2 text-[15px] text-zinc-400">
            That slug doesn't match any project.{" "}
            <button
              onClick={() => navigate("/work")}
              className="text-zinc-50 underline underline-offset-[3px] decoration-zinc-600 hover:decoration-zinc-50"
            >
              Back to My Work
            </button>
          </p>
        </div>
      </PageShell>
    );
  }

  const CaseStudy = CASE_STUDIES[project.slug];

  return (
    <PageShell>
      {CaseStudy ? <CaseStudy /> : <GenericCaseStudy project={project} />}
    </PageShell>
  );
};

export default IndexV2WorkDetail;
