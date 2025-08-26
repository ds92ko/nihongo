import { create } from 'zustand';

export type MateType = 'girl1' | 'girl2' | 'girl3' | 'girl4' | 'boy1' | 'boy2' | 'boy3' | 'boy4';

interface MateContext {
  mate: MateType;
}

interface MateActions {
  setMate: (mate: MateType) => void;
}

interface MateStore {
  context: MateContext;
  actions: MateActions;
}

const useMateStore = create<MateStore>(set => ({
  context: {
    mate: 'girl1'
  },
  actions: {
    setMate: mate =>
      set(state => ({
        context: {
          ...state.context,
          mate
        }
      }))
  }
}));

export const useMateContext = () => useMateStore(({ context }) => context);
export const useMateActions = () => useMateStore(({ actions }) => actions);
