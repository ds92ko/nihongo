import { KanaSoundType, KanaType } from '@/types/kana';

export type QuizType = 'character' | 'pronunciation';

export type KanaQuiz = Record<KanaSoundType, string[]>;

type Progress = {
  answer: string;
  character: string;
  pronunciation: string;
};

interface Question extends Progress {
  answers: string[];
}

interface QuizContext {
  type: QuizType | null;
  target: KanaQuiz;
  progress: Progress[];
  question: Question | null;
}

interface QuizActions {
  startQuiz: (kanaType: KanaType, type: QuizType) => void;
  setTarget: (target: Partial<KanaQuiz>) => void;
  resetTarget: () => void;
  initProgress: (kanaType: KanaType) => Progress[];
  setProgress: (progress: Progress[]) => void;
  initQuestion: (kanaType: KanaType, progress: Progress[]) => Question | null;
  setQuestion: (kanaType: KanaType) => void;
}

export interface QuizStore {
  context: QuizContext;
  actions: QuizActions;
}
