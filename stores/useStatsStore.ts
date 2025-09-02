import { QuizType } from '@/stores/useQuizStore';
import { KanaType } from '@/types/kana';
import dayjs from 'dayjs';
import { create } from 'zustand';

export type PracticeType = 'reading' | 'writing' | 'listening' | 'speaking';

interface PracticeStat {
  type: KanaType;
  kana: string;
  count: number;
}

type PracticeStats = {
  [key in PracticeType]: PracticeStat[];
};

interface QuizStat {
  type: KanaType;
  kana: string;
  correct: number;
  incorrect: number;
}

type QuizStats = {
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

interface StatsStore {
  context: StatsContext;
  actions: StatsActions;
}

const DEFAULT_PRACTICE_STATS: PracticeStats = {
  reading: [],
  writing: [],
  listening: [],
  speaking: []
};

const DEFAULT_QUIZ_STATS: QuizStats = {
  character: [],
  pronunciation: []
};

const useStatsStore = create<StatsStore>(set => ({
  context: {
    practice: {},
    quiz: {}
  },
  actions: {
    setPracticeStats: (kanaType, type, kana) =>
      set(state => {
        const today = dayjs().format('YYYY-MM-DD');
        const todayStats = state.context.practice[today] || { ...DEFAULT_PRACTICE_STATS };

        const stats = todayStats[type];
        const existing = stats.find(s => s.kana === kana && s.type === kanaType);
        const newStats = existing
          ? stats.map(s =>
              s.kana === kana && s.type === kanaType ? { ...s, count: s.count + 1 } : s
            )
          : [...stats, { type: kanaType, kana, count: 1 }];

        return {
          context: {
            ...state.context,
            practice: {
              ...state.context.practice,
              [today]: {
                ...todayStats,
                [type]: newStats
              }
            }
          }
        };
      }),
    resetPracticeStats: () =>
      set(state => ({
        context: {
          ...state.context,
          practice: {}
        }
      })),
    setQuizStats: (kanaType, type, kana, correct) =>
      set(state => {
        const today = dayjs().format('YYYY-MM-DD');
        const todayStats = state.context.quiz[today] || { ...DEFAULT_QUIZ_STATS };

        const stats = todayStats[type];
        const existing = stats.find(s => s.kana === kana && s.type === kanaType);
        const newStats = existing
          ? stats.map(s =>
              s.kana === kana && s.type === kanaType
                ? {
                    ...s,
                    correct: s.correct + (correct ? 1 : 0),
                    incorrect: s.incorrect + (correct ? 0 : 1)
                  }
                : s
            )
          : [
              ...stats,
              { type: kanaType, kana, correct: correct ? 1 : 0, incorrect: correct ? 0 : 1 }
            ];

        return {
          context: {
            ...state.context,
            quiz: {
              ...state.context.quiz,
              [today]: {
                ...todayStats,
                [type]: newStats
              }
            }
          }
        };
      }),
    resetQuizStats: () =>
      set(state => ({
        context: {
          ...state.context,
          quiz: {}
        }
      }))
  }
}));

export const useStatsContext = () => useStatsStore(({ context }) => context);
export const useStatsActions = () => useStatsStore(({ actions }) => actions);
