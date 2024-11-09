import type { Metadata } from "next";
import dynamic from "next/dynamic";
import VerticalLayout from "@/shared/layouts/vertical-layout";
import { AdminNavList } from "@/shared/constants/navigation-list";
import { adminRoutes } from "@/routes";
const HeaderCallback = dynamic(()=>import("./(components)/header-call-back"),{ssr:false});

export const metadata: Metadata = {
  title: "Admin | Muhammad Zeeshan",
  description: `The Admin Panel is a comprehensive tool designed for organizations to manage CRUD (Create, Read, Update, Delete) operations efficiently. It supports role-based access control, ensuring that users can only perform actions permitted by their specific roles, thereby enhancing security and streamlining administrative tasks.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VerticalLayout
      navMenuList={AdminNavList}
      excludeSettingsList={["layout-toggler", "whatsapp"]}
      baseUrl={adminRoutes?.dashboard}
      callBackHeaderComponent={<HeaderCallback/>}>
      <section className="card shadow h-full height-100vh-n-rem">{children}</section>
    </VerticalLayout>
  );
}
