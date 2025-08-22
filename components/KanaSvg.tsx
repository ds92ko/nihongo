import kanaMap from '@/assets/paths';
import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import Svg, { G, Path } from 'react-native-svg';

interface KanaPathProps {
  d: string;
  duration: number;
  delay?: number;
  length: number;
  strokeWidth: number;
  restartTrigger: number;
}

interface KanaSvgProps {
  kana: string;
  restartTrigger?: number;
}

const { width } = Dimensions.get('window');
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const SVG_SIZE = width * 0.7;
const ANIMATION_DURATION = 700;
const CHAR_WIDTH = 109;
const STROKE_WIDTH = 5;

const KanaPath = ({
  d,
  duration,
  delay = 0,
  length,
  strokeWidth,
  restartTrigger
}: KanaPathProps) => {
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = 1;
    progress.value = withDelay(delay, withTiming(0, { duration }));
  }, [delay, duration, progress, restartTrigger]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * length
  }));

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
