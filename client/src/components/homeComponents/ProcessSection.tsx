import { useEffect, useRef, useState } from "react";

interface AccordionItem {
  title: string;
  body: string;
}

const accordionItems: AccordionItem[] = [
  {
    title: "Structured path to fluency",
    body: "We design thoughtful systems that reduce complexity, improve performance, and help students move faster with clarity.",
  },
  {
    title: "Expert cultural context",
    body: "We shape lessons and translations into culturally authentic communications, simplifying the learning curve for native accuracy.",
  },
  {
    title: "Certified accuracy & trust",
    body: "We develop educational curriculums and certified documents that ensure you navigate academic, professional, and legal goals with confidence.",
  },
];

const Accordion = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div className="process-accordion">
      {accordionItems.map((item, i) => {
        const isOpen = openIdx === i;
        const panelId = `accordion-panel-${i}`;
        const triggerId = `accordion-trigger-${i}`;

        return (
          <div key={i} className="process-accordion__item">
            {/* Top border for first item only */}
            {i === 0 && <div className="process-accordion__divider" />}
            
            <button
              id={triggerId}
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="process-accordion__trigger"
            >
              <span className="process-accordion__title">
                {item.title}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="process-accordion__icon"
              >
                <path
                  d="M10 4v12M4 10h12"
                  stroke="var(--color-haiti-red)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`process-accordion__panel-wrapper ${isOpen ? "process-accordion__panel-wrapper--open" : ""}`}
            >
              <div className="process-accordion__panel">
                <p className="process-accordion__body">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ProcessSection = () => {
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
    <section id="process" className="process-section" ref={sectionRef}>
      {/* Subtle radial glow */}
      <div aria-hidden="true" className="process-section__bg-glow" />

      {/* Container */}
      <div className="section-container process-section__inner">
        {/* MainWrapper */}
        <div className="process-section__grid">
          {/* Image wrapper */}
          <div className="process-section__image-wrap">
            <img
              src="/process-section.jpg"
              alt="Professional classroom and student learning environment"
              loading="lazy"
              decoding="async"
              className="process-section__image border border-blue-700/20 shadow-xs"
            />
          </div>

          {/* ContentWrapper */}
          <div
            className={`process-section__content ${visible ? "process-section__content--visible" : ""}`}
          >
            {/* TextWrapper */}
            <div className="process-section__header">
              {/* Title */}
              <h2 className="process-section__heading">
                We make learning <em className="process-section__heading-italic">stress free</em> so you have the perfect control.
              </h2>

              {/* Paragraph body */}
              <p className="process-section__subtext">
                Our team delivers fast, reliable, and student-focused solutions designed to simplify the learning journey and enhance everyday experiences. With a strong focus on adaptability and innovation, we turn complex challenges into seamless, intuitive results.
              </p>
            </div>

            {/* Accordion */}
            <Accordion />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
