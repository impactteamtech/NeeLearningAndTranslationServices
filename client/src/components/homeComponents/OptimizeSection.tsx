import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const processCards = [
  {
    number: "01",
    title: "Collect Ideas",
    desc: "Gather and brainstorm key concepts to lay the foundation for a successful learning strategy.",
    dark: false,
  },
  {
    number: "02",
    title: "Data Analysis",
    desc: "Interpret student data and learning behavior to guide informed, personalized instruction.",
    dark: true,
  },
  {
    number: "03",
    title: "Magic Touch",
    desc: "Polish your final output with precision to ensure clarity, consistency, and lasting impact.",
    dark: false,
  },
  {
    number: "04",
    title: "Finalize Program",
    desc: "Finalize key details and polish the curriculum to meet quality and performance standards.",
    dark: true,
  },
];

interface ProcessCardProps {
  number: string;
  title: string;
  desc: string;
  dark: boolean;
}

const ProcessCard = ({ number, title, desc, dark }: ProcessCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dark
          ? "linear-gradient(135deg, #080c18 0%, #0d1f7a 45%, #06439f 100%)"
          : "#ffffff",
        border: dark ? "none" : "1.5px solid rgba(6,67,159,0.12)",
        borderRadius: "20px",
        padding: "36px",
        display: "flex",
        alignItems: "flex-start",
        gap: "28px",
        boxShadow: dark
          ? hovered
            ? "0 20px 60px rgba(6,67,159,0.36)"
            : "0 12px 40px rgba(6,67,159,0.22)"
          : hovered
            ? "0 12px 36px rgba(6,67,159,0.12)"
            : "0 4px 20px rgba(6,67,159,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow decorative blob for dark cards */}
      {dark && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(206,17,38,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Large index number */}
      <span
        style={{
          fontFamily: "var(--font-roxborough)",
          fontSize: "3rem",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          flexShrink: 0,
          width: "64px",
          color: dark ? "rgba(206, 17, 38, 0.35)" : "rgba(206, 17, 38, 0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {number}
      </span>

      {/* Text wrapper */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-roxborough)",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: "1.25em",
            color: dark ? "#ffffff" : "var(--color-haiti-navy)",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            lineHeight: "1.6em",
            color: dark ? "rgba(255,255,255,0.7)" : "var(--color-gray-500)",
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
};

const OptimizeSection = () => (
  <section
    id="optimize"
    style={{
      width: "100%",
      padding: "160px 40px",
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "20%",
        left: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,67,159,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />

    {/* Container */}
    <div
      style={{
        width: "100%",
        maxWidth: "1240px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row",
        gap: "70px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* MainWrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Left column ContentWrapper - Sticky */}
        <div
          style={{
            position: "sticky",
            top: "125px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            alignItems: "flex-start",
            zIndex: 1,
          }}
        >
          {/* TextWrapper */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "flex-start" }}>
            {/* Title */}
            <h2
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "0px 11px",
                margin: 0,
              }}
            >
              {["We", "refine"].map(w => (
                <span
                  key={w}
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(32px, 4.5vw, 44px)",
                    fontWeight: 700,
                    lineHeight: "1.15em",
                    letterSpacing: "-0.02em",
                    color: "var(--color-haiti-navy)",
                  }}
                >
                  {w}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontStyle: "italic",
                  fontSize: "clamp(32px, 4.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: "1.15em",
                  letterSpacing: "-0.02em",
                  color: "var(--color-haiti-red)",
                }}
              >
                flows
              </span>
              {["that", "turn", "ideas", "into", "results."].map(w => (
                <span
                  key={w}
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(32px, 4.5vw, 44px)",
                    fontWeight: 700,
                    lineHeight: "1.15em",
                    letterSpacing: "-0.02em",
                    color: "var(--color-haiti-navy)",
                  }}
                >
                  {w}
                </span>
              ))}
            </h2>

            {/* Body paragraph */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                lineHeight: "1.65em",
                color: "var(--color-gray-500)",
                margin: 0,
                textAlign: "left",
              }}
            >
              We believe that every successful program starts with a clear structure and focused strategy. That's why we've built a four-step workflow designed to guide your learning from raw ideas to a refined, high-impact outcome.
            </p>
          </div>

          {/* Button CTA */}
          <Link to="/services" className="btn-dark group">
            More Details
            <span className="btn-arrow-circle">
              <IoIosArrowRoundForward
                style={{ position: "absolute", width: "22px", height: "22px", color: "white" }}
                className="transition-transform duration-300 ease-in-out translate-x-0 group-hover:translate-x-full"
              />
              <IoIosArrowRoundForward
                style={{ position: "absolute", width: "22px", height: "22px", color: "white" }}
                className="transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0"
              />
            </span>
          </Link>
        </div>

        {/* Right column ProcessCards wrapper */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "35px",
          }}
        >
          {processCards.map((card, i) => (
            <ProcessCard key={i} {...card} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OptimizeSection;
