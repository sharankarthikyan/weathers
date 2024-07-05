import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { findTemperatureTrends } from "@/utils/common";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TodayWeatherCard() {
  const [temperatureTrends, setTemperatureTrends] = useState(null);
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
    console.log(weatherData);
    if (weatherData)
      setTemperatureTrends(
        findTemperatureTrends({
          time: weatherData?.hourly?.time,
          temperature_2m: weatherData?.hourly?.temperature_2m,
          precipitation_probability:
            weatherData?.hourly?.precipitation_probability,
        })
      );
  }, [isWeatherDataLoading]);

  const constructTemperatureTrends = (temperatureTrends) => {
    return Object.keys(temperatureTrends).map((key, i) => {
      return (
        <div key={key + i}>
          <div className="flex">
            <div
              className="font-source-sans-pro text-[1.6rem] text-gray-700 flex justify-center items-center capitalize w-[25%]
            md:font-source-sans-pro md:text-[2rem] md:text-gray-700 md:flex md:justify-center md:items-center md:capitalize md:w-[25%]
            lg:font-source-sans-pro lg:text-[2rem] lg:text-gray-700 lg:flex lg:justify-center lg:items-center lg:capitalize lg:w-[25%]"
            >
              <div>{key}</div>
            </div>
            <div
              className="font-source-sans-pro text-[3.2rem] text-gray-700 w-[25%] flex justify-center items-center
            md:font-source-sans-pro md:text-[3.6rem] md:text-gray-700 md:w-[25%] md:flex md:justify-center md:items-center
            lg:font-source-sans-pro lg:text-[4rem] lg:text-gray-700 lg:w-[25%] lg:flex lg:justify-center lg:items-center"
            >
              {parseInt(temperatureTrends[key].temperature)}°
            </div>
            <div
              className="w-[25%] flex justify-center items-center
            md:w-[25%] md:flex md:justify-center md:items-center
            lg:w-[25%] lg:flex lg:justify-center lg:items-center"
            >
              Image
            </div>
            <div
              className="font-source-sans-pro text-[2rem] text-gray-700 flex font-extrabold w-[25%] justify-center items-center
            md:font-source-sans-pro md:text-[2rem] md:text-gray-700 md:flex md:font-extrabold md:w-[25%] md:justify-center md:items-center
            lg:font-source-sans-pro lg:text-[2rem] lg:text-gray-700 lg:flex lg:font-extrabold lg:w-[25%] lg:justify-center lg:items-center"
            >
              <div>{parseInt(temperatureTrends[key].precipitation)}%</div>
            </div>
          </div>
          <div className="border-[.1rem]"></div>
        </div>
      );
    });
  };

  return (
    <>
      {isLocationDataLoading || isWeatherDataLoading ? (
        "Loading..."
      ) : (
        <div
          className="w-[90%] h-[30rem] bg-white rounded-2xl box-border p-[1rem]
    md:w-[90%] md:h-[32rem] md:bg-white md:rounded-2xl md:box-border md:p-[1rem]
    lg:w-[90%] lg:h-[35rem] lg:bg-white lg:rounded-2xl lg:box-border lg:p-[1rem]"
        >
          <div className="flex flex-col">
            <div
              className="font-source-sans-pro text-[1.4rem] font-extrabold text-gray-700
            md:font-source-sans-pro md:text-[2.2rem] md:font-extrabold md:text-gray-700
            lg:font-source-sans-pro lg:text-[2.2rem] lg:font-extrabold lg:text-gray-700"
            >
              Today's Forcast for {locationData?.city},{" "}
              {locationData?.principalSubdivision}
            </div>
            <div
              className="mt-2
            md:mt-2
            lg:mt-2"
            >
              <>
                {temperatureTrends
                  ? constructTemperatureTrends(temperatureTrends)
                  : ""}
                <div
                  className="mt-6
                  md:mt-4
                  lg:mt-4"
                >
                  <Link
                    href="/hourbyhour"
                    className="btn btn-secondary text-[.8rem]
                      md:btn md:btn-secondary md:text-[1rem]
                      lg:btn lg:btn-secondary lg:text-[1rem]"
                  >
                    Next 48 Hours
                  </Link>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
