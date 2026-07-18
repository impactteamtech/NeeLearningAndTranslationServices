export type Language = {
  id: string;
  name: string;
  flag: string;
};

export type Question = {
  id: number;
  languageId: string;
  sentence: string;
  correct: string;
  options: string[];
};

export type QuizFeedback = "correct" | "wrong" | null;

export const LANGUAGES: Language[] = [
  { id: "ht", name: "Haitian Creole", flag: "🇭🇹" },
  { id: "es", name: "Spanish", flag: "🇪🇸" },
  { id: "fr", name: "French", flag: "🇫🇷" },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    languageId: "ht",
    sentence: "Bonjou tout moun!",
    correct: "Hello everyone!",
    options: ["Hello everyone!", "Good morning!", "How are you?", "Welcome!"],
  },
  {
    id: 2,
    languageId: "ht",
    sentence: "Mwen renmen etidye lang.",
    correct: "I love studying languages.",
    options: ["I love studying languages.", "I like to travel.", "I am learning.", "I speak Creole."],
  },
  {
    id: 3,
    languageId: "ht",
    sentence: "Ki jan ou ye?",
    correct: "How are you?",
    options: ["What is your name?", "How are you?", "Where are you from?", "How old are you?"],
  },
  {
    id: 4,
    languageId: "ht",
    sentence: "Mèsi anpil!",
    correct: "Thank you very much!",
    options: ["Thank you very much!", "You're welcome!", "Goodbye!", "See you later!"],
  },
  {
    id: 5,
    languageId: "es",
    sentence: "¡Hola a todos!",
    correct: "Hello everyone!",
    options: ["Hello everyone!", "Good morning!", "How are you?", "Welcome!"],
  },
  {
    id: 6,
    languageId: "es",
    sentence: "Me encanta aprender idiomas.",
    correct: "I love learning languages.",
    options: ["I love learning languages.", "I like to travel.", "I am learning.", "I speak Spanish."],
  },
  {
    id: 7,
    languageId: "es",
    sentence: "¿Cómo estás?",
    correct: "How are you?",
    options: ["What is your name?", "How are you?", "Where are you from?", "How old are you?"],
  },
  {
    id: 8,
    languageId: "es",
    sentence: "¡Muchas gracias!",
    correct: "Thank you very much!",
    options: ["Thank you very much!", "You're welcome!", "Goodbye!", "See you later!"],
  },
  {
    id: 9,
    languageId: "fr",
    sentence: "Bonjour tout le monde !",
    correct: "Hello everyone!",
    options: ["Hello everyone!", "Good morning!", "How are you?", "Welcome!"],
  },
  {
    id: 10,
    languageId: "fr",
    sentence: "J'adore apprendre les langues.",
    correct: "I love learning languages.",
    options: ["I love learning languages.", "I like to travel.", "I am learning.", "I speak French."],
  },
  {
    id: 11,
    languageId: "fr",
    sentence: "Comment allez-vous ?",
    correct: "How are you?",
    options: ["What is your name?", "How are you?", "Where are you from?", "How old are you?"],
  },
  {
    id: 12,
    languageId: "fr",
    sentence: "Merci beaucoup !",
    correct: "Thank you very much!",
    options: ["Thank you very much!", "You're welcome!", "Goodbye!", "See you later!"],
  },
];
