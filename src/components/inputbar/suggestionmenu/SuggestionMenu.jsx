import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLocationData } from "@/store/locationState";

export default function SuggestionMenu() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.search.searchData);
  const isSearchDataLoading = useAppSelector((state) => state.search.isLoading);
  const error = useAppSelector((state) => state.search.error);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log(searchData);
    if (!isSearchDataLoading && searchData) {
      setResults(searchData?.results?.slice(0, 3));
    }
  }, [isSearchDataLoading]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setResults([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    let data = {
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
      city: suggestion.name,
      principalSubdivision: suggestion.admin1,
    };
    dispatch(setLocationData(data));
    setResults([]);
  };

  return (
    <>
      {results?.length ? (
        <div
          ref={containerRef}
          className="absolute mt-[3.2rem] w-[80%] bg-base-100 border border-gray-700 rounded-lg shadow-lg z-10
          md:absolute md:mt-[4.2rem] md:w-[80%] md:bg-base-100 md:border md:border-gray-700 md:rounded-lg md:shadow-lg
          lg:absolute lg:mt-[4.2rem] lg:w-[80%] lg:bg-base-100 lg:border lg:border-gray-700 lg:rounded-lg lg:shadow-lg"
        >
          {results?.map((suggestion, index) => {
            return (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-[1rem] hover:bg-gray-800 cursor-pointer
                md:px-4 md:py-2 md:text-[1.8rem] md:hover:bg-gray-800 md:cursor-pointer
                lg:px-4 lg:py-2 lg:text-[1.8rem] lg:hover:bg-gray-800 lg:cursor-pointer"
              >
                {suggestion.name}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
