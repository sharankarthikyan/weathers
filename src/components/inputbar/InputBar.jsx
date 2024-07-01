export default function InputBar() {
  return (
    <div className="w-[100%] flex justify-between">
      <input
        className="w-[80%] border border-[#ffffff3f] h-[3rem] text-[1.6rem] p-4
        md:h-[4rem] md:text-[1.6rem] md:p-4
        lg:h-[4rem] lg:text-[1.6rem] lg:p-4"
        type="text"
        placeholder="Search city or postcode"
      />
      <div
        className="w-[20%] border border-[#ffffff3f] btn btn-square uppercase font-dela-gothic-one p-4
      md:h-[4rem] md:text-[1.6rem] 
      lg:h-[4rem] lg:text-[1.6rem]"
      >
        Search
      </div>
    </div>
  );
}
