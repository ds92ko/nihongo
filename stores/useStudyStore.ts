import { KanaSoundType } from '@/types/kana';
import { create } from 'zustand';

type KanaStudy = Record<KanaSoundType, string[]>;

interface StudyContext {
  target: KanaStudy;
  progress: KanaStudy;
}

interface StudyActions {
  setTarget: (target: Partial<KanaStudy>) => void;
  setProgress: (progress: Partial<KanaStudy>) => void;
  resetTarget: () => void;
  resetProgress: () => void;
}

interface StudyStore {
  context: StudyContext;
  actions: StudyActions;
}

const defaultKanaStudy: KanaStudy = {
  seion: [],
  dakuon: [],
  youon: []
};

const useStudyStore = create<StudyStore>(set => ({
  context: {
    target: defaultKanaStudy,
    progress: defaultKanaStudy
  },
  actions: {
    setTarget: target =>
      set(state => ({
        context: {
          ...state.context,
          target: {
            ...state.context.target,
            ...target
          }
        }
      })),
    setProgress: progress =>
      set(state => ({
        context: {
          ...state.context,
          progress: {
            ...state.context.progress,
            ...progress
          }
        }
      })),
    resetTarget: () =>
      set(state => ({
        context: {
          ...state.context,
          target: defaultKanaStudy
        }
      })),
    resetProgress: () =>
      set(state => ({
        context: {
          ...state.context,
          progress: defaultKanaStudy
        }
      }))
  }
}));

export const useStudyContext = () => useStudyStore(({ context }) => context);
export const useStudyActions = () => useStudyStore(({ actions }) => actions);
