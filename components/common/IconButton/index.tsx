import { styles } from '@/components/common/IconButton/styles';
import { IconButtonProps } from '@/components/common/IconButton/types';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, PressableProps } from 'react-native';

const IconButton = ({
  onPress,
  disabled,
  href,
  icon,
  style,
  size = 'medium',
  shape = 'rounded',
  variant = 'primary'
}: IconButtonProps) => {
  const buttonStyle = [
    styles.button,
    styles[size],
    styles[shape],
    styles[variant],
    disabled && (variant === 'white' ? styles.disabledWhite : styles.disabledPrimary),
    style
  ];
  const iconProps = {
    size: 20,
    color: icon.color || (disabled ? Colors.textSecondary : Colors.textPrimary)
  };

  const IconPressable = ({ onPress, disabled }: PressableProps) => (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
    >
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
    </Pressable>
  );

  return href ? (
    <Link
      href={href}
      onPress={onPress}
      disabled={disabled}
      asChild
    >
      <IconPressable />
    </Link>
  ) : (
    <IconPressable
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default IconButton;
