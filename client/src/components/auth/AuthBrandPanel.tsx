import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

type AuthBrandPanelProps = {
  mode: "login" | "register";
};

const content = {
  login: {
    eyebrow: "Welcome back",
    title: "Your language journey continues here.",
    description:
      "Return to your lessons, translation requests, and personalized learning resources—all in one place.",
  },
  register: {
    eyebrow: "Start something meaningful",
    title: "Language opens more than conversations.",
    description:
      "Create your account to learn Haitian Creole, manage certified translations, and connect with native experts.",
  },
};

const AuthBrandPanel = ({ mode }: AuthBrandPanelProps) => {
  const copy = content[mode];

  return (
    <aside
      aria-label="Nee's Learning introduction"
      className="sticky top-0 hidden h-screen w-1/2 shrink-0 overflow-hidden bg-linear-to-br from-[#080c18] via-[#0d1f7a] to-[#00209F] text-white lg:flex lg:flex-col"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/grid-background.png')] bg-[length:42px_42px] opacity-[0.055]"
      />
    
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-[-6rem] size-[32rem] rounded-full bg-blue-400/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#050916]/55 to-transparent"
      />

      <div className="relative z-20 flex items-center justify-between px-[clamp(2.5rem,5vw,5rem)] pt-10">
        <Link
          to="/"
          aria-label="Nee's Learning home"
          className=""
        >
          <img src="/logo.png" alt="" className="h-13 w-13" />
        </Link>
        <span className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/65 backdrop-blur-md">
          Kreyòl · Spanish
        </span>
      </div>

      <div className="relative z-20 max-w-xl px-[clamp(2.5rem,5vw,5rem)] pt-[clamp(3rem,8vh,6rem)]">
     
        <h2 className="mt-5 font-roxborough text-[clamp(2.5rem,4.3vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
          {copy.title}
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-7 text-white/65">
          {copy.description}
        </p>
      </div>

      <img
        src="/login-and-register/register-login-bg.png"
        alt="A learner holding a tablet displaying Nee's Learning"
        className="pointer-events-none absolute -bottom-[8%] right-[-8%] z-10 h-[58%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_28px_45px_rgba(0,0,0,0.38)] xl:h-[64%]"
      />

      <div className="absolute bottom-9 left-[clamp(2.5rem,5vw,5rem)] z-30 flex flex-col gap-2.5">
        {["Native-language expertise", "Secure translation support"].map((item) => (
          <div
            key={item}
            className="flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-[#080c18]/45 px-4 py-2.5 text-[11px] font-semibold text-white/80 shadow-lg backdrop-blur-xl"
          >
            <span className="grid size-4 place-items-center rounded-full bg-haiti-red text-white">
              <FaCheck className="size-2" />
            </span>
            {item}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AuthBrandPanel;
