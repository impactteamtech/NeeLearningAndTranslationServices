import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const processCards = [
  {
    number: "01",
    title: "Intake & Placement",
    desc: "Begin with a personal language assessment or upload your documents. We evaluate learning goals and translation needs immediately.",
    dark: false,
  },
  {
    number: "02",
    title: "Native Translation & Curriculums",
    desc: "Certified translators draft accurate documents, while bilingual educators construct customized curriculum plans for your lessons.",
    dark: true,
  },
  {
    number: "03",
    title: "Expert Review & Coaching",
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

const ProcessCard = ({
  number = "00",
  title = "Workflow Step",
  desc = "",
  dark = false,
}: ProcessCardProps) => {
  return (
    <div
      className={`optimize-card ${dark ? "optimize-card--dark" : "optimize-card--light"}`}
    >
      {/* Glow decorative blob for dark cards */}
      {dark && <div aria-hidden="true" className="optimize-card__glow" />}

      {/* Large index number (decorative background digit) */}
      <span aria-hidden="true" className="optimize-card__number">
        {number}
      </span>

      {/* Text wrapper */}
      <div className="optimize-card__text-wrap">
        <h3 className="optimize-card__title">
          {title}
        </h3>
        <p className="optimize-card__desc">
          {desc}
        </p>
      </div>
    </div>
  );
};

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
    <section id="optimize" className="optimize-section" ref={sectionRef}>
      {/* Background glow */}
      <div aria-hidden="true" className="optimize-section__bg-glow" />

      {/* Container */}
      <div className="section-container optimize-section__inner">
        {/* MainWrapper */}
        <div className="optimize-section__grid">
          {/* Left column ContentWrapper - Sticky */}
          <div
            className={`optimize-section__left-col ${visible ? "optimize-section__left-col--visible" : ""}`}
          >
            {/* TextWrapper */}
            <div className="optimize-section__header">
              {/* Title */}
              <h2 className="optimize-section__heading">
                We refine <em className="optimize-section__heading-italic">flows</em> that turn ideas into results.
              </h2>

              {/* Body paragraph */}
              <p className="optimize-section__subtext">
                We believe that every successful program starts with a clear structure and focused strategy. That's why we've built a four-step workflow designed to guide your learning from raw ideas to a refined, high-impact outcome.
              </p>
            </div>

            {/* Button CTA */}
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

          {/* Right column ProcessCards wrapper */}
          <div className="optimize-section__right-col">
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
