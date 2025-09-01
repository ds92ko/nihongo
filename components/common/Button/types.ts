import { Status } from '@/types/status';
import { LinkProps } from 'expo-router';
import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

type ButtonVariant = 'primary' | 'primary10' | 'neutralLight' | Status;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  active?: boolean;
  fill?: boolean;
  children: string;
}

type ButtonLinkProps = {
  href: LinkProps['href'];
  style?: StyleProp<TextStyle>;
} & LinkProps &
  ButtonBaseProps;

type ButtonPressableProps = {
  href?: never;
  style?: StyleProp<ViewStyle>;
} & PressableProps &
  ButtonBaseProps;

export type ButtonProps = ButtonLinkProps | ButtonPressableProps;
