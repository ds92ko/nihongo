import { KanaType } from '@/types/kana';
import { create } from 'zustand';

interface KanaContext {
  kanaType: KanaType;
  isVisibleGrid: boolean;
  isAutoDelete: boolean;
}

interface KanaActions {
  setKanaType: () => void;
  setIsVisibleGrid: () => void;
  setIsAutoDelete: (isAutoDelete: boolean) => void;
}

interface KanaStore {
  context: KanaContext;
  actions: KanaActions;
}

const useKanaStore = create<KanaStore>(set => ({
  context: {
    kanaType: 'hiragana' as const,
    isVisibleGrid: true,
    isAutoDelete: true
  },
  actions: {
    setKanaType: () =>
      set(state => ({
        context: {
          ...state.context,
          kanaType: state.context.kanaType === 'hiragana' ? 'katakana' : 'hiragana'
        }
      })),
    setIsVisibleGrid: () =>
      set(state => ({
        context: {
          ...state.context,
          isVisibleGrid: !state.context.isVisibleGrid
        }
      })),
    setIsAutoDelete: (isAutoDelete: boolean) =>
      set(state => ({
        context: {
          ...state.context,
          isAutoDelete
        }
      }))
  }
}));

export const useKanaContext = () => useKanaStore(({ context }) => context);
export const useKanaActions = () => useKanaStore(({ actions }) => actions);
