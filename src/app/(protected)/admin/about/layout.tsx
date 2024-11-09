import Menu from "@/shared/components/header/menu";
import { AdminAboutNavList } from "@/shared/constants/navigation-list";
import getMetaData from "@/shared/meta-data";

export const metadata = getMetaData(
  {
    title: "About",
    description: `Explore my professional portfolio featuring extensive experience, education, skills, courses, certifications, and training. Discover my journey, achievements, and personal insights.`,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu
        navMenuList={AdminAboutNavList}
        isExactPath
        menuClassName="theme-bg bottom-shadow br-top p-2 ms-0"
        listClass="flex-wrap"
      />
      <div className="p-3">{children}</div>
    </>
  );
}
