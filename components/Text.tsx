import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

type Weight = 300 | 400 | 500 | 700;

interface TextProps extends RNTextProps {
  weight?: Weight;
  variant?: keyof typeof Typography;
  color?: keyof typeof Colors | string;
}

const fontFamilyMap = {
  300: 'PyeojinGothic-Light',
  400: 'PyeojinGothic-Regular',
  500: 'PyeojinGothic-Medium',
  700: 'PyeojinGothic-Bold'
};

const Text = ({
  weight = 400,
  variant = 'body1',
  color = 'textPrimary',
  style,
  ...props
}: TextProps) => {
  const appliedColor =
    typeof color === 'string' && Colors[color as keyof typeof Colors]
      ? Colors[color as keyof typeof Colors]
      : color;

  return (
    <RNText
      {...props}
      style={[
        { fontFamily: fontFamilyMap[weight], fontWeight: weight, color: appliedColor },
        Typography[variant],
        style
      ]}
    />
  );
};

export default Text;
