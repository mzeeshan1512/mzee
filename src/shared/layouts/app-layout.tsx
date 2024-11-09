import React from "react";
import ErrorBoundary from "./error/error-boundary";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default AppLayout;
