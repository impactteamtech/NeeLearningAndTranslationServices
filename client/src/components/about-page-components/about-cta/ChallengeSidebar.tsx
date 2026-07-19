import { FaFire, FaStar } from "react-icons/fa";
import type { Language } from "./quizData";

type ChallengeSidebarProps = {
  languages: Language[];
  selectedLanguage: string;
  score: number;
  streak: number;
  currentQuestion: number;
  totalQuestions: number;
  onLanguageChange: (languageId: string) => void;
};

export const ChallengeSidebar = ({
  languages,
  selectedLanguage,
  score,
  streak,
  currentQuestion,
  totalQuestions,
  onLanguageChange,
}: ChallengeSidebarProps) => {
  const progress = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <div className="relative flex flex-col justify-between gap-7 overflow-hidden bg-[linear-gradient(145deg,#001b54_0%,#003a92_58%,#06439f_100%)] px-7 py-9 text-white sm:px-9 sm:py-10 lg:px-10 lg:py-12">

      <div className="relative z-10 flex flex-col gap-4">
      
        <h3 className="font-roxborough text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-white sm:text-4xl">
          Test Your Skills
        </h3>
        <p className="max-w-sm text-sm leading-7 text-white/80 sm:text-base">
          Choose a language and translate the sentence. Earn points for every correct answer – how high can you streak?
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.07] p-1.5 backdrop-blur-sm">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5">
          <FaStar className="h-5 w-5 text-yellow-300" />
          <span className="text-2xl font-bold text-white">{score}</span>
          <span className="text-sm text-white/60">pts</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border-l border-white/10 px-3 py-2.5">
          <FaFire className="h-5 w-5 text-orange-400" />
          <span className="text-2xl font-bold text-white">{streak}</span>
          <span className="text-sm text-white/60">streak</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language.id}
            type="button"
            onClick={() => onLanguageChange(language.id)}
            aria-pressed={selectedLanguage === language.id}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              selectedLanguage === language.id
                ? "border-white/40 bg-white text-haiti-navy shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                : "border-white/10 bg-white/[0.05] text-white/75 hover:bg-white/15 hover:text-white"
            }`}
          >
            <span>{language.flag}</span>
            {language.name}
          </button>
        ))}
      </div>

      <div className="relative z-10 mt-2">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Progress</span>
          <span>{currentQuestion} / {totalQuestions}</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-haiti-red to-yellow-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="relative z-10 text-xs text-white/40">
        * All sentences are beginner‑friendly.
      </p>
    </div>
  );
};
