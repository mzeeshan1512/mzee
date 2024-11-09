"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
const EmailVerified = dynamic(() => import("./email"), { ssr: false });
const ResetPassword = dynamic(() => import("../forms/reset-password"), {
  ssr: false,
});

const ActionController = () => {
  const searchParams = useSearchParams();
  const mode = searchParams!.get("mode");

  return (
    <>
      <ConditionalRenderer condition={mode === "resetPassword"}>
        <ResetPassword passwordCode={searchParams!.get("oobCode")!} />
      </ConditionalRenderer>
      <ConditionalRenderer condition={mode === "verifyEmail"}>
        <EmailVerified emailCode={searchParams!.get("oobCode")!} />
      </ConditionalRenderer>
    </>
  );
};

export default ActionController;
