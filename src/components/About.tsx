import { Linkedin, Twitter } from "lucide-react";

export function About() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-medium mb-12 opacity-60">About Me</h2>
        
        <div className="space-y-6">
          <p className="text-black dark:text-white leading-relaxed">
            I'm a product designer and design engineer who specializes in AI-native products, and I've worked across the full spectrum, from founding designer at early-stage startups to shipping AI tools at JPMorgan's innovation division.
          </p>

          <p className="text-black dark:text-white leading-relaxed">
            On the startup side: I co-designed Outfix AI, an AI-powered fashion app, working directly with a solo ML engineer from zero to one. I redesigned the No Scroll app, which hit 50,000 downloads post-launch. I was the sole founding designer at Toca Football, shipping both mobile and web in under six months. And I worked embedded with the CEO at PAM to redesign their core product.
          </p>

          <p className="text-black dark:text-white leading-relaxed">
            On the enterprise side: at JPMorgan, I've been designing a digital commercial banking platform built for AI-era startups, and contributed to an internal AI data visualization tool currently under patent review. Before that at Citi, I led consumer AI integrations and redesigned the balance transfer experience across mobile and web for 20 million users.
          </p>

          <p className="text-black dark:text-white leading-relaxed">
            I also write the AI Design Playbook, a Substack read by 2,500+ designers and leaders from Apple, Google, Adobe, and Stanford. I hold a master's in UX and Interaction Design and a bachelor's in Engineering, which is why I sit comfortably at the boundary of design and code.
          </p>

          <p className="text-black dark:text-white leading-relaxed">
            I work in Cursor and Claude Code, and I've won a hackathon hosted by OpenAI and AGI Inc for prototyping a UX Agent.
          </p>

          <p className="text-black dark:text-white leading-relaxed">
            If you're building something ambitious and need a designer who can move fast and think in systems, let's talk.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://www.linkedin.com/in/john-rodrigues4/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077B5] hover:text-[#005885] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/john_rodrigues_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:opacity-80 transition-opacity"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.threads.com/@johnrodriguesb?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Threads"
            >
              <img
                src="https://cdn.inspireuplift.com/uploads/images/seller_products/1688676356_Untitled-1.png"
                alt="Threads"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://johnrodrigues.substack.com/?utm_campaign=profile_chips"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6719] hover:text-[#E55A0F] transition-colors"
              aria-label="Substack"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

