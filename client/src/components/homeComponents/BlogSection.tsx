import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";



const posts = [
  {
    title: "Transform your uniqueness into a scalable profitable business.",
    excerpt: "Designed to adapt as your business evolves, it supports sustainable growth.",
    date: "Mar 25, 2026",
    tag: "Learning",
    link: "/blog/transform-uniqueness",
  },
  {
    title: "How bilingual education shapes a child's cognitive development.",
    excerpt: "Research consistently shows bilingual children develop stronger executive functions.",
    date: "Apr 2, 2026",
    tag: "Research",
    link: "/blog/bilingual-cognition",
  },
  {
    title: "The power of Kreyòl: preserving culture through language.",
    excerpt: "Language is the heartbeat of culture. Discover why Kreyòl matters now more than ever.",
    date: "Apr 10, 2026",
    tag: "Culture",
    link: "/blog/power-of-kreyol",
  },
  {
    title: "5 tips for passing your certified translation exam with confidence.",
    excerpt: "Preparation, practice, and persistence — the three pillars of success in translation.",
    date: "Apr 18, 2026",
    tag: "Translation",
    link: "/blog/translation-tips",
  },
  {
    title: "From beginner to fluent: a 90-day Kreyòl learning plan.",
    excerpt: "A structured roadmap with weekly goals to take you from zero to conversational.",
    date: "Apr 25, 2026",
    tag: "Learning",
    link: "/blog/90-day-kreyol",
  },
  {
    title: "Navigating healthcare in the US as a Haitian immigrant.",
    excerpt: "Understanding medical terminology and your rights starts with language and advocacy.",
    date: "May 5, 2026",
    tag: "Community",
    link: "/blog/healthcare-navigation",
  },
];

/** Gradient bg for card image area matching Framer blog card style */
const cardGradients = [
  "linear-gradient(135deg, #e8f4fd 0%, #bdd9f5 100%)",
  "linear-gradient(135deg, #edf2ff 0%, #c3d5f5 100%)",
  "linear-gradient(135deg, #f0f8ff 0%, #bde3ff 100%)",
  "linear-gradient(135deg, #e6f0ff 0%, #c5d8f8 100%)",
  "linear-gradient(135deg, #eaf4fd 0%, #b8d8f4 100%)",
  "linear-gradient(135deg, #f5f0ff 0%, #d4c7f8 100%)",
];

const BlogSection = () => (
  <section
    id="blog"
    style={{
      width: "100%",
      padding: "160px 40px 160px 40px",
      background: "var(--color-gray-200)",
    }}
  >
    {/* Container — max 1240px */}
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
      {/* MainWrapper — 1fr, vertical, gap 50px, align start */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          alignItems: "flex-start",
        }}
      >
        {/* ContentWrapper — horizontal, gap 70px, space-between, align end */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "70px",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Title — max 400px, wrapping, "insights." italic */}
          <div
            style={{
              maxWidth: "400px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: "0px 11px",
            }}
          >
            {["Our", "latest", "articles", "with", "useful"].map(w => (
              <span key={w} className="t-d2">{w}</span>
            ))}
            <span className="t-d2i">insights.</span>
          </div>

          {/* Button "See All Posts" */}
          <Link to="/blog" className="btn-ghost" style={{ flexShrink: 0, paddingBottom: "6px" }}>
            See All Posts
            <IoIosArrowRoundForward style={{ width: "22px", height: "22px" }} />
          </Link>
        </div>

        {/* Blog grid — 3 col x 2 rows, gap 35px */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "35px",
            width: "100%",
          }}
        >
          {posts.map((post, i) => (
            <Link
              key={i}
              to={post.link}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--color-white)",
                borderRadius: "15px",
                overflow: "hidden",
                border: "1px solid var(--color-gray-300)",
                textDecoration: "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(26,59,80,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Card image area */}
              <div
                style={{
                  height: "190px",
                  background: cardGradients[i % cardGradients.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: "60px", height: "60px", objectFit: "contain", opacity: 0.18 }}
                />
              </div>

              {/* Card body */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "28px",
                  gap: "14px",
                  flex: 1,
                }}
              >
                {/* Tag + date */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "3px 12px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      /* Brand sky blue for tags */
                      background: "rgba(66,165,245,0.12)",
                      color: "var(--color-brand-blue)",
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      color: "var(--color-gray-500)",
                    }}
                  >
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "17px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.35em",
                    color: "var(--color-dark)",
                    flex: 1,
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    lineHeight: "1.55em",
                    color: "var(--color-gray-500)",
                  }}
                >
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BlogSection;
