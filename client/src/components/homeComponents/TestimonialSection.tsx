

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1.39l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.1l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.39z"
      fill="var(--color-brand-sky)"
    />
  </svg>
);

const TestimonialSection = () => (
  <section
    id="testimonials"
    style={{
      width: "100%",
      padding: "220px 40px 160px 40px",
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
      {/* MainWrapper — horizontal, gap 80px, center */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          alignItems: "center",
          width: "100%",
        }}
      >

        {/* ImageWrapper — max 580px, vertical, gap 70px, center */}
        <div
          style={{
            maxWidth: "580px",
            display: "flex",
            flexDirection: "column",
            gap: "70px",
            alignItems: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Background — 580x525 /Gray 200 borderRadius 15px */}
          <div
            style={{
              width: "580px",
              height: "525px",
              background: "var(--color-gray-200)",
              borderRadius: "15px",
              overflow: "clip",
              position: "relative",
            }}
          >
            {/* Person image — absolute, 361x620, bottom 0, center X, zIndex 1 */}
            <img
              src="https://framerusercontent.com/images/ApIWUGszZxDGSijwfglaSJU36f0.png"
              alt="Happy student"
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "361px",
                height: "620px",
                objectFit: "cover",
                objectPosition: "top",
                zIndex: 1,
                display: "block",
              }}
            />
          </div>

          {/* CounterCard — absolute, bottom 22, left 22, glass, padding 17px */}
          <div
            style={{
              position: "absolute",
              bottom: "22px",
              left: "22px",
              background: "rgba(255,255,255,0.70)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: "15px",
              padding: "17px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "15px",
              zIndex: 2,
              boxShadow: "0 4px 24px rgba(26,59,80,0.12)",
            }}
          >
            {/* Count — vertical, gap 2px */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {/* Counter number — "2500+" */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "30px",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1em",
                  color: "var(--color-dark)",
                }}
              >
                2500+
              </span>
              {/* /Paragraph/Body — "Happy Clients" */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  lineHeight: "1.5em",
                  color: "var(--color-gray-500)",
                }}
              >
                Happy Clients
              </span>
            </div>
          </div>
        </div>

        {/* ContentWrapper — 1fr, vertical, gap 40px, align start, overflow clip */}
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
          {/* TextWrapper — vertical, gap 30px */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px", overflow: "clip", width: "100%" }}>

            {/* Rating — 5 stars, gap 8px */}
            <div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>

            {/* TestimonialText — max 500px, vertical, gap 25px */}
            <div
              style={{
                maxWidth: "500px",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
              }}
            >
              {/* /Paragraph/Blockquote — 30px, -0.03em */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "30px",
                  fontWeight: 600,
                  lineHeight: "1.2em",
                  letterSpacing: "-0.03em",
                  color: "var(--color-dark)",
                }}
              >
                "Nee's helped us communicate more effectively & turn language barriers into bridges of opportunity."
              </p>

              {/* /Paragraph/Body — 18px */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  lineHeight: "1.5em",
                  color: "var(--color-gray-500)",
                }}
              >
                "Working with Nee's Learning & Translation Services was an absolute pleasure. They managed every stage of our program and their attention to cultural detail ensured a flawless final result that exceeded our expectations."
              </p>
            </div>
          </div>

          {/* Border — 1px /Gray 300 */}
          <div className="divider" />

          {/* AuthorInfo — horizontal, gap 19px */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "19px", overflow: "clip" }}>
            {/* Author photo — 70x70 borderRadius 70px */}
            <img
              src="https://framerusercontent.com/images/dQAcvt53XxCI90ObdM8wXH7wic.jpg"
              alt="Marie Larose"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "70px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            {/* TextWrapper — vertical, gap 5px */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {/* /Heading/Heading 5 — 20px */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: "1.275em",
                  letterSpacing: "-0.02em",
                  color: "var(--color-dark)",
                }}
              >
                Marie Larose
              </span>
              {/* /Paragraph/Body — 18px muted */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  lineHeight: "1.5em",
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

export default TestimonialSection;
