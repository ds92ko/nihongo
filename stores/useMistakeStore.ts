import { KanaType } from '@/types/kana';
import { create } from 'zustand';

export type MistakeMode = 'both' | 'character' | 'pronunciation';

export interface Mistake {
  character: string;
  pronunciation: string;
  mode: MistakeMode;
  count: number;
}

interface MistakeContext {
  mistakes: {
    [key in KanaType]: Mistake[];
  };
}

interface MistakeActions {
  addMistake: (kanaType: KanaType, mistake: Omit<Mistake, 'mode' | 'count'>) => void;
  removeMistake: (kanaType: KanaType, character: string) => void;
  setMistake: (kanaType: KanaType, mistake: Mistake) => void;
  setMistakeModes: (kanaType: KanaType, mode: MistakeMode) => void;
  resetMistakes: () => void;
}

interface MistakeStore {
  context: MistakeContext;
  actions: MistakeActions;
}

const DEFAULT_MISTAKE_CONTEXT: MistakeContext = {
  mistakes: {
    hiragana: [],
    katakana: []
  }
};

const useMistakeStore = create<MistakeStore>(set => ({
  context: DEFAULT_MISTAKE_CONTEXT,
  actions: {
    addMistake: (kanaType, mistake) =>
      set(state => {
        const existing = state.context.mistakes[kanaType];
        const found = existing.find(n => n.character === mistake.character);
        const updatedMistakes = found
          ? existing.map(n =>
              n.character === mistake.character ? { ...n, count: n.count + 1 } : n
            )
          : [...existing, { ...mistake, mode: 'both', count: 1 }];

        return {
          context: {
            ...state.context,
            mistakes: {
              ...state.context.mistakes,
              [kanaType]: updatedMistakes
            }
          }
        };
      }),
    removeMistake: (kanaType, character) =>
      set(state => ({
        context: {
          ...state.context,
          mistakes: {
            ...state.context.mistakes,
            [kanaType]: state.context.mistakes[kanaType].filter(
              mistake => mistake.character !== character
            )
          }
        }
      })),
    setMistake: (kanaType, mistake) =>
      set(state => ({
        context: {
          ...state.context,
          mistakes: {
            ...state.context.mistakes,
            [kanaType]: state.context.mistakes[kanaType].map(n =>
              n.character === mistake.character ? mistake : n
            )
          }
        }
      })),
    setMistakeModes: (kanaType, mode) =>
      set(state => ({
        context: {
          ...state.context,
          mistakes: {
            ...state.context.mistakes,
            [kanaType]: state.context.mistakes[kanaType].map(mistake => ({ ...mistake, mode }))
          }
        }
      })),
    resetMistakes: () =>
      set({
        context: DEFAULT_MISTAKE_CONTEXT
      })
  }
}));

export const useMistakeContext = () => useMistakeStore(({ context }) => context);
export const useMistakeActions = () => useMistakeStore(({ actions }) => actions);
