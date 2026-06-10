
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

const ClientsSection = () => (
  <section
    id="clients"
    style={{
      width: "100%",
      padding: "130px 40px 0px 40px",
      background: "var(--color-gray-100)",
      overflow: "hidden",
    }}
  >
    {/* Container — max 1240px */}
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
      {/* MainWrapper — 1fr, vertical, gap 45px, center, overflow hidden */}
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
        {/* /Heading/Heading 6 — 18px */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "1.3em",
            letterSpacing: "-0.02em",
            color: "var(--color-dark)",
            textAlign: "center",
          }}
        >
          Trusted by over 500+ students & partners across the world.
        </p>

        {/* Logos — animated marquee */}
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
            {/* Double the list for seamless loop */}
            {[...logos, ...logos].map((name, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  opacity: 0.45,
                }}
              >
                {/* Logo dot accent */}
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    background: "var(--color-brand-sky)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    color: "var(--color-dark)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ClientsSection;
