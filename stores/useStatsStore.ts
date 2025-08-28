import { StudyType } from '@/stores/useStudyStore';
import { KanaType } from '@/types/kana';
import dayjs from 'dayjs';
import { create } from 'zustand';

type PracticeType = 'listening' | 'writing';

interface PracticeStat {
  type: KanaType;
  kana: string;
  count: number;
}

type PracticeStats = {
  [key in PracticeType]: PracticeStat[];
};

interface StudyStat {
  type: KanaType;
  kana: string;
  correct: number;
  incorrect: number;
}

type StudyStats = {
  [key in StudyType]: StudyStat[];
};

interface StatsContext {
  practice: {
    [date: string]: PracticeStats;
  };
  study: {
    [date: string]: StudyStats;
  };
}

interface StatsActions {
  setPracticeStats: (kanaType: KanaType, type: PracticeType, kana: string) => void;
  resetPracticeStats: () => void;
  setStudyStats: (kanaType: KanaType, type: StudyType, kana: string, correct: boolean) => void;
  resetStudyStats: () => void;
}

interface StatsStore {
  context: StatsContext;
  actions: StatsActions;
}

const DEFAULT_PRACTICE_STATS: PracticeStats = {
  listening: [],
  writing: []
};

const DEFAULT_STUDY_STATS: StudyStats = {
  character: [],
  pronunciation: []
};

const useStatsStore = create<StatsStore>(set => ({
  context: {
    practice: {},
    study: {}
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
    setStudyStats: (kanaType, type, kana, correct) =>
      set(state => {
        const today = dayjs().format('YYYY-MM-DD');
        const todayStats = state.context.study[today] || { ...DEFAULT_STUDY_STATS };

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
            study: {
              ...state.context.study,
              [today]: {
                ...todayStats,
                [type]: newStats
              }
            }
          }
        };
      }),
    resetStudyStats: () =>
      set(state => ({
        context: {
          ...state.context,
          study: {}
        }
      }))
  }
}));

export const useStatsContext = () => useStatsStore(({ context }) => context);
export const useStatsActions = () => useStatsStore(({ actions }) => actions);
