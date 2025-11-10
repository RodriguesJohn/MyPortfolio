import { Card } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "AI Chat Interface",
    description: "Mobile application for conversational AI",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=1200&fit=crop",
  },
  {
    id: 2,
    title: "Banking Dashboard",
    description: "Enterprise financial management platform",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=1200&fit=crop",
  },
];

export function WorkGrid() {
  return (
    <section className="container px-6 lg:px-12 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group overflow-hidden border-0 bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden bg-background rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
