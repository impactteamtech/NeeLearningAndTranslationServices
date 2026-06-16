import { useState } from "react";
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

const cardGradients = [
  "linear-gradient(135deg, rgba(8,12,24,0.03) 0%, rgba(6,67,159,0.08) 100%)",
  "linear-gradient(135deg, rgba(6,67,159,0.03) 0%, rgba(13,31,122,0.08) 100%)",
  "linear-gradient(135deg, rgba(13,31,122,0.03) 0%, rgba(8,12,24,0.08) 100%)",
];

interface BlogCardProps {
  post: (typeof posts)[0];
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={post.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1.5px solid rgba(6,67,159,0.12)",
        textDecoration: "none",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(6,67,159,0.12)"
          : "0 4px 20px rgba(6,67,159,0.04)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Card image area */}
      <div
        style={{
          height: "190px",
          background: cardGradients[index % cardGradients.length],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          borderBottom: "1.5px solid rgba(6,67,159,0.08)",
        }}
      >
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain",
            opacity: 0.15,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Card body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "28px",
          gap: "16px",
          flex: 1,
        }}
      >
        {/* Tag + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "rgba(206, 17, 38, 0.08)",
              color: "var(--color-haiti-red)",
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
            fontFamily: "var(--font-roxborough)",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: "1.35em",
            color: "var(--color-haiti-navy)",
            margin: 0,
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
            margin: 0,
          }}
        >
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

const BlogSection = () => (
  <section
    id="blog"
    style={{
      width: "100%",
      padding: "160px 40px",
      background: "#EFF3F7",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Subtle radial glow */}
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "70%",
        height: "400px",
        background: "radial-gradient(ellipse at center, rgba(6,67,159,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />

    {/* Container */}
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
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* MainWrapper */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          alignItems: "flex-start",
        }}
      >
        {/* ContentWrapper */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "70px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {/* Title */}
          <h2
            style={{
              maxWidth: "400px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: "0px 11px",
              margin: 0,
            }}
          >
            {["Our", "latest", "articles", "with", "useful"].map(w => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-roxborough)",
                  fontSize: "clamp(32px, 4.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: "1.15em",
                  letterSpacing: "-0.02em",
                  color: "var(--color-haiti-navy)",
                }}
              >
                {w}
              </span>
            ))}
            <span
              style={{
                fontFamily: "var(--font-roxborough)",
                fontStyle: "italic",
                fontSize: "clamp(32px, 4.5vw, 44px)",
                fontWeight: 700,
                lineHeight: "1.15em",
                letterSpacing: "-0.02em",
                color: "var(--color-haiti-red)",
              }}
            >
              insights.
            </span>
          </h2>

          {/* Button "See All Posts" */}
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-haiti-navy)",
              textDecoration: "none",
              transition: "all 0.25s ease",
              paddingBottom: "4px",
              borderBottom: "1.5px solid transparent",
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.gap = "14px";
              el.style.color = "var(--color-haiti-red)";
              el.style.borderBottomColor = "var(--color-haiti-red)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.gap = "8px";
              el.style.color = "var(--color-haiti-navy)";
              el.style.borderBottomColor = "transparent";
            }}
          >
            See All Posts
            <IoIosArrowRoundForward style={{ width: "22px", height: "22px", flexShrink: 0 }} />
          </Link>
        </div>

        {/* Blog grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "35px",
            width: "100%",
          }}
        >
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BlogSection;
