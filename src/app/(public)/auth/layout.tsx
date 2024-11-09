import AuthLayout from "@/shared/layouts/auth-layout";
import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Authentication | Muhammad Zeeshan",
  description: process.env.NEXT_PUBLIC_AUTH_DETAILS,
};

const layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
