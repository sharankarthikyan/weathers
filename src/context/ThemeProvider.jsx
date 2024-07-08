"use client";

import { createContext, useState } from "react";
import { ThemeProvider } from "next-themes";

export const ThemeContext = createContext();

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
