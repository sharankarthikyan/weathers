import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWeatherData } from "@/store/weatherState";
import { useEffect } from "react";
import { WiThermometer, WiWindy } from "weather-icons-react";

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
                34°
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
                <div className="font-source-sans-pro text-[1.8rem]">34/28</div>
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
                  add 34/28
                </div>
              </div>
              <div className="border-[.1rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
