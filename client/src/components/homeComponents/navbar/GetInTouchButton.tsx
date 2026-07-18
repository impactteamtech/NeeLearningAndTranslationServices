import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const GetInTouchButton = () => {
  return (
    <Link
      to="/login"
      className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#080c18] via-[#0d1f7a] to-[#00209F] text-white pl-5 pr-2 py-2 rounded-full font-sans font-bold text-[11px] tracking-widest uppercase hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(0,32,159,0.52)] active:translate-y-0 active:shadow-md transition-all duration-300 ease-out select-none whitespace-nowrap overflow-hidden"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#001278] via-[#00209F] to-[#1a3aff] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full z-0" />

      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-[1000ms] ease-out pointer-events-none z-0" />

      <span className="relative z-10">Get In Touch</span>

      <span className="relative overflow-hidden rounded-full w-9 h-9 bg-white group-hover:scale-105 flex items-center justify-center flex-shrink-0 transition-transform duration-300 z-10">
        <IoIosArrowRoundForward
          className="absolute w-6 h-6 text-primary transition-transform duration-300 ease-in-out translate-x-0 group-hover:translate-x-12"
        />
        <IoIosArrowRoundForward
          className="absolute w-6 h-6 text-primary transition-transform duration-300 ease-in-out -translate-x-12 group-hover:translate-x-0"
        />
      </span>
    </Link>
  );
};

export default GetInTouchButton;
