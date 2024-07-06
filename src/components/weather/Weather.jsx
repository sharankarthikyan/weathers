import Link from "next/link";
import WeatherListItem from "./weatherlistitem/WeatherListItem";

export default function Weather({
  cardTitle,
  location,
  list,
  btnLink,
  btnText,
}) {
  let day = null;

  const checkCurrAndPrevHrOnSameDay = (dayOrTime) => {
    if (!day) {
      day = dayOrTime;
      return false;
    }

    let prevDate = new Date(day).getDate();
    let currDate = new Date(dayOrTime).getDate();
    if (prevDate != currDate) {
      day = dayOrTime;
      return false;
    }

    return true;
  };

  const constructDayInFormat = () => {
    let date = new Date(day).getDate();
    let localeDay = new Date(day).toLocaleDateString("us", { weekday: "long" });
    let localeMonth = new Date(day).toLocaleDateString("us", { month: "long" });
    return localeDay + " " + date + " " + localeMonth;
  };

  const constructDateInFormat = (date) => {
    let day = new Date(date)
      .toLocaleDateString("us", { weekday: "long" })
      .slice(0, 3);
    let dayNum = new Date(date).getDate();
    return day + " " + dayNum;
  };

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  const constructListItem = () => {
    return list.map(
      ({
        dayOrTime,
        temp,
        weather,
        precipitation,
        wind,
        subObj,
        isHourly,
        tempMin,
      }) => {
        return (
          <>
            {!isHourly || checkCurrAndPrevHrOnSameDay(dayOrTime) ? (
              ""
            ) : (
              <div
                className="p-[1rem] font-source-sans-pro font-bold text-[1.6rem]
              md:p-[1.6rem] md:font-source-sans-pro md:font-bold md:text-[2rem]
              lg:p-[1.6rem] lg:font-source-sans-pro lg:font-bold lg:text-[2rem]"
              >
                {constructDayInFormat()}
              </div>
            )}
            <WeatherListItem
              dayOrTime={
                isHourly
                  ? pad(new Date(dayOrTime).getHours()) +
                    ":" +
                    pad(new Date(dayOrTime).getMinutes())
                  : constructDateInFormat(dayOrTime)
              }
              temp={temp}
              weather={weather}
              precipitation={precipitation}
              wind={wind}
              subObj={subObj}
              isHourly={isHourly}
              tempMin={tempMin}
            />
          </>
        );
      }
    );
  };

  return (
    <div
      className="w-[90%] rounded-2xl box-border p-[1rem]
    md:w-[90%]  md:rounded-2xl md:box-border md:p-[1rem]
    lg:w-[90%] lg:rounded-2xl lg:box-border lg:p-[1rem]"
    >
      <div
        className="w-[100%] bg-base-200 border rounded-2xl border-base-200 pb-[1rem]
      md:w-[100%] md:bg-base-200 md:border md:rounded-2xl md:border-base-200 md:pb-[1rem]
      lg:w-[100%] lg:bg-base-200 lg:border lg:rounded-2xl lg:border-base-200 lg:pb-[1rem]"
      >
        <div
          className="pt-[1rem] pl-[1rem]
        md:pt-[1rem] md:pl-[1rem]
        lg:pt-[1rem] lg:pl-[1rem]"
        >
          <span
            className="font-source-sans-pro font-bold text-[1.8rem]
          md:font-source-sans-pro md:font-bold md:text-[2.6rem]
          lg:font-source-sans-pro lg:font-bold lg:text-[2.6rem]"
          >
            {cardTitle}
          </span>
          <span
            className="text-[1rem]
          md:text-[1.4rem]
          lg:text-[1.4rem]"
          >
            {" "}
            - {location}
          </span>
        </div>
        <div
          className="mt-[.1rem]
        md:mt-[1rem]
        lg:mt-[1rem]"
        >
          {constructListItem()}
        </div>
        {btnLink ? (
          <div
            className="pt-[1rem] pl-[1rem]
        md:pt-[1rem] md:pl-[1rem]
        lg:pt-[1rem] lg:pl-[1rem"
          >
            <Link href={btnLink} className="btn btn-secondary text-[1rem]">
              {btnText}
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
