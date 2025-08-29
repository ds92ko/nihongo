import kanaMap from '@/assets/paths';
import { KanaPath } from '@/components/local/practice';
import {
  AnimatedSvg,
  ANIMATION_DURATION,
  CHAR_WIDTH,
  STROKE_WIDTH,
  SVG_SIZE
} from '@/components/local/practice/KanaSvg/constants';
import { KanaSvgProps } from '@/components/local/practice/KanaSvg/types';
import { useEffect } from 'react';
import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { G } from 'react-native-svg';

const KanaSvg = ({ kana, restartTrigger = 0 }: KanaSvgProps) => {
  const opacity = useSharedValue(1);
  const chars = [...kana];
  const charPaths = chars.map(char => kanaMap[char] || []);
  const charDelays = charPaths.map((_paths, index) => {
    const prevPaths = charPaths.slice(0, index).flat();
    return prevPaths.length * ANIMATION_DURATION;
  });
  const viewBoxWidth = CHAR_WIDTH * chars.length;
  const lastEndTime = charPaths
    .flatMap((paths, charIndex) =>
      paths.map((_, i) => charDelays[charIndex] + i * ANIMATION_DURATION + ANIMATION_DURATION)
    )
    .reduce((a, b) => Math.max(a, b), 0);
  const animatedProps = useAnimatedProps(() => ({
    opacity: opacity.value
  }));

  useEffect(() => {
    opacity.value = 1;
    const timeout = setTimeout(() => {
      opacity.value = withTiming(0.3, { duration: ANIMATION_DURATION });
    }, lastEndTime);

    return () => clearTimeout(timeout);
  }, [lastEndTime, opacity, restartTrigger]);

  return (
    <AnimatedSvg
      width={SVG_SIZE}
      height={SVG_SIZE}
      viewBox={`0 0 ${viewBoxWidth} 109`}
      animatedProps={animatedProps}
    >
      {charPaths.map((paths, charIndex) => (
        <G
          key={charIndex}
          transform={`translate(${charIndex * CHAR_WIDTH}, 0)`}
        >
          {paths.map((path, i) => (
            <KanaPath
              key={i}
              d={path.d}
              duration={ANIMATION_DURATION}
              delay={charDelays[charIndex] + i * ANIMATION_DURATION}
              length={path.length}
              strokeWidth={STROKE_WIDTH * chars.length}
              restartTrigger={restartTrigger}
            />
          ))}
        </G>
      ))}
    </AnimatedSvg>
  );
};

export default KanaSvg;
