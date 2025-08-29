import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { TextProps as RNTextProps } from 'react-native';

type Weight = 400 | 500 | 700;

export interface TextProps extends RNTextProps {
  weight?: Weight;
  variant?: keyof typeof Typography;
  color?: keyof typeof Colors | string;
}
