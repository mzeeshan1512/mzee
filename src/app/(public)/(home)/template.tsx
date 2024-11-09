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
          menuList: [
            {
              link: "1",
              title: "1"
            },
            {
              link: "2",
              title: "2"
            }
          ],
          staticScrollSpyPath: ["/"],
          showLogoAsRoute: {
            show: true,
            route: "home"
          },
          centeredMode: true,
          floatingMenu: true
        }
      }}
    >
      {children}
    </HorizontalLayout>
  );
}
