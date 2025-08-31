import { styles } from '@/components/common/IconButton/styles';
import { IconButtonProps } from '@/components/common/IconButton/types';
import { Colors } from '@/constants/Colors';
import SoundManager from '@/managers/SoundManager';
import { useSettingContext } from '@/stores/useSettingStore';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

const IconButton = ({
  onPress,
  disabled,
  href,
  icon,
  style,
  size = 'medium',
  shape = 'rounded',
  variant = 'primary',
  effect = true
}: IconButtonProps) => {
  const { hapticOff } = useSettingContext();
  const buttonStyle = [
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
    <Link
      href={href}
      onPressIn={() => {
        if (!hapticOff)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle[effect ? 'Light' : 'Heavy']);
        if (effect) SoundManager.playClick();
      }}
      onPress={onPress}
      disabled={disabled}
      style={[...buttonStyle, style]}
    >
      <RenderIcon />
    </Link>
  ) : (
    <Pressable
      onPressIn={() => {
        if (!hapticOff)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle[effect ? 'Light' : 'Heavy']);
        if (effect) SoundManager.playClick();
      }}
      onPress={onPress}
      disabled={disabled}
      style={[...buttonStyle, style]}
    >
      <RenderIcon />
    </Pressable>
  );
};

export default IconButton;
