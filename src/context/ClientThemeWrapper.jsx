"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ClientThemeWrapper({ children }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <div data-theme={resolvedTheme}>{children}</div>;
}
