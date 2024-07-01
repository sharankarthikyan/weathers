"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ClientThemeWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return <div data-theme={theme}>{children}</div>;
}
