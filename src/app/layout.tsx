import type { Metadata } from "next";
import AppLayout from "@/shared/layouts/app-layout";
import { ThemeProvider } from "@/shared/theme/provider";
/* styles */
import "@/styles/globals.css";
import "@/styles/gradient-glass-morphic.css";
import "@/styles/hover-bottom-outline-effect.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_Name,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
