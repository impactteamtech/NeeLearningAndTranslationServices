import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import Logo from "./navbar/Logo";

/* ─── Module-level constant — never re-computed on render ─── */
const CURRENT_YEAR = new Date().getFullYear();

/* ─── Link data — corrected to match hash-anchor routes ─── */
const serviceLinks = [
  { label: "Language Learning",    href: "#courses" },
  { label: "Translation Services", href: "#courses" },
  { label: "Cultural Integration", href: "#courses" },
];

const companyLinks = [
  { label: "About Us",   href: "#about"   },
  { label: "Pricing",    href: "#pricing" },
  { label: "Contact Us", href: "#contact" },
  { label: "FAQ",        href: "#faq"     },
];

const socialLinks = [
  {
    icon: <FaFacebookF aria-hidden="true" />,
    href: "https://facebook.com",
    label: "Follow us on Facebook",
  },
  {
    icon: <FaXTwitter aria-hidden="true" />,
    href: "https://x.com",
    label: "Follow us on X (Twitter)",
  },
  {
    icon: <FaInstagram aria-hidden="true" />,
    href: "https://instagram.com",
    label: "Follow us on Instagram",
  },
  {
    icon: <FaLinkedinIn aria-hidden="true" />,
    href: "https://linkedin.com",
    label: "Connect on LinkedIn",
  },
];

/* ─── Footer component ─── */
const Footer = () => {
  return (
    <footer className="footer" aria-label="Site footer">
      {/* Decorative radial glows */}
      <div aria-hidden="true" className="footer__glow footer__glow--left" />
      <div aria-hidden="true" className="footer__glow footer__glow--right" />

      <div className="section-container footer__inner">

        {/* ── Top row: brand + link columns + contact ── */}
        <div className="footer__top">

          {/* Brand block */}
          <div className="footer__brand">
            {/* Light variant — white wordmark for dark footer background */}
            <Logo variant="light" />

            <p className="footer__tagline">
              Empowering learners through structured Haitian Kreyòl &amp; English
              courses and certified translation services.
            </p>

            {/* Social icons */}
            <div className="footer__social" role="list" aria-label="Social media links">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  role="listitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-icon"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="footer__cols">
            {/* Services column */}
            <nav aria-label="Services links" className="footer__col">
              <h3 className="footer__col-heading">Services</h3>
              <ul className="footer__col-list">
                {serviceLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="footer__col-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company column */}
            <nav aria-label="Company links" className="footer__col">
              <h3 className="footer__col-heading">Company</h3>
              <ul className="footer__col-list">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="footer__col-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact column */}
            <div className="footer__col" aria-label="Contact information">
              <h3 className="footer__col-heading">Get in Touch</h3>
              <ul className="footer__col-list">
                <li>
                  <a
                    href="mailto:info@neeslearning.com"
                    className="footer__col-link footer__col-link--contact"
                    aria-label="Email us at info@neeslearning.com"
                  >
                    <IoMailOutline aria-hidden="true" className="footer__contact-icon" />
                    info@neeslearning.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15551234567"
                    className="footer__col-link footer__col-link--contact"
                    aria-label="Call us at +1 555 123 4567"
                  >
                    <IoCallOutline aria-hidden="true" className="footer__contact-icon" />
                    +1 (555) 123-4567
                  </a>
                </li>
              </ul>

              {/* CTA */}
              <Link
                to="/contact"
                className="footer__cta"
                aria-label="Book a free consultation"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" aria-hidden="true" />

        {/* ── Bottom row: copyright + legal ── */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {CURRENT_YEAR} Nee&apos;s Learning &amp; Translation Services.
            All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
