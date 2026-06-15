import { useEffect, useRef, useState } from "react";

const logos = [
  "United Way",
  "Language Line Solutions",
  "JPHRO",
  "Bòn Nouvèl",
  "RISE Haiti",
  "CARICOM",
  "Avocats Sans Frontières",
  "Diaspora Professionals",
];

const MarqueeItem = ({ name }: { name: string }) => (
  <div className="clients-marquee-item">
    {/* Decorative accent dot */}
    <div aria-hidden="true" className="clients-marquee-item__dot" />
    <span className="clients-marquee-item__name">{name}</span>
  </div>
);

const ClientsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="clients"
      className="clients-section"
      aria-label="Trusted partners and clients"
    >
      <div className="section-container clients-section__inner">
        {/* Header — scroll-reveal entrance */}
        <div
          ref={headerRef}
          className={`clients-section__header${visible ? " clients-section__header--visible" : ""}`}
        >
          <h2 className="clients-section__title">
            Trusted by over 500+ students &amp; partners across the world.
          </h2>
        </div>

        {/* Scrolling logos marquee — aria-hidden; accessible list rendered below */}
        <div className="clients-section__marquee-track" aria-hidden="true">
          <div className="animate-marquee clients-section__marquee-list">
            {[...logos, ...logos].map((name, i) => (
              <MarqueeItem
                key={`${i < logos.length ? "a" : "b"}-${name}`}
                name={name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Visually hidden accessible partner list for screen readers */}
      <ul className="clients-section__sr-list">
        {logos.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
};

export default ClientsSection;
