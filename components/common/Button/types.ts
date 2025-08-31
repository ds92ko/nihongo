import { LinkProps } from 'expo-router';
import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface ButtonBaseProps {
  variant?: 'primary' | 'primary10' | 'neutralLight' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
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
