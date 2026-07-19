import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { HiArrowRight, HiMiniSparkles } from "react-icons/hi2";
import { QuizOption } from "./QuizOption";
import type { Language, Question, QuizFeedback } from "./quizData";

type QuizPanelProps = {
  language: Language;
  question: Question;
  selectedOption: string | null;
  feedback: QuizFeedback;
  showNext: boolean;
  onOptionSelect: (option: string) => void;
  onNext: () => void;
};

export const QuizPanel = ({
  language,
  question,
  selectedOption,
  feedback,
  showNext,
  onOptionSelect,
  onNext,
}: QuizPanelProps) => (
  <div className="flex flex-col gap-5 px-5 py-7 sm:px-9 sm:py-10 lg:p-12">
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-haiti-red">
        <HiMiniSparkles className="h-4 w-4" />
        Translate this
      </span>
      <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
        {language.flag} {language.name}
      </span>
    </div>

    <div className="relative overflow-hidden rounded-3xl border border-haiti-navy/10 bg-[linear-gradient(145deg,#f8faff_0%,#ffffff_100%)] p-6 shadow-[0_12px_34px_rgba(0,32,159,0.07)] sm:p-7">
      <span className="absolute right-5 top-3 font-roxborough text-6xl leading-none text-haiti-navy/[0.06]" aria-hidden="true">
        “
      </span>
      <p className="relative text-2xl font-semibold leading-snug tracking-[-0.02em] text-slate-800 sm:text-3xl">
        {question.sentence}
      </p>
      <p className="mt-3 text-xs font-medium text-slate-400">
        Choose the closest English translation.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {question.options.map((option, index) => (
        <QuizOption
          key={option}
          option={option}
          index={index}
          correctAnswer={question.correct}
          selectedOption={selectedOption}
          feedback={feedback}
          onSelect={onOptionSelect}
        />
      ))}
    </div>

    <div className="flex min-h-11 items-center justify-between gap-4 border-t border-slate-100 pt-4">
      <div className="flex items-center gap-2" aria-live="polite">
        {feedback === "correct" && (
          <span className="flex items-center gap-1 text-sm font-bold text-green-600">
            <FaCheckCircle /> Correct! +1
          </span>
        )}
        {feedback === "wrong" && (
          <span className="flex items-center gap-1 text-sm font-bold text-red-500">
            <FaTimesCircle /> Oops! The answer was: {question.correct}
          </span>
        )}
        {!feedback && (
          <span className="text-sm text-slate-400">Pick an answer above</span>
        )}
      </div>
      {showNext && (
        <button
          onClick={onNext}
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-haiti-navy px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5 hover:bg-haiti-navy-dark"
        >
          Next <HiArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>

    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3.5">
      <p className="text-sm text-slate-500">
        Love this? Start your full language journey today.
      </p>
      <Link
        to="/login"
        className="group inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(135deg,#CE1126_0%,#e33b4f_100%)] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-red"
      >
        Start Learning Free
        <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);
