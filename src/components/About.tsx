import { Linkedin, Twitter } from "lucide-react";

export function About() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-medium mb-12 opacity-60">About</h2>
        
        <div className="space-y-6">
          <p className="text-black dark:text-white leading-relaxed">
            Driven by curiosity with a deep passion to design products that are meaningful and drive impact on human experiences. I have an approach of deeply understanding users' needs and designing products that deliver impact. I care about the craft, people, and leading with confidence.
          </p>
          
          <p className="text-black dark:text-white leading-relaxed">
            Based in the San Francisco Bay Area. I currently work as a Senior Product Designer at JPMorgan Chase, and previously at Citi Bank, where I designed end-to-end experiences for millions of users. Along with designing enterprise products, I have also worked with early-stage startups to design native and web apps.
          </p>
          
          <p className="text-black dark:text-white leading-relaxed">
            I hold a master's degree in User Experience Design and Interaction Design. While creating impactful products, I'm passionate about mentoring designers and have been recognized as a top 10 mentor on ADPList. I've published a book to help designers land jobs and created advanced courses in Figma and SwiftUI prototyping.
          </p>
          
          <p className="text-black dark:text-white leading-relaxed">
            I specialize in Design Strategy, UI Design, Interaction design, prototyping, and Design Systems.
          </p>
          
          <p className="text-black dark:text-white leading-relaxed">
            If you're interested in having a coffee chat, feel free to reach out.
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

