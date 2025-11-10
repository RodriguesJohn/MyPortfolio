import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { WorkGrid } from "@/components/WorkGrid";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Navigation />
      <WorkGrid />
    </div>
  );
};

export default Index;
