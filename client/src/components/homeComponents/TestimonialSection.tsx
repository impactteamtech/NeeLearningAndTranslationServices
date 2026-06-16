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

/* ─── Data ─── */
const testimonials: Testimonial[] = [
  {
    id: "marc-larose",
    quote:
      "Nee's helped us communicate more effectively & turn language barriers into bridges of opportunity.",
    body: "Working with Nee's Learning & Translation Services was an absolute pleasure. They managed every stage of our program and their attention to cultural detail ensured a flawless final result that exceeded our expectations.",
    authorName: "Marc Larose",
    authorRole: "Community Integration Specialist",
    authorPhoto:
      "https://img.magnific.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?semt=ais_hybrid&w=740&q=80",
    personImage:
      "https://img.magnific.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?semt=ais_hybrid&w=740&q=80",
    personImageAlt: "Marc Larose, happy client of Nee's Learning & Translation",
  },
  {
    id: "jean-pierre",
    quote:
      "The translation quality was outstanding — every cultural nuance was preserved with remarkable precision.",
    body: "Our legal documents were handled with the utmost professionalism. The team understood not just the words, but the intent behind every clause. I would recommend Nee's to anyone navigating the Haitian diaspora.",
    authorName: "Jean-Pierre Moreau",
    authorRole: "Legal Advisor, Avocats Sans Frontières",
    authorPhoto:
      "https://img.magnific.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?semt=ais_hybrid&w=740&q=80",
    personImage:
      "https://img.magnific.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?semt=ais_hybrid&w=740&q=80",
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
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=740",
    personImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=740",
    personImageAlt: "Sophia Charles, parent and language learner at Nee's",
  },
];

/* ─── Star icon ─── */
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 1.39l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.1l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.39z"
      fill="#FFA800"
    />
  </svg>
);

/* ─── Dot nav ─── */
const DotNav = ({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) => (
  <div
    className="flex flex-row gap-2.5 items-center"
    role="tablist"
    aria-label="Testimonial navigation"
  >
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        role="tab"
        aria-selected={i === active}
        aria-label={`View testimonial ${i + 1}`}
        onClick={() => onSelect(i)}
        className={`rounded-full h-2.5 border-none cursor-pointer p-0 flex-shrink-0 transition-[background,transform,width] duration-300 ${
          i === active
            ? "w-[26px] bg-haiti-navy"
            : "w-2.5 bg-[rgba(6,67,159,0.18)] [@media(hover:hover)]:hover:bg-[rgba(6,67,159,0.40)] [@media(hover:hover)]:hover:scale-[1.2]"
        }`}
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
      ref={sectionRef}
      className="w-full bg-[#f9fbfd] relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px,10vw,120px)",
        paddingBottom: "clamp(80px,10vw,120px)",
      }}
      aria-label="Client testimonials"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(6,67,159,0.06)_0%,transparent_70%)] pointer-events-none z-0"
      />

      {/* Container */}
      <div
        className="w-full max-w-[1400px] mx-auto flex flex-col relative z-10"
        style={{
          paddingLeft: "clamp(20px,5vw,40px)",
          paddingRight: "clamp(20px,5vw,40px)",
          gap: "clamp(48px,6vw,72px)",
        }}
      >
        {/* Section header */}
        <div
          className={`flex flex-col items-center gap-[15px] text-center transition-[opacity,transform] duration-[650ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-[rgba(6,67,159,0.06)] border border-[rgba(6,67,159,0.15)] text-haiti-navy px-[14px] py-1 rounded-full font-sans text-[12px] font-bold tracking-[0.1em] uppercase">
            Testimonials
          </span>
          <h2
            className="font-roxborough font-bold leading-[1.15] tracking-[-0.02em] text-haiti-navy m-0"
            style={{ fontSize: "clamp(32px,4.5vw,48px)" }}
          >
            What our <em className="italic text-haiti-red">clients</em> say about
            us.
          </h2>
        </div>

        {/* Two-column grid */}
        <div
          className="flex flex-row items-center w-full max-[900px]:flex-col max-[900px]:gap-10"
          style={{ gap: "clamp(48px,6vw,80px)" }}
        >
          {/* Left — image panel */}
          <div
            className={`flex-shrink-0 relative transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] max-[900px]:w-full max-[900px]:max-w-[480px] max-[900px]:mx-auto [@media(hover:hover)]:hover:[&_.frame]:shadow-[0_16px_48px_rgba(6,67,159,0.10)] ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{
              width: "clamp(300px,40vw,520px)",
              transitionDelay: visible ? "100ms" : "0ms",
            }}
          >
            {/* Photo frame */}
            <div
              className="frame w-full bg-[#edf3fa] rounded-[16px] border-[1.5px] border-[rgba(6,67,159,0.12)] shadow-[0_4px_24px_rgba(6,67,159,0.04)] relative transition-[box-shadow] duration-300 overflow-hidden"
              style={{ aspectRatio: "10/9" }}
            >
              <img
                src={t.personImage}
                alt={t.personImageAlt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover block transition-[opacity,transform] duration-[280ms] ${
                  animating
                    ? "opacity-0 scale-[0.98]"
                    : "opacity-100 scale-100"
                }`}
              />
            </div>
          </div>

          {/* Right — content panel */}
          <div
            className={`flex-1 flex flex-col gap-8 items-start transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] max-[900px]:w-full ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            {/* Stars */}
            <div
              role="img"
              aria-label="5 out of 5 stars"
              className="flex flex-row gap-1.5 items-center"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Quote + author */}
            <figure className="flex flex-col gap-6 w-full m-0">
              <blockquote
                className={`m-0 transition-[opacity,transform] duration-[280ms] ${
                  animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                <p
                  className="font-roxborough font-semibold leading-[1.25] tracking-[-0.02em] text-haiti-navy m-0 max-[580px]:text-[20px]"
                  style={{ fontSize: "clamp(22px,3vw,30px)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <p
                className={`font-sans text-base leading-[1.65] text-[#6B7280] m-0 max-[580px]:text-[15px] transition-[opacity,transform] duration-[280ms] ${
                  animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                &ldquo;{t.body}&rdquo;
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-[rgba(6,67,159,0.12)] flex-shrink-0" />

              {/* Author */}
              <figcaption
                className={`flex flex-row items-center gap-4 not-italic transition-[opacity,transform] duration-[280ms] ${
                  animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                <img
                  src={t.authorPhoto}
                  alt={t.authorName}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-[1.5px] border-[rgba(6,67,159,0.12)] block"
                />
                <div className="flex flex-col gap-1">
                  <cite className="font-roxborough text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-haiti-navy not-italic">
                    {t.authorName}
                  </cite>
                  <span className="font-sans text-[14px] text-[#6B7280] leading-[1.4]">
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
