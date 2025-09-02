import { KanaType } from '@/types/kana';

export type MistakeMode = 'both' | 'character' | 'pronunciation';

export interface Mistake {
  character: string;
  pronunciation: string;
  mode: MistakeMode;
  count: number;
}

export interface MistakeContext {
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

export interface MistakeStore {
  context: MistakeContext;
  actions: MistakeActions;
}
