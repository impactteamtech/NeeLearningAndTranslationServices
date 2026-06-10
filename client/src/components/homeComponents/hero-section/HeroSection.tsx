import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        overflow: "visible",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1020px",
          zIndex: 0,
          overflow: "visible",
        }}
      >
        {/* Background photo */}
        <img
          src="https://framerusercontent.com/images/0YLFJEPLwZvkWT4P3c1VnmJEoF0.jpg"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        {/* Overlay — rgba(249,251,253,0.48) matching Framer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(249,251,253,0.48)",
            zIndex: 1,
          }}
        />
        {/* Wave divider SVG — aspectRatio 23.881, height 67px, bottom -1px */}
        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            left: 0,
            width: "100%",
            height: "67px",
            zIndex: 2,
          }}
        >
          <img
            src="https://framerusercontent.com/images/PxwXmKRISpluc8bpAr7ss3osew.svg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ── Outer Hero frame ──────────────────────────────── */}
      {/* padding: 230px 40px 0px 40px — exact from XML      */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "230px 40px 0px 40px",
          gap: "70px",
        }}
      >
        {/* Container — max 1240px */}
        <div
          style={{
            width: "100%",
            maxWidth: "1240px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "70px",
          }}
        >
          {/* MainWrapper — gap 140px vertical */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "140px",
              zIndex: 1,
            }}
          >
            {/* ContentWrapper — max 750px, gap 40px */}
            <div
              style={{
                width: "100%",
                maxWidth: "750px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
                textAlign: "center",
              }}
            >
              {/* TextWrapper — gap 25px */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                {/* Title — word-by-word inline, last word italic */}
                <h1
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "1px 17px",
                    width: "100%",
                  }}
                >
                  {["Learn", "Haitian", "Creole", "&", "English", "with"].map(word => (
                    <span key={word} className="t-d1">{word}</span>
                  ))}
                  {/* Last word — italic Display 1 with custom SVG animated underline highlight */}
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <span className="t-d1i">confidence</span>
                    {/* Underline image from public folder */}
                    <img
                      src="/under-line.png"
                      alt=""
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: "-34px",
                        left: "0",
                        width: "100%",
                        height: "28px",
                        objectFit: "fill",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                  </span>
                </h1>

                {/* /Paragraph/Body (Large) — 22px max-width 650px */}
                <p
                  className=" t-body-lg"
                  style={{ maxWidth: "650px", textAlign: "center" }}
                >
                  Whether you're a beginner or looking to deepen your fluency, Nee's Learning & Translation Services gives you the tools, lessons, and support to master Haitian Creole (Kreyòl) and English — at your own pace.
                </p>
              </div>

              {/* Buttons row — gap 20px */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

                {/* Button variant "AIgowgsMp" — dark pill "Get Started" */}
                <Link to="/contact" className="btn-dark group">
                  Start Learning
                  <span className="btn-arrow-circle">
                    <IoIosArrowRoundForward
                      style={{ position: "absolute", width: "30px", height: "30px", color: "white" }}
                      className="transition-transform duration-300 ease-in-out translate-x-0 group-hover:translate-x-full"
                    />
                    <IoIosArrowRoundForward
                      style={{ position: "absolute", width: "30px", height: "30px", color: "white" }}
                      className="transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0"
                    />
                  </span>
                </Link>

                {/* Button variant "lkHcpajR9" — outline "Learn More" */}
                <Link to="/services" className="btn-outline">
                  Explore Courses
                </Link>
              </div>
            </div>

            {/* Image section — gap 40px, zIndex 0 */}
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                zIndex: 0,
              }}
            >
              {/* Hero image — borderRadius 15px */}
              <div style={{ position: "relative", width: "100%", borderRadius: "15px", overflow: "hidden" }}>
                <img
                  src="https://framerusercontent.com/images/IZLx5S5dEqmgGNkvLXFUprpqweo.jpg"
                  alt="Nee's Learning & Translation Services"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "15px",
                  }}
                />

                {/* PlayIcon — absolute center, 80x80px (nodeId: qT_WlBdrF) */}
                <button
                  aria-label="Play video"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80px",
                    height: "80px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 40px rgba(26,59,80,0.25)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.transform = "translate(-50%, -50%) scale(1.1)";
                    el.style.boxShadow = "0 12px 50px rgba(26,59,80,0.35)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.transform = "translate(-50%, -50%) scale(1)";
                    el.style.boxShadow = "0 8px 40px rgba(26,59,80,0.25)";
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M9 5.5v17l14-8.5L9 5.5z" fill="var(--color-dark)" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;