import { create } from 'zustand';

interface ChartTabContext {
  tabIndex: number;
  animationEnabled: boolean;
}

interface ChartTabActions {
  setTabIndex: (index: number) => void;
  setAnimationEnabled: (enabled: boolean) => void;
}

interface ChartTabStore {
  context: ChartTabContext;
  actions: ChartTabActions;
}

const useChartTabStore = create<ChartTabStore>(set => ({
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

export const useChartTabContext = () => useChartTabStore(({ context }) => context);
export const useChartTabActions = () => useChartTabStore(({ actions }) => actions);
