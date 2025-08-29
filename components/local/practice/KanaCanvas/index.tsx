import kanaMap from '@/assets/paths';
import { styles } from '@/components/local/practice/KanaCanvas/styles';
import { KanaCanvasProps, Paths } from '@/components/local/practice/KanaCanvas/types';
import KanaSvg from '@/components/local/practice/KanaSvg';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import { useStatsActions } from '@/stores/useStatsStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PanResponder, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const KanaCanvas = ({ kana }: KanaCanvasProps) => {
  const { kanaType, isVisibleGrid } = useKanaContext();
  const { setIsVisibleGrid } = useKanaActions();
  const { playKanaAudio, playing } = useKanaAudio();
  const { playPopAudio } = usePopAudio();
  const { setPracticeStats } = useStatsActions();
  const firstRender = useRef(true);
  const [restartTrigger, setRestartTrigger] = useState(0);
  const [paths, setPaths] = useState<Paths>([]);
  const [panResponderEnded, setPanResponderEnded] = useState(false);
  const [autoDelete, setAutoDelete] = useState(true);

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

  const handleToggleGrid = () => {
    playPopAudio();
    setIsVisibleGrid();
  };

  const handlePlay = useCallback(() => {
    playKanaAudio(kana);
    setPracticeStats(kanaType, 'listening', kana);
  }, [kana, kanaType, playKanaAudio, setPracticeStats]);

  const handleRestart = useCallback(() => {
    handlePlay();
    setRestartTrigger(prev => prev + 1);
    setPaths([]);
  }, [handlePlay]);

  const handleClear = () => {
    if (autoDelete) {
      setAutoDelete(false);
      return;
    }
    if (!paths.length) {
      setAutoDelete(true);
      return;
    }
    playPopAudio();
    setPaths([]);
  };

  useEffect(() => {
    const pathLength = [...kana].flatMap(char => kanaMap[char] || []).length;

    if (pathLength !== paths.length) return;
    if (autoDelete && panResponderEnded) handleRestart();
    setPracticeStats(kanaType, 'writing', kana);
  }, [
    kanaType,
    kana,
    paths.length,
    setPracticeStats,
    autoDelete,
    playPopAudio,
    panResponderEnded,
    handlePlay,
    handleRestart
  ]);

  useEffect(() => {
    if (firstRender.current) {
      playKanaAudio(kana, true);
      firstRender.current = false;
    }
  }, [kana, playKanaAudio]);

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <View
          style={[
            styles.cross,
            {
              opacity: isVisibleGrid ? 1 : 0
            }
          ]}
        >
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
            {paths.map((p, i) => {
              const d = p
                .map((point, j) =>
                  j === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
                )
                .join(' ');

              return (
                <Path
                  key={`path-${i}`}
                  d={d}
                  stroke={Colors.textPrimary}
                  strokeWidth={15}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              );
            })}
          </Svg>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={handleToggleGrid}
        >
          <MaterialIcons
            name={isVisibleGrid ? 'grid-off' : 'grid-on'}
            size={20}
            color={Colors.textPrimary}
          />
        </Pressable>
        <Pressable
          style={[styles.button, playing && styles.disabledButton]}
          onPress={handlePlay}
          disabled={playing}
        >
          <MaterialIcons
            name={playing ? 'headset-off' : 'headset'}
            size={20}
            color={playing ? Colors.textSecondary : Colors.textPrimary}
          />
        </Pressable>
        <Pressable
          style={[styles.button, playing && styles.disabledButton]}
          onPress={handleRestart}
          disabled={playing}
        >
          <MaterialIcons
            name={playing ? 'play-disabled' : 'play-arrow'}
            size={20}
            color={playing ? Colors.textSecondary : Colors.textPrimary}
          />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleClear}
        >
          <MaterialCommunityIcons
            name={
              autoDelete
                ? 'delete-clock-outline'
                : paths.length
                  ? 'delete-outline'
                  : 'delete-off-outline'
            }
            size={20}
            color={autoDelete || paths.length ? Colors.textPrimary : Colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default KanaCanvas;
