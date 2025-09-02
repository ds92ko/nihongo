import { mateImageMap } from '@/assets/images/mates';
import { MateType } from '@/types/mate';

const getFeedbackImageName = (accuracy: number) => {
  if (accuracy === 100) return 'excited';
  if (accuracy >= 90) return 'blushing';
  if (accuracy >= 80) return 'happy';
  if (accuracy >= 70) return 'good';
  if (accuracy >= 60) return 'yes';
  if (accuracy >= 50) return 'ok';
  if (accuracy >= 40) return 'shy';
  if (accuracy >= 30) return 'sad';
  if (accuracy >= 20) return 'no';
  if (accuracy >= 10) return 'mocking';
  return 'shocked';
};

export const getFeedbackImageSource = (mate: MateType, accuracy: number) =>
  mateImageMap[mate][getFeedbackImageName(accuracy)];
