import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { KanaSoundType, KanaType } from '@/types/kana';
import { create } from 'zustand';

type KanaStudy = Record<KanaSoundType, string[]>;
type StudyType = 'character' | 'pronunciation';
export type Progress = {
  answer: string;
  character: string;
  pronunciation: string;
};

interface StudyContext {
  type: StudyType | null;
  target: KanaStudy;
  progress: Progress[];
}

interface StudyActions {
  setType: (kanaType: KanaType, type: StudyType) => void;
  setTarget: (target: Partial<KanaStudy>) => void;
  initProgress: (kanaType: KanaType) => Progress[];
  setProgress: (progress: Progress[]) => void;
  resetTarget: () => void;
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

const useStudyStore = create<StudyStore>((set, get) => ({
  context: {
    type: null,
    target: defaultKanaStudy,
    progress: []
  },
  actions: {
    setType: (kanaType, type) =>
      set(state => {
        const progress = get().actions.initProgress(kanaType);

        return {
          context: {
            ...state.context,
            type,
            progress
          }
        };
      }),
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
    initProgress: kanaType => {
      const { target } = get().context;
      const tabs = KANA_TABS[kanaType];

      return tabs
        .filter(tab => target[tab.key].length)
        .flatMap(tab =>
          tab.rows
            .filter(row => target[tab.key].includes(row.label))
            .flatMap(row =>
              row.kana
                .filter(Boolean)
                .map(k => ({
                  answer: '',
                  character: k,
                  pronunciation: KANA_TO_ROMAJI[kanaType][k]
                }))
                .filter(Boolean)
            )
        );
    },
    setProgress: progress =>
      set(state => ({
        context: {
          ...state.context,
          progress
        }
      })),
    resetTarget: () =>
      set(state => ({
        context: {
          ...state.context,
          target: defaultKanaStudy
        }
      }))
  }
}));

export const useStudyContext = () => useStudyStore(({ context }) => context);
export const useStudyActions = () => useStudyStore(({ actions }) => actions);
