
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export type QuizState = 'idle' | 'loading' | 'active';
