import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/homeComponents/navbar/NavBar";
import Footer from "../components/homeComponents/Footer";

const Layout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed navbar header */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-transparent px-4 py-3 sm:px-8 md:px-16 lg:px-20">
        <Navbar />
      </header>

      {/* Page content — full width */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;