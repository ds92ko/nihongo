import { fontFamilyMap } from '@/components/common/Text/constants';
import { TextProps } from '@/components/common/Text/types';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import React from 'react';
import { Text as RNText } from 'react-native';

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
