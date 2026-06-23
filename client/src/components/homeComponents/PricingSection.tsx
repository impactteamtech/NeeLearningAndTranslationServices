import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Checkmark SVGs ── */
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

/* ── Pricing Card ── */
const PricingCard = ({ plan }: PricingCardProps) => {
  const dark = plan.highlight;

  return (
    <div
      className={[
        "w-full flex flex-col gap-7 rounded-[20px] relative overflow-hidden",
        "transition-[transform,box-shadow] duration-300",
        "max-[580px]:px-6 max-[580px]:py-8",
        dark
          ? "bg-gradient-to-br from-[#080c18] via-[#0d1f7a] to-[#06439f] border-none shadow-[0_16px_48px_rgba(6,67,159,0.25)] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-[0_24px_60px_rgba(6,67,159,0.40)]"
          : "bg-white border-[1.5px] border-[rgba(6,67,159,0.12)] shadow-[0_4px_20px_rgba(6,67,159,0.04)] [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-[0_16px_40px_rgba(6,67,159,0.12)]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ padding: "clamp(24px,4vw,40px) clamp(20px,3vw,42px)" }}
    >
      {/* Glow blob for dark cards */}
      {dark && (
        <div
          aria-hidden="true"
          className="absolute -top-8 -right-8 w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(206,17,38,0.15)_0%,transparent_70%)] pointer-events-none z-0"
        />
      )}

      {/* Header */}
      <div className="flex flex-col gap-2.5 relative z-10">
        <span
          className={`font-sans text-[12px] font-bold tracking-[0.08em] uppercase ${
            dark ? "text-white/80" : "text-haiti-navy"
          }`}
        >
          {plan.name}
        </span>
        <div className="flex items-baseline gap-1">
          <span
            className={`font-roxborough font-extrabold tracking-[-0.04em] leading-[1.125] ${
              dark ? "text-white" : "text-haiti-navy"
            }`}
            style={{ fontSize: "clamp(40px,3.5vw,52px)" }}
          >
            {plan.price}
          </span>
          <span
            className={`font-sans text-base ${
              dark ? "text-white/55" : "text-[#6B7280]"
            }`}
          >
            {plan.period}
          </span>
        </div>
        <p
          className={`font-sans text-[14px] leading-[1.5] m-0 ${
            dark ? "text-white/70" : "text-[#6B7280]"
          }`}
        >
          {plan.desc}
        </p>
      </div>

      {/* Divider */}
      <div
        className={`h-px flex-shrink-0 relative z-10 ${
          dark ? "bg-white/15" : "bg-[rgba(6,67,159,0.12)]"
        }`}
      />

      {/* Feature list */}
      <div className="flex flex-col gap-[14px] flex-1 relative z-10">
        {plan.features.map((f, j) => (
          <div key={j} className="flex items-start gap-3">
            {dark ? <CheckMarkWhite /> : <CheckMark />}
            <span
              className={`font-sans text-[15px] leading-[1.45] ${
                dark ? "text-white/85" : "text-haiti-navy"
              }`}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10">
        {dark ? (
          <button className="w-full py-[14px] px-6 rounded-full font-sans text-[13px] font-bold tracking-[0.1em] uppercase cursor-pointer bg-white text-haiti-navy border-none shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-[transform,box-shadow,color] duration-[250ms] [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] [@media(hover:hover)]:hover:text-haiti-red">
            {plan.cta}
          </button>
        ) : (
          <Link
            to="/contact"
            className="inline-flex items-center text-center justify-center w-full rounded-full font-sans text-[13px] font-bold tracking-[0.12em] uppercase cursor-pointer border-2 border-transparent no-underline transition-[transform,box-shadow,color] duration-300 hover:-translate-y-[3px] active:-translate-y-[1px] group"
            style={{
              padding: "14px 24px",
              boxSizing: "border-box",
              background:
                "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #080c18 0%, #00209F 100%) border-box",
              color: "#080c18",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #080c18 0%, #0d1f7a 45%, #00209F 100%) padding-box, linear-gradient(135deg, #080c18 0%, #00209F 100%) border-box";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow =
                "0 10px 32px rgba(0,32,159,0.45), 0 3px 10px rgba(8,12,24,0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #080c18 0%, #00209F 100%) border-box";
              e.currentTarget.style.color = "#080c18";
              e.currentTarget.style.boxShadow = "none";
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
    <section
      id="pricing"
      ref={sectionRef}
      className="w-full bg-white relative overflow-hidden max-[580px]:px-5"
      style={{ padding: "40px 40px" }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,67,159,0.03)_0%,transparent_70%)] pointer-events-none z-0"
      />

      {/* Container */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10">
        {/* Grid */}
        <div
          className="flex flex-row items-start w-full max-[1024px]:flex-col max-[1024px]:gap-12"
          style={{ gap: "clamp(40px,8vw,120px)" }}
        >
          {/* Left col */}
          <div
            className={`max-w-[400px] flex flex-col gap-[35px] items-start flex-shrink-0 transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] max-[1024px]:max-w-full max-[1024px]:w-full ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
            }`}
          >
            {/* Header */}
            <div className="flex flex-col gap-[25px] items-start">
              <span className="inline-flex items-center gap-2 bg-[rgba(6,67,159,0.06)] border border-[rgba(6,67,159,0.15)] text-haiti-navy px-[14px] py-1 rounded-full font-sans text-[12px] font-bold tracking-[0.1em] uppercase">
                Our Pricing
              </span>
              <h2
                className="font-roxborough font-bold leading-[1.15] tracking-[-0.02em] text-haiti-navy m-0"
                style={{ fontSize: "clamp(32px,4.5vw,44px)" }}
              >
                We offer great and{" "}
                <em className="italic text-haiti-red">premium</em> prices.
              </h2>
            </div>

            <p className="font-sans text-base leading-[1.65] text-[#6B7280] m-0 text-left">
              Enjoy a free 30-day trial and explore everything our full service
              has to offer — no credit card required, no strings attached.
            </p>

            {/* Divider */}
            <div className="h-px bg-[rgba(6,67,159,0.12)] w-full" />

            {/* Bullet list */}
            <div className="flex flex-col gap-[15px]">
              {bulletItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckMark />
                  <span className="font-sans text-[15px] font-semibold text-haiti-navy leading-[1.45]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right col — pricing cards */}
          <div className="flex-1 grid grid-cols-1 min-[640px]:grid-cols-2 min-[1025px]:grid-cols-3 gap-5 w-full">
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
