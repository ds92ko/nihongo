import { KanaType } from '@/types/kana';
import { create } from 'zustand';

export type ReviewNoteMode = 'both' | 'character' | 'pronunciation';

export interface ReviewNote {
  character: string;
  pronunciation: string;
  mode: ReviewNoteMode;
  count: number;
}

interface ReviewNoteContext {
  notes: {
    [key in KanaType]: ReviewNote[];
  };
}

interface ReviewNoteActions {
  addNote: (kanaType: KanaType, note: Omit<ReviewNote, 'mode' | 'count'>) => void;
  removeNote: (kanaType: KanaType, character: string) => void;
  setNote: (kanaType: KanaType, note: ReviewNote) => void;
  setAllMode: (kanaType: KanaType, mode: ReviewNoteMode) => void;
  resetNotes: () => void;
}

interface ReviewNoteStore {
  context: ReviewNoteContext;
  actions: ReviewNoteActions;
}

const DEFAULT_CONTEXT: ReviewNoteContext = {
  notes: {
    hiragana: [],
    katakana: []
  }
};

const useReviewNoteStore = create<ReviewNoteStore>(set => ({
  context: DEFAULT_CONTEXT,
  actions: {
    addNote: (kanaType, note) =>
      set(state => {
        const existing = state.context.notes[kanaType];
        const found = existing.find(n => n.character === note.character);
        const updatedNotes = found
          ? existing.map(n => (n.character === note.character ? { ...n, count: n.count + 1 } : n))
          : [...existing, { ...note, mode: 'both', count: 1 }];

        return {
          context: {
            ...state.context,
            notes: {
              ...state.context.notes,
              [kanaType]: updatedNotes
            }
          }
        };
      }),
    removeNote: (kanaType, character) =>
      set(state => ({
        context: {
          ...state.context,
          notes: {
            ...state.context.notes,
            [kanaType]: state.context.notes[kanaType].filter(note => note.character !== character)
          }
        }
      })),
    setNote: (kanaType, note) =>
      set(state => ({
        context: {
          ...state.context,
          notes: {
            ...state.context.notes,
            [kanaType]: state.context.notes[kanaType].map(n =>
              n.character === note.character ? note : n
            )
          }
        }
      })),
    setAllMode: (kanaType, mode) =>
      set(state => ({
        context: {
          ...state.context,
          notes: {
            ...state.context.notes,
            [kanaType]: state.context.notes[kanaType].map(note => ({ ...note, mode }))
          }
        }
      })),
    resetNotes: () =>
      set({
        context: DEFAULT_CONTEXT
      })
  }
}));

export const useReviewNoteContext = () => useReviewNoteStore(({ context }) => context);
export const useReviewNoteActions = () => useReviewNoteStore(({ actions }) => actions);
