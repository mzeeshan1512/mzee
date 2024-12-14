/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button, { BlendMode } from "@/shared/components/button";
import FallBackLayout from "@/shared/layouts/fall-back-layout";
import { getValidSessionItem, removeSessionItem } from "@/shared/utils/common";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const OutBoundRedirectController = () => {
  const [url, setUrl] = React.useState<string | null>("");
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const handleOpenInNewTab = () => {
    navigate.back();
    return window?.open(url!, "_blank");
  };
  const errorMessage = React.useMemo(() => {
    if (searchParams?.get("message")) {
      const session = getValidSessionItem("url", true);
      if (session) {
        setUrl(session);
        return `${searchParams.get("message")} ${session}`;
      }
      return null;
    }
    return null;
  }, [searchParams?.get("message")]);

  if (!errorMessage) {
    navigate.replace("/");
  }

  return (
    <FallBackLayout code="OOPS" message={errorMessage || ""}>
      <div className="flex justify-center gap-2">
        <Button
          variant="primary"
          blendMode={BlendMode.GRADIENT}
          onClick={() => handleOpenInNewTab()}
          style={{ color: "white" }}
        >
          Proceed
        </Button>
        <Button
          variant="danger"
          blendMode={BlendMode.GRADIENT}
          onClick={() => {
            removeSessionItem("url");
            navigate.back();
          }}
          style={{ color: "white" }}
        >
          Go Back
        </Button>
      </div>
    </FallBackLayout>
  );
};

export default OutBoundRedirectController;
