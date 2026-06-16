import { useState } from "react";

const logos = [
  "United Way",
  "Language Line Solutions",
  "JPHRO",
  "Bòn Nouvèl",
  "RISE Haiti",
  "CARICOM",
  "Avocats Sans Frontières",
  "Diaspora Professionals",
];

interface MarqueeItemProps {
  name: string;
}

const MarqueeItem = ({ name }: MarqueeItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        opacity: hovered ? 0.95 : 0.45,
        transition: "opacity 0.25s ease, transform 0.25s ease",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        cursor: "default",
      }}
    >
      {/* Logo dot accent */}
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "9999px",
          background: "var(--color-haiti-red)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-roxborough)",
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: "var(--color-haiti-navy)",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  );
};

const ClientsSection = () => (
  <section
    id="clients"
    style={{
      width: "100%",
      padding: "130px 40px 0px 40px",
      background: "#ffffff",
      overflow: "hidden",
      position: "relative",
    }}
  >
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "45px",
          alignItems: "center",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Title text */}
        <p
          style={{
            fontFamily: "var(--font-roxborough)",
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 700,
            lineHeight: "1.3em",
            letterSpacing: "-0.01em",
            color: "var(--color-haiti-navy)",
            textAlign: "center",
            margin: 0,
          }}
        >
          Trusted by over 500+ students & partners across the world.
        </p>

        {/* Logos marquee */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div
            className="animate-marquee"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "90px",
              width: "max-content",
            }}
          >
            {/* Double list for loop */}
            {[...logos, ...logos].map((name, i) => (
              <MarqueeItem key={i} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ClientsSection;
