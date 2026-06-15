import { useEffect, useRef, useState } from "react";

/* ─── Types ─── */
interface Testimonial {
  id: string;
  quote: string;
  body: string;
  authorName: string;
  authorRole: string;
  authorPhoto: string;
  personImage: string;
  personImageAlt: string;
}

/* ─── Data — module-level constant, never re-allocated ─── */
const testimonials: Testimonial[] = [
  {
    id: "marie-larose",
    quote:
      "Nee's helped us communicate more effectively & turn language barriers into bridges of opportunity.",
    body: "Working with Nee's Learning & Translation Services was an absolute pleasure. They managed every stage of our program and their attention to cultural detail ensured a flawless final result that exceeded our expectations.",
    authorName: "Marie Larose",
    authorRole: "Community Integration Specialist",
    authorPhoto:
      "https://framerusercontent.com/images/dQAcvt53XxCI90ObdM8wXH7wic.jpg",
    personImage:
      "https://framerusercontent.com/images/ApIWUGszZxDGSijwfglaSJU36f0.png",
    personImageAlt: "Marie Larose, happy client of Nee's Learning & Translation",
  },
  {
    id: "jean-pierre",
    quote:
      "The translation quality was outstanding — every cultural nuance was preserved with remarkable precision.",
    body: "Our legal documents were handled with the utmost professionalism. The team understood not just the words, but the intent behind every clause. I would recommend Nee's to anyone navigating the Haitian diaspora.",
    authorName: "Jean-Pierre Moreau",
    authorRole: "Legal Advisor, Avocats Sans Frontières",
    authorPhoto:
      "https://framerusercontent.com/images/dQAcvt53XxCI90ObdM8wXH7wic.jpg",
    personImage:
      "https://framerusercontent.com/images/ApIWUGszZxDGSijwfglaSJU36f0.png",
    personImageAlt:
      "Jean-Pierre Moreau, legal advisor and satisfied client of Nee's",
  },
  {
    id: "sophia-charles",
    quote:
      "My children are now thriving in school — the Kreyòl lessons gave them the confidence they needed.",
    body: "As a Haitian mother living abroad, I was worried about my children losing their roots. Nee's structured learning program gave them language skills AND cultural pride. The instructors are patient, passionate, and truly gifted.",
    authorName: "Sophia Charles",
    authorRole: "Parent & Language Learner",
    authorPhoto:
      "https://framerusercontent.com/images/dQAcvt53XxCI90ObdM8wXH7wic.jpg",
    personImage:
      "https://framerusercontent.com/images/ApIWUGszZxDGSijwfglaSJU36f0.png",
    personImageAlt: "Sophia Charles, parent and language learner at Nee's",
  },
];

/* ─── Star icon ─── */
const StarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 1.39l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.1l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.39z"
      fill="#FFA800"
    />
  </svg>
);

/* ─── Dot nav indicator ─── */
const DotNav = ({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) => (
  <div className="testimonial-section__dots" role="tablist" aria-label="Testimonial navigation">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        role="tab"
        aria-selected={i === active}
        aria-label={`View testimonial ${i + 1}`}
        className={`testimonial-section__dot${i === active ? " testimonial-section__dot--active" : ""}`}
        onClick={() => onSelect(i)}
      />
    ))}
  </div>
);

/* ─── Main Component ─── */
const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  /* Scroll-reveal observer — matches pattern used by every sibling section */
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    if (index === activeIndex || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 280);
  };

  const t = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="testimonial-section"
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      {/* Background glow blob */}
      <div aria-hidden="true" className="testimonial-section__bg-glow" />

      {/* Container */}
      <div className="section-container testimonial-section__inner">

        {/* ── Section header ── */}
        <div
          className={`testimonial-section__header${visible ? " testimonial-section__header--visible" : ""}`}
        >
          <span className="testimonial-section__badge">Testimonials</span>
          <h2 className="testimonial-section__heading">
            What our <em className="testimonial-section__heading-italic">clients</em> say about us.
          </h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="testimonial-section__grid">

          {/* Left — image panel */}
          <div
            className={`testimonial-section__image-panel${visible ? " testimonial-section__image-panel--visible" : ""}`}
          >
            {/* Photo frame */}
            <div className="relative testimonial-section__frame">
              <img
                src={t.personImage}
                alt={t.personImageAlt}
                loading="lazy"
                decoding="async"
                className={`testimonial-section__person-img${animating ? " testimonial-section__person-img--fade" : ""}`}
              />
            </div>

          </div>

          {/* Right — content panel */}
          <div
            className={`testimonial-section__content${visible ? " testimonial-section__content--visible" : ""}`}
          >
            {/* Stars */}
            <div
              role="img"
              aria-label="5 out of 5 stars"
              className="testimonial-section__stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Quote text */}
            <figure className="testimonial-section__figure">
              <blockquote
                className={`testimonial-section__quote${animating ? " testimonial-section__quote--fade" : ""}`}
              >
                <p className="testimonial-section__quote-text">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <p
                className={`testimonial-section__body${animating ? " testimonial-section__quote--fade" : ""}`}
              >
                &ldquo;{t.body}&rdquo;
              </p>

              {/* Divider */}
              <div className="testimonial-section__divider" />

              {/* Author */}
              <figcaption
                className={`testimonial-section__author${animating ? " testimonial-section__quote--fade" : ""}`}
              >
                <img
                  src={t.authorPhoto}
                  alt={t.authorName}
                  loading="lazy"
                  decoding="async"
                  className="testimonial-section__author-photo"
                />
                <div className="testimonial-section__author-text">
                  <cite className="testimonial-section__author-name">
                    {t.authorName}
                  </cite>
                  <span className="testimonial-section__author-role">
                    {t.authorRole}
                  </span>
                </div>
              </figcaption>
            </figure>

            {/* Dot navigation */}
            <DotNav
              count={testimonials.length}
              active={activeIndex}
              onSelect={goTo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
