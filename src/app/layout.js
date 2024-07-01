import { Inter } from "next/font/google";
import "./globals.css";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { ThemeProvider } from "@/context/ThemeProvider";
import NavBar from "@/components/navbar/NavBar";

import "@fontsource-variable/red-rose";
import "@fontsource/dela-gothic-one";
import "@fontsource/source-sans-pro";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Babble Weathers",
  description: "A Weather forecast web application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <NavBar />
            {children}
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
