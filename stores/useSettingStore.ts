import { create } from 'zustand';

interface SettingContext {
  soundEffectOff: boolean;
  kanaSoundOff: boolean;
}

interface SettingActions {
  toggleSoundEffect: () => void;
  toggleKanaSound: () => void;
}

interface SettingStore {
  context: SettingContext;
  actions: SettingActions;
}

const useSettingStore = create<SettingStore>(set => ({
  context: {
    soundEffectOff: false,
    kanaSoundOff: false
  },
  actions: {
    toggleSoundEffect: () =>
      set(state => ({
        context: {
          ...state.context,
          soundEffectOff: !state.context.soundEffectOff
        }
      })),
    toggleKanaSound: () =>
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
