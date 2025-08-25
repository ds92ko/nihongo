import { create } from 'zustand';

interface TabContext {
  tabIndex: number;
  animationEnabled: boolean;
}

interface TabActions {
  setTabIndex: (index: number) => void;
  setAnimationEnabled: (enabled: boolean) => void;
}

interface TabStore {
  context: TabContext;
  actions: TabActions;
}

const useTabStore = create<TabStore>(set => ({
  context: {
    tabIndex: 0,
    animationEnabled: true
  },
  actions: {
    setTabIndex: (index: number) =>
      set(state => ({
        context: {
          ...state.context,
          tabIndex: index
        }
      })),
    setAnimationEnabled: (enabled: boolean) =>
      set(state => ({
        context: {
          ...state.context,
          animationEnabled: enabled
        }
      }))
  }
}));

export const useTabContext = () => useTabStore(({ context }) => context);
export const useTabActions = () => useTabStore(({ actions }) => actions);
