import { create } from 'zustand';

interface SettingContext {
  popSoundOff: boolean;
  kanaSoundOff: boolean;
}

interface SettingActions {
  setPopSoundOff: () => void;
  setKanaSoundOff: () => void;
}

interface SettingStore {
  context: SettingContext;
  actions: SettingActions;
}

const useSettingStore = create<SettingStore>(set => ({
  context: {
    popSoundOff: false,
    kanaSoundOff: false
  },
  actions: {
    setPopSoundOff: () =>
      set(state => ({
        context: {
          ...state.context,
          popSoundOff: !state.context.popSoundOff
        }
      })),
    setKanaSoundOff: () =>
      set(state => ({
        context: {
          ...state.context,
          kanaSoundOff: !state.context.kanaSoundOff
        }
      }))
  }
}));

export const useSettingContext = () => useSettingStore(({ context }) => context);
export const useSettingActions = () => useSettingStore(({ actions }) => actions);
