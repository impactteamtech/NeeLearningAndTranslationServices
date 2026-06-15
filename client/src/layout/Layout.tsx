import { Outlet } from "react-router-dom";
import Navbar from "../components/homeComponents/navbar/NavBar";
import Footer from "../components/homeComponents/Footer";

const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "#ffffff" }}
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
        <div style={{ maxWidth: "100%" }} className="px-4 sm:px-8 md:px-20 lg:px-30">
          <Navbar />
        </div>
      </header>

      {/* Page content — full width */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Layout;