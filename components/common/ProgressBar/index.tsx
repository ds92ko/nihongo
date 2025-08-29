import { styles } from '@/components/common/ProgressBar/styles';
import { ProgressBarProps } from '@/components/common/ProgressBar/types';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

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

  const borderRadius = height / 2;
  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: normalized,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [animation, normalized]);

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

export default ProgressBar;
