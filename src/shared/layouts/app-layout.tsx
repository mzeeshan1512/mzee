"use client";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import ErrorBoundary from "./error/error-boundary";
import Offline from "./offline-view";
import { useNetwork } from "../hooks/use-network";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { online } = useNetwork();
  React.useLayoutEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  return <ErrorBoundary>{online ? children : <Offline />}</ErrorBoundary>;
};

export default AppLayout;
