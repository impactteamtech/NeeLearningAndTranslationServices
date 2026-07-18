import { HiCheck } from "react-icons/hi2";
import type { QuizFeedback } from "./quizData";

type QuizOptionProps = {
  option: string;
  index: number;
  correctAnswer: string;
  selectedOption: string | null;
  feedback: QuizFeedback;
  onSelect: (option: string) => void;
};

const defaultClass =
  "group flex min-h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 text-left text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-haiti-navy/30 hover:shadow-[0_8px_20px_rgba(0,32,159,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haiti-navy";
const correctClass =
  "group flex min-h-14 items-center gap-3 rounded-2xl border border-emerald-400 bg-emerald-50 px-3.5 py-3 text-left text-sm font-semibold text-emerald-800 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]";
const wrongClass =
  "group flex min-h-14 items-center gap-3 rounded-2xl border border-red-400 bg-red-50 px-3.5 py-3 text-left text-sm font-semibold text-red-700 animate-shake";

export const QuizOption = ({
  option,
  index,
  correctAnswer,
  selectedOption,
  feedback,
  onSelect,
}: QuizOptionProps) => {
  const isCorrect = option === correctAnswer;
  const isSelected = option === selectedOption;

  let className = defaultClass;
  if (feedback && isCorrect) className = correctClass;
  if (feedback === "wrong" && isSelected) className = wrongClass;

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(option)}
      disabled={feedback !== null}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-extrabold text-slate-500 group-hover:bg-haiti-navy/10 group-hover:text-haiti-navy">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="flex-1">{option}</span>
      {feedback && isCorrect && (
        <HiCheck className="h-5 w-5 shrink-0 text-emerald-600" />
      )}
    </button>
  );
};
