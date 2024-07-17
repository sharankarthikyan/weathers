"use client";

import { Inter } from "next/font/google";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { TProvider } from "@/context/ThemeProvider";
import "@theme-toggles/react/css/Classic.css";

import "@fontsource-variable/red-rose";
import "@fontsource/dela-gothic-one";
import "@fontsource/source-sans-pro";
import NavBar from "@/components/navbar/NavBar";
import SecondBar from "@/components/secondbar/SecondBar";
import { useRef, useState } from "react";

import { makeStore } from "../../store/store";
import { Provider } from "react-redux";
import InputBar from "../inputbar/InputBar";
import Footer from "../footer/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [openInput, setOpenInput] = useState(false);

  const toggleInput = () => {
    setOpenInput(!openInput);
  };

  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <TProvider>
          <ClientThemeWrapper>
            <Provider store={storeRef.current}>
              <NavBar toggleInput={toggleInput} />
              {openInput ? <InputBar setOpenInput={setOpenInput} /> : ""}
              <SecondBar openInput={openInput} />
              {children}
              <Footer />
            </Provider>
          </ClientThemeWrapper>
        </TProvider>
      </body>
    </html>
  );
}
