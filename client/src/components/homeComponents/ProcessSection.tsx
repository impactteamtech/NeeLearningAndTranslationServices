import { useState } from "react";

const accordionItems = [
  {
    title: "Structured path to fluency",
    body: "We design thoughtful systems that reduce complexity, improve performance, and help students move faster with clarity.",
  },
  {
    title: "Expert cultural context",
    body: "We shape lessons and translations into culturally authentic communications, simplifying the learning curve for native accuracy.",
  },
  {
    title: "Certified accuracy & trust",
    body: "We develop educational curriculums and certified documents that ensure you navigate academic, professional, and legal goals with confidence.",
  },
];

const Accordion = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div style={{ width: "100%" }}>
      {accordionItems.map((item, i) => (
        <div key={i}>
          {/* Top border for first item only */}
          {i === 0 && (
            <div style={{ height: "1px", background: "rgba(6, 67, 159, 0.12)", width: "100%" }} />
          )}
          <button
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 0",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(6, 67, 159, 0.12)",
              cursor: "pointer",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-roxborough)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: "1.3em",
                color: "var(--color-haiti-navy)",
              }}
            >
              {item.title}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                flexShrink: 0,
                transition: "transform 0.3s ease",
                transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <path
                d="M10 4v12M4 10h12"
                stroke="var(--color-haiti-red)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {openIdx === i && (
            <div
              style={{
                padding: "16px 0 20px 0",
                animation: "fadeIn 0.25s ease-out",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  lineHeight: "1.6em",
                  color: "var(--color-gray-500)",
                  margin: 0,
                }}
              >
                {item.body}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ProcessSection = () => (
  <section
    id="process"
    style={{
      width: "100%",
      padding: "160px 40px 0px 40px",
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Subtle radial glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: "0",
        right: "0",
        width: "500px",
        height: "500px",
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
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Image wrapper */}
        <div style={{ flexShrink: 0 }}>
          <img
            src="https://framerusercontent.com/images/XtF2Dn0CFhmqQ1hhZFk9ifmlDQ.jpg"
            alt="Our approach"
            style={{
              width: "580px",
              height: "696px",
              objectFit: "cover",
              borderRadius: "15px",
              display: "block",
              boxShadow: "0 20px 50px rgba(6, 67, 159, 0.08)",
              border: "1.5px solid rgba(6, 67, 159, 0.12)",
            }}
          />
        </div>

        {/* ContentWrapper */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            alignItems: "flex-start",
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
              {["We", "make", "learning"].map(w => (
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
                stress
              </span>
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
                free
              </span>
              {["so", "you", "have", "the", "perfect", "control."].map(w => (
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

            {/* Paragraph body */}
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
              Our team delivers fast, reliable, and student-focused solutions designed to simplify the learning journey and enhance everyday experiences. With a strong focus on adaptability and innovation, we turn complex challenges into seamless, intuitive results.
            </p>
          </div>

          {/* Accordion */}
          <Accordion />
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
