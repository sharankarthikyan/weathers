import { useAppSelector } from "@/store/hooks";
import {
  calculateDayAndNightTemperatures,
  getWeatherDescription,
} from "@/utils/common";

export default function CurrentConditions() {
  const locationData = useAppSelector((state) => state.location.locationData);
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  return (
    <div
      className="w-[90%] h-[20rem] bg-base-200 rounded-2xl box-border
    md:w-[90%] md:h-[30rem] md:bg-base-200 md:rounded-2xl md:box-border
    lg:w-[90%] lg:h-[30rem] lg:bg-base-200 lg:rounded-2xl lg:box-border"
    >
      <div
        className={`font-source-sans-pro text-primary-content h-[4rem] bg-primary flex items-center rounded-t-2xl border-[1rem] border-primary
      md:font-source-sans-pro md:text-primary-content md:h-[6rem] md:bg-primary md:flex md:items-center md:rounded-t-2xl md:border-[1rem] md:border-primary
      lg:font-source-sans-pro lg:text-primary-content lg:h-[6rem] lg:bg-primary lg:flex lg:items-center lg:rounded-t-2xl lg:border-[1rem] lg:border-primary`}
      >
        <span
          className="text-2xl font-extrabold capitalize
        md:text-4xl md:font-extrabold md:pl-8 md:capitalize
        lg:text-4xl lg:font-extrabold lg:pl-8 lg:capitalize"
        >
          {locationData?.city},{" "}
          {locationData?.principalSubdivision
            ? locationData?.principalSubdivision
            : locationData?.country}
        </span>
        {/* <span
                  className="text-2xl ml-2 font-light
        md:text-4xl md:ml-2 md:font-light
        lg:text-4xl lg:ml-2 lg:font-light"
                >
                  as of 20:22 IST
                </span> */}
      </div>
      <div
        className="flex px-[2rem] py-[1rem] justify-between
      md:flex md:px-[2rem] md:py-[2rem] md:justify-between
      lg:flex lg:px-[2rem] lg:py-[2rem] lg:justify-between"
      >
        <div className="flex flex-col justify-around">
          <div
            className="font-dela-gothic-one text-[5rem] text-base-content
          md:font-dela-gothic-one md:text-[7rem]
          lg:font-dela-gothic-one lg:text-[7rem]"
          >
            {parseInt(weatherData?.current?.temperature_2m)}°
          </div>
          <div
            className="font-dela-gothic-one text-[2rem] text-base-content
          md:font-dela-gothic-one md:text-[3rem]
          lg:font-dela-gothic-one lg:text-[3rem]"
          >
            {getWeatherDescription(weatherData?.current?.weather_code)}
          </div>
          <div
            className="font-dela-gothic-one text-[2rem] text-base-content
          md:font-dela-gothic-one md:text-[3rem]
          lg:font-dela-gothic-one lg:text-[3rem]"
          >
            {weatherData
              ? `Day ${parseInt(
                  calculateDayAndNightTemperatures(weatherData?.hourly)
                    ?.averageDayTemperature
                )}° • Night ${parseInt(
                  calculateDayAndNightTemperatures(weatherData?.hourly)
                    ?.averageNightTemperature
                )}°`
              : ""}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
