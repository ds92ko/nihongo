import { StudyType } from '@/stores/useStudyStore';
import { KanaType } from '@/types/kana';
import { create } from 'zustand';

type PracticeType = 'listening' | 'writing';

interface PracticeStat {
  kana: string;
  count: number;
}

type PracticeStats = {
  [key in PracticeType]: PracticeStat[];
};

interface StudyStat {
  kana: string;
  correct: number;
  incorrect: number;
}

type StudyStats = {
  [key in StudyType]: StudyStat[];
};

interface KanaStats {
  practice: PracticeStats;
  study: StudyStats;
}

type StatsContext = {
  [key in KanaType]: KanaStats;
};

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

const DEFAULT_STATS_CONTEXT: StatsContext = {
  hiragana: {
    practice: {
      listening: [],
      writing: []
    },
    study: {
      character: [],
      pronunciation: []
    }
  },
  katakana: {
    practice: {
      listening: [],
      writing: []
    },
    study: {
      character: [],
      pronunciation: []
    }
  }
};

const useStatsStore = create<StatsStore>(set => ({
  context: DEFAULT_STATS_CONTEXT,
  actions: {
    setPracticeStats: (kanaType, type, kana) =>
      set(state => {
        const stats = state.context[kanaType].practice[type];
        const existing = stats.find(s => s.kana === kana);
        const newStats = existing
          ? stats.map(s => (s.kana === kana ? { ...s, count: s.count + 1 } : s))
          : [...stats, { kana, count: 1 }];

        return {
          context: {
            ...state.context,
            [kanaType]: {
              ...state.context[kanaType],
              practice: {
                ...state.context[kanaType].practice,
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
          hiragana: {
            ...state.context.hiragana,
            practice: DEFAULT_STATS_CONTEXT.hiragana.practice
          },
          katakana: {
            ...state.context.katakana,
            practice: DEFAULT_STATS_CONTEXT.katakana.practice
          }
        }
      })),
    setStudyStats: (kanaType, type, kana, correct) =>
      set(state => {
        const stats = state.context[kanaType].study[type];
        const existing = stats.find(s => s.kana === kana);
        const newStats = existing
          ? stats.map(s =>
              s.kana === kana
                ? {
                    ...s,
                    correct: s.correct + (correct ? 1 : 0),
                    incorrect: s.incorrect + (correct ? 0 : 1)
                  }
                : s
            )
          : [...stats, { kana, correct: correct ? 1 : 0, incorrect: correct ? 0 : 1 }];

        return {
          context: {
            ...state.context,
            [kanaType]: {
              ...state.context[kanaType],
              study: {
                ...state.context[kanaType].study,
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
          hiragana: {
            ...state.context.hiragana,
            study: DEFAULT_STATS_CONTEXT.hiragana.study
          },
          katakana: {
            ...state.context.katakana,
            study: DEFAULT_STATS_CONTEXT.katakana.study
          }
        }
      }))
  }
}));

export const useStatsContext = () => useStatsStore(({ context }) => context);
export const useStatsActions = () => useStatsStore(({ actions }) => actions);
