// app/layout.js

export const metadata = {
  title: "Babble Weather",
  description: "A Weather forecast application",
};

import "./globals.css";
import RootLayout from "@/components/RootLayout/RootLayout";

export default function Layout({ children }) {
  return <RootLayout>{children}</RootLayout>;
}
