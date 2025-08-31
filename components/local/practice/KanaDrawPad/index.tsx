import { useKanaCanvasContext } from '@/components/local/practice/KanaCanvas/provider';
import { styles } from '@/components/local/practice/KanaDrawPad/styles';
import { getD } from '@/components/local/practice/KanaDrawPad/utils';
import KanaSvg from '@/components/local/practice/KanaSvg';
import { Colors } from '@/constants/Colors';
import { useKanaContext } from '@/stores/useKanaStore';
import { useRef } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const KanaDrawPad = () => {
  const { isVisibleGrid } = useKanaContext();
  const { kana, paths, setPaths, setPanResponderEnded, restartTrigger } = useKanaCanvasContext();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => {
        const { locationX, locationY } = e.nativeEvent;
        setPaths(prev => [...prev, [{ x: locationX, y: locationY }]]);
      },
      onPanResponderMove: e => {
        const { locationX, locationY } = e.nativeEvent;
        setPaths(prev => {
          const lastPath = prev.at(-1);
          if (lastPath) {
            lastPath.push({ x: locationX, y: locationY });
            return [...prev.slice(0, -1), lastPath];
          }
          return prev;
        });
      },
      onPanResponderStart: () => setPanResponderEnded(false),
      onPanResponderEnd: () => setPanResponderEnded(true)
    })
  ).current;

  return (
    <View style={styles.canvasContainer}>
      <View style={[styles.cross, isVisibleGrid && styles.visibleCross]}>
        <View style={styles.crossLineHorizontal} />
        <View style={styles.crossLineVertical} />
      </View>
      <View style={styles.hint}>
        <KanaSvg
          kana={kana}
          restartTrigger={restartTrigger}
        />
      </View>
      <View
        style={styles.canvas}
        {...panResponder.panHandlers}
      >
        <Svg
          width="100%"
          height="100%"
        >
          {paths.map((p, i) => (
            <Path
              key={`path-${i}`}
              d={getD(p)}
              stroke={Colors.textPrimary}
              strokeWidth={15}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};

export default KanaDrawPad;
