"use client";

import { useAppSelector } from "@/store/hooks";
import Weather from "@/components/weather/Weather";
import SkeletonCard from "@/components/skeletoncard/SkeletonCard";
import { tenDayWeatherForcast } from "@/utils/common";

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
    <div className="flex flex-1 items-center flex-col">
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
                cardTitle="10-Day Weather"
                location={`${locationData?.city}, ${
                  locationData?.principalSubdivision
                    ? locationData?.principalSubdivision
                    : locationData?.country
                }`}
                list={tenDayWeatherForcast(
                  weatherData?.daily?.time,
                  weatherData?.daily?.temperature_2m_max,
                  weatherData?.daily?.temperature_2m_min,
                  weatherData?.daily?.apparent_temperature_max,
                  weatherData?.daily?.weather_code,
                  weatherData?.daily?.precipitation_probability_max,
                  weatherData?.daily?.wind_speed_10m_max,
                  weatherData?.daily?.sunrise,
                  weatherData?.daily?.sunset,
                  weatherData?.daily?.uv_index_max,
                  weatherData?.daily?.wind_direction_10m_dominant
                )}
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
