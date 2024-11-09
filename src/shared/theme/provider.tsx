"use client";
import React from "react";

enum themeMode {
  Dark = "dark",
  Light = "light"
}

type theme = "light" | "dark";

interface ThemeContextProps {
  theme: theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

const useTheme = (): ThemeContextProps => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<theme>(themeMode.Dark);

  React.useEffect(() => {
    const systemTheme = window?.matchMedia(
      `(prefers-color-scheme: ${themeMode.Dark})`
    ).matches
      ? themeMode.Dark
      : themeMode.Light;
    const savedTheme = (localStorage.getItem("theme") as theme) || systemTheme;
    setTheme(savedTheme);
    document?.documentElement?.classList.toggle(
      themeMode.Dark,
      savedTheme === themeMode.Dark
    );
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === themeMode.Dark ? themeMode.Light : themeMode.Dark;
    document?.documentElement?.classList?.toggle(
      themeMode.Dark,
      newTheme === themeMode.Dark
    );
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === themeMode.Dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme, themeMode };

export type { theme, ThemeContextProps };
