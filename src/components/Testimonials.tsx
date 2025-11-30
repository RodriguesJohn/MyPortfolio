import googleLogo from "@/assets/GoogleLogog.png";
import appleLogo from "@/assets/Apple-Logo.png";
import citiLogo from "@/assets/Citi.svg.png";
import chaseLogoLight from "@/assets/ChaseLightMOde.png";

export function Testimonials() {
  const testimonials = [
    {
      id: 0,
      text: "Yay!!! Thank you John! You literally explained auto layout today so effortlessly. I understand it more now than ever before. I'm considering taking your course, so I can take my Figma skills up a notch.",
      author: "Yariela B",
      role: "UX Designer",
      companyLogo: googleLogo,
    },
    {
      id: 1,
      text: "Had an amazing chat with John 😊 We exchanged some interesting resources and talked about the importance to understand the value of a designer.",
      author: "Lucas W",
      role: "Product Designer",
      companyLogo: appleLogo,
    },
    {
      id: 2,
      text: "John has shown tremendous value as a UX designer. This year, he has answered every challenge in taking on additional responsibility in project management, client relationship building and increased design ownership and delivery.",
      author: "Zachary E",
      role: "Creative Director, VP",
      companyLogo: citiLogo,
    },
    {
      id: 3,
      text: "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design works have significantly boosted visibility and impact across all product areas. His keen eye for UX heuristics and resourcefulness with new technologies are impressive.",
      author: "Kristian K",
      role: "Product Designer, VP",
      companyLogo: chaseLogoLight,
    },
    {
      id: 4,
      text: "Thank you for the great communication, collaboration and execution! Working with John has been a real pleasure. I really appreciated the clear process he brought from beginning to end. He was quick to respond, brought great design knowledge, and delivered high quality work. I always felt my input was heard and integrated. John helped transform No Scroll into a polished app. The new design makes No Scroll feel like a brand new app. I especially appreciated John's expertise in iOS app design. If you're considering working with John, don't hesitate. I'm very happy with the results, and I'd absolutely work with him again in the future!",
      author: "Andrew",
      role: "Founder of No Scroll App",
    },
    {
      id: 5,
      text: "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design works for DCB platform have significantly boosted visibility and impact across all product areas. His keen eye for UX heuristics and resourcefulness with new technologies are impressive.",
      author: "Kristian K",
      role: "Product Designer, VP",
      companyLogo: chaseLogoLight,
    },
    {
      id: 6,
      text: "Collaborating with John was both easy and productive. John provided valuable insights into product development and user experience that truly enhanced our project to move to the next level. I highly recommend John.",
      author: "Edward Petkovicz",
      role: "faxion.ai",
    },
  ];

  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <h2 className="text-2xl font-semibold mb-8 text-foreground">What clients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900/50 rounded-lg p-6 border-[0.5px] border-border/30 dark:border-border/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <p className="text-base leading-relaxed mb-4 text-muted-foreground/80">
                "{testimonial.text}"
              </p>
              <div className="pt-4 border-t border-border/30">
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">{testimonial.role}</p>
                {testimonial.companyLogo && (
                  <div className="mt-4 flex items-center">
                    <img 
                      src={testimonial.companyLogo} 
                      alt="Company logo" 
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

