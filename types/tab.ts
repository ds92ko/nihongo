interface TabContext {
  tabIndex: number;
  animationEnabled: boolean;
}

interface TabActions {
  setTabIndex: (index: number) => void;
  setAnimationEnabled: (enabled: boolean) => void;
}

export interface TabStore {
  context: TabContext;
  actions: TabActions;
}
