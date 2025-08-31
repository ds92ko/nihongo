import { styles } from '@/components/common/IconButton/styles';
import { IconButtonProps } from '@/components/common/IconButton/types';
import { Colors } from '@/constants/Colors';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const IconButton = ({
  onPress,
  disabled,
  href,
  icon,
  style,
  animatedStyle,
  size = 'medium',
  shape = 'rounded',
  variant = 'primary',
  effect = true
}: IconButtonProps) => {
  const { hapticFeedback } = useHaptics();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  const animatedStyles = [animated, animatedStyle];
  const buttonStyles = [
    styles.button,
    styles[size],
    styles[shape],
    styles[variant],
    disabled && (variant === 'white' ? styles.disabledWhite : styles.disabledPrimary)
  ];
  const iconProps = {
    size: 20,
    color: icon.color || (disabled ? Colors.textSecondary : Colors.textPrimary)
  };

  const onPressIn = () => {
    hapticFeedback(effect ? 'light' : 'heavy');
    if (effect) SoundManager.playClick();
    scale.value = withSpring(0.9, { damping: 10, stiffness: 200 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const RenderIcon = () => (
    <>
      {icon.type === 'material' && (
        <MaterialIcons
          name={icon.name}
          {...iconProps}
        />
      )}
      {icon.type === 'material-community' && (
        <MaterialCommunityIcons
          name={icon.name}
          {...iconProps}
        />
      )}
    </>
  );

  return href ? (
    <Animated.View style={animatedStyles}>
      <Link
        href={href}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        disabled={disabled}
        style={[...buttonStyles, style]}
      >
        <RenderIcon />
      </Link>
    </Animated.View>
  ) : (
    <Animated.View style={animatedStyles}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        disabled={disabled}
        style={[...buttonStyles, style]}
      >
        <RenderIcon />
      </Pressable>
    </Animated.View>
  );
};

export default IconButton;
