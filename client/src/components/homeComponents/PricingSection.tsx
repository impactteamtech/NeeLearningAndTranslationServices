import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CheckMark = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: "1px" }}
  >
    <circle cx="9" cy="9" r="9" fill="rgba(206, 17, 38, 0.08)" />
    <path
      d="M5 9l2.8 2.8 5-5"
      stroke="var(--color-haiti-red)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckMarkWhite = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: "1px" }}
  >
    <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.15)" />
    <path
      d="M5 9l2.8 2.8 5-5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
  const dark = plan.highlight;

  return (
    <div
      className={`pricing-card ${dark ? "pricing-card--dark" : "pricing-card--light"}`}
    >
      {/* Subtle glow for dark cards */}
      {dark && <div aria-hidden="true" className="pricing-card__glow" />}

      {/* Plan header */}
      <div className="pricing-card__header">
        <span className="pricing-card__name">
          {plan.name}
        </span>
        <div className="pricing-card__price-wrap">
          <span className="pricing-card__price">
            {plan.price}
          </span>
          <span className="pricing-card__period">
            {plan.period}
          </span>
        </div>
        <p className="pricing-card__desc">
          {plan.desc}
        </p>
      </div>

      {/* Divider */}
      <div className="pricing-card__divider" />

      {/* Feature list */}
      <div className="pricing-card__features">
        {plan.features.map((f, j) => (
          <div key={j} className="pricing-card__feature">
            {dark ? <CheckMarkWhite /> : <CheckMark />}
            <span className="pricing-card__feature-text">
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="pricing-card__cta-wrap">
        {dark ? (
          <button className="pricing-card__cta-button">
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

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>
      {/* Background glow */}
      <div aria-hidden="true" className="pricing-section__bg-glow" />

      {/* Container */}
      <div className="section-container pricing-section__inner">
        {/* MainWrapper */}
        <div className="pricing-section__grid">
          {/* Left ContentWrapper */}
          <div
            className={`pricing-section__left-col ${visible ? "pricing-section__left-col--visible" : ""}`}
          >
            {/* TextWrapper */}
            <div className="pricing-section__header">
              <span className="pricing-section__badge">
                Our Pricing
              </span>

              {/* Title */}
              <h2 className="pricing-section__heading">
                We offer great and <em className="pricing-section__heading-italic">premium</em> prices.
              </h2>
            </div>

            {/* Body paragraph */}
            <p className="pricing-section__subtext">
              Enjoy a free 30-day trial and explore everything our full service has to offer — no credit card required, no strings attached.
            </p>

            {/* Divider */}
            <div className="pricing-section__divider" />

            {/* BulletList */}
            <div className="pricing-section__bullet-list">
              {bulletItems.map((item, i) => (
                <div key={i} className="pricing-section__bullet-item">
                  <CheckMark />
                  <span className="pricing-section__bullet-text">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PricingTable cards list */}
          <div className="pricing-section__right-col">
            {plans.map((plan, i) => (
              <PricingCard key={i} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
