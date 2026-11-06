import type { LucideIcon } from "lucide-react";

export type Difficulty = "facil" | "medio" | "dificil";

export interface TheorySection {
  title: string;
  paragraphs: string[];
  code?: string;
  codeCaption?: string;
}

export interface QuizQuestion {
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

export interface StudyTopic {
  id: string;
  title: string;
  discipline: string;
  summary: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  theory: TheorySection[];
  questions: QuizQuestion[];
}

export interface AnswerRecord {
  topicId: string;
  questionIndex: number;
  selectedIndex: number;
  isCorrect: boolean;
  difficulty: Difficulty;
}
