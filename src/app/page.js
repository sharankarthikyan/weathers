"use client";

import CurrentConditions from "@/components/currentconditions/CurrentConditions";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div
        className="mt-4 w-[90%] flex justify-center
      md:mt-4 md:w-[60%] md:flex md:justify-center
      lg:mt-4 lg:w-[60%] lg:flex lg:justify-center"
      >
        <CurrentConditions />
      </div>
    </div>
  );
}
