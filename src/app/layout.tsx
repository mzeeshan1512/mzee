import type { Metadata } from "next";
import AppLayout from "@/shared/layouts/app-layout";
/* styles */
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_Name,
  description: process.env.NEXT_PUBLIC_APP_Name
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
