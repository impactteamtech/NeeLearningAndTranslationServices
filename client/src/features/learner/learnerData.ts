import type { LearnerMetric, MockLesson } from "./learnerTypes";

// Temporary dashboard content. Keep this file API-free so each collection can
// be replaced independently when progress and curriculum endpoints are added.
export const LEARNER_METRICS: LearnerMetric[] = [
  { id: "lessons", label: "Lessons completed", value: "18", detail: "+3 this week", tone: "blue" },
  { id: "streak", label: "Current streak", value: "7 days", detail: "Personal best: 12", tone: "amber" },
  { id: "words", label: "Words learned", value: "286", detail: "32 added this week", tone: "green" },
  { id: "practice", label: "Practice time", value: "6h 40m", detail: "This month", tone: "red" },
];

export const CONTINUE_LESSON: MockLesson = {
  id: 1,
  title: "Everyday conversations",
  category: "Haitian Creole",
  duration: "12 min left",
  level: "Beginner · Unit 4",
  progress: 68,
};

export const RECOMMENDED_LESSONS: MockLesson[] = [
  { id: 2, title: "Meeting new people", category: "Speaking", duration: "15 min", level: "Beginner" },
  { id: 3, title: "Numbers and time", category: "Vocabulary", duration: "10 min", level: "Beginner" },
  { id: 4, title: "At the market", category: "Listening", duration: "18 min", level: "Beginner" },
];

export const WEEKLY_GOAL = {
  completed: 4,
  target: 5,
  minutesCompleted: 82,
  minutesTarget: 100,
};

export const DAILY_CHALLENGE = {
  prompt: "How do you say “Thank you very much” in Haitian Creole?",
  options: ["Mèsi anpil", "Bonjou", "N a wè pita"],
  answer: "Mèsi anpil",
};
