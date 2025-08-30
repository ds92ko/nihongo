import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinkProps } from 'expo-router';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

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

interface IconPressableProps extends PressableProps {
  href?: never;
}
type IconLinkProps = LinkProps;

export type IconButtonProps = {
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'medium' | 'large';
  icon: IconType;
  variant?: 'primary' | 'white';
  shape?: 'rounded' | 'square';
} & (IconPressableProps | IconLinkProps);
