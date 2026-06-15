import { useEffect, useRef, useState } from "react";

interface FeatureCardData {
  headline: string;
  body: string;
  point1Title: string;
  point1Body: string;
  point2Title: string;
  point2Body: string;
  top: string;
  imagePosition: "left" | "right";
  image: string;
  imageAlt: string;
}

const features: FeatureCardData[] = [
  {
    headline: "Designed for ease, built for real learning outcomes.",
    body: "Skip the confusion and experience structured language learning that works anytime, anywhere. Whether you're starting Kreyòl from scratch, improving English fluency, or helping your child, our programs adapt to your goals.",
    point1Title: "Safe, seamless, and always certified",
    point1Body: "All lessons are built by bilingual educators and certified translators. Your learning path is always guided, clear, and designed to last.",
    point2Title: "Track every milestone in real time",
    point2Body: "Instant progress tracking so you always know where you stand and what's coming next on your journey.",
    top: "130px",
    imagePosition: "left",
    image: "/choose-us-pictures/first-card.jpg",
    imageAlt: "Student studying language courses on a laptop with interactive lesson panels",
  },
  {
    headline: "Translate with precision, communicate with clarity.",
    body: "Get your documents translated instantly, without waiting. From legal papers to everyday forms, everything is handled smoothly, accurately, and with full cultural sensitivity.",
    point1Title: "Built with advanced, certified expertise",
    point1Body: "Your translations are handled by native speakers using rigorous review standards. Every word carries accuracy and cultural nuance.",
    point2Title: "Stay updated on every translation instantly",
    point2Body: "Get live notifications on your document's progress from submission to final delivery.",
    top: "170px",
    imagePosition: "right",
    image: "/choose-us-pictures/second-card (1).jpg",
    imageAlt: "Document translation preview with professional verification checkmarks",
  },
  {
    headline: "Understand your progress and act with real confidence.",
    body: "Get a clear view of your language journey without overcomplicating your workflow. From tracking performance to spotting patterns, everything is designed to help you move forward with clarity.",
    point1Title: "Clear insights, no more guesswork at all",
    point1Body: "Understand what's happening at a glance. Focus on what matters most and make informed decisions without getting lost in unnecessary complexity.",
    point2Title: "Track every session in real time easily",
    point2Body: "Stay updated as things evolve. Monitor your progress instantly and keep moving in the right direction.",
    top: "210px",
    imagePosition: "left",
    image: "/choose-us-pictures/third-card (3).jpg",
    imageAlt: "Student learning dashboard displaying completed lessons and milestones",
  },
];

const PointCheck = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ flexShrink: 0, marginTop: "2px" }}
  >
    <circle
      cx="10"
      cy="10"
      r="10"
      fill="rgba(206, 17, 38, 0.08)"
    />
    <path
      d="M6 10l2.8 2.8 5-5"
      stroke="var(--color-haiti-red)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureCard = ({ f, visible, delay }: { f: FeatureCardData; visible: boolean; delay: number }) => {
  const isRight = f.imagePosition === "right";

  return (
    <div
      className={`why-choose-card ${isRight ? "why-choose-card--reverse" : ""} ${visible ? "why-choose-card--visible" : ""}`}
      style={{
        top: f.top,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="why-choose-card__image-container">
        <img
          src={f.image}
          alt={f.imageAlt}
          loading="lazy"
          className="why-choose-card__image"
        />
      </div>

      <div className="why-choose-card__content">
        {/* Main headline */}
        <h3 className="why-choose-card__headline">{f.headline}</h3>

        {/* Main body */}
        <p className="why-choose-card__body">{f.body}</p>

        {/* Two bullet points */}
        <div className="why-choose-card__points">
          {[
            { title: f.point1Title, body: f.point1Body },
            { title: f.point2Title, body: f.point2Body },
          ].map((pt, j) => (
            <div key={j} className="why-choose-card__point">
              <PointCheck />
              <div>
                <h4 className="why-choose-card__point-title">{pt.title}</h4>
                <p className="why-choose-card__point-body">{pt.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WhyChooseSection = () => {
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
    <section id="why-choose" className="why-choose-section" ref={sectionRef}>
      {/* Radial glow background */}
      <div aria-hidden="true" className="why-choose-section__bg-glow" />

      {/* Container */}
      <div className="section-container why-choose-section__inner">
        {/* Headline */}
        <div className={`why-choose-section__header ${visible ? "why-choose-section__header--visible" : ""}`}>
          {/* Label Pill */}
          <span className="why-choose-section__badge">
            Why Choose Nee's?
          </span>

          <h2 className="why-choose-section__heading">
            A few reasons <em className="why-choose-section__heading-italic">why</em> our clients choose us first.
          </h2>
        </div>

        {/* FeatureCards */}
        <div className="why-choose-section__cards-list">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} visible={visible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
