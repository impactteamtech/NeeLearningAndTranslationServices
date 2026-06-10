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

const OptimizeSection = () => (
  <section
    id="optimize"
    style={{
      width: "100%",
      padding: "160px 40px 160px 40px",
      background: "var(--color-gray-100)",
    }}
  >
    {/* Container — max 1240px, horizontal */}
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
      {/* MainWrapper — horizontal, gap 80px, align start */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* ContentWrapper — sticky top:125px, 1fr, vertical, gap 35px */}
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
          {/* TextWrapper — gap 25px */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "flex-start" }}>

            {/* Title — wrapping words, "flows" italic */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "0px 11px",
              }}
            >
              {["We", "refine"].map(w => <span key={w} className="t-d2">{w}</span>)}
              <span className="t-d2i">flows</span>
              {["that", "turn", "ideas", "into", "results."].map(w => (
                <span key={w} className="t-d2">{w}</span>
              ))}
            </div>

            {/* Body */}
            <p className="t-body">
              We believe that every successful program starts with a clear structure and focused strategy. That's why we've built a four-step workflow designed to guide your learning from raw ideas to a refined, high-impact outcome.
            </p>
          </div>

          {/* Button — "More Details" ghost/dark */}
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

        {/* ProcessCards — 1fr, vertical, gap 35px */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "35px",
          }}
        >
          {processCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: card.dark ? "var(--color-dark)" : "var(--color-white)",
                border: card.dark ? "none" : "1px solid var(--color-gray-300)",
                borderRadius: "15px",
                padding: "35px",
                display: "flex",
                alignItems: "flex-start",
                gap: "28px",
              }}
            >
              {/* Large number */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  flexShrink: 0,
                  width: "64px",
                  color: card.dark ? "rgba(255,255,255,0.15)" : "var(--color-gray-300)",
                }}
              >
                {card.number}
              </span>

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.25em",
                    color: card.dark ? "var(--color-white)" : "var(--color-dark)",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    lineHeight: "1.55em",
                    color: card.dark ? "rgba(255,255,255,0.6)" : "var(--color-gray-500)",
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OptimizeSection;
