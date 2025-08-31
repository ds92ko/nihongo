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

const Button = ({
  onPress,
  disabled,
  href,
  children,
  style,
  size = 'medium',
  variant = 'primary',
  active = false,
  fill = false
}: ButtonProps) => {
  const { hapticFeedback } = useHaptics();
  const buttonStyle = [
    styles.button,
    styles[size],
    styles[variant],
    fill && styles.fill,
    active && styles[ACTIVE_STYLE_MAP[variant]],
    disabled && styles.disabled
  ];

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
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
    <Link
      href={href}
      onPressIn={onPressIn}
      onPress={onPress}
      disabled={disabled}
      style={[...buttonStyle, style]}
    >
      <RenderText />
    </Link>
  ) : (
    <Pressable
      onPressIn={onPressIn}
      onPress={onPress}
      disabled={disabled}
      style={[...buttonStyle, style]}
    >
      <RenderText />
    </Pressable>
  );
};

export default Button;
