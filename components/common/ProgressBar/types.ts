import { Colors } from '@/constants/Colors';

export interface ProgressBarProps {
  progress: number;
  min?: number;
  max?: number;
  height?: number;
  text?: 'none' | 'status' | 'percentage';
  progressColor?: keyof typeof Colors | string;
  barColor?: keyof typeof Colors | string;
}
