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
  const accuracy = useCountUp(96, 2000);
  const translations = useCountUp(120, 2000);

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
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="/bg-fact-section.jpg"
          alt=""
          style={{
            width: "100%",
            height: "120%",
            objectFit: "cover",
            objectPosition: "center",
            marginTop: "-10%",
          }}
        />
      </div>

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(1, 20, 35, 0.75)",
          zIndex: 1,
        }}
      />

      {/* Container */}
      <div
        ref={accuracy.containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TEXT BLOCK */}
        <div
          style={{
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "45px",
          }}
        >
          {/* TITLE */}
          <h2
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              margin: 0,
            }}
          >
            {["Learning", "Haitian", "Creole"].map((w) => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {w}
              </span>
            ))}

            <span
              style={{
                fontFamily: "var(--font-roxborough)",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#ff4d4d",
              }}
            >
              & Translation
            </span>
          </h2>

          {/* SUBTEXT */}
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6em",
              color: "rgba(255,255,255,0.75)",
              margin: 0,
              maxWidth: "600px",
            }}
          >
            Break language barriers with AI-powered Haitian Creole learning and
            smart document translation. Understand, translate, and communicate
            naturally across languages.
          </p>

          {/* DIVIDER */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(255,255,255,0.2)",
            }}
          />

          {/* STATS */}
          <div
            style={{
              display: "flex",
              gap: "70px",
              flexWrap: "wrap",
            }}
          >
            {/* STAT 1 */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "64px",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {accuracy.count}
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#ff4d4d",
                    marginLeft: "4px",
                  }}
                >
                  %
                </span>
              </div>

              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                }}
              >
                Translation Accuracy
              </span>
            </div>

            {/* DIVIDER */}
            <div
              style={{
                width: "1px",
                height: "60px",
                background: "rgba(255,255,255,0.2)",
              }}
            />

            {/* STAT 2 */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-roxborough)",
                    fontSize: "64px",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {translations.count}
                </span>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#ff4d4d",
                    marginLeft: "4px",
                  }}
                >
                  +
                </span>
              </div>

              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                }}
              >
                Supported Translations
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FactSection;