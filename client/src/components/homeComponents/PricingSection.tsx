

const CheckMark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="9" cy="9" r="9" fill="rgba(26,59,80,0.08)" />
    <path d="M5 9l2.8 2.8 5-5" stroke="var(--color-dark)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckMarkWhite = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.15)" />
    <path d="M5 9l2.8 2.8 5-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const bulletItems = [
  "Certified, expert-led instruction.",
  "Real-time translation tracking.",
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Perfect for individuals beginning their language journey.",
    features: [
      "2 live sessions/week",
      "Access to course library",
      "Email support",
      "Progress tracking",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    desc: "Ideal for learners who want to accelerate their progress.",
    features: [
      "5 live sessions/week",
      "Priority translation support",
      "Phone & email support",
      "Personalized learning plan",
      "Cultural integration workshop",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Business",
    price: "$199",
    period: "/month",
    desc: "For organizations needing full translation and training.",
    features: [
      "Unlimited sessions",
      "Dedicated account manager",
      "Bulk document translation",
      "Team training workshops",
      "Custom integration programs",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

const PricingSection = () => (
  <section
    id="pricing"
    style={{
      width: "100%",
      padding: "180px 40px 0px 40px",
      background: "var(--color-gray-100)",
    }}
  >
    {/* Container — max 1240px horizontal */}
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
      {/* MainWrapper — horizontal, gap 120px, align start */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "120px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* ContentWrapper — max 400px, vertical, gap 35px */}
        <div
          style={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            alignItems: "flex-start",
            flexShrink: 0,
          }}
        >
          {/* TextWrapper — gap 25px */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "flex-start" }}>

            {/* Headline — gap 15px */}
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "flex-start" }}>
              <span className="t-label">Our Pricing</span>

              {/* Title — wrapping, "offer" italic */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  gap: "0px 11px",
                }}
              >
                <span className="t-d2">We</span>
                <span className="t-d2i">offer</span>
                {["great", "and", "premium", "prices."].map(w => (
                  <span key={w} className="t-d2">{w}</span>
                ))}
              </div>
            </div>

            {/* Body */}
            <p className="t-body">
              Enjoy a free 30-day trial and explore everything our full service has to offer — no credit card required, no strings attached.
            </p>
          </div>

          {/* Border — /Gray 300 */}
          <div className="divider" />

          {/* BulletList — gap 15px */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {bulletItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <CheckMark />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--color-dark)",
                    lineHeight: "1.45em",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PricingTable — 3 cards side by side */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "25px",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "35px 30px",
                borderRadius: "15px",
                background: plan.highlight ? "var(--color-dark)" : "var(--color-white)",
                border: plan.highlight ? "none" : "1px solid var(--color-gray-300)",
                gap: "28px",
              }}
            >
              {/* Plan header */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: plan.highlight ? "var(--color-framer-blue)" : "var(--color-gray-500)",
                  }}
                >
                  {plan.name}
                </span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "52px",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: "1.125em",
                      color: plan.highlight ? "var(--color-white)" : "var(--color-dark)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "16px",
                      color: plan.highlight ? "rgba(255,255,255,0.55)" : "var(--color-gray-500)",
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    lineHeight: "1.5em",
                    color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--color-gray-500)",
                  }}
                >
                  {plan.desc}
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: plan.highlight ? "rgba(255,255,255,0.15)" : "var(--color-gray-300)",
                  flexShrink: 0,
                }}
              />

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    {plan.highlight ? <CheckMarkWhite /> : <CheckMark />}
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "15px",
                        lineHeight: "1.45em",
                        color: plan.highlight ? "rgba(255,255,255,0.8)" : "var(--color-dark)",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <button
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: "9999px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  background: plan.highlight ? "transparent" : "var(--color-brand-navy)",
                  color: plan.highlight ? "white" : "white",
                  border: plan.highlight ? "1.5px solid rgba(255,255,255,0.3)" : "none",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  if (plan.highlight) {
                    el.style.background = "rgba(255,255,255,0.1)";
                  } else {
                    el.style.background = "var(--color-primary-h)";
                    el.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = plan.highlight ? "transparent" : "var(--color-brand-navy)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
