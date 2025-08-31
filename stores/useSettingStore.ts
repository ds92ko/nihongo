import { create } from 'zustand';

interface SettingContext {
  soundEffectOff: boolean;
  kanaSoundOff: boolean;
  hapticOff: boolean;
}

interface SettingActions {
  toggleSoundEffect: () => void;
  toggleKanaSound: () => void;
  toggleHaptic: () => void;
}

interface SettingStore {
  context: SettingContext;
  actions: SettingActions;
}

const useSettingStore = create<SettingStore>(set => ({
  context: {
    soundEffectOff: false,
    kanaSoundOff: false,
    hapticOff: false
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
      })),
    toggleHaptic: () =>
      set(state => ({
        context: {
          ...state.context,
          hapticOff: !state.context.hapticOff
        }
      }))
  }
}));

export const useSettingContext = () => useSettingStore(({ context }) => context);
export const useSettingActions = () => useSettingStore(({ actions }) => actions);
export default useSettingStore;
