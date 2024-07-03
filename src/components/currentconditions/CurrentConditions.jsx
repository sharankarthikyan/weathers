import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWeatherData } from "@/store/weatherState";
import {
  calculateDayAndNightTemperatures,
  getWeatherDescription,
} from "@/utils/common";

export default function CurrentConditions() {
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
    if (!isLocationDataLoading)
      dispatch(
        fetchWeatherData({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        })
      );
  }, [isLocationDataLoading]);

  return (
    <>
      {isLocationDataLoading ? (
        ""
      ) : (
        <div
          className="w-[90%] h-[20rem] bg-white rounded-2xl box-border
    md:w-[90%] md:h-[30rem] md:bg-white md:rounded-2xl md:box-border
    lg:w-[90%] lg:h-[30rem] lg:bg-white lg:rounded-2xl lg:box-border"
        >
          {isWeatherDataLoading ? (
            "Loading..."
          ) : (
            <div>
              <div
                className="font-source-sans-pro text-[#fff] h-[4rem] bg-gray-700 flex items-center rounded-t-2xl border-[1rem] border-gray-700
      md:font-source-sans-pro md:text-[#fff] md:h-[6rem] md:bg-gray-700 md:flex md:items-center md:rounded-t-2xl md:border-[1rem] md:border-gray-700
      lg:font-source-sans-pro lg:text-[#fff] lg:h-[6rem] lg:bg-gray-700 lg:flex lg:items-center lg:rounded-t-2xl lg:border-[1rem] lg:border-gray-700"
              >
                <b
                  className="text-3xl font-extrabold pl-8 capitalize
        md:text-4xl md:font-extrabold md:pl-8 md:capitalize
        lg:text-4xl lg:font-extrabold lg:pl-8 lg:capitalize"
                >
                  {locationData?.city}, {locationData?.principalSubdivision}
                </b>
                <div
                  className="text-3xl ml-2 font-light
        md:text-4xl md:ml-2 md:font-light
        lg:text-4xl lg:ml-2 lg:font-light"
                >
                  As of 20:22 IST
                </div>
              </div>
              <div
                className="flex px-[2rem] py-[1rem] justify-between
      md:flex md:px-[2rem] md:py-[2rem] md:justify-between
      lg:flex lg:px-[2rem] lg:py-[2rem] lg:justify-between"
              >
                <div className="flex flex-col justify-around">
                  <div
                    className="font-dela-gothic-one text-[5rem]
          md:font-dela-gothic-one md:text-[7rem]
          lg:font-dela-gothic-one lg:text-[7rem]"
                  >
                    {parseInt(weatherData?.current_weather?.temperature)}
                    {weatherData?.current_weather_units?.temperature}
                  </div>
                  <div
                    className="font-dela-gothic-one text-[2rem]
          md:font-dela-gothic-one md:text-[3rem]
          lg:font-dela-gothic-one lg:text-[3rem]"
                  >
                    {getWeatherDescription(
                      weatherData?.current_weather?.weathercode
                    )}
                  </div>
                  <div
                    className="font-dela-gothic-one text-[2rem]
          md:font-dela-gothic-one md:text-[3rem]
          lg:font-dela-gothic-one lg:text-[3rem]"
                  >
                    {weatherData
                      ? `Day ${parseInt(
                          calculateDayAndNightTemperatures(weatherData?.hourly)
                            ?.averageDayTemperature
                        )}${
                          weatherData?.current_weather_units?.temperature
                        } • Night ${parseInt(
                          calculateDayAndNightTemperatures(weatherData?.hourly)
                            ?.averageNightTemperature
                        )}${weatherData?.current_weather_units?.temperature}`
                      : ""}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
