import { useEffect, useRef, useState } from "react";
import { AboutCTAHeader } from "./about-cta/AboutCTAHeader";
import { ChallengeSidebar } from "./about-cta/ChallengeSidebar";
import { QuizPanel } from "./about-cta/QuizPanel";
import {
  LANGUAGES,
  QUESTIONS,
  type QuizFeedback,
} from "./about-cta/quizData";

export const AboutCTA = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ht");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<QuizFeedback>(null);
  const [showNext, setShowNext] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const questions = QUESTIONS.filter(
    (question) => question.languageId === selectedLanguage
  );
  const currentQuestion = questions[currentQuestionIndex];
  const currentLanguage = LANGUAGES.find(
    (language) => language.id === selectedLanguage
  )!;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    },
    []
  );

  const clearAnswer = () => {
    setSelectedOption(null);
    setFeedback(null);
    setShowNext(false);
  };

  const advanceQuestion = () => {
    setCurrentQuestionIndex((index) =>
      index + 1 < questions.length ? index + 1 : 0
    );
    clearAnswer();
  };

  const handleLanguageChange = (languageId: string) => {
    if (languageId === selectedLanguage) return;
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);

    setSelectedLanguage(languageId);
    setCurrentQuestionIndex(0);
    clearAnswer();
  };

  const handleOptionSelect = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentQuestion.correct;
    setSelectedOption(option);
    setFeedback(isCorrect ? "correct" : "wrong");
    setShowNext(true);

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
      setStreak((currentStreak) => currentStreak + 1);
    } else {
      setStreak(0);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!prefersReducedMotion) {
      advanceTimerRef.current = setTimeout(advanceQuestion, 3200);
    }
  };

  const handleNext = () => {
    if (!showNext) return;
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceQuestion();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-[clamp(62px,3vw,60px)]"
    >
      {/* <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-haiti-red/[0.06] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-haiti-navy/[0.08] blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-haiti-navy/10 to-transparent" />
      </div> */}

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,40px)]">
        <AboutCTAHeader visible={visible} />

        <div
          className={`mx-auto grid w-full max-w-[1140px] grid-cols-1 overflow-hidden rounded-[32px] border border-haiti-navy/10 bg-white lg:grid-cols-[0.92fr_1.08fr] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <ChallengeSidebar
            languages={LANGUAGES}
            selectedLanguage={selectedLanguage}
            score={score}
            streak={streak}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onLanguageChange={handleLanguageChange}
          />
          <QuizPanel
            language={currentLanguage}
            question={currentQuestion}
            selectedOption={selectedOption}
            feedback={feedback}
            showNext={showNext}
            onOptionSelect={handleOptionSelect}
            onNext={handleNext}
          />
        </div>
      </div> 
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style> 
    </section>
  );
};

export default AboutCTA;
