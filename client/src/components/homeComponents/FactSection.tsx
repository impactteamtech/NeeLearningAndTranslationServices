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
        height: "750px",
        overflow: "hidden",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Image Parallax */}
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
            height: "120%",
            objectFit: "cover",
            objectPosition: "center",
            marginTop: "-10%",
            display: "block",
          }}
        />
      </div>

      {/* Brand Dark Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(19, 46, 63, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Container */}
      <div
        ref={sat.containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1320px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0px 40px 0px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* ContentWrapper */}
        <div
          style={{
            maxWidth: "550px",
            display: "flex",
            flexDirection: "column",
            gap: "45px",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* TextWrapper */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", width: "100%" }}>
            {/* Title */}
            <h2
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                gap: "4px 17px",
                margin: 0,
              }}
            >
              {["Simplifying", "life", "through"].map(w => (
                <span
                  key={w}
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(36px, 5vw, 64px)",
                    fontWeight: 700,
                    lineHeight: "1.1em",
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                  }}
                >
                  {w}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontStyle: "italic",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 700,
                  lineHeight: "1.1em",
                  letterSpacing: "-0.03em",
                  color: "var(--color-haiti-red)",
                }}
              >
                solutions
              </span>
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "18px",
                lineHeight: "1.5em",
                color: "rgba(255,255,255,0.75)",
                maxWidth: "650px",
                margin: 0,
              }}
            >
              Simple ideas, smart execution. We craft meaningful solutions that make a difference where it matters most.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(255, 255, 255, 0.3)",
            }}
          />

          {/* Counter Grid */}
          <div style={{ display: "flex", alignItems: "center", gap: "70px", flexWrap: "wrap", width: "100%" }}>
            {/* Stat 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(48px, 6vw, 64px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.125em",
                    color: "#ffffff",
                  }}
                >
                  {sat.count}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 800,
                    color: "var(--color-haiti-red)",
                    marginLeft: "2px",
                  }}
                >
                  %
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "1.4em",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Customer Satisfaction
              </span>
            </div>

            {/* Vertical Divider */}
            <div
              style={{
                width: "1px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
              }}
            />

            {/* Stat 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(48px, 6vw, 64px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.125em",
                    color: "#ffffff",
                  }}
                >
                  {rev.count}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 800,
                    color: "var(--color-haiti-red)",
                    marginLeft: "2px",
                  }}
                >
                  %
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "1.4em",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
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
