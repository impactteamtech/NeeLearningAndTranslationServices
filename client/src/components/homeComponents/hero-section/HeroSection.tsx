import { Link } from "react-router-dom";
import DecoratorBox from "../DecoratorBox";

const HeroSection = () => {

  return (
    <section
      className="flex flex-col lg:flex-row relative items-center pt-10 lg:pt-15 mb-20 lg:mb-30 justify-between gap-12 lg:gap-0 max-w-8xl w-full px-6 lg:px-20"
    >
      {/* icon 7  */}
      <DecoratorBox className="absolute -bottom-20 left-210 -translate-x-1/2 z-20 animate-decorator-slide-up" />
      
      <img
        src="/hero-section-icons/icon-12.png"
        className="hidden lg:block absolute w-22 bottom-20 left-[47%] rotate-40 opacity-30"
      />
      
      <img
        src="/hero-section-icons/icon-4.png"
        className="hidden lg:block absolute  w-30 top-29 left-[48%] opacity-35"
      />
      
      {/* ── Grid background — centered decorative backdrop ── */}
      <img
        src="/grid-background.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(600px, 70vw, 950px)",
          height: "auto",
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <div
        className="w-full lg:flex-1 lg:max-w-[1000px] flex flex-col items-center lg:items-start text-center lg:text-left gap-10 z-10"
      >
        <h1
          style={{
            fontFamily: "var(--font-roxborough)",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-haiti-navy)",
          }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[8rem] w-full text-center lg:text-left"
        >
          Learn Haitian
          <br />
          Creole &amp; English
        </h1>

        {/* ── DESCRIPTION — left-aligned, below title, z-index 1 ── */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            lineHeight: 1.9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#555e6c",
          }}
          className="text-[17px] text-center lg:text-left w-full md:w-[75%] lg:w-[85%] xl:w-[75%] mx-auto lg:mx-0"
        >
          Master Haitian Creole and English
          at your own pace with expert
          lessons and translation support
          from Nee's.
        </p>

        {/* ── CTA BUTTONS — left side, z-index 1 ── */}
        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:max-w-[430px] justify-center lg:justify-start"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Primary — Start Learning */}
          <Link to="/contact" className="btn-dark w-full sm:w-auto text-center justify-center">
            Start Learning
          </Link>

          {/* Secondary — Explore Courses */}
          <Link to="/services" className="btn-outline w-full sm:w-auto text-center justify-center">
            Explore Courses
          </Link>
        </div>
      </div>

      {/* Image section — rendered as <img>, clipped to circle */}
      <img
        src="/background-image.png"
        alt="Haitian Creole & English learning vibrant culture collage"
        className="w-full max-w-[480px] lg:max-w-[660px] lg:flex-1 h-auto lg:h-[450px] xl:h-150 object-cover z-0 opacity-100"
      />

    </section>
  );
};

export default HeroSection;