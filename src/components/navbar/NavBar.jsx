"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeProvider";
import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isSmallDisplay = useMediaQuery({ maxWidth: 640 });
  const isMediumDisplay = useMediaQuery({ maxWidth: 768 });
  const isLargeDisplay = useMediaQuery({ maxWidth: 1024 });
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const { theme, changeTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    if (isSmallDisplay) {
      setMenuPosition({ x: rect.left - 40, y: rect.bottom + 2 });
    } else {
      setMenuPosition({ x: rect.left - 80, y: rect.bottom - 20 });
    }
    toggleMenu();
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    changeTheme(newTheme);
  };

  const handleMenuSelect = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 sticky border-b border-[#ffffff3f]">
      <div className="w-[25%] justify-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="font-red-rose uppercase
        btn btn-ghost text-xl
        md:btn md:btn-ghost md:text-xl
        lg:btn lg:btn-ghost lg:text-3xl"
        >
          Babble weathers
        </Link>
      </div>
      <div className="w-[50%] justify-center navbar-center">
        <div className="flex justify-between btn btn-ghost">
          <div className="flex items-center">
            <LocationMarkerIcon width="20" height="20" />
          </div>
          <div className="font-dela-gothic-one text-[1.6rem]">Chennai</div>
        </div>
      </div>
      <div className="w-[25%] justify-end"></div>
    </div>
  );
}
