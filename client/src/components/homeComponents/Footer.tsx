import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        padding: "80px 40px 40px 40px",
        background: "#ffffff",
        borderTop: "1.5px solid rgba(6,67,159,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,67,159,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top footer row: Brand info & Link columns */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {/* Brand block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "320px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--color-haiti-navy)",
                  letterSpacing: "-0.01em",
                }}
              >
                Nee's
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                lineHeight: "1.6em",
                color: "var(--color-gray-500)",
                margin: 0,
              }}
            >
              Empowering learners through structured Haitian Creole & English courses and certified translation services.
            </p>
          </div>

          {/* Quick links block */}
          <div style={{ display: "flex", gap: "80px", flexWrap: "wrap" }}>
            {/* Column 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-haiti-navy)",
                }}
              >
                Services
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Language Learning", path: "/services" },
                  { label: "Translation Services", path: "/services" },
                  { label: "Cultural Integration", path: "/services" },
                ].map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.path}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--color-gray-500)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "var(--color-haiti-red)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "var(--color-gray-500)";
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-haiti-navy)",
                }}
              >
                Company
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "About Us", path: "/services" },
                  { label: "Blog", path: "/blog" },
                  { label: "Pricing Plan", path: "/services" },
                  { label: "Contact Us", path: "/contact" },
                ].map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.path}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        color: "var(--color-gray-500)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "var(--color-haiti-red)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "var(--color-gray-500)";
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(6,67,159,0.12)",
            width: "100%",
          }}
        />

        {/* Bottom row: Copyright & Social media */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--color-gray-500)",
            }}
          >
            &copy; {currentYear} NeeLearning. All rights reserved.
          </span>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { icon: <FaFacebookF />, url: "#" },
              { icon: <FaTwitter />, url: "#" },
              { icon: <FaInstagram />, url: "#" },
              { icon: <FaLinkedinIn />, url: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(6,67,159,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-haiti-navy)",
                  fontSize: "14px",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--color-haiti-red)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "var(--color-haiti-red)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-haiti-navy)";
                  e.currentTarget.style.borderColor = "rgba(6,67,159,0.12)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
