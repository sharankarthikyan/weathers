"use client";
import { useEffect, useState } from "react";

import CurrentConditions from "@/components/currentconditions/CurrentConditions";
import ForcastCard from "@/components/forcastcard/ForcastCard";
import TodayDetailsCard from "@/components/tadaydetailscard/TodayDetailsCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  findFiveDaysForcast,
  findFiveHrForcast,
  findTemperatureTrends,
} from "@/utils/common";
import SkeletonCard from "@/components/skeletoncard/SkeletonCard";

export default function Home() {
  const [temperatureTrends, setTemperatureTrends] = useState([]);
  const [fiveHrForcast, setFiveHrForcast] = useState([]);
  const [fiveDaysForcast, setFiveDaysForcast] = useState([]);

  const dispatch = useAppDispatch();
  const locationData = useAppSelector((state) => state.location.locationData);
  const isLocationDataLoading = useAppSelector(
    (state) => state.location.isLoading
  );

  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const isWeatherDataLoading = useAppSelector(
    (state) => state.weather.isLoading
  );
  const errorInWeatherFetch = useAppSelector((state) => state.weather.error);

  useEffect(() => {
    if (weatherData) {
      setTemperatureTrends(
        findTemperatureTrends(
          weatherData?.hourly?.time,
          weatherData?.hourly?.temperature_2m,
          weatherData?.hourly?.precipitation_probability
        )
      );
      setFiveHrForcast(
        findFiveHrForcast(
          weatherData?.hourly?.time,
          weatherData?.hourly?.temperature_2m,
          weatherData?.hourly?.precipitation_probability
        )
      );

      setFiveDaysForcast(
        findFiveDaysForcast(
          weatherData?.daily?.time,
          weatherData?.daily?.temperature_2m_min,
          weatherData?.daily?.temperature_2m_max,
          weatherData?.daily?.precipitation_probability_max
        )
      );
    }
  }, [isWeatherDataLoading]);

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
          <CurrentConditions />
        )}
      </div>
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        {isLocationDataLoading || isWeatherDataLoading ? (
          <SkeletonCard />
        ) : (
          <ForcastCard
            cardTitle={`Today's Forcast for ${locationData?.city}, ${locationData?.principalSubdivision}`}
            list={temperatureTrends}
            btnLink="/hourbyhour"
            nextLink="Next 48 hours"
          />
        )}
      </div>
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        {isLocationDataLoading || isWeatherDataLoading ? (
          <SkeletonCard />
        ) : (
          <TodayDetailsCard />
        )}
      </div>
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        {isLocationDataLoading || isWeatherDataLoading ? (
          <SkeletonCard />
        ) : (
          <ForcastCard
            cardTitle={`Hourly Forecast`}
            list={fiveHrForcast}
            btnLink="/hourbyhour"
            nextLink="Next 48 hours"
          />
        )}
      </div>
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        {isLocationDataLoading || isWeatherDataLoading ? (
          <SkeletonCard />
        ) : (
          <ForcastCard
            cardTitle={`Daily Forecast`}
            list={fiveDaysForcast}
            nextLink="Next 10 days"
            btnLink="/daily"
            isDaily={true}
          />
        )}
      </div>
    </div>
  );
}
