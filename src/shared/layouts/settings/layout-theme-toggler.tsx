"use client";
import React, { useContext, useEffect } from "react";
import { LayoutThemeContext } from "@/shared/context";
import { Moon,Sun,LayoutToggler as Layout_Toggler } from "@/shared/icons/theme";

const LayoutToggler = () => {
  const layoutThemeContext = useContext(LayoutThemeContext);
  const handleClick = () => {
    const type = layoutThemeContext?.layout?.layout === "horizontal" ? "VerticalLayout" : "HorizontalLayout";
    layoutThemeContext?.dispatchLayout({ type: type });
  };

  return (
    <div onClick={() => handleClick()}>
     <Layout_Toggler/>
    </div>
  );
};

const ThemeToggler = () => {
  const layoutThemeContext = useContext(LayoutThemeContext);
  const handleClick = () => {
    const type = layoutThemeContext?.themeState?.mode === "dark" ? "LightMode" : "DarkMode";
    layoutThemeContext?.dispatch({ type: type });
    sessionStorage.setItem("theme", type);
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window) {
      const mediaQuery = window?.matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery?.matches) {
        layoutThemeContext?.dispatch({ type: "DarkMode" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div onClick={() => handleClick()}>
      {layoutThemeContext?.themeState?.mode === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </div>
  );
};

export {
  LayoutToggler
}

export default ThemeToggler;
