import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";


const services = [
  {
    title: "Language Learning",
    desc: "Structured Haitian Kreyòl and English courses designed for beginners to advanced learners of all ages.",
    link: "/services",
    dark: true,
  },
  {
    title: "Translation Services",
    desc: "Professional Kreyòl–English translation for documents, legal papers, medical records, and business content.",
    link: "/services",
    dark: false,
  },
  {
    title: "Cultural Integration",
    desc: "Programs and workshops to help individuals and families navigate cultural transitions with confidence.",
    link: "/services",
    dark: true,
  },
];

/** Grid icon matching Framer's icon style in service cards */
const ServiceIcon = ({ dark }: { dark: boolean }) => (
  <div
    style={{
      width: "52px",
      height: "52px",
      borderRadius: "12px",
      background: dark ? "rgba(255,255,255,0.12)" : "var(--color-gray-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2" fill={dark ? "#4FACFE" : "#1A3B50"} />
      <rect x="15" y="2" width="9" height="9" rx="2" fill={dark ? "#4FACFE" : "#1A3B50"} opacity="0.45" />
      <rect x="2" y="15" width="9" height="9" rx="2" fill={dark ? "#4FACFE" : "#1A3B50"} opacity="0.45" />
      <rect x="15" y="15" width="9" height="9" rx="2" fill={dark ? "#4FACFE" : "#1A3B50"} />
    </svg>
  </div>
);

const ServicesSection = () => (
  <section
    id="services"
    style={{
      width: "100%",
      padding: "160px 40px 0px 40px",
      background: "var(--color-gray-100)",
    }}
  >
    {/* Container — max 1240px, horizontal stack */}
    <div
      style={{
        width: "100%",
        maxWidth: "1240px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* MainWrapper — full width, vertical, gap 60px */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "60px",
          width: "100%",
        }}
      >
        {/* ContentWrapper — gap 56px, center */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "56px",
            width: "100%",
          }}
        >
          {/* Headline — max 650px, gap 15px */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              maxWidth: "650px",
              textAlign: "center",
            }}
          >
            {/* /Paragraph/Label — "What We Do" */}
            <span className="t-label">What We Do</span>

            {/* Title — word-wrap inline, italic: "specifically" */}
            <h2
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0px 11px",
              }}
            >
              {["Our", "services", "are"].map(w => (
                <span key={w} className="t-d2">{w}</span>
              ))}
              <span className="t-d2i">specifically</span>
              {["designed", "to", "meet", "your", "needs."].map(w => (
                <span key={w} className="t-d2">{w}</span>
              ))}
            </h2>
          </div>

          {/* ServiceCards — grid 3 columns, gap 35px */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "35px",
              width: "100%",
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                style={{
                  background: s.dark ? "var(--color-dark)" : "var(--color-white)",
                  borderRadius: "15px",
                  border: s.dark ? "none" : "1px solid var(--color-gray-300)",
                  padding: "40px 35px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <ServiceIcon dark={s.dark} />

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.25em",
                    color: s.dark ? "var(--color-white)" : "var(--color-dark)",
                  }}
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: "1.5em",
                    color: s.dark ? "rgba(255,255,255,0.62)" : "var(--color-gray-500)",
                    flex: 1,
                  }}
                >
                  {s.desc}
                </p>

                {/* "Learn More" ghost arrow link */}
                <Link
                  to={s.link}
                  className="btn-ghost"
                  style={{
                    color: s.dark ? "var(--color-framer-blue)" : "var(--color-dark)",
                    fontSize: "17px",
                  }}
                >
                  Learn More
                  <IoIosArrowRoundForward style={{ width: "22px", height: "22px", flexShrink: 0 }} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ServiceCta — gap 25px, center */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
            textAlign: "center",
          }}
        >
          <p className="t-body" style={{ textAlign: "center" }}>
            From strategy to execution, explore what we can do for you.
          </p>
          <Link to="/services" className="btn-ghost">
            Learn More
            <IoIosArrowRoundForward style={{ width: "22px", height: "22px" }} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
