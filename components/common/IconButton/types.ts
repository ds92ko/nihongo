import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinkProps } from 'expo-router';
import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

type MaterialIconNames = keyof typeof MaterialIcons.glyphMap;
interface MaterialIconType {
  type: 'material';
  name: MaterialIconNames;
}

type MaterialCommunityIconNames = keyof typeof MaterialCommunityIcons.glyphMap;
interface MaterialCommunityIconType {
  type: 'material-community';
  name: MaterialCommunityIconNames;
}

type IconType = {
  color?: string;
} & (MaterialIconType | MaterialCommunityIconType);

interface IconButtonBaseProps {
  icon: IconType;
  variant?: 'primary' | 'white';
  shape?: 'rounded' | 'square';
  size?: 'small' | 'medium' | 'large';
}

type IconLinkProps = {
  href: LinkProps['href'];
  style?: StyleProp<TextStyle>;
} & LinkProps &
  IconButtonBaseProps;

type IconPressableProps = {
  href?: never;
  style?: StyleProp<ViewStyle>;
} & PressableProps &
  IconButtonBaseProps;

export type IconButtonProps = IconLinkProps | IconPressableProps;
