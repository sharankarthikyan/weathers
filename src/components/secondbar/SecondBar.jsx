import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SecondBar({ openInput }) {
  const pathname = usePathname();

  return (
    <div
      className={`flex w-[100%] justify-center border-neutral py-2 bg-base-200 sticky ${
        openInput ? "top-[8.1rem] border" : "top-[4.1rem] border-b"
      } z-20`}
    >
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
      </div>
    </div>
  );
}
