import { useEffect, useRef, useState } from "react";

const logos = [
  "United Way",
  "Language Line Solutions",
  "JPHRO",
  "Bòn Nouvèl",
  "RISE Haiti",
  "CARICOM",
  "Avocats Sans Frontières",
  "Diaspora Professionals",
];

/* ── Marquee item ── */
const MarqueeItem = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 flex items-center gap-2.5 opacity-[0.42] cursor-default transition-[opacity,transform] duration-[250ms] [@media(hover:hover)]:hover:opacity-[0.95] [@media(hover:hover)]:hover:scale-[1.04]">
    {/* Decorative dot */}
    <div
      aria-hidden="true"
      className="w-2 h-2 rounded-full bg-haiti-red flex-shrink-0"
    />
    <span className="font-roxborough text-[18px] font-bold tracking-[-0.01em] text-haiti-navy whitespace-nowrap max-[580px]:text-[15px]">
      {name}
    </span>
  </div>
);

/* ─── Section ─── */
const ClientsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="clients"
      className="w-full bg-white overflow-hidden relative max-[580px]:px-0"
      style={{ padding: "clamp(80px,10vw,130px) 0 clamp(40px,6vw,80px)" }}
      aria-label="Trusted partners and clients"
    >
      {/* Inner column */}
      <div
        className="w-full max-w-[1400px] mx-auto flex flex-col items-center overflow-hidden"
        style={{
          paddingLeft: "clamp(20px,5vw,40px)",
          paddingRight: "clamp(20px,5vw,40px)",
          gap: "45px",
        }}
      >
        {/* Header — scroll-reveal entrance */}
        <div
          ref={headerRef}
          className={`transition-[opacity,transform] duration-[700ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2
            className="font-roxborough font-bold leading-[1.3] tracking-[-0.01em] text-haiti-navy text-center m-0"
            style={{ fontSize: "clamp(18px,2.5vw,24px)" }}
          >
            Trusted by over 500+ students &amp; partners across the world.
          </h2>
        </div>

        {/* Scrolling marquee — fade-mask edges */}
        <div
          className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [@media(hover:hover)]:hover:[&_.animate-marquee]:animation-play-state-paused"
          aria-hidden="true"
        >
          <div
            className="animate-marquee flex items-center max-[580px]:gap-14"
            style={{ gap: "90px", width: "max-content" }}
          >
            {[...logos, ...logos].map((name, i) => (
              <MarqueeItem
                key={`${i < logos.length ? "a" : "b"}-${name}`}
                name={name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Visually hidden accessible list */}
      <ul className="absolute w-px h-px p-0 -m-px overflow-hidden [clip:rect(0,0,0,0)] whitespace-nowrap border-0 list-none">
        {logos.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
};

export default ClientsSection;
