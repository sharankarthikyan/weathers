"use client";

import Link from "next/link";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeProvider";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLocationData } from "@/store/locationState";
import { fetchWeatherData } from "@/store/weatherState";

export default function NavBar({ toggleInput }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useAppDispatch();
  const isSmallDisplay = useMediaQuery({ maxWidth: 640 });
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const locationData = useAppSelector((state) => state.location.locationData);
  const isLocationDataLoading = useAppSelector(
    (state) => state.location.isLoading
  );
  const error = useAppSelector((state) => state.location.error);
  const { theme, changeTheme } = useContext(ThemeContext);
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const isWeatherDataLoading = useAppSelector(
    (state) => state.weather.isLoading
  );
  const errorInWeatherFetch = useAppSelector((state) => state.weather.error);

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
          dispatch(
            fetchLocationData({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
        },
        (error) => {
          dispatch(fetchLocationData({ latitude: null, longitude: null }));
        }
      );
    } else {
      dispatch(fetchLocationData({ latitude: null, longitude: null }));
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

  useEffect(() => {
    if (!isLocationDataLoading && locationData)
      dispatch(
        fetchWeatherData({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        })
      );
  }, [locationData, dispatch]);

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition((position) => {
              dispatch(
                fetchLocationData({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                })
              );
            });
          } else if (permissionStatus.state === "prompt") {
            requestLocation();
          } else if (permissionStatus.state === "denied") {
            dispatch(fetchLocationData({ latitude: null, longitude: null }));
          }
        });
    }
  }, []);

  return (
    <div className="navbar bg-base-200 sticky border-b border-neutral">
      <div className="w-[25%] justify-start">
        {/* <div className="dropdown">
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
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
        </div> */}
        <Link
          href="/"
          className="font-red-rose uppercase items-center
        btn btn-ghost text-xl hidden
        md:btn md:btn-ghost md:text-xl md:flex
        lg:btn lg:btn-ghost lg:text-3xl lg:flex"
        >
          <div>Babble weather</div>
        </Link>

        <Link
          href="/"
          className="font-red-rose uppercase 
        btn btn-ghost text-xl
        md:btn md:btn-ghost md:text-xl md:hidden
        lg:btn lg:btn-ghost lg:text-3xl lg:hidden"
        >
          BW
        </Link>
      </div>
      <div className="w-[50%] justify-center navbar-center">
        {isLocationDataLoading ? (
          <div
            className="skeleton w-[12rem] h-[3rem]
          md:w-[20rem] md:h-[3rem]
          lg:w-[20rem] lg:h-[3rem]"
          ></div>
        ) : (
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
              {locationData ? locationData.city : "Unknown"}
            </div>
          </div>
        )}
      </div>
      <div className="w-[25%] justify-end">
        <div className="dropdown dropdown-left dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-[1.2rem]
            md:btn md:btn-ghost md:text-[1.6rem]
            lg:btn lg:btn-ghost lg:text-[1.6rem]"
          >
            °C
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="" className="text-[1.2rem]">
                °C
              </Link>
            </li>
            <li>
              <Link href="" className="text-[1.2rem]">
                °F
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
