import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const GetInTouchButton = () => {
  return (
    <Link
      to="/contact"
      className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#080c18] via-[#0d1f7a] to-[#00209F] text-white pl-5 pr-2 py-2 rounded-full font-sans font-bold text-[11px] tracking-widest uppercase hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(0,32,159,0.52)] active:translate-y-0 active:shadow-md transition-all duration-300 ease-out select-none whitespace-nowrap"
    >
      Get In Touch

      {/* Sliding Arrow Micro-Animation */}
      <span className="relative overflow-hidden rounded-full w-9 h-9 bg-white flex items-center justify-center flex-shrink-0">
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