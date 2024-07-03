"use client";

import CurrentConditions from "@/components/currentconditions/CurrentConditions";
import TodayWeatherCard from "@/components/todayweathercard/TodayWeatherCard";

export default function Home() {
  return (
    <div className="flex items-center flex-col">
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        <CurrentConditions />
      </div>
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        <TodayWeatherCard />
      </div>
    </div>
  );
}
