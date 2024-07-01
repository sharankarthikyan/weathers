"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
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
  }, []);

  return <main className=""></main>;
}
