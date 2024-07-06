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
          className="absolute mt-[4.2rem] w-[80%] bg-base-100 border border-gray-700 rounded-lg shadow-lg"
        >
          {results?.map((suggestion, index) => {
            return (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-[1.8rem] hover:bg-gray-800 cursor-pointer"
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
