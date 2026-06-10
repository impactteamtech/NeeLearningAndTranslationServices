import { useState } from "react";


const accordionItems = [
  {
    title: "Rapid solution is the key",
    body: "We design thoughtful systems that reduce complexity, improve performance, and help students move faster with clarity.",
  },
  {
    title: "Innovative thinking drives results",
    body: "We shape ideas into functional solutions that simplify the learning curve, improve usability, and create meaningful impact.",
  },
  {
    title: "Customer-first mindset",
    body: "We develop solutions that bring clarity to ideas, improve efficiency, and help every student achieve results with confidence.",
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
            <div style={{ height: "1px", background: "var(--color-gray-300)", width: "100%" }} />
          )}
          <button
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "22px 0",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--color-gray-300)",
              cursor: "pointer",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: "1.3em",
                color: "var(--color-dark)",
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
                stroke="var(--color-dark)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {openIdx === i && (
            <div
              style={{
                padding: "20px 0 24px 0",
                animation: "fadeIn 0.25s ease-out",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  lineHeight: "1.5em",
                  color: "var(--color-gray-500)",
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
      background: "var(--color-gray-100)",
    }}
  >
    {/* Container — max 1240px, horizontal, gap 70px */}
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
      }}
    >
      {/* MainWrapper — horizontal, gap 80px */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Image — 580x696, borderRadius 15px */}
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
            }}
          />
        </div>

        {/* ContentWrapper — 1fr, vertical, gap 35px, align start */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            alignItems: "flex-start",
          }}
        >
          {/* TextWrapper — gap 25px, align start */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "flex-start" }}>

            {/* Title — max 450px, wrapping words */}
            <div
              style={{
                maxWidth: "450px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "0px 11px",
              }}
            >
              {["We", "make", "spending"].map(w => (
                <span key={w} className="t-d2">{w}</span>
              ))}
              <span className="t-d2i">stress</span>
              <span className="t-d2i">free</span>
              {["so", "you", "have", "the", "perfect", "control."].map(w => (
                <span key={w} className="t-d2">{w}</span>
              ))}
            </div>

            {/* /Paragraph/Body */}
            <p className="t-body" style={{ textAlign: "left" }}>
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
