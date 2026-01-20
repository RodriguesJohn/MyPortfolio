import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Linkedin, Mail, Briefcase, FolderOpen, GraduationCap, BookOpen, MessageSquare, Mic, User, Link as LinkIcon, Handshake, Menu, ChevronDown, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navItems = [
  { icon: Briefcase, label: "Home", value: "Work Highlights", path: "/" },
  { icon: GraduationCap, label: "Learn", href: "https://theaidesignacademy.com/" },
  { icon: FolderOpen, label: "Playbook", href: "https://johnrodrigues.substack.com/" },
  { icon: MessageSquare, label: "Testimonial", value: "Testimonials", path: "/testimonials" },
  { icon: Mic, label: "Speaking", value: "Speaking", path: "/speaking" },
];

// Accordion menu items
const accordionMenuItems = [
  { icon: Handshake, label: "One-to-one consulting", value: "Consulting", path: "/consulting" },
  { icon: BookOpen, label: "Blog", href: "https://johnrodrigues.substack.com/" },
  { icon: Book, label: "Books", value: "Books", path: "/books" },
  { icon: FolderOpen, label: "All Projects", value: "All Projects", path: "/all-projects" },
  { icon: LinkIcon, label: "Links", value: "Quick Links", path: "/links" },
  { icon: User, label: "About", value: "About", path: "/about" },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (value?: string) => {
    if (value) {
      onTabChange?.(value);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4">
      <header className="w-full max-w-7xl px-3 sm:px-4 lg:px-8 border rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm pointer-events-auto">
      <div className="flex h-16 sm:h-14 items-center justify-between w-full">
        <Link to="/" className="text-base sm:text-lg font-semibold hover:opacity-80 transition-opacity flex-shrink-0" style={{ fontFamily: '"Dancing Script", cursive' }}>
          John Rodrigues
        </Link>
        
        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.value || (item.path && location.pathname === item.path);
            
            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </a>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.path || "/"}
                onClick={() => onTabChange?.(item.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  isActive 
                    ? "text-foreground bg-muted/80" 
                    : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Accordion Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50",
                  "flex items-center gap-1 outline-none border-none bg-transparent"
                )}
              >
                More
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {accordionMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.value || (item.path && location.pathname === item.path);
                
                if (item.href) {
                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 cursor-pointer text-xs font-medium"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </a>
                    </DropdownMenuItem>
                  );
                }
                
                return (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link
                      to={item.path || "/"}
                      onClick={() => {
                        onTabChange?.(item.value);
                      }}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer text-xs font-medium",
                        isActive && "bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8"
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            
            <Button
              variant="ghost"
              className="rounded-full gap-2 h-8 text-xs"
              asChild
            >
              <a href="mailto:contact@example.com">
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Get in touch</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full h-8 w-8"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold" style={{ fontFamily: '"Dancing Script", cursive' }}>
                    John Rodrigues
                  </h2>
                </div>
                
                <nav className="flex-1 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.value || (item.path && location.pathname === item.path);
                    const Icon = item.icon;
                    
                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                            "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </a>
                      );
                    }
                    
                    return (
                      <Link
                        key={item.label}
                        to={item.path || "/"}
                        onClick={() => handleNavClick(item.value)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                          isActive 
                            ? "text-foreground bg-muted/80" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  {/* Accordion Menu Items in Mobile */}
                  {accordionMenuItems.map((item) => {
                    const isActive = activeTab === item.value || (item.path && location.pathname === item.path);
                    const Icon = item.icon;
                    
                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                            "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </a>
                      );
                    }
                    
                    return (
                      <Link
                        key={item.label}
                        to={item.path || "/"}
                        onClick={() => handleNavClick(item.value)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                          isActive 
                            ? "text-foreground bg-muted/80" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                
                <div className="flex flex-col gap-2 pt-6 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <a href="mailto:contact@example.com">
                      <Mail className="h-4 w-4" />
                      Get in touch
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    </div>
  );
}
