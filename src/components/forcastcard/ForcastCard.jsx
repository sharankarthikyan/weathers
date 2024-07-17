import Image from "next/image";
import Link from "next/link";

export default function ForcastCard({
  cardTitle,
  list,
  nextLink,
  btnLink,
  isDaily,
}) {
  const constructList = (list) => {
    return list.map((list, i) => {
      return (
        <div key={list.key + i}>
          <div className="flex border border-x-0 border-t-0 border-b-neutral">
            <div
              className="font-source-sans-pro text-[1.2rem] text-base-content flex justify-center items-center capitalize w-[25%] 
            md:font-source-sans-pro md:text-[2rem] md:text-base-content md:flex md:justify-center md:items-center md:capitalize md:w-[25%]
            lg:font-source-sans-pro lg:text-[2rem] lg:text-base-content lg:flex lg:justify-center lg:items-center lg:capitalize lg:w-[25%]"
            >
              <div>{list.key}</div>
            </div>
            <div
              className="font-source-sans-pro text-[2.6rem] text-base-content w-[25%] flex justify-center items-center
            md:font-source-sans-pro md:text-[3.6rem] md:text-base-content md:w-[25%] md:flex md:justify-center md:items-center
            lg:font-source-sans-pro lg:text-[4rem] lg:text-base-content lg:w-[25%] lg:flex lg:justify-center lg:items-center"
            >
              {isDaily
                ? Math.round(list.temperature_max) +
                  "°/" +
                  Math.round(list.temperature_min) +
                  "°"
                : Math.round(list.temperature) + "°"}
            </div>
            <div
              className="w-[25%] flex justify-center items-center
            md:w-[25%] md:flex md:justify-center md:items-center
            lg:w-[25%] lg:flex lg:justify-center lg:items-center"
            >
              Image
            </div>
            <div
              className="font-source-sans-pro text-[1.6rem] text-base-content flex font-extrabold w-[25%] justify-center items-center
            md:font-source-sans-pro md:text-[2rem] md:text-base-content md:flex md:font-extrabold md:w-[25%] md:justify-center md:items-center
            lg:font-source-sans-pro lg:text-[2rem] lg:text-base-content lg:flex lg:font-extrabold lg:w-[25%] lg:justify-center lg:items-center"
            >
              <Image
                src="/drop.svg"
                width="8"
                height="8"
                className="mr-1"
                alt="rain drop"
              />
              <div>{parseInt(list.precipitation)}%</div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Link
        href={btnLink}
        className="w-[90%] bg-base-200 rounded-2xl box-border p-[1rem] mb-2
    md:w-[90%] md:bg-base-200 md:rounded-2xl md:box-border md:p-[1rem]
    lg:w-[90%] lg:bg-base-200 lg:rounded-2xl lg:box-border lg:p-[1rem]"
      >
        <div className="flex flex-col">
          <div
            className="font-source-sans-pro text-[1.4rem] font-extrabold text-base-content
            md:font-source-sans-pro md:text-[2.2rem] md:font-extrabold md:text-base-content
            lg:font-source-sans-pro lg:text-[2.2rem] lg:font-extrabold lg:text-base-content"
          >
            {cardTitle}
          </div>
          <div
            className="mt-2
            md:mt-2
            lg:mt-2"
          >
            <>
              {list.length ? constructList(list) : ""}
              <div
                className="mt-6
                  md:mt-4
                  lg:mt-4"
              >
                <Link
                  href={btnLink}
                  className="btn btn-neutral text-[.8rem]
                      md:btn md:btn-neutral md:text-[1rem]
                      lg:btn lg:btn-neutral lg:text-[1rem]"
                >
                  {nextLink}
                </Link>
              </div>
            </>
          </div>
        </div>
      </Link>
    </>
  );
}
