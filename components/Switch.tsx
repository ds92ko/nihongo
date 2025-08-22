import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import React, { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const WIDTH = 50;
const HEIGHT = 30;
const PADDING = 4;
const INNER_WIDTH = WIDTH - PADDING * 2;
const THUMB_SIZE = HEIGHT - PADDING * 2;

const Switch = ({ value, onValueChange }: SwitchProps) => {
  const [animValue] = useState(new Animated.Value(value ? 1 : 0));
  const { playPopAudio } = usePopAudio();

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [value, animValue]);

  const handleChange = () => {
    playPopAudio();
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

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    padding: PADDING,
    justifyContent: 'center'
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    backgroundColor: Colors.white
  }
});

export default Switch;
