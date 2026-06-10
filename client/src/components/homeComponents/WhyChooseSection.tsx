
interface FeatureCardData {
  headline: string;
  body: string;
  point1Title: string;
  point1Body: string;
  point2Title: string;
  point2Body: string;
  top: string;
  /** x2vCjhHPt = light, p7HksjE3c = dark */
  variant: "light" | "dark";
  image: string;
}

const features: FeatureCardData[] = [
  {
    headline: "Designed for ease, built for real learning outcomes.",
    body: "Skip the confusion and experience structured language learning that works anytime, anywhere. Whether you're starting Kreyòl from scratch, improving English fluency, or helping your child, our programs adapt to your goals.",
    point1Title: "Safe, seamless, and always certified",
    point1Body: "All lessons are built by bilingual educators and certified translators. Your learning path is always guided, clear, and designed to last.",
    point2Title: "Track every milestone in real time",
    point2Body: "Instant progress tracking so you always know where you stand and what's coming next on your journey.",
    top: "130px",
    variant: "light",
    image: "https://framerusercontent.com/images/IZLx5S5dEqmgGNkvLXFUprpqweo.jpg",
  },
  {
    headline: "Translate with precision, communicate with clarity.",
    body: "Get your documents translated instantly, without waiting. From legal papers to everyday forms, everything is handled smoothly, accurately, and with full cultural sensitivity.",
    point1Title: "Built with advanced, certified expertise",
    point1Body: "Your translations are handled by native speakers using rigorous review standards. Every word carries accuracy and cultural nuance.",
    point2Title: "Stay updated on every translation instantly",
    point2Body: "Get live notifications on your document's progress from submission to final delivery.",
    top: "170px",
    variant: "dark",
    image: "https://framerusercontent.com/images/XtF2Dn0CFhmqQ1hhZFk9ifmlDQ.jpg",
  },
  {
    headline: "Understand your progress and act with real confidence.",
    body: "Get a clear view of your language journey without overcomplicating your workflow. From tracking performance to spotting patterns, everything is designed to help you move forward with clarity.",
    point1Title: "Clear insights, no more guesswork at all",
    point1Body: "Understand what's happening at a glance. Focus on what matters most and make informed decisions without getting lost in unnecessary complexity.",
    point2Title: "Track every session in real time easily",
    point2Body: "Stay updated as things evolve. Monitor your changes instantly and keep moving in the right direction.",
    top: "210px",
    variant: "light",
    image: "https://framerusercontent.com/images/0YLFJEPLwZvkWT4P3c1VnmJEoF0.jpg",
  },
];

const PointCheck = ({ dark }: { dark: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    style={{ flexShrink: 0, marginTop: "2px" }}
  >
    <circle
      cx="10"
      cy="10"
      r="10"
      fill={dark ? "rgba(255,255,255,0.12)" : "rgba(26,59,80,0.07)"}
    />
    <path
      d="M6 10l2.8 2.8 5-5"
      stroke={dark ? "rgba(255,255,255,0.9)" : "var(--color-dark)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureCard = ({ f }: { f: FeatureCardData }) => {
  const dark = f.variant === "dark";
  return (
    <div
      style={{
        position: "sticky",
        top: f.top,
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        borderRadius: "20px",
        border: dark ? "none" : "1px solid var(--color-gray-300)",
        background: dark ? "var(--color-dark)" : "var(--color-white)",
        padding: "60px",
        boxShadow: "0 2px 20px rgba(26,59,80,0.06)",
      }}
    >
      {/* Left: illustration / UI image */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          background: dark ? "rgba(255,255,255,0.06)" : "var(--color-gray-200)",
          height: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={f.image}
          alt=""
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.85,
          }}
        />
      </div>

      {/* Right: text content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Main headline — Display 2 */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "38px",
            fontWeight: 700,
            lineHeight: "1.15em",
            letterSpacing: "-0.035em",
            color: dark ? "var(--color-white)" : "var(--color-dark)",
          }}
        >
          {f.headline}
        </h3>

        {/* Main body */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            lineHeight: "1.5em",
            color: dark ? "rgba(255,255,255,0.65)" : "var(--color-gray-500)",
          }}
        >
          {f.body}
        </p>

        {/* Two bullet points */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {[
            { title: f.point1Title, body: f.point1Body },
            { title: f.point2Title, body: f.point2Body },
          ].map((pt, j) => (
            <div key={j} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <PointCheck dark={dark} />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    color: dark ? "var(--color-white)" : "var(--color-dark)",
                    marginBottom: "5px",
                    lineHeight: "1.3em",
                  }}
                >
                  {pt.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    lineHeight: "1.55em",
                    color: dark ? "rgba(255,255,255,0.6)" : "var(--color-gray-500)",
                  }}
                >
                  {pt.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WhyChooseSection = () => (
  <section
    id="why-choose"
    style={{
      width: "100%",
      padding: "160px 40px 160px 40px",
      background: "var(--color-gray-100)",
    }}
  >
    {/* Container — max 1240px, horizontal */}
    <div
      style={{
        width: "100%",
        maxWidth: "1240px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row",
        gap: "70px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* MainWrapper — 1fr, vertical, gap 56px */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "56px",
          alignItems: "center",
        }}
      >
        {/* Headline — max 550px, gap 15px, center */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            maxWidth: "550px",
            textAlign: "center",
          }}
        >
          <span className="t-label">Why Choose Nee's?</span>
          <h2
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "0px 11px",
            }}
          >
            {["A", "few", "reasons"].map(w => <span key={w} className="t-d2">{w}</span>)}
            <span className="t-d2i">why</span>
            {["our", "clients", "choose", "us", "first."].map(w => <span key={w} className="t-d2">{w}</span>)}
          </h2>
        </div>

        {/* FeatureCards — vertical stack, gap 40px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            width: "100%",
            maxWidth: "1140px",
          }}
        >
          {features.map((f, i) => <FeatureCard key={i} f={f} />)}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
