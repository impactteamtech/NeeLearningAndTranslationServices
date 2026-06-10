import { Link } from "react-router-dom";
import { navLinks } from "../../../variables/variables";
import type { NavLink } from "../../../type/types";
import GetInTouchButton from "./GetInTouchButton";
import Logo from "./Logo";


const NavBar = () => {
  return (
    <nav
      className="w-full flex items-center justify-between"
      style={{
        background: "rgba(249,251,253,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "100px",
        border: "1px solid rgba(218,226,235,0.8)",
        padding: "12px 12px 12px 28px",
        boxShadow: "0 2px 20px rgba(26,59,80,0.06)",
      }}
    >
      {/* Logo */}
      <Logo />

      {/* Nav links */}
      <ul className="flex items-center" style={{ gap: "32px", listStyle: "none" }}>
        {navLinks.map((link: NavLink) => (
          <li key={link.id}>
            <Link
              to={link.url}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-dark)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-framer-blue)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--color-dark)")}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <GetInTouchButton />
    </nav>
  );
};

export default NavBar;