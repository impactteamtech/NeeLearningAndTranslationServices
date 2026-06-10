import { IoIosArrowRoundForward } from "react-icons/io";

const GetInTouchButton = () => {
  return (
    <button
      className="group"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "var(--color-dark)",
        color: "white",
        padding: "10px 10px 10px 22px",
        borderRadius: "9999px",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "0.9375rem",
        letterSpacing: "-0.02em",
        cursor: "pointer",
        border: "none",
        transition: "background 0.25s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--color-dark-100)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "var(--color-dark)")}
    >
      Get In Touch

      {/* Sliding arrow circle */}
      <span
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "9999px",
          width: "36px",
          height: "36px",
          background: "white",
          color: "var(--color-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <IoIosArrowRoundForward
          className="absolute w-7 h-7 transition-transform duration-300 ease-in-out translate-x-0 group-hover:translate-x-full"
          style={{ color: "var(--color-dark)" }}
        />
        <IoIosArrowRoundForward
          className="absolute w-7 h-7 transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0"
          style={{ color: "var(--color-dark)" }}
        />
      </span>
    </button>
  );
};

export default GetInTouchButton;