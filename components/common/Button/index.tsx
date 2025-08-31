import {
  ACTIVE_STYLE_MAP,
  TEXT_COLOR_MAP,
  TEXT_VARIANT_MAP
} from '@/components/common/Button/constants';
import { styles } from '@/components/common/Button/styles';
import { ButtonProps } from '@/components/common/Button/types';
import Text from '@/components/common/Text';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Button = ({
  onPress,
  disabled,
  href,
  children,
  style,
  animatedStyle,
  size = 'medium',
  variant = 'primary',
  active = false,
  fill = false
}: ButtonProps) => {
  const { hapticFeedback } = useHaptics();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  const animatedStyles = [fill && styles.fill, animated, animatedStyle];
  const buttonStyles = [
    styles.button,
    styles[size],
    styles[variant],
    active && styles[ACTIVE_STYLE_MAP[variant]],
    disabled && styles.disabled
  ];

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
    scale.value = withSpring(0.9, { damping: 10, stiffness: 200 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const RenderText = () => (
    <Text
      weight={active ? 700 : 500}
      variant={TEXT_VARIANT_MAP[size]}
      color={disabled ? 'white' : TEXT_COLOR_MAP[variant]}
    >
      {children}
    </Text>
  );

  return href ? (
    <Animated.View style={[...animatedStyles]}>
      <Link
        href={href}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        disabled={disabled}
        style={[...buttonStyles, style]}
      >
        <RenderText />
      </Link>
    </Animated.View>
  ) : (
    <Animated.View style={[...animatedStyles]}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        disabled={disabled}
        style={[...buttonStyles, style]}
      >
        <RenderText />
      </Pressable>
    </Animated.View>
  );
};

export default Button;
