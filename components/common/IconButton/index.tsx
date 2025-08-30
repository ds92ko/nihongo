import { styles } from '@/components/common/IconButton/styles';
import { IconButtonProps } from '@/components/common/IconButton/types';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
  variant = 'primary'
}: IconButtonProps) => {
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
      onPress={onPress}
      disabled={disabled}
      style={[...buttonStyle, style]}
    >
      <RenderIcon />
    </Link>
  ) : (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[...buttonStyle, style]}
    >
      <RenderIcon />
    </Pressable>
  );
};

export default IconButton;
