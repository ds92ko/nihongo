import { MateStore } from '@/types/mate';
import { create } from 'zustand';

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
