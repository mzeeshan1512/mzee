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
};

const navLinks: HeaderMenuList[] = [
  {
    link:sectionIds.home,
    title:"Home"
  },
  {
    link:sectionIds.about,
    title:"About"

  },
  {
    link:sectionIds.services,
    title:"Services",
    isStatic:true,
  },
   {
    link:sectionIds.tech,
    title:"Tech & Tools",
    isStatic:true,
  },
  {
    link:sectionIds.projects,
    title:"Projects"

  },
  {
    link:sectionIds.contact,
    title:"Contact Us",
    isStatic:true,
  },
];

const socialContact:SocialShareContent[] = [
  {
    title: "linkedin",
    icon: LinkedIn,
    link: process.env.NEXT_PUBLIC_LINKEDIN,
    color:"#0077b5"
  },
  {
    title: "github",
    icon: GitHub,
    link: process.env.NEXT_PUBLIC_GITHUB,
    color:"linear-gradient(to right, #ffbf00, #cc0c40)"
  },
  {
    title: "email",
    icon: Email,
    link: process.env.NEXT_PUBLIC_EMAIL,
     color:"linear-gradient(to right, #ffbf00, #cc0c40)"
  },
  {
    title: "whatsapp",
    icon: WhatsApp,
    link: process.env.NEXT_PUBLIC_WHATSAPP,
    color:"rgb(37, 211, 102)"
  },
]

export { navLinks, sectionIds, socialContact,cookiesName };
