"use client";
import { useContext, useEffect, useReducer, useState } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./auth-provider";
import { layoutType } from "../config";
import { LayoutThemeContext } from ".";
import QueryProvider from "./query-provider";
import ErrorBoundary from "../components/error-boundary";
import { analytics, logEvent } from "../config/firebase";
import { useNetwork } from "../hooks/use-network";
import Offline from "../components/offline-view";

const themeReducer = (state: ThemeState, action: ThemeAction) => {
  switch (action.type) {
    case "LightMode":
      return { mode: "light" };
    case "DarkMode":
      return { mode: "dark" };
    default:
      return state;
  }
};

const layoutReducer = (state: LayoutState, action: LayoutAction) => {
  switch (action.type) {
    case "HorizontalLayout":
      return { layout: "horizontal" };
    case "VerticalLayout":
      return { layout: "vertical" };
    default:
      return state;
  }
};

const initialState: ThemeState = {
  mode: "dark",
};

const initialLayoutState: LayoutState = {
  layout: layoutType,
};

const LayoutTheme = ({ children }: { children: React.ReactNode }) => {
  const [themeState, dispatch] = useReducer<any>(themeReducer, initialState);
  const [layout, dispatchLayout] = useReducer<any>(
    layoutReducer,
    initialLayoutState
  );
  const [disabled, setISDisabled] = useState<boolean>(false);
  return (
    <LayoutThemeContext.Provider
      value={{
        themeState,
        dispatch,
        layout,
        dispatchLayout,
        disabled,
        setISDisabled,
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </LayoutThemeContext.Provider>
  );
};

const DarkLightThemeAndLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const layoutThemeContext = useContext(LayoutThemeContext);
  const { online } = useNetwork();

  useEffect(() => {
    if (analytics)
      logEvent(analytics, "page_view");
  }, [analytics]);

  return (
    <body
      className={`${layoutThemeContext?.themeState?.mode === "dark"
          ? "darkTheme"
          : "lightTheme"
        } my-bg-theme`}
    >
      <Toaster position="top-right" containerClassName="z-index" />
      {online ? children : <Offline />}
    </body>
  );
};

const LayoutThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ErrorBoundary>
        <LayoutTheme>
          <DarkLightThemeAndLayout>{children}</DarkLightThemeAndLayout>
        </LayoutTheme>
      </ErrorBoundary>
    </QueryProvider>
  );
};

export default LayoutThemeProvider;
