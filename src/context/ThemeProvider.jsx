"use client";

import { ThemeProvider } from "next-themes";

export const TProvider = ({ children }) => {
  return (
    <ThemeProvider
      storageKey="theme"
      defaultTheme="dark"
      attribute="data-theme"
    >
      {children}
    </ThemeProvider>
  );
};
