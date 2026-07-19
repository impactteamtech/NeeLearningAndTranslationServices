import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const processCards = [
  {
    number: "01",
    title: "Placement",
    desc: "Begin with a personal language assessment or upload your documents. We evaluate learning goals and translation needs immediately.",
    dark: false,
  },
  {
    number: "02",
    title: "Native Translation",
    desc: "Certified translators draft accurate documents, while bilingual educators construct customized curriculum plans for your lessons.",
    dark: true,
  },
  {
    number: "03",
    title: "Expert Review",
    desc: "Translations undergo peer review to ensure cultural nuance, while language learners engage in active conversational coaching.",
    dark: false,
  },
  {
    number: "04",
    title: "Secure Delivery & Milestones",
    desc: "Receive securely delivered, certified translation papers, or reach verified Haitian Creole conversational fluency milestones.",
    dark: true,
  },
];

interface ProcessCardProps {
  number?: string;
  title?: string;
  desc?: string;
  dark?: boolean;
}

/* ── Process Card ── */
const ProcessCard = ({
  number = "00",
  title = "Workflow Step",
  desc = "",
  dark = false,
}: ProcessCardProps) => (
  <div
    className={[
      "rounded-[20px] flex items-start gap-7 relative overflow-hidden",
      "transition-[transform,box-shadow] duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
      "max-[580px]:gap-4",
      dark
        ? "bg-gradient-to-br from-[#080c18] via-[#0d1f7a] to-[#06439f] border-none shadow-[0_12px_40px_rgba(6,67,159,0.22)] [@media(hover:hover)]:hover:shadow-[0_20px_60px_rgba(6,67,159,0.36)] [@media(hover:hover)]:hover:-translate-y-1"
        : "bg-white border-[1.5px] border-[rgba(6,67,159,0.12)] shadow-[0_4px_20px_rgba(6,67,159,0.05)] [@media(hover:hover)]:hover:shadow-[0_12px_36px_rgba(6,67,159,0.12)] [@media(hover:hover)]:hover:-translate-y-1",
    ]
      .filter(Boolean)
      .join(" ")}
    style={{ padding: "clamp(24px,4vw,36px)" }}
  >
    {/* Glow blob — dark cards */}
    {dark && (
      <div
        aria-hidden="true"
        className="absolute -top-8 -right-8 w-[160px] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(206,17,38,0.15)_0%,transparent_70%)] pointer-events-none z-0"
      />
    )}

    {/* Large index number */}
    <span
      aria-hidden="true"
      className={`font-roxborough font-extrabold tracking-[-0.05em] leading-none flex-shrink-0 w-16 relative z-10 max-[580px]:w-12 transition-colors duration-300 ${
        dark ? "text-[rgba(206,17,38,0.35)]" : "text-[rgba(206,17,38,0.15)]"
      }`}
      style={{ fontSize: "clamp(2.5rem,4vw,3.5rem)" }}
    >
      {number}
    </span>

    {/* Text */}
    <div className="flex flex-col gap-2.5 relative z-10">
      <h3
        className={`font-roxborough font-bold tracking-[-0.01em] leading-[1.25] m-0 break-words ${
          dark ? "text-white" : "text-haiti-navy"
        }`}
        style={{ fontSize: "clamp(18px,2.5vw,22px)" }}
      >
        {title}
      </h3>
      <p
        className={`font-sans text-[15px] leading-[1.6] m-0 break-words ${
          dark ? "text-white/[0.72]" : "text-[#6B7280]"
        }`}
      >
        {desc}
      </p>
    </div>
  </div>
);

/* ─── Section ─── */
const OptimizeSection = () => {
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
      id="optimize"
      ref={sectionRef}
      className="w-full bg-white relative overflow-hidden max-[580px]:px-5"
      style={{
        padding: "clamp(80px,12vw,160px) 40px",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,67,159,0.03)_0%,transparent_70%)] pointer-events-none z-0"
      />

      {/* Container */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10">
        {/* Grid */}
        <div
          className="flex flex-row items-start w-full max-[1024px]:flex-col max-[1024px]:gap-12"
          style={{ gap: "clamp(40px,6vw,80px)" }}
        >
          {/* Left col — sticky header */}
          <div
            className={`sticky top-[125px] flex-1 flex flex-col gap-[35px] items-start z-10 transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] max-[1024px]:relative max-[1024px]:top-auto max-[1024px]:w-full ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
            }`}
          >
            {/* Header */}
            <div className="flex flex-col gap-[25px] items-start">
              <h2
                className="font-roxborough font-bold leading-[1.15] tracking-[-0.02em] text-haiti-navy m-0"
                style={{ fontSize: "clamp(32px,4.5vw,44px)" }}
              >
                We refine{" "}
                <em className="italic text-haiti-red">flows</em> that turn ideas
                into results.
              </h2>
              <p className="font-sans text-base leading-[1.65] text-[#6B7280] m-0 text-left">
                We believe that every successful program starts with a clear
                structure and focused strategy. That's why we've built a
                four-step workflow designed to guide your learning from raw ideas
                to a refined, high-impact outcome.
              </p>
            </div>

            <Link
              to="/services"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-br from-[#080c18] via-[#0d1f7a] to-[#00209F] text-white py-[15px] px-[34px] rounded-full font-sans text-[13px] font-bold tracking-[0.12em] uppercase cursor-pointer border-none transition-[transform,box-shadow] duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap no-underline shadow-[0_4px_20px_rgba(0,32,159,0.40),0_1px_6px_rgba(8,12,24,0.30),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,32,159,0.55),0_4px_12px_rgba(8,12,24,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.3)] active:-translate-y-[1px] overflow-hidden"
            >
              {/* Smooth Hover Gradient Overlay */}
              <span className="absolute inset-0 bg-gradient-to-br from-[#001278] via-[#00209F] to-[#1a3aff] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full z-0" />

              {/* Shimmer / Glint Effect on Hover */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-[1000ms] ease-out pointer-events-none z-0" />

              {/* Text content - placed above overlays */}
              <span className="relative z-10">More Details</span>

              {/* Arrow container - scaled and backgrounds transitioned */}
              <span className="relative overflow-hidden rounded-full w-[38px] h-[38px] bg-white/[0.14] group-hover:bg-white/[0.24] group-hover:scale-105 flex items-center justify-center flex-shrink-0 transition-[background-color,transform] duration-300 z-10">
                <IoIosArrowRoundForward
                  className="absolute w-[22px] h-[22px] text-white transition-transform duration-300 ease-in-out translate-x-0 group-hover:translate-x-10"
                />
                <IoIosArrowRoundForward
                  className="absolute w-[22px] h-[22px] text-white transition-transform duration-300 ease-in-out -translate-x-10 group-hover:translate-x-0"
                />
              </span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col gap-[35px]">
            {processCards.map((card, i) => (
              <ProcessCard key={i} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizeSection;
