import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { StyleSheet, Text, TextProps } from 'react-native';

interface LogoProps extends TextProps {
  variant?: 'white' | 'black';
}

const Logo = ({ variant = 'black', style, ...props }: LogoProps) => {
  return (
    <Text
      {...props}
      style={[styles[variant], Typography.h1, { color: Colors.textPrimary }, style]}
    >
      Nihon
      <Text style={{ color: Colors.primary }}>GO</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  black: {
    fontFamily: 'Cafe24Meongi-B'
  },
  white: {
    fontFamily: 'Cafe24Meongi-W'
  }
});

export default Logo;
