import { AnimatedPath } from '@/components/local/practice/KanaPath/constants';
import { KanaPathProps } from '@/components/local/practice/KanaPath/types';
import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const KanaPath = ({
  d,
  duration,
  delay = 0,
  length,
  strokeWidth,
  restartTrigger
}: KanaPathProps) => {
  const progress = useSharedValue(1);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * length
  }));

  useEffect(() => {
    progress.value = 1;
    progress.value = withDelay(delay, withTiming(0, { duration }));
  }, [delay, duration, progress, restartTrigger]);

  return (
    <AnimatedPath
      d={d}
      stroke={Colors.neutral}
      strokeWidth={strokeWidth}
      strokeDasharray={length}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      animatedProps={animatedProps}
    />
  );
};

export default KanaPath;
