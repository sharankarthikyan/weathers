"use client";

import { Inter } from "next/font/google";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { ThemeProvider } from "@/context/ThemeProvider";

import "@fontsource-variable/red-rose";
import "@fontsource/dela-gothic-one";
import "@fontsource/source-sans-pro";
import NavBar from "@/components/navbar/NavBar";
import SecondBar from "@/components/secondbar/SecondBar";
import { useRef, useState } from "react";

import { makeStore } from "../../store/store";
import { Provider } from "react-redux";
import InputBar from "../inputbar/InputBar";

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <Provider store={storeRef.current}>
              <NavBar toggleInput={toggleInput} />
              {openInput ? <InputBar /> : ""}
              <SecondBar />
              {children}
            </Provider>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
