/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import ErrorBoundary from "./error-boundary";
import { analytics, logEvent } from "../firebase/config";
import FallBackLayout from "./fall-back-layout";
import ParticleAnimation from "../components/particles-animation";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    if (analytics) logEvent(analytics, "page_view");
  }, [analytics]);

  return (
    <ErrorBoundary>
      <FallBackLayout customContent>
        <main className="relative h-full w-full inset-0 flex justify-center items-center">
          <div className="absolute inset-0 z-0">
            <ParticleAnimation />
          </div>
          {children}
        </main>
      </FallBackLayout>
    </ErrorBoundary>
  );
};

export default AppLayout;
