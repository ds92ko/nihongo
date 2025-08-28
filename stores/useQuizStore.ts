import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { KanaSoundType, KanaType } from '@/types/kana';
import { create } from 'zustand';

type KanaQuiz = Record<KanaSoundType, string[]>;
export type QuizType = 'character' | 'pronunciation';

export type Progress = {
  answer: string;
  character: string;
  pronunciation: string;
};

export interface Question extends Progress {
  answers: string[];
}

interface QuizContext {
  type: QuizType | null;
  target: KanaQuiz;
  progress: Progress[];
  question: Question | null;
}

interface QuizActions {
  startQuiz: (kanaType: KanaType, type: QuizType) => void;
  setTarget: (target: Partial<KanaQuiz>) => void;
  resetTarget: () => void;
  initProgress: (kanaType: KanaType) => Progress[];
  setProgress: (progress: Progress[]) => void;
  initQuestion: (kanaType: KanaType, progress: Progress[]) => Question | null;
  setQuestion: (kanaType: KanaType) => void;
}

interface QuizStore {
  context: QuizContext;
  actions: QuizActions;
}

const defaultKanaQuiz: KanaQuiz = {
  seion: [],
  dakuon: [],
  youon: []
};

const ANSWERS_LENGTH = 5;

const useQuizStore = create<QuizStore>((set, get) => ({
  context: {
    type: null,
    target: defaultKanaQuiz,
    progress: [],
    question: null
  },
  actions: {
    startQuiz: (kanaType, type) =>
      set(state => {
        const progress = get().actions.initProgress(kanaType);
        const question = get().actions.initQuestion(kanaType, progress);

        return {
          context: {
            ...state.context,
            type,
            progress,
            question
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
    resetTarget: () =>
      set(state => ({
        context: {
          ...state.context,
          target: defaultKanaQuiz
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
    initQuestion: (kanaType, progress) => {
      const unsolved = progress.filter(p => !p.answer);

      if (!unsolved.length) return null;

      const random = Math.floor(Math.random() * unsolved.length);
      const current = unsolved[random];
      const rows = KANA_TABS[kanaType]
        .find(tab => tab.rows.find(row => row.kana.includes(current.character)))
        ?.rows.map(({ kana }) => kana.filter(Boolean));

      if (!rows) return null;

      const rowIndex = rows.findIndex(kana => kana.includes(current.character));
      const answers = [...rows[rowIndex]];

      if (answers.length < ANSWERS_LENGTH) {
        const otherRows = rows.filter((_, i) => i !== rowIndex).flat();
        const remaining = ANSWERS_LENGTH - answers.length;
        const otherAnswers = [...otherRows].sort(() => 0.5 - Math.random()).slice(0, remaining);

        answers.push(...otherAnswers);
      }

      answers.sort(() => 0.5 - Math.random());

      return unsolved.length ? { ...current, answers } : null;
    },
    setQuestion: kanaType => {
      const progress = get().context.progress;
      const question = get().actions.initQuestion(kanaType, progress);
      set(state => ({
        context: {
          ...state.context,
          question
        }
      }));
    }
  }
}));

export const useQuizContext = () => useQuizStore(({ context }) => context);
export const useQuizActions = () => useQuizStore(({ actions }) => actions);
