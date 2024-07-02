"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeProvider";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPublicIpAddress } from "@/store/publicIPAddress/publicIPAddressState";
import axios from "axios";

export default function NavBar({ toggleInput }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useAppDispatch();
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

  function requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get(
              `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
            )
            .then((response) => {
              console.log(response.data);
            });
        },
        (error) => {
          axios.get("https://api.ipify.org?format=json").then((response) => {
            const data = response.data;
            axios.get(`http://ip-api.com/json/${data.ip}`).then((response) => {
              const data = response.data;
              axios
                .get(
                  `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
                )
                .then((response) => {
                  console.log(response.data);
                });
            });
          });
        }
      );
    } else {
      axios.get("https://api.ipify.org?format=json").then((response) => {
        const data = response.data;
        axios.get(`http://ip-api.com/json/${data.ip}`).then((response) => {
          const data = response.data;
          axios
            .get(
              `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
            )
            .then((response) => {
              console.log(response.data);
            });
        });
      });
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(useAppSelector((state) => state.publicIPAddress));

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition((position) => {
              axios
                .get(
                  `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
                )
                .then((response) => {
                  console.log(response.data);
                });
            });
          } else if (permissionStatus.state === "prompt") {
            requestLocation();
          } else if (permissionStatus.state === "denied") {
            axios.get("https://api.ipify.org?format=json").then((response) => {
              const data = response.data;
              axios
                .get(`http://ip-api.com/json/${data.ip}`)
                .then((response) => {
                  const data = response.data;
                  axios
                    .get(
                      `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
                    )
                    .then((response) => {
                      console.log(response.data);
                    });
                });
            });
          }
        });
    }
  }, [dispatch]);

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
        <div
          onClick={() => toggleInput(true)}
          className="flex justify-between btn btn-ghost"
        >
          <div className="flex items-center md:hidden lg:hidden">
            <LocationMarkerIcon width="15" height="15" />
          </div>
          <div
            className="hidden sm:hidden 
          md:flex md:items-center
          lg:flex lg:items-center"
          >
            <LocationMarkerIcon width="20" height="20" />
          </div>
          <div
            className="font-dela-gothic-one text-[1rem]
          md:text-[1.6rem]
          lg:text-[1.6rem]"
          >
            Chennai
          </div>
        </div>
      </div>
      <div className="w-[25%] justify-end"></div>
    </div>
  );
}
