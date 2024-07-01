"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [isMounted, setIsMounted] = useState(false);

  useState(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setTheme(storedTheme);
    }
  }, []);

  if (!isMounted) {
    return <>Loading...</>;
  }

  const changeTheme = (theme) => {
    setTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
