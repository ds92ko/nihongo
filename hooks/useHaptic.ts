import useSettingStore from '@/stores/useSettingStore';
import * as Haptics from 'expo-haptics';

const styleMap: Record<string, Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  soft: Haptics.ImpactFeedbackStyle.Soft,
  rigid: Haptics.ImpactFeedbackStyle.Rigid
};

const useHaptics = () => {
  const hapticOff = useSettingStore.getState().context.hapticOff;

  const hapticFeedback = (style: keyof typeof styleMap) => {
    if (hapticOff) return;
    Haptics.impactAsync(styleMap[style]);
  };

  return { hapticFeedback };
};

export default useHaptics;
