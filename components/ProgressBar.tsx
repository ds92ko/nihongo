import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number;
  min?: number;
  max?: number;
  height?: number;
  text?: 'none' | 'status' | 'percentage';
  progressColor?: keyof typeof Colors | string;
  barColor?: keyof typeof Colors | string;
}

const ProgressBar = ({
  progress,
  min = 0,
  max = 100,
  height = 12,
  text = 'status',
  progressColor = 'primary',
  barColor = 'neutralLight'
}: ProgressBarProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const normalized = Math.min(Math.max((progress - min) / (max - min), 0), 1);
  const appliedColor = (color: keyof typeof Colors | string) =>
    typeof color === 'string' && Colors[color as keyof typeof Colors]
      ? Colors[color as keyof typeof Colors]
      : color;

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
      <View style={[styles.bar, { height, borderRadius, backgroundColor: appliedColor(barColor) }]}>
        <Animated.View
          style={[
            styles.progress,
            { width, borderRadius, backgroundColor: appliedColor(progressColor) }
          ]}
        />
      </View>
      {text !== 'none' && (
        <View style={styles.progressText}>
          <Text
            weight={500}
            variant="body2"
            color={appliedColor(progressColor)}
          >
            {text === 'percentage'
              ? parseFloat(((Math.min(progress, max) / max) * 100).toFixed(1))
              : Math.min(progress, max)}
          </Text>
          <Text
            weight={400}
            variant="body2"
            color="textSecondary"
          >
            {text === 'percentage' ? '%' : `/${max}`}
          </Text>
        </View>
      )}
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
    height: '100%'
  },
  progressText: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ProgressBar;
