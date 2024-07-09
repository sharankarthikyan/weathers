import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSearchData } from "@/store/searchState";
import SuggestionMenu from "./suggestionmenu/SuggestionMenu";
import { debounce } from "@/utils/common";
import { useCallback, useEffect, useState } from "react";
import Alert from "../alert/Alert";
import { setLocationData } from "@/store/locationState";

export default function InputBar({ setOpenInput }) {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const searchData = useAppSelector((state) => state.search.searchData);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (value && value.length > 2) {
      dispatch(fetchSearchData({ query: value }));
    }
  };

  const debouncedHandleInputChange = useCallback(
    debounce(handleInputChange, 300), // Adjust the delay as needed
    []
  );

  const handleSearchClick = () => {
    if (query) {
      dispatch(fetchSearchData({ query })).then(({ payload }) => {
        if (searchData && !searchData.results) {
          setShowAlert(true);
        }

        if (payload.results?.length) {
          let firstResult = payload.results[0];
          let data = {
            latitude: firstResult.latitude,
            longitude: firstResult.longitude,
            city: firstResult.name,
            principalSubdivision: firstResult.admin1,
            country: firstResult.country,
          };
          dispatch(setLocationData(data));
          setOpenInput(false);
        }
      });
    }
  };

  return (
    <div className="w-[100%] flex justify-between sticky top-[4.1rem]">
      {showAlert && (
        <Alert
          type="alert-error"
          message="Invalid city or pincode."
          duration={3000}
          onClose={() => setShowAlert(false)}
        />
      )}
      <input
        className="w-[80%] border border-neutral h-[3rem] text-[1.6rem] p-4
        md:h-[4rem] md:text-[1.6rem] md:p-4
        lg:h-[4rem] lg:text-[1.6rem] lg:p-4"
        type="text"
        placeholder="Search city or postcode"
        onChange={debouncedHandleInputChange}
      />
      <div
        onClick={handleSearchClick}
        className="w-[20%] h-[3rem] border border-neutral btn btn-square uppercase font-dela-gothic-one p-4 
      md:h-[4rem] md:text-[1.2rem] 
      lg:h-[4rem] lg:text-[1.2rem]"
      >
        Search
      </div>
      <SuggestionMenu setOpenInput={setOpenInput} />
    </div>
  );
}
