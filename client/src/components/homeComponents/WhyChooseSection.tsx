import { useState } from "react";

interface FeatureCardData {
  headline: string;
  body: string;
  point1Title: string;
  point1Body: string;
  point2Title: string;
  point2Body: string;
  top: string;
  imagePosition: "left" | "right";
  image: string;
}

const features: FeatureCardData[] = [
  {
    headline: "Designed for ease, built for real learning outcomes.",
    body: "Skip the confusion and experience structured language learning that works anytime, anywhere. Whether you're starting Kreyòl from scratch, improving English fluency, or helping your child, our programs adapt to your goals.",
    point1Title: "Safe, seamless, and always certified",
    point1Body: "All lessons are built by bilingual educators and certified translators. Your learning path is always guided, clear, and designed to last.",
    point2Title: "Track every milestone in real time",
    point2Body: "Instant progress tracking so you always know where you stand and what's coming next on your journey.",
    top: "130px",
    imagePosition: "left",
    image: "https://framerusercontent.com/images/IZLx5S5dEqmgGNkvLXFUprpqweo.jpg",
  },
  {
    headline: "Translate with precision, communicate with clarity.",
    body: "Get your documents translated instantly, without waiting. From legal papers to everyday forms, everything is handled smoothly, accurately, and with full cultural sensitivity.",
    point1Title: "Built with advanced, certified expertise",
    point1Body: "Your translations are handled by native speakers using rigorous review standards. Every word carries accuracy and cultural nuance.",
    point2Title: "Stay updated on every translation instantly",
    point2Body: "Get live notifications on your document's progress from submission to final delivery.",
    top: "170px",
    imagePosition: "right",
    image: "https://framerusercontent.com/images/XtF2Dn0CFhmqQ1hhZFk9ifmlDQ.jpg",
  },
  {
    headline: "Understand your progress and act with real confidence.",
    body: "Get a clear view of your language journey without overcomplicating your workflow. From tracking performance to spotting patterns, everything is designed to help you move forward with clarity.",
    point1Title: "Clear insights, no more guesswork at all",
    point1Body: "Understand what's happening at a glance. Focus on what matters most and make informed decisions without getting lost in unnecessary complexity.",
    point2Title: "Track every session in real time easily",
    point2Body: "Stay updated as things evolve. Monitor your progress instantly and keep moving in the right direction.",
    top: "210px",
    imagePosition: "left",
    image: "https://framerusercontent.com/images/0YLFJEPLwZvkWT4P3c1VnmJEoF0.jpg",
  },
];

const PointCheck = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ flexShrink: 0, marginTop: "2px" }}
  >
    <circle
      cx="10"
      cy="10"
      r="10"
      fill="rgba(206, 17, 38, 0.08)"
    />
    <path
      d="M6 10l2.8 2.8 5-5"
      stroke="var(--color-haiti-red)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureCard = ({ f }: { f: FeatureCardData }) => {
  const [hovered, setHovered] = useState(false);
  const isRight = f.imagePosition === "right";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "sticky",
        top: f.top,
        width: "100%",
        display: "flex",
        flexDirection: isRight ? "row-reverse" : "row",
        gap: "60px",
        alignItems: "center",
        borderRadius: "15px",
        border: "1.5px solid rgba(6,67,159,0.12)",
        background: "#ffffff",
        padding: "60px",
        boxShadow: hovered
          ? "0 20px 48px rgba(6,67,159,0.12)"
          : "0 4px 28px rgba(6,67,159,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Left/Right: illustration / UI image */}
      <div
        style={{
          width: "480px",
          height: "400px",
          borderRadius: "15px",
          overflow: "hidden",
          background: "rgba(6,67,159,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          border: "1px solid rgba(6,67,159,0.08)",
          flexShrink: 0,
        }}
      >
        <img
          src={f.image}
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.95,
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
      </div>

      {/* Right/Left: text content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main headline */}
        <h3
          style={{
            fontFamily: "var(--font-roxborough)",
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 700,
            lineHeight: "1.2em",
            letterSpacing: "-0.02em",
            color: "var(--color-haiti-navy)",
            margin: 0,
          }}
        >
          {f.headline}
        </h3>

        {/* Main body */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            lineHeight: "1.6em",
            color: "var(--color-gray-500)",
            margin: 0,
          }}
        >
          {f.body}
        </p>

        {/* Two bullet points */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { title: f.point1Title, body: f.point1Body },
            { title: f.point2Title, body: f.point2Body },
          ].map((pt, j) => (
            <div key={j} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <PointCheck />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "var(--color-haiti-navy)",
                    margin: "0 0 4px 0",
                    lineHeight: "1.3em",
                  }}
                >
                  {pt.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    lineHeight: "1.5em",
                    color: "var(--color-gray-500)",
                    margin: 0,
                  }}
                >
                  {pt.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WhyChooseSection = () => (
  <section
    id="why-choose"
    style={{
      width: "100%",
      padding: "160px 40px",
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Radial glow background */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,67,159,0.04) 0%, transparent 70%)",
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
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "56px",
          alignItems: "center",
        }}
      >
        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            maxWidth: "550px",
            textAlign: "center",
          }}
        >
          {/* Label Pill */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(6, 67, 159, 0.06)",
              border: "1px solid rgba(6, 67, 159, 0.15)",
              color: "var(--color-haiti-navy)",
              padding: "4px 14px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Why Choose Nee's?
          </span>

          <h2
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "0px 11px",
              margin: 0,
            }}
          >
            {["A", "few", "reasons"].map(w => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontSize: "clamp(32px, 4.5vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
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
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--color-haiti-red)",
              }}
            >
              why
            </span>
            {["our", "clients", "choose", "us", "first."].map(w => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontSize: "clamp(32px, 4.5vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--color-haiti-navy)",
                }}
              >
                {w}
              </span>
            ))}
          </h2>
        </div>

        {/* FeatureCards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            width: "100%",
            maxWidth: "1140px",
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
