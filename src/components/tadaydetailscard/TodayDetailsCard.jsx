import { useAppSelector } from "@/store/hooks";
import { WiHumidity, WiThermometer, WiWindy } from "weather-icons-react";

import Image from "next/image";
import { getCurrentHourApparentTemperature } from "@/utils/common";
import { useMediaQuery } from "react-responsive";

export default function TodayDetailsCard() {
  const locationData = useAppSelector((state) => state.location.locationData);
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const isSmallDisplay = useMediaQuery({ maxWidth: 640 });

  return (
    <>
      <div
        className="w-[90%] bg-white rounded-2xl box-border p-[1rem]
    md:w-[90%] md:bg-white md:rounded-2xl md:box-border md:p-[1rem]
    lg:w-[90%] lg:bg-white lg:rounded-2xl lg:box-border lg:p-[1rem]"
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
          <div
            className="flex flex-col w-[100%]
            md:flex md:flex-col md:w-[100%]
            lg:flex lg:flex-col lg:w-[100%]"
          >
            <div
              className="flex w-[100%] justify-between
              md:flex md:w-[100%] md:justify-between
              lg:flex lg:w-[100%] lg:justify-between"
            >
              <div
                className="flex flex-col pl-[1rem] pt-[.6rem]
                md:flex md:flex-col md:pl-[2rem] md:pt-[2rem]
                lg:flex lg:flex-col lg:pl-[2rem] lg:pt-[2rem]"
              >
                <div
                  className="font-source-sans-pro text-[1.2rem] text-gray-700
                  md:font-source-sans-pro md:text-[2rem] md:text-gray-700
                  lg:font-source-sans-pro lg:text-[2rem] lg:text-gray-700"
                >
                  Feels Like
                </div>
                <div
                  className="font-source-sans-pro text-[3.4rem] font-extrabold text-gray-700 leading-[2rem]
                  md:font-source-sans-pro md:text-[6rem] md:font-extrabold md:text-gray-700 md:leading-[4rem]
                  lg:font-source-sans-pro lg:text-[6rem] lg:font-extrabold lg:text-gray-700 lg:leading-[4rem]"
                >
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
            <div
              className="flex flex-col w-[100%] justify-between text-gray-700 mt-8
              md:flex md:flex-col md:w-[100%] md:justify-between md:text-gray-700 md:mt-8
              lg:flex lg:flex-row lg:w-[100%] lg:justify-between lg:text-gray-700 lg:mt-8"
            >
              <div
                className="w-[100%]
                md:w-[100%]
                lg:w-[45%]"
              >
                <div
                  className="flex w-[100%] items-center justify-between
                  md:flex md:items-center md:justify-between
                  lg:flex lg:items-center lg:justify-between"
                >
                  <div
                    className="flex items-center w-[50%]
                    md:flex md:items-center
                    lg:flex lg:items-center"
                  >
                    <div
                      className="w-[20%]
                      md:w-[20%]
                      lg:w-[20%]"
                    >
                      {isSmallDisplay ? (
                        <WiThermometer size={22} />
                      ) : (
                        <WiThermometer size={32} />
                      )}
                    </div>

                    <div
                      className="font-source-sans-pro flex justify-center text-[1.4rem]
                      md:font-source-sans-pro md:text-[1.8rem]
                      lg:font-source-sans-pro lg:text-[1.8rem]"
                    >
                      High/Low
                    </div>
                  </div>
                  <div
                    className="font-source-sans-pro text-[1.4rem]
                    md:font-source-sans-pro md:text-[1.8rem]
                    lg:font-source-sans-pro lg:text-[1.8rem]"
                  >
                    {parseInt(weatherData?.daily?.temperature_2m_max)}°/
                    {parseInt(weatherData?.daily?.temperature_2m_min)}°
                  </div>
                </div>
                <div className="border-[.1rem]"></div>
              </div>
              <div
                className="w-[100%] mt-3
                md:w-[100%]
                lg:w-[45%]"
              >
                <div
                  className="flex w-[100%] items-center justify-between
                  md:flex md:items-center md:justify-between
                  lg:flex lg:items-center lg:justify-between"
                >
                  <div
                    className="flex items-center w-[50%]
                    md:flex md:items-center
                    lg:flex lg:items-center"
                  >
                    <div
                      className="w-[20%]
                      md:w-[20%]
                      lg:w-[20%]"
                    >
                      {isSmallDisplay ? (
                        <Image src="/visibility.png" width="18" height="18" />
                      ) : (
                        <Image src="/visibility.png" width="24" height="24" />
                      )}
                    </div>

                    <div
                      className="font-source-sans-pro text-[1.4rem]
                      md:font-source-sans-pro md:text-[1.8rem]
                      lg:font-source-sans-pro lg:text-[1.8rem]"
                    >
                      Visibility
                    </div>
                  </div>
                  <div
                    className="font-source-sans-pro text-[1.4rem]
                    md:font-source-sans-pro md:text-[1.8rem]
                    lg:font-source-sans-pro lg:text-[1.8rem]"
                  >
                    {weatherData?.current?.visibility / 1000} km
                  </div>
                </div>
                <div className="border-[.1rem]"></div>
              </div>
            </div>
            <div
              className="flex flex-col w-[100%] justify-between text-gray-700
              md:flex md:w-[100%] md:justify-between md:text-gray-700 
              lg:flex lg:flex-row lg:w-[100%] lg:justify-between lg:text-gray-700"
            >
              <div
                className="w-[100%] mt-3
                md:w-[100%]
                lg:w-[45%]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center w-[50%]
                    md:flex md:items-center
                    lg:flex lg:items-center"
                  >
                    <div
                      className="w-[20%]
                      md:w-[20%]
                      lg:w-[20%]"
                    >
                      {isSmallDisplay ? (
                        <Image src="/dewpoint.png" width="18" height="18" />
                      ) : (
                        <Image src="/dewpoint.png" width="28" height="28" />
                      )}
                    </div>
                    <div
                      className="font-source-sans-pro text-[1.4rem]
                      md:font-source-sans-pro md:text-[1.8rem]
                      lg:font-source-sans-pro lg:text-[1.8rem]"
                    >
                      Dew Point
                    </div>
                  </div>
                  <div
                    className="font-source-sans-pro text-[1.4rem]
                    md:font-source-sans-pro md:text-[1.8rem]
                    lg:font-source-sans-pro lg:text-[1.8rem]"
                  >
                    {parseInt(weatherData?.current?.dew_point_2m)}°
                  </div>
                </div>
                <div className="border-[.1rem]"></div>
              </div>
              <div
                className="w-[100%] mt-3
                md:w-[100%]
                lg:w-[45%]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center w-[50%]
                    md:flex md:items-center
                    lg:flex lg:items-center"
                  >
                    <div
                      className="w-[20%]
                      md:w-[20%]
                      lg:w-[20%]"
                    >
                      {isSmallDisplay ? (
                        <WiWindy size={22} />
                      ) : (
                        <WiWindy size={32} />
                      )}
                    </div>
                    <div
                      className="font-source-sans-pro text-[1.4rem]
                      md:font-source-sans-pro md:text-[1.8rem]
                      lg:font-source-sans-pro lg:text-[1.8rem]"
                    >
                      Wind
                    </div>
                  </div>
                  <div
                    className="font-source-sans-pro text-[1.4rem]
                    md:font-source-sans-pro md:text-[1.8rem]
                    lg:font-source-sans-pro lg:text-[1.8rem]"
                  >
                    add {weatherData?.current?.wind_speed_10m} km/h
                  </div>
                </div>
                <div className="border-[.1rem]"></div>
              </div>
            </div>
            <div
              className="flex flex-col w-[100%] justify-between text-gray-700
              md:flex md:w-[100%] md:justify-between md:text-gray-700
              lg:flex lg:flex-row lg:w-[100%] lg:justify-between lg:text-gray-700"
            >
              <div
                className="w-[100%] mt-3
                md:w-[100%]
                lg:w-[45%]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center w-[50%]
                    md:flex md:items-center
                    lg:flex lg:items-center"
                  >
                    <div
                      className="w-[20%]
                      md:w-[20%]
                      lg:w-[20%]"
                    >
                      {isSmallDisplay ? (
                        <Image src="/pressure.png" width="18" height="18" />
                      ) : (
                        <Image src="/pressure.png" width="24" height="24" />
                      )}
                    </div>
                    <div
                      className="font-source-sans-pro text-[1.4rem]
                      md:font-source-sans-pro md:text-[1.8rem]
                      lg:font-source-sans-pro lg:text-[1.8rem]"
                    >
                      Pressure
                    </div>
                  </div>
                  <div
                    className="font-source-sans-pro text-[1.4rem]
                    md:font-source-sans-pro md:text-[1.8rem]
                    lg:font-source-sans-pro lg:text-[1.8rem]"
                  >
                    {weatherData?.current?.surface_pressure} mb
                  </div>
                </div>
                <div className="border-[.1rem]"></div>
              </div>
              <div
                className="w-[100%] mt-3
                md:w-[100%]
                lg:w-[45%]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center w-[50%]
                    md:flex md:items-center
                    lg:flex lg:items-center"
                  >
                    <div
                      className="w-[20%]
                      md:w-[20%]
                      lg:w-[20%]"
                    >
                      {isSmallDisplay ? (
                        <WiHumidity size={22} />
                      ) : (
                        <WiHumidity size={32} />
                      )}
                    </div>
                    <div
                      className="font-source-sans-pro text-[1.4rem]
                      md:font-source-sans-pro md:text-[1.8rem] 
                      lg:font-source-sans-pro lg:text-[1.8rem]"
                    >
                      Humidity
                    </div>
                  </div>
                  <div
                    className="font-source-sans-pro text-[1.4rem]
                    md:font-source-sans-pro md:text-[1.8rem]
                    lg:font-source-sans-pro lg:text-[1.8rem]"
                  >
                    {weatherData?.current?.relative_humidity_2m}%
                  </div>
                </div>
                <div className="border-[.1rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
