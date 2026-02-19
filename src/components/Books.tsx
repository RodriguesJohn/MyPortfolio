import { useRef } from "react";
import { useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function BookCard({ 
  title, 
  description, 
  link, 
  comingSoon = false
}: { 
  title: string; 
  description: string; 
  link: string;
  comingSoon?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <Card 
      ref={ref}
      className={`group overflow-visible border-[0.5px] border-border/30 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/60 hover:to-muted/40 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-border/20 dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-500 ${
        isInView ? 'blur-0' : 'blur-lg'
      }`}
    >
      <div className="p-4 sm:p-6 md:p-8 w-full flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="relative perspective-1000" style={{ transform: 'rotateY(-15deg)' }}>
            {/* Book Pages Stack - On the right side, tucked inside */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white dark:bg-gray-100 rounded-r-sm shadow-lg" style={{ transform: 'translateX(8px)', zIndex: 0 }} />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gray-50 dark:bg-gray-200 rounded-r-sm" style={{ transform: 'translateX(6px)', zIndex: 1 }} />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white dark:bg-gray-100 rounded-r-sm" style={{ transform: 'translateX(4px)', zIndex: 2 }} />
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-50 dark:bg-gray-200 rounded-r-sm" style={{ transform: 'translateX(2px)', zIndex: 3 }} />
            
            {/* Front Cover */}
            <div className="relative aspect-[3/4] w-32 sm:w-40 bg-black rounded-lg overflow-hidden" style={{ 
              transform: 'translateZ(0px)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)',
              zIndex: 10
            }}>
              <div className="p-3 sm:p-4 md:p-6 h-full flex flex-col justify-between text-white relative">
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-xs sm:text-lg md:text-xl font-medium leading-[1.1]">{title}</h2>
                </div>
              </div>
              {/* Book spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/40 to-transparent rounded-l-lg pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{title}</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 leading-tight text-sm sm:text-base opacity-60">
              {description}
            </p>
          </div>
          <div className="mt-auto">
            {comingSoon ? (
              <Button 
                className="rounded-full w-full" 
                size="lg"
                variant="default"
                disabled
              >
                Coming Soon
              </Button>
            ) : (
              <Button
                className="rounded-full w-full group/btn hover:gap-3 transition-all duration-300 text-white hover:scale-105 active:scale-95"
                size="lg"
                style={{
                  background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
                asChild
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get the Book
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function Books() {
  const books = [
    {
      id: 1,
      title: "Agentic Thinking Framework",
      description: "A comprehensive guide to agentic thinking and how to integrate AI and agentic workflows into the foundational layers of products.",
      link: "#",
      comingSoon: true
    },
    {
      id: 2,
      title: "Landing a Design Job with Confidence",
      description: "A 147-page book based on 7+ years of experience. Learn how to position yourself in interviews, negotiate 6-figure salaries, and use AI efficiently in your job search.",
      link: "https://johnrodrigues.gumroad.com/l/oqxhab",
      comingSoon: false
    },
    {
      id: 3,
      title: "AI Design Playbook",
      description: "Writing about AI & design for leaders. Sharing behind-the-scenes AI explorations, industry trends, guides, and resources.",
      link: "https://johnrodrigues.substack.com/",
      comingSoon: false
    }
  ];

  return (
    <section className="pt-4 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-foreground tracking-tight">
            Books
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground/60 max-w-2xl mx-auto">
            Here are some of the collections of books and guides that I have written that you can get today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              description={book.description}
              link={book.link}
              comingSoon={book.comingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

