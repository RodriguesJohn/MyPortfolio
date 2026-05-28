import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import IndexV2Work from "./pages/IndexV2Work";
import IndexV2WorkDetail from "./pages/IndexV2WorkDetail";
import IndexV2Testimonials from "./pages/IndexV2Testimonials";
import IndexV2ToolStack from "./pages/IndexV2ToolStack";
import IndexV2CaseStudyPresentation from "./pages/IndexV2CaseStudyPresentation";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/v2" element={<IndexV2 />} />
          <Route path="/v2/work" element={<IndexV2Work />} />
          <Route path="/v2/work/:slug" element={<IndexV2WorkDetail />} />
          <Route path="/v2/testimonials" element={<IndexV2Testimonials />} />
          <Route path="/v2/tool-stack" element={<IndexV2ToolStack />} />
          <Route path="/v2/case-study-presentation" element={<IndexV2CaseStudyPresentation />} />
          <Route path="/explorations" element={<Index />} />
          <Route path="/all-projects" element={<Index />} />
          <Route path="/consulting" element={<Index />} />
          <Route path="/testimonials" element={<Index />} />
          <Route path="/speaking" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/links" element={<Index />} />
          <Route path="/books" element={<Index />} />
          <Route path="/resume" element={<Index />} />
          <Route path="/case-study" element={<CaseStudy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
