import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

/* ─── Types ─── */
interface Service {
  id: string;
  title: string;
  desc: string;
  link: string;
  dark: boolean;
  icon: string;
}

/* ─── Service data — module-level constant, never re-allocated ─── */
const services: Service[] = [
  {
    id: "language-learning",
    title: "Language Learning",
    desc: "Structured Haitian Kreyòl and English courses designed for beginners to advanced learners of all ages.",
    link: "/services",
    dark: true,
    icon: "/servicesSection-icons/language-learning.png",
  },
  {
    id: "translation-services",
    title: "Translation Services",
    desc: "Professional Kreyòl–English translation for documents, legal papers, medical records, and business content.",
    link: "/services",
    dark: false,
    icon: "/servicesSection-icons/translation-service.png",
  },
  {
    id: "cultural-integration",
    title: "Cultural Integration",
    desc: "Programs and workshops to help individuals and families navigate cultural transitions with confidence.",
    link: "/services",
    dark: true,
    icon: "/servicesSection-icons/cultural-integration.png",
  },
];


const ServiceCard = ({
  title,
  desc,
  link,
  dark,
  icon,
  visible,
  delay,
}: Service & { visible: boolean; delay: number }) => (
  <div
    className={[
      "service-card",
      dark ? "service-card--dark" : "service-card--light",
      visible ? "service-card--visible" : "",
    ]
      .filter(Boolean)
      .join(" ")}
    style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
  >
    {/* Decorative glow blob — dark cards only */}
    {dark && <div aria-hidden="true" className="service-card__glow" />}

    {/* Icon — lazy loaded, off-thread decode */}
    <div className="service-card__icon-wrap">
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="service-card__icon"
      />
    </div>

    {/* Title */}
    <h3 className="service-card__title">{title}</h3>

    {/* Description */}
    <p className="service-card__desc">{desc}</p>

    {/* Learn More link */}
    <Link
      to={link}
      className={`service-card__link${dark ? " service-card__link--dark" : " service-card__link--light"}`}
      aria-label={`Learn more about ${title}`}
    >
      Learn More
      <IoIosArrowRoundForward aria-hidden="true" className="service-card__link-arrow" />
    </Link>
  </div>
);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bail out early if the API isn't supported (SSR / very old browsers)
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
    <section id="services" className="services-section" ref={sectionRef}>
      {/* Subtle radial glow backdrop */}
      <div aria-hidden="true" className="services-section__bg-glow" />

      <div className="section-container services-section__inner">
        {/* ── Headline block ── */}
        <div
          className={`services-section__header${visible ? " services-section__header--visible" : ""}`}
        >
          <span className="t-label services-section__eyebrow">What We Offer</span>

          <h2 className="services-section__heading">
            Our services are{" "}
            <em className="services-section__heading-italic">specifically</em>{" "}
            designed to meet your needs.
          </h2>
        </div>

        {/* ── Service Cards — responsive grid ── */}
        <div className="services-section__grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} {...s} visible={visible} delay={i * 120} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className={`services-section__cta${visible ? " services-section__cta--visible" : ""}`}
        >
          <p className="t-body services-section__cta-text">
            From strategy to execution, explore everything we can do for you.
          </p>
          <Link
            to="/services"
            className="services-section__cta-link"
            aria-label="View all services"
          >
            <span>View All Services</span>
            <span className="services-section__cta-arrow-wrap">
              <IoIosArrowRoundForward aria-hidden="true" className="services-section__cta-arrow" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
