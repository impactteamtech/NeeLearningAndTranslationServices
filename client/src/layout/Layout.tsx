import { Outlet } from "react-router-dom";
import Navbar from "../components/homeComponents/navbar/NavBar";

/**
 * Layout — sticky navbar floating above full-width page content
 * Navbar is contained within max-width and centered
 */
const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--color-gray-100)" }}
    >
      {/* Sticky navbar header */}
      <header
        className="w-full"
        style={{
          position: "sticky",
          top: "0px",
          zIndex: 50,
          padding: "16px 40px",
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <Navbar />
        </div>
      </header>

      {/* Page content — full width */}
      <main className="flex-1" style={{ marginTop: "-118px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;