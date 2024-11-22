"use client";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import ErrorBoundary from "./error-boundary";
import Offline from "./offline-view";
import { useNetwork } from "../hooks/use-network";
import MaintenanceMode from "./maintenance-mode";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { online } = useNetwork();
  React.useLayoutEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return online ? <MaintenanceMode /> : <Offline />;
  }
  return <ErrorBoundary>{online ? children : <Offline />}</ErrorBoundary>;
};

export default AppLayout;
