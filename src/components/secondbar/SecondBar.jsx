import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SecondBar() {
  const pathname = usePathname();

  return (
    <div className="flex w-[100%] justify-center border-b border-[#ffffff3f] py-2">
      <div className="flex w-[80%] justify-around font-source-sans-pro uppercase">
        <Link
          href="/"
          className={`btn btn-ghost text-[1rem] font-bold ${
            pathname == "/" ? "btn-active" : ""
          }
        md:btn md:btn-ghost md:text-[1.4rem] md:font-bold
        lg:btn lg:btn-ghost lg:text-[1.4rem] lg:font-bold`}
        >
          Today
        </Link>
        <Link
          href="/hourbyhour/"
          className={`btn btn-ghost text-[1rem] font-bold ${
            pathname == "/hourbyhour/" ? "btn-active" : ""
          }
        md:btn md:btn-ghost md:text-[1.4rem] md:font-bold
        lg:btn lg:btn-ghost lg:text-[1.4rem] lg:font-bold`}
        >
          Hourly
        </Link>
        <Link
          href="/tenday/"
          className={`btn btn-ghost text-[1rem] font-bold ${
            pathname == "/tenday/" ? "btn-active" : ""
          }
        md:btn md:btn-ghost md:text-[1.4rem] md:font-bold
        lg:btn lg:btn-ghost lg:text-[1.4rem] lg:font-bold`}
        >
          10 days
        </Link>
        <Link
          href="/daily/"
          className={`btn btn-ghost text-[1rem] font-bold ${
            pathname == "/daily/" ? "btn-active" : ""
          }
        md:btn md:btn-ghost md:text-[1.4rem] md:font-bold
        lg:btn lg:btn-ghost lg:text-[1.4rem] lg:font-bold`}
        >
          Daily
        </Link>
        <Link
          href="/monthly/"
          className={`btn btn-ghost text-[1rem] font-bold ${
            pathname == "/monthly/" ? "btn-active" : ""
          }
        md:btn md:btn-ghost md:text-[1.4rem] md:font-bold
        lg:btn lg:btn-ghost lg:text-[1.4rem] lg:font-bold`}
        >
          Monthly
        </Link>
      </div>
    </div>
  );
}
