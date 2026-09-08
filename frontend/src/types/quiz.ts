export type Language = 'en' | 'ta';

export type CategoryCode = 'A' | 'C' | 'D' | 'E' | 'F' | 'G' | 'I' | 'J' | 'O';

export interface CategoryInfo {
  code: CategoryCode;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  icon: string;
  color: string;
}

export interface QuestionItem {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  language: Language;
  category: CategoryCode;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation?: string;
}

export interface QuizState {
  category: CategoryCode | null;
  language: Language;
  level: number;
  questions: QuestionItem[];
  currentIndex: number;
  score: number;
  streak: number;
  selectedOption: number | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  isLevelComplete: boolean;
  isLoading: boolean;
  error: string | null;
}
