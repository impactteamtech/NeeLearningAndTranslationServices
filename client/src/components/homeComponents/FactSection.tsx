import { useEffect, useRef, useState } from "react";

const useCountUp = (target: number, durationMs = 2000) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / durationMs, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return { count, containerRef };
};

const FactSection = () => {
  const sat = useCountUp(98, 2000);
  const rev = useCountUp(80, 2000);

  return (
    <section
      id="results"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        zIndex: 2,
        minHeight: "750px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ImageParallax — background with parallax effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <img
          src="https://framerusercontent.com/images/XtF2Dn0CFhmqQ1hhZFk9ifmlDQ.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "110%",
            objectFit: "cover",
            objectPosition: "center",
            marginTop: "-5%",
            display: "block",
          }}
        />
      </div>

      {/* ParallaxOverlay — rgba(19,46,63,0.6) from XML */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(19,46,63,0.6)",
          zIndex: 1,
        }}
      />

      {/* Container — absolute center, max 1320px, padding 0 40px, align start */}
      <div
        ref={sat.containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1320px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "120px 40px 120px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* ContentWrapper — max 550px, gap 45px, align start */}
        <div
          style={{
            maxWidth: "550px",
            display: "flex",
            flexDirection: "column",
            gap: "45px",
            alignItems: "flex-start",
          }}
        >
          {/* TextWrapper — gap 25px */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

            {/* Title — Display 1 + Display 1 italic */}
            <h2
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "4px 17px",
              }}
            >
              {["Simplifying", "life", "through"].map(w => (
                <span
                  key={w}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "72px",
                    fontWeight: 700,
                    lineHeight: "1.05em",
                    letterSpacing: "-0.04em",
                    color: "var(--color-white)",
                  }}
                >
                  {w}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "72px",
                  fontWeight: 700,
                  lineHeight: "0.975em",
                  letterSpacing: "-0.03em",
                  color: "var(--color-white)",
                }}
              >
                solutions
              </span>
            </h2>

            {/* /Paragraph/Body (Large) — white 0.75 opacity */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "22px",
                lineHeight: "1.425em",
                color: "rgba(255,255,255,0.75)",
                maxWidth: "500px",
              }}
            >
              Simple ideas, smart execution. We craft meaningful solutions that make a difference where it matters most.
            </p>
          </div>

          {/* Border — 1px rgba(255,255,255,0.3) */}
          <div className="divider-white" />

          {/* Counter — horizontal, gap 70px */}
          <div style={{ display: "flex", alignItems: "center", gap: "70px" }}>

            {/* First — 98% Customer Satisfaction */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "52px",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.125em",
                  color: "var(--color-white)",
                }}
              >
                {sat.count}%
              </span>
              {/* /Heading/Heading 5 — 20px white */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "1.275em",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Customer Satisfaction
              </span>
            </div>

            {/* Vertical border */}
            <div
              style={{
                width: "1px",
                height: "60px",
                background: "rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}
            />

            {/* Second — 80% Increased Revenue */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "52px",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.125em",
                  color: "var(--color-white)",
                }}
              >
                {rev.count}%
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "1.275em",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Increased Revenue
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FactSection;
