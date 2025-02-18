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
        className="w-[90%] bg-base-200 rounded-2xl box-border p-[1rem]
    md:w-[90%] md:bg-base-200 md:rounded-2xl md:box-border md:p-[1rem]
    lg:w-[90%] lg:bg-base-200 lg:rounded-2xl lg:box-border lg:p-[1rem]"
      >
        <div className="flex flex-col">
          <div
            className="font-source-sans-pro text-[1.4rem] font-extrabold text-base-content
            md:font-source-sans-pro md:text-[2.2rem] md:font-extrabold md:text-base-content
            lg:font-source-sans-pro lg:text-[2.2rem] lg:font-extrabold lg:text-base-content"
          >
            Weather Today in {locationData?.city},{" "}
            {locationData?.principalSubdivision
              ? locationData?.principalSubdivision
              : locationData?.country}
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
                  className="font-source-sans-pro text-[1.2rem] text-base-content
                  md:font-source-sans-pro md:text-[2rem] md:text-base-content
                  lg:font-source-sans-pro lg:text-[2rem] lg:text-base-content"
                >
                  Feels Like
                </div>
                <div
                  className="font-source-sans-pro text-[3.4rem] font-extrabold text-base-content leading-[2rem]
                  md:font-source-sans-pro md:text-[6rem] md:font-extrabold md:text-base-content md:leading-[4rem]
                  lg:font-source-sans-pro lg:text-[6rem] lg:font-extrabold lg:text-base-content lg:leading-[4rem]"
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
              <div></div>
            </div>
            <div
              className="flex flex-col w-[100%] justify-between text-base-content mt-8
              md:flex md:flex-col md:w-[100%] md:justify-between md:text-base-content md:mt-8
              lg:flex lg:flex-row lg:w-[100%] lg:justify-between lg:text-base-content lg:mt-8"
            >
              <div
                className="w-[100%] border border-x-0 border-t-0 border-b-neutral
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
              </div>
              <div
                className="w-[100%] mt-3 border border-x-0 border-t-0 border-b-neutral
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
                        <Image
                          src="/visibility.png"
                          width="18"
                          height="18"
                          alt="visibility"
                        />
                      ) : (
                        <Image
                          src="/visibility.png"
                          width="24"
                          height="24"
                          alt="visibility"
                        />
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
              </div>
            </div>
            <div
              className="flex flex-col w-[100%] justify-between text-base-content
              md:flex md:w-[100%] md:justify-between md:text-base-content 
              lg:flex lg:flex-row lg:w-[100%] lg:justify-between lg:text-base-content"
            >
              <div
                className="w-[100%] mt-3 border border-x-0 border-t-0 border-b-neutral
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
                        <Image
                          src="/dewpoint.png"
                          width="18"
                          height="18"
                          alt="dewpoint"
                        />
                      ) : (
                        <Image
                          src="/dewpoint.png"
                          width="28"
                          height="28"
                          alt="dewpoint"
                        />
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
              </div>
              <div
                className="w-[100%] mt-3 border border-x-0 border-t-0 border-b-neutral
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
              </div>
            </div>
            <div
              className="flex flex-col w-[100%] justify-between text-base-content 
              md:flex md:w-[100%] md:justify-between md:text-base-content
              lg:flex lg:flex-row lg:w-[100%] lg:justify-between lg:text-base-content"
            >
              <div
                className="w-[100%] mt-3 border border-x-0 border-t-0 border-b-neutral
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
                        <Image
                          src="/pressure.png"
                          width="18"
                          height="18"
                          alt="pressure"
                        />
                      ) : (
                        <Image
                          src="/pressure.png"
                          width="24"
                          height="24"
                          alt="pressure"
                        />
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
              </div>
              <div
                className="w-[100%] mt-3 border border-x-0 border-t-0 border-b-neutral
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
