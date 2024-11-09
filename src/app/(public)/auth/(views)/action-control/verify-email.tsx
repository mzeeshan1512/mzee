"use client";
import React, { useState,useEffect } from "react";
import useAuth from "@/shared/firebase-services/useAuth";
import Button from "@/shared/components/button";
import ConditionalRenderer from "@/shared/components/conditional-renderer";

const VerifyEmail = () => {
  const {isProcessing,resendEmailLink} = useAuth()
  const [timeRemaining, setTimeRemaining] = useState(60);
  let countdown: any;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    countdown = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(countdown);
      } else {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seconds = timeRemaining % 60;

  if (seconds <= 0) {
    clearInterval(countdown);
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column pt-3">
      <span className="pt-2 mt-2 text-white">Your email is not verified,</span>
      <span className=" pt-2 mt-2  text-white">Verify to proceed further</span>
      <span className=" pt-2 mt-2  text-white">
        We have already sent you an email verification link
      </span>
      <span className="pt-2 mt-2  text-white">
        {"Didn't receive verification email"}
      </span>
      <div className="py-2 my-2">
        <Button
          className="button-class"
          disabled={timeRemaining > 0 || isProcessing}
          onClick={() => resendEmailLink()}
          loading={isProcessing}
        >
          <ConditionalRenderer
            condition={timeRemaining > 0}
            component={<>Resend Verification Email</>}
          >
            Try again in <span className="text-danger ms-1">{` ${seconds || 60}'s`}</span>
          </ConditionalRenderer>
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
