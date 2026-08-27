import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import IndexV2Work from "./pages/IndexV2Work";
import IndexV2WorkDetail from "./pages/IndexV2WorkDetail";
import IndexV2Testimonials from "./pages/IndexV2Testimonials";
import IndexV2ToolStack from "./pages/IndexV2ToolStack";
import IndexV2CaseStudyPresentation from "./pages/IndexV2CaseStudyPresentation";
import IndexV2ComponentGallery from "./pages/IndexV2ComponentGallery";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RedirectV2Home = () => {
  const { search } = useLocation();
  return <Navigate to={{ pathname: "/", search }} replace />;
};

const RedirectV2Work = () => {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug ?? ""}`} replace />;
};

const RedirectWithSearch = ({ to }: { to: string }) => {
  const { search } = useLocation();
  return <Navigate to={{ pathname: to, search }} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Live portfolio */}
          <Route path="/" element={<IndexV2 />} />
          <Route path="/work" element={<IndexV2Work />} />
          <Route path="/work/:slug" element={<IndexV2WorkDetail />} />
          <Route path="/testimonials" element={<IndexV2Testimonials />} />
          <Route path="/tool-stack" element={<IndexV2ToolStack />} />
          <Route
            path="/case-study-presentation"
            element={<IndexV2CaseStudyPresentation />}
          />
          <Route path="/component-gallery" element={<IndexV2ComponentGallery />} />

          {/* Legacy portfolio (V1) */}
          <Route path="/v1" element={<Index />} />
          <Route path="/v1/explorations" element={<Index />} />
          <Route path="/v1/all-projects" element={<Index />} />
          <Route path="/v1/consulting" element={<Index />} />
          <Route path="/v1/testimonials" element={<Index />} />
          <Route path="/v1/speaking" element={<Index />} />
          <Route path="/v1/about" element={<Index />} />
          <Route path="/v1/links" element={<Index />} />
          <Route path="/v1/books" element={<Index />} />
          <Route path="/v1/resume" element={<Index />} />

          {/* Old /v2 URLs */}
          <Route path="/v2" element={<RedirectV2Home />} />
          <Route path="/v2/work" element={<Navigate to="/work" replace />} />
          <Route path="/v2/work/:slug" element={<RedirectV2Work />} />
          <Route
            path="/v2/testimonials"
            element={<Navigate to="/testimonials" replace />}
          />
          <Route path="/v2/tool-stack" element={<Navigate to="/tool-stack" replace />} />
          <Route
            path="/v2/case-study-presentation"
            element={<RedirectWithSearch to="/case-study-presentation" />}
          />
          <Route
            path="/v2/component-gallery"
            element={<Navigate to="/component-gallery" replace />}
          />

          {/* Old V1 root URLs */}
          <Route path="/explorations" element={<Navigate to="/v1/explorations" replace />} />
          <Route path="/all-projects" element={<Navigate to="/v1/all-projects" replace />} />
          <Route path="/consulting" element={<Navigate to="/v1/consulting" replace />} />
          <Route path="/about" element={<Navigate to="/v1/about" replace />} />
          <Route path="/links" element={<Navigate to="/v1/links" replace />} />
          <Route path="/books" element={<Navigate to="/v1/books" replace />} />
          <Route path="/resume" element={<Navigate to="/v1/resume" replace />} />
          <Route path="/speaking" element={<Navigate to="/v1/speaking" replace />} />

          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
