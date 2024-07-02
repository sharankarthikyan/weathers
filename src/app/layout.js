// app/layout.js

export const metadata = {
  title: "Babble Weathers",
  description: "A Weather forecast web application",
};

import "./globals.css";
import RootLayout from "@/components/RootLayout/RootLayout";

export default function Layout({ children }) {
  return <RootLayout>{children}</RootLayout>;
}
