import { HiSparkles } from "react-icons/hi";

export const ContactHero = () => {
  return (
    <section className="relative w-full overflow-hidden border-b border-blue-400/10 bg-white py-[clamp(80px,10vw,140px)]">
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.14] pointer-events-none z-0"
        style={{
          backgroundImage: "url('/grid-background.png')",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,67,159,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(206,17,38,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 px-[clamp(20px,5vw,40px)]">
        {/* Accent Pill */}
        <span className="inline-flex items-center gap-2 bg-linear-to-r from-haiti-navy/5 to-haiti-navy/10 border border-haiti-navy/15 text-haiti-navy px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.12em] uppercase shadow-sm">
          <HiSparkles className="text-haiti-red w-3.5 h-3.5 animate-pulse" />
          Connect With Us
        </span>

        {/* Heading */}
        <h1 className="font-roxborough font-semibold leading-[1.12] text-haiti-navy tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Let's Start a <br />
          <span className="italic text-haiti-red font-medium relative inline-block">
            Conversation
            <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-[3px] bg-haiti-red/35 rounded-full" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-[#555e6c] font-sans text-base sm:text-lg md:text-xl leading-[1.8] tracking-[0.01em]">
          Have a question about our Creole courses, or need an official document translation quote? Get in touch and receive a reply within 24 hours.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
