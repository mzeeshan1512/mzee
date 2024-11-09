import getMetaData from "@/shared/meta-data";

export const metadata = getMetaData({
  title: "Projects",
  description: ``,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
