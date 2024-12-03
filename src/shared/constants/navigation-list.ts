import { adminRoutes, adminAboutPageRoutes } from "@/routes";

const sectionIDs: SectionIDS = {
  home: "home",
  about: "about",
  service: "service",
  stack: "stack",
  portfolio: "portfolio",
  contact: "contact",
};

const navLinks: HeaderMenuList[] = [
  {
    title: "Home",
    link: sectionIDs?.home,
  },
  {
    title: "About",
    link: sectionIDs?.about,
  },
  {
    title: "Services",
    link: sectionIDs.service,
  },
  {
    title: "Projects",
    link: sectionIDs.portfolio,
  },
  {
    title: "Contact",
    link: sectionIDs.contact,
  },
];

const AdminNavList: HeaderMenuList[] = [
 {
    title: "Dashboard",
    link: adminRoutes.dashboard,
  },
  {
    title: "About",
    link: adminRoutes.about,
  },
  {
    title: "Icons",
    link: adminRoutes.icons,
  }, 
  {
    title: "Projects",
    link: adminRoutes.projects,
  },
{
    title: "Services",
    link: adminRoutes.services,
  },
  {
    title: "Technologies",
    link: adminRoutes.technology,
  },
  {
    title: "Blogs",
    link: adminRoutes.blog,
  },
  {
    title: "Contact",
    link: adminRoutes.contact,
  },
  {
    title: "Logs",
    link: adminRoutes.logs,
  }
];

const AdminAboutNavList: HeaderMenuList[] = [
  {
    title: "Bio",
    link: adminRoutes.about,
  },
  {
    title: "Experience",
    link: adminAboutPageRoutes.experience,
  },
  // {
  //   title: "Skills",
  //   link: adminAboutPageRoutes.skills,
  // },
  {
    title: "Courses & Certifications",
    link: adminAboutPageRoutes.courses_certification,
  },
  {
    title: "Education",
    link: adminAboutPageRoutes.education,
  },
  {
    title: "Trainings",
    link: adminAboutPageRoutes.trainings,
  },
];

export { navLinks, sectionIDs, AdminNavList, AdminAboutNavList };
