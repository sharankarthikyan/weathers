import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import {
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiWindDeg,
  WiWindy,
} from "weather-icons-react";

export default function WeatherListItem({
  dayOrTime,
  temp,
  weather,
  precipitation,
  wind,
  subObj,
  isHourly,
  tempMin,
}) {
  const isSmallDisplay = useMediaQuery({ maxWidth: 640 });

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

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
              {Math.round(feelsLike)}°
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
              {Math.round(wind)} km/h
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

  const constuctTenDaySubItem = (
    feelsLike,
    sunrise,
    sunset,
    uvIndexMax,
    windDirection
  ) => {
    return (
      <div
        className="grid grid-cols-3 grid-rows-2 border w-[90%] p-[1rem] rounded-md border-neutral
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
              {Math.round(feelsLike)}°
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            {isSmallDisplay ? <WiSunrise size={16} /> : <WiSunrise size={22} />}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              Sunrise
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {pad(new Date(sunrise).getHours()) +
                ":" +
                pad(new Date(sunrise).getMinutes())}
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            {isSmallDisplay ? <WiSunset size={18} /> : <WiSunset size={22} />}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              Sunset
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {pad(new Date(sunset).getHours()) +
                ":" +
                pad(new Date(sunset).getMinutes())}
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
              {Math.round(wind)} km/h
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            {isSmallDisplay ? <WiWindDeg size={16} /> : <WiWindDeg size={20} />}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              Wind Direction
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {windDirection}°
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            {isSmallDisplay ? (
              <Image
                src="/uvindex.png"
                width={16}
                height={16}
                style={{ "filter": "invert(100%)" }}
              />
            ) : (
              <Image
                src="/uvindex.png"
                width={20}
                height={20}
                style={{ "filter": "invert(100%)" }}
              />
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="text-sm
            md:text-xl
            lg:text-xl"
            >
              UV Index
            </div>
            <div
              className="text-lg font-bold
            md:text-2xl md:font-bold
            lg:text-2xl lg:font-bold"
            >
              {Math.round(uvIndexMax)} of 11
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-[100%] collapse collapse-arrow border-neutral bg-base-200 border-b border-b-neutral rounded-none
    md:w-[100%] md:collapse md:collapse-arrow md:border-neutral md:bg-base-200 md:border-b md:border-b-neutral md:rounded-none md:p-[.6rem]
    lg:w-[100%] lg:collapse lg:collapse-arrow lg:border-neutral lg:bg-base-200 lg:border-b lg:border-b-neutral lg:rounded-none lg:p-[.6rem]"
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
          {Math.round(temp)}°{isHourly ? "" : "/" + Math.round(tempMin) + "°"}
        </div>
        <div
          className="text-sm font-medium w-[40%]
        md:text-2xl md:font-medium md:w-[40%]
        lg:text-2xl lg:font-medium lg:w-[40%]"
        >
          {weather}
        </div>
        <div className="w-[15%] flex">
          {isSmallDisplay ? (
            <Image
              src="/drop.svg"
              width="6"
              height="6"
              className="mr-1"
              alt="rain drop"
            />
          ) : (
            <Image
              src="/drop.svg"
              width="8"
              height="8"
              className="mr-1"
              alt="rain drop"
            />
          )}

          <div
            className="text-sm font-medium w-[40%]
        md:text-2xl md:font-medium md:w-[40%]
        lg:text-2xl lg:font-medium lg:w-[40%]"
          >
            <div>{precipitation}%</div>
          </div>
        </div>
        <div
          className="text-sm font-medium w-[15%]
        md:text-2xl md:font-medium md:w-[15%]
        lg:text-2xl lg:font-medium lg:w-[15%]"
        >
          {Math.round(wind)} km/h
        </div>
      </div>
      <div className="collapse-content flex justify-center">
        {isHourly
          ? constuctHourlySubItem(subObj.feelsLike, wind, subObj.humidity)
          : constuctTenDaySubItem(
              subObj.feelsLike,
              subObj.sunrise,
              subObj.sunset,
              subObj.uvIndexMax,
              subObj.windDirection
            )}
      </div>
    </div>
  );
}
