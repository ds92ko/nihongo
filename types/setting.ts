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

export interface SettingStore {
  context: SettingContext;
  actions: SettingActions;
}
