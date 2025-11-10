import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-6">
          <a href="/" className="text-lg font-semibold hover:opacity-80 transition-opacity">
            Portfolio
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            asChild
          >
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            className="rounded-full"
            asChild
          >
            <a href="/blog">Blog</a>
          </Button>
          
          <Button
            variant="default"
            className="rounded-full gap-2"
            asChild
          >
            <a href="mailto:contact@example.com">
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
