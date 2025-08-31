import { INNER_WIDTH, THUMB_SIZE } from '@/components/local/setting/Switch/constants';
import { styles } from '@/components/local/setting/Switch/styles';
import { SwitchProps } from '@/components/local/setting/Switch/types';
import { Colors } from '@/constants/Colors';
import SoundManager from '@/managers/SoundManager';
import React, { useEffect, useState } from 'react';
import { Animated, Pressable } from 'react-native';

const Switch = ({ value, onValueChange }: SwitchProps) => {
  const [animValue] = useState(new Animated.Value(value ? 1 : 0));

  const handleChange = () => {
    SoundManager.playClick();
    onValueChange(!value);
  };

  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.neutral, Colors.primary]
  });
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, INNER_WIDTH - THUMB_SIZE],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [value, animValue]);

  return (
    <Pressable onPress={handleChange}>
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor
          }
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }]
            }
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;
