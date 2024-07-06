import { useAppDispatch } from "@/store/hooks";
import { fetchSearchData } from "@/store/searchState";
import SuggestionMenu from "./suggestionmenu/SuggestionMenu";
import { debounce } from "@/utils/common";
import { useCallback } from "react";

export default function InputBar() {
  const dispatch = useAppDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value && value.length > 2) {
      dispatch(fetchSearchData({ query: value }));
    }
  };

  const debouncedHandleInputChange = useCallback(
    debounce(handleInputChange, 300), // Adjust the delay as needed
    []
  );

  return (
    <div className="w-[100%] flex justify-between">
      <input
        className="w-[80%] border border-[#ffffff3f] h-[3rem] text-[1.6rem] p-4
        md:h-[4rem] md:text-[1.6rem] md:p-4
        lg:h-[4rem] lg:text-[1.6rem] lg:p-4"
        type="text"
        placeholder="Search city or postcode"
        onChange={debouncedHandleInputChange}
      />
      <div
        className="w-[20%] border border-[#ffffff3f] btn btn-square uppercase font-dela-gothic-one p-4
      md:h-[4rem] md:text-[1.2rem] 
      lg:h-[4rem] lg:text-[1.2rem]"
      >
        Search
      </div>
      <SuggestionMenu />
    </div>
  );
}
