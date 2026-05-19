import type { CSSProperties } from "react";
import appleLogo from "@/assets/Apple-Logo.png";
import citiLogo from "@/assets/Citi.svg.png";
import chaseLogoLight from "@/assets/ChaseLightMOde.png";
import googleLogo from "@/assets/GoogleLogog.png";

export type Testimonial = {
  id: string;
  text: string;
  author: string;
  role: string;
  companyLogo?: string;
  logoStyle?: CSSProperties;
};

const chaseLogoStyle: CSSProperties = { filter: "brightness(1.85)" };

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "yariela-b",
    text: "Yay!!! Thank you John! You literally explained auto layout today so effortlessly. I understand it more now than ever before. I'm considering taking your course, so I can take my Figma skills up a notch.",
    author: "Yariela B",
    role: "UX Designer",
    companyLogo: googleLogo,
  },
  {
    id: "lucas-w",
    text: "Had an amazing chat with John. We exchanged some interesting resources and talked about the importance to understand the value of a designer.",
    author: "Lucas W",
    role: "Product Designer",
    companyLogo: appleLogo,
  },
  {
    id: "zachary-e",
    text: "John has shown tremendous value as a UX designer. This year, he has answered every challenge in taking on additional responsibility in project management, client relationship building and increased design ownership and delivery.",
    author: "Zachary E",
    role: "Creative Director, VP",
    companyLogo: citiLogo,
  },
  {
    id: "kristian-k",
    text: "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design works have significantly boosted visibility and impact across all product areas. His keen eye for UX heuristics and resourcefulness with new technologies are impressive.",
    author: "Kristian K",
    role: "Product Designer, VP",
    companyLogo: chaseLogoLight,
    logoStyle: chaseLogoStyle,
  },
  {
    id: "andrew-no-scroll",
    text: "Thank you for the great communication, collaboration and execution! Working with John has been a real pleasure. I really appreciated the clear process he brought from beginning to end. He was quick to respond, brought great design knowledge, and delivered high quality work. I always felt my input was heard and integrated. John helped transform No Scroll into a polished app. The new design makes No Scroll feel like a brand new app. I especially appreciated John's expertise in iOS app design. If you're considering working with John, don't hesitate. I'm very happy with the results, and I'd absolutely work with him again in the future!",
    author: "Andrew",
    role: "Founder of No Scroll App",
  },
  {
    id: "kristian-k-dcb",
    text: "His thoughtful ideas and entrepreneurship have enhanced our team's collaboration. His design works for DCB platform have significantly boosted visibility and impact across all product areas. His keen eye for UX heuristics and resourcefulness with new technologies are impressive.",
    author: "Kristian K",
    role: "Product Designer, VP",
    companyLogo: chaseLogoLight,
    logoStyle: chaseLogoStyle,
  },
  {
    id: "edward-p",
    text: "Collaborating with John was both easy and productive. John provided valuable insights into product development and user experience that truly enhanced our project to move to the next level. I highly recommend John.",
    author: "Edward Petkovicz",
    role: "faxion.ai",
  },
];
