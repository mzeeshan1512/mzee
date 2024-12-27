import { HeaderMenuList } from "@/shared/layouts/(components)/types";
import { Email, GitHub, LinkedIn, WhatsApp } from "@/shared/icon/social";
import { SocialShareContent } from "../components/social-share";

const cookiesName = {
  info: "_gm_tch",
  redirect:"redirect_uri"
};

const sectionIds = {
  home: "home",
  about: "about",
  services: "services",
  projects: "projects",
  contact: "contact",
  tech: "tech",
  reviews: "reviews"
};

const navLinks: HeaderMenuList[] = [
  {
    link: sectionIds.home,
    title: "Home"
  },
  {
    link: sectionIds.about,
    title: "About"
  },
  {
    link: sectionIds.services,
    title: "Services",
    isStatic: true
  },
  {
    link: sectionIds.tech,
    title: "Tech & Tools",
    isStatic: true
  },
  {
    link: sectionIds.projects,
    title: "Projects"
  },
  {
    link: sectionIds.reviews,
    title: "Stories",
    isStatic: true
  },
  {
    link: sectionIds.contact,
    title: "Contact Us",
    isStatic: true
  }
];

const socialContact: SocialShareContent[] = [
  {
    title: process.env.NEXT_PUBLIC_LINKEDIN,
    icon: LinkedIn,
    link: `https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN}`,
    color: "#0077b5",
    isTrusted: true
  },
  {
    title: process.env.NEXT_PUBLIC_GITHUB,
    icon: GitHub,
    link: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB}`,
    color: "linear-gradient(to right, #ffbf00, #cc0c40)",
    isPrimaryColorTitle: true,
    isTrusted: true
  },
  {
    title: process.env.NEXT_PUBLIC_EMAIL,
    icon: Email,
    link: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    color: "linear-gradient(to right, #ffbf00, #cc0c40)",
    isPrimaryColorTitle: true,
    isTrusted: true
  },
  {
    title: process.env.NEXT_PUBLIC_WHATSAPP,
    icon: WhatsApp,
    link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`,
    color: "rgb(37, 211, 102)",
    isTrusted: true
  }
];

export { navLinks, sectionIds, socialContact,cookiesName };
