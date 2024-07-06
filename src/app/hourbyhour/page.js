"use client";

import { useAppSelector } from "@/store/hooks";
import Weather from "@/components/weather/Weather";
import SkeletonCard from "@/components/skeletoncard/SkeletonCard";
import { hourlyWeatherForcast } from "@/utils/common";

export default function Home() {
  const locationData = useAppSelector((state) => state.location.locationData);
  const isLocationDataLoading = useAppSelector(
    (state) => state.location.isLoading
  );

  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const isWeatherDataLoading = useAppSelector(
    (state) => state.weather.isLoading
  );
  const errorInWeatherFetch = useAppSelector((state) => state.weather.error);

  return (
    <div className="flex items-center flex-col">
      <div
        className="mt-4 w-[90%] flex justify-center
  md:mt-4 md:w-[60%] md:flex md:justify-center
  lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        {isLocationDataLoading || isWeatherDataLoading ? (
          <SkeletonCard />
        ) : (
          <>
            {weatherData ? (
              <Weather
                cardTitle="Hourly Weather"
                location={`${locationData?.city}, ${locationData?.principalSubdivision}`}
                list={hourlyWeatherForcast(
                  weatherData?.hourly?.time,
                  weatherData?.hourly?.temperature_2m,
                  weatherData?.hourly?.apparent_temperature,
                  weatherData?.hourly?.weather_code,
                  weatherData?.hourly?.precipitation_probability,
                  weatherData?.hourly?.wind_speed_10m,
                  weatherData?.hourly?.relative_humidity_2m
                )}
                btnLink="/tenday"
                btnText="10-Day weather"
              />
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
