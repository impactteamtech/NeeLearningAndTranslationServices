import { useState } from "react";
import { Link } from "react-router-dom";

const CheckMark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="9" cy="9" r="9" fill="rgba(206, 17, 38, 0.08)" />
    <path d="M5 9l2.8 2.8 5-5" stroke="var(--color-haiti-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckMarkWhite = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.15)" />
    <path d="M5 9l2.8 2.8 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

interface PricingCardProps {
  plan: (typeof plans)[0];
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const [hovered, setHovered] = useState(false);
  const dark = plan.highlight;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "40px 32px",
        borderRadius: "20px",
        background: dark
          ? "linear-gradient(135deg, #080c18 0%, #0d1f7a 45%, #06439f 100%)"
          : "#ffffff",
        border: dark ? "none" : "1.5px solid rgba(6,67,159,0.12)",
        gap: "28px",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: dark
          ? hovered
            ? "0 24px 60px rgba(6,67,159,0.40)"
            : "0 16px 48px rgba(6,67,159,0.25)"
          : hovered
            ? "0 16px 40px rgba(6,67,159,0.12)"
            : "0 4px 20px rgba(6,67,159,0.04)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow for dark cards */}
      {dark && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(206,17,38,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Plan header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,0.8)" : "var(--color-haiti-navy)",
          }}
        >
          {plan.name}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
          <span
            style={{
              fontFamily: "var(--font-roxborough)",
              fontSize: "52px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: "1.125em",
              color: dark ? "#ffffff" : "var(--color-haiti-navy)",
            }}
          >
            {plan.price}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              color: dark ? "rgba(255,255,255,0.55)" : "var(--color-gray-500)",
            }}
          >
            {plan.period}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            lineHeight: "1.5em",
            color: dark ? "rgba(255,255,255,0.7)" : "var(--color-gray-500)",
            margin: 0,
          }}
        >
          {plan.desc}
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: dark ? "rgba(255,255,255,0.15)" : "rgba(6,67,159,0.12)",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, position: "relative", zIndex: 1 }}>
        {plan.features.map((f, j) => (
          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            {dark ? <CheckMarkWhite /> : <CheckMark />}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                lineHeight: "1.45em",
                color: dark ? "rgba(255,255,255,0.85)" : "var(--color-haiti-navy)",
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {dark ? (
          <button
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: "9999px",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, background 0.25s ease",
              background: "#ffffff",
              color: "var(--color-haiti-navy)",
              border: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
              el.style.color = "var(--color-haiti-red)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
              el.style.color = "var(--color-haiti-navy)";
            }}
          >
            {plan.cta}
          </button>
        ) : (
          <Link
            to="/contact"
            className="btn-outline"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 24px",
            }}
          >
            {plan.cta}
          </Link>
        )}
      </div>
    </div>
  );
};

const PricingSection = () => (
  <section
    id="pricing"
    style={{
      width: "100%",
      padding: "180px 40px 0 40px",
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "10%",
        right: "-10%",
        width: "600px",
        height: "600px",
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
          gap: "120px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Left ContentWrapper */}
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
          {/* TextWrapper */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "flex-start" }}>
            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "flex-start" }}>
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
                Our Pricing
              </span>

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
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(32px, 4.5vw, 44px)",
                    fontWeight: 700,
                    lineHeight: "1.15em",
                    letterSpacing: "-0.02em",
                    color: "var(--color-haiti-navy)",
                  }}
                >
                  We
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
                  offer
                </span>
                {["great", "and", "premium", "prices."].map(w => (
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
            </div>

            {/* Body paragraph */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                lineHeight: "1.65em",
                color: "var(--color-gray-500)",
                margin: 0,
              }}
            >
              Enjoy a free 30-day trial and explore everything our full service has to offer — no credit card required, no strings attached.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(6, 67, 159, 0.12)",
              width: "100%",
            }}
          />

          {/* BulletList */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {bulletItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckMark />
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--color-haiti-navy)",
                    lineHeight: "1.45em",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PricingTable cards list */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "24px",
          }}
        >
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
