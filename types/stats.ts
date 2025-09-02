import { KanaType } from '@/types/kana';
import { PracticeType } from '@/types/practice';
import { QuizType } from '@/types/quiz';

interface PracticeStat {
  type: KanaType;
  kana: string;
  count: number;
}

export type PracticeStats = {
  [key in PracticeType]: PracticeStat[];
};

interface QuizStat {
  type: KanaType;
  kana: string;
  correct: number;
  incorrect: number;
}

export type QuizStats = {
  [key in QuizType]: QuizStat[];
};

interface StatsContext {
  practice: {
    [date: string]: PracticeStats;
  };
  quiz: {
    [date: string]: QuizStats;
  };
}

interface StatsActions {
  setPracticeStats: (kanaType: KanaType, type: PracticeType, kana: string) => void;
  resetPracticeStats: () => void;
  setQuizStats: (kanaType: KanaType, type: QuizType, kana: string, correct: boolean) => void;
  resetQuizStats: () => void;
}

export interface StatsStore {
  context: StatsContext;
  actions: StatsActions;
}
