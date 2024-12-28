/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import ErrorBoundary from "./error-boundary";
import { analytics, logEvent } from "../firebase/config";
import { saveVisit } from "../firebase/use-visit";
import { ToastContainer } from "../components/toast";

const MaintenanceMode = dynamic(() => import("./maintenance-mode"), {
  ssr: false
});

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  React.useEffect(() => {
    if (analytics) logEvent(analytics, "page_view");
    saveVisit();
  }, [analytics]);

  return (
    <ErrorBoundary>
      <ToastContainer />
      {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true" ? (
        <MaintenanceMode />
      ) : (
        children
      )}
    </ErrorBoundary>
  );
};

export default AppLayout;
