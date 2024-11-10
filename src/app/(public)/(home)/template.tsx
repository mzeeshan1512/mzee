import { navLinks, sectionIds } from "@/shared/constants-enums/navigation-list";
import HorizontalLayout from "@/shared/layouts/horizontal-layout";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HorizontalLayout
      headerProps={{
        menuProps: {
          menuList: navLinks,
          staticScrollSpyPath: ["/"],
          showLogoAsRoute: {
            show: true,
            route: "home"
          }
        },
        centeredMode: true,
        floatingMenu: true,
        showStickyNavRoutesOrId: sectionIds.home,
        hideNavOnScroll: true
      }}
    >
      {children}
    </HorizontalLayout>
  );
}
