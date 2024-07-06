import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { WiHumidity, WiThermometer, WiWindy } from "weather-icons-react";

export default function WeatherListItem({
  dayOrTime,
  temp,
  weather,
  precipitation,
  wind,
  subObj,
  isHourly,
}) {
  const isSmallDisplay = useMediaQuery({ maxWidth: 640 });

  const constuctHourlySubItem = (feelsLike, wind, humidity) => {
    return (
      <div
        className="grid grid-cols-3 border w-[90%] p-[1rem] rounded-md border-neutral
      md:grid md:grid-cols-3 md:border md:w-[90%] md:p-[1rem] md:rounded-md md:border-neutral
      lg:grid lg:grid-cols-3 lg:border lg:w-[90%] lg:p-[1rem] lg:rounded-md lg:border-neutral"
      >
        <div className="flex">
          <div>
            {isSmallDisplay ? (
              <WiThermometer size={16} />
            ) : (
              <WiThermometer size={22} />
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              Feels Like
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {feelsLike}°
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            {isSmallDisplay ? <WiWindy size={16} /> : <WiWindy size={22} />}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              Wind
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {wind}
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            {isSmallDisplay ? (
              <WiHumidity size={18} />
            ) : (
              <WiHumidity size={22} />
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              Humidity
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {humidity}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-[100%] collapse collapse-arrow border-base-300 bg-base-200 border-y border-y-neutral rounded-none
    md:w-[100%] md:collapse md:collapse-arrow md:border-base-300 md:bg-base-200 md:border-y md:border-y-neutral md:rounded-none md:p-[.6rem]
    lg:w-[100%] lg:collapse lg:collapse-arrow lg:border-base-300 lg:bg-base-200 lg:border-y lg:border-y-neutral lg:rounded-none lg:p-[.6rem]"
    >
      <input type="checkbox" />
      <div
        className="collapse-title flex w-[100%]
      md:flex md:w-[100%]
      lg:flex lg:w-[100%]"
      >
        <div
          className="text-sm font-medium w-[15%]
        md:text-2xl md:font-medium md:w-[15%]
        lg:text-2xl lg:font-medium lg:w-[15%]"
        >
          {dayOrTime}
        </div>
        <div
          className="text-sm font-medium w-[15%]
        md:text-2xl md:font-medium md:w-[15%]
        lg:text-2xl lg:font-medium lg:w-[15%]"
        >
          {temp}°
        </div>
        <div
          className="text-sm font-medium w-[40%]
        md:text-2xl md:font-medium md:w-[40%]
        lg:text-2xl lg:font-medium lg:w-[40%]"
        >
          {weather}
        </div>
        <div className="w-[15%] flex">
          <Image src="/drop.svg" width="6" height="6" className="mr-1" />
          <div className="flex items-center text-sm font-medium">
            <div>{precipitation}%</div>
          </div>
        </div>
        <div
          className="text-sm font-medium w-[15%]
        md:text-2xl md:font-medium md:w-[15%]
        lg:text-2xl lg:font-medium lg:w-[15%]"
        >
          {wind} km/h
        </div>
      </div>
      <div className="collapse-content flex justify-center">
        {isHourly
          ? constuctHourlySubItem(subObj.feelsLike, wind, subObj.humidity)
          : ""}
      </div>
    </div>
  );
}
