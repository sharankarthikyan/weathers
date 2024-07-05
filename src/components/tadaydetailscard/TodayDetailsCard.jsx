import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWeatherData } from "@/store/weatherState";
import { useEffect } from "react";
import {
  WiHumidity,
  WiMoonAltWaningCrescent6,
  WiThermometer,
  WiWindy,
} from "weather-icons-react";

import Image from "next/image";
import { getCurrentHourApparentTemperature } from "@/utils/common";

export default function TodayDetailsCard() {
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
    if (!isLocationDataLoading && !isWeatherDataLoading && !weatherData)
      dispatch(
        fetchWeatherData({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        })
      );
  }, [isLocationDataLoading, isWeatherDataLoading]);

  return (
    <>
      {isLocationDataLoading || isWeatherDataLoading ? (
        "Loading..."
      ) : (
        <div
          className="w-[90%] h-[30rem] bg-white rounded-2xl box-border p-[1rem]
    md:w-[90%] md:h-[30rem] md:bg-white md:rounded-2xl md:box-border md:p-[1rem]
    lg:w-[90%] lg:h-[30rem] lg:bg-white lg:rounded-2xl lg:box-border lg:p-[1rem]"
        >
          <div className="flex flex-col">
            <div
              className="font-source-sans-pro text-[1.4rem] font-extrabold text-gray-700
            md:font-source-sans-pro md:text-[2.2rem] md:font-extrabold md:text-gray-700
            lg:font-source-sans-pro lg:text-[2.2rem] lg:font-extrabold lg:text-gray-700"
            >
              Weather Today in {locationData?.city},{" "}
              {locationData?.principalSubdivision}
            </div>
            <div className="flex flex-col w-[100%]">
              <div className="flex w-[100%] justify-between">
                <div className="flex flex-col pl-[2rem] pt-[2rem]">
                  <div className="font-source-sans-pro text-[2rem] text-gray-700">
                    Feels Like
                  </div>
                  <div className="font-source-sans-pro text-[6rem] font-extrabold text-gray-700 leading-[4rem]">
                    {weatherData
                      ? parseInt(
                          getCurrentHourApparentTemperature(
                            weatherData?.hourly?.time,
                            weatherData?.hourly?.apparent_temperature
                          )
                        ) + "°"
                      : ""}
                  </div>
                </div>
                <div>Hi</div>
              </div>
              <div className="flex w-[100%] justify-between text-gray-700 mt-8">
                <div className="w-[45%]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <WiThermometer size={32} />
                      <div className="font-source-sans-pro text-[1.8rem] ml-[2rem]">
                        High/Low
                      </div>
                    </div>
                    <div className="font-source-sans-pro text-[1.8rem]">
                      {parseInt(weatherData?.daily?.temperature_2m_max)}°/
                      {parseInt(weatherData?.daily?.temperature_2m_min)}°
                    </div>
                  </div>
                  <div className="border-[.1rem]"></div>
                </div>
                <div className="w-[45%]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image src="/visibility.png" width="24" height="24" />
                      <div className="font-source-sans-pro text-[1.8rem] ml-[2rem]">
                        Visibility
                      </div>
                    </div>
                    <div className="font-source-sans-pro text-[1.8rem]">
                      {weatherData?.current?.visibility / 1000} km
                    </div>
                  </div>
                  <div className="border-[.1rem]"></div>
                </div>
              </div>
              <div className="flex w-[100%] justify-between text-gray-700 mt-8">
                <div className="w-[45%]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image src="/dewpoint.png" width="28" height="28" />
                      <div className="font-source-sans-pro text-[1.8rem] ml-[2rem]">
                        Dew Point
                      </div>
                    </div>
                    <div className="font-source-sans-pro text-[1.8rem]">
                      {parseInt(weatherData?.current?.dew_point_2m)}°
                    </div>
                  </div>
                  <div className="border-[.1rem]"></div>
                </div>
                <div className="w-[45%]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <WiWindy size={32} />
                      <div className="font-source-sans-pro text-[1.8rem] ml-[2rem]">
                        Wind
                      </div>
                    </div>
                    <div className="font-source-sans-pro text-[1.8rem]">
                      add {weatherData?.current?.wind_speed_10m} km/h
                    </div>
                  </div>
                  <div className="border-[.1rem]"></div>
                </div>
              </div>
              <div className="flex w-[100%] justify-between text-gray-700 mt-8">
                <div className="w-[45%]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image src="/pressure.png" width="24" height="24" />
                      <div className="font-source-sans-pro text-[1.8rem] ml-[2rem]">
                        Pressure
                      </div>
                    </div>
                    <div className="font-source-sans-pro text-[1.8rem]">
                      {weatherData?.current?.surface_pressure} mb
                    </div>
                  </div>
                  <div className="border-[.1rem]"></div>
                </div>
                <div className="w-[45%]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <WiHumidity size={32} />
                      <div className="font-source-sans-pro text-[1.8rem] ml-[2rem]">
                        Humidity
                      </div>
                    </div>
                    <div className="font-source-sans-pro text-[1.8rem]">
                      {weatherData?.current?.relative_humidity_2m}%
                    </div>
                  </div>
                  <div className="border-[.1rem]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
