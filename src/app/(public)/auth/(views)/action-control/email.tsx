"use client";
import React, { useEffect } from "react";
import useAuth from "@/shared/firebase-services/useAuth";
import ConditionalRenderer from "@/shared/components/conditional-renderer";

const EmailVerified = ({ emailCode }: { emailCode: string }) => {
  const { verifyEmail, isProcessing } = useAuth();

  useEffect(() => {
      verifyEmail(emailCode);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h3 className=" pt-5 mt-4">
        <ConditionalRenderer condition={isProcessing}>
            Verifying Email
        </ConditionalRenderer>
      </h3>
    </div>
  );
};

export default EmailVerified;
