import { useState } from "react";

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1.39l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.1l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.39z"
      fill="#FFA800"
    />
  </svg>
);

const TestimonialSection = () => {
  const [hoveredCard, setHoveredCard] = useState(false);

  return (
    <section
      id="testimonials"
      style={{
        width: "100%",
        padding: "220px 40px 160px 40px",
        background: "#f9fbfd",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blob */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
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
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left Column ImageWrapper */}
          <div
            onMouseEnter={() => setHoveredCard(true)}
            onMouseLeave={() => setHoveredCard(false)}
            style={{
              width: "580px",
              height: "525px",
              display: "flex",
              flexDirection: "column",
              gap: "70px",
              alignItems: "center",
              position: "relative",
              flexShrink: 0,
            }}
          >
            {/* Background frame */}
            <div
              style={{
                width: "580px",
                height: "525px",
                background: "#EFF3F7",
                borderRadius: "15px",
                overflow: "clip",
                position: "relative",
                border: "1.5px solid rgba(6,67,159,0.12)",
                boxShadow: hoveredCard ? "0 16px 40px rgba(6,67,159,0.08)" : "0 4px 20px rgba(6,67,159,0.02)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Person image */}
              <img
                src="https://framerusercontent.com/images/ApIWUGszZxDGSijwfglaSJU36f0.png"
                alt="Happy student"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%) scale(1.02)",
                  width: "361px",
                  height: "620px",
                  objectFit: "cover",
                  objectPosition: "top",
                  zIndex: 1,
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
            </div>

            {/* CounterCard */}
            <div
              className="glass"
              style={{
                position: "absolute",
                bottom: "22px",
                left: "22px",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.6)",
                borderRadius: "15px",
                padding: "17px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
                zIndex: 2,
                boxShadow: hoveredCard
                  ? "0 12px 36px rgba(6,67,159,0.16)"
                  : "0 4px 24px rgba(6,67,159,0.08)",
                transform: hoveredCard ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Count */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-roxborough)",
                      fontSize: "32px",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      lineHeight: "1.1em",
                      color: "var(--color-haiti-navy)",
                    }}
                  >
                    2500
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-roxborough)",
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "var(--color-haiti-red)",
                      marginLeft: "2px",
                    }}
                  >
                    +
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--color-gray-500)",
                  }}
                >
                  Happy Clients
                </span>
              </div>
            </div>
          </div>

          {/* Right Column ContentWrapper */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "flex-start",
              overflow: "clip",
            }}
          >
            {/* TextWrapper */}
            <div style={{ display: "flex", flexDirection: "column", gap: "30px", overflow: "clip", width: "100%" }}>
              {/* Rating stars */}
              <div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* TestimonialText */}
              <div
                style={{
                  maxWidth: "500px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                {/* Blockquote */}
                <p
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 600,
                    lineHeight: "1.2em",
                    letterSpacing: "-0.03em",
                    color: "var(--color-haiti-navy)",
                    margin: 0,
                  }}
                >
                  "Nee's helped us communicate more effectively & turn language barriers into bridges of opportunity."
                </p>

                {/* Body Paragraph */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    lineHeight: "1.65em",
                    color: "var(--color-gray-500)",
                    margin: 0,
                  }}
                >
                  "Working with Nee's Learning & Translation Services was an absolute pleasure. They managed every stage of our program and their attention to cultural detail ensured a flawless final result that exceeded our expectations."
                </p>
              </div>
            </div>

            {/* Border */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(6,67,159,0.12)",
              }}
            />

            {/* AuthorInfo */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "19px", overflow: "clip" }}>
              {/* Author photo */}
              <img
                src="https://framerusercontent.com/images/dQAcvt53XxCI90ObdM8wXH7wic.jpg"
                alt="Marie Larose"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  border: "1.5px solid rgba(6,67,159,0.12)",
                }}
              />

              {/* Author text wrapper */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "1.25em",
                    letterSpacing: "-0.01em",
                    color: "var(--color-haiti-navy)",
                  }}
                >
                  Marie Larose
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    color: "var(--color-gray-500)",
                  }}
                >
                  Community Integration Specialist
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
