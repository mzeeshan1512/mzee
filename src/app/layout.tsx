import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import LayoutThemeProvider from "@/shared/context/layout-theme-provider";
import "@/styles/global.scss";

export const metadata: Metadata = {
  title: "Muhammad Zeeshan",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <LayoutThemeProvider>
          {children}
        </LayoutThemeProvider>
    </html>
  );
}
