import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

const useSettingStore = create<SettingStore>()(
  persist(
    set => ({
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
    }),
    {
      name: 'setting-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ context }) => ({ context })
    }
  )
);

export const useSettingContext = () => useSettingStore(({ context }) => context);
export const useSettingActions = () => useSettingStore(({ actions }) => actions);
