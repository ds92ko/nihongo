import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg from 'react-native-svg';

const { width } = Dimensions.get('window');
export const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const SVG_SIZE = width * 0.7;
export const ANIMATION_DURATION = 700;
export const CHAR_WIDTH = 109;
export const STROKE_WIDTH = 5;
