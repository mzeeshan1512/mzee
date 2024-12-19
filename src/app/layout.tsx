import type { Metadata } from "next";
import AppLayout from "@/shared/layouts/app-layout";
import { ThemeProvider } from "@/shared/theme/provider";
import { ToastContainer } from "@/shared/components/toast";
/* styles */
import "@/styles/globals.css";
import "@/styles/gradient-glass-morphic.css";

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
        <ThemeProvider>
          <ToastContainer />
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
