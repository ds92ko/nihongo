import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number;
  min?: number;
  max?: number;
  height?: number;
}

const ProgressBar = ({ progress, min = 0, max = 100, height = 12 }: ProgressBarProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  const normalized = Math.min(Math.max((progress - min) / (max - min), 0), 1);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: normalized,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [animation, normalized]);

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });
  const borderRadius = height / 2;

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { height, borderRadius }]}>
        <Animated.View style={[styles.progress, { width, borderRadius }]} />
      </View>
      <Text
        weight={400}
        variant="body2"
        color="textSecondary"
      >
        <Text
          weight={500}
          variant="body2"
          color="primary"
        >
          {progress}
        </Text>
        /{max}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  bar: {
    flexGrow: 1,
    backgroundColor: Colors.neutralLight,
    overflow: 'hidden'
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.primary
  }
});

export default ProgressBar;
