import KanaSvg from '@/components/KanaSvg';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Point = { x: number; y: number };

interface KanaCanvasProps {
  kana: string;
}

const KanaCanvas = ({ kana }: KanaCanvasProps) => {
  const { isVisibleGrid } = useKanaContext();
  const { setIsVisibleGrid } = useKanaActions();
  const { playKanaAudio, playing } = useKanaAudio();
  const { playPopAudio } = usePopAudio();
  const firstRender = useRef(true);

  const [restartTrigger, setRestartTrigger] = useState(0);
  const [paths, setPaths] = useState<Point[][]>([]);

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
      onPanResponderRelease: () => {}
    })
  ).current;

  const handleToggleGrid = () => {
    playPopAudio();
    setIsVisibleGrid();
  };
  const handlePlay = () => playKanaAudio(kana);

  const handleRestart = () => {
    setRestartTrigger(prev => prev + 1);
    setPaths([]);
    handlePlay();
  };

  const handleClear = () => {
    playPopAudio();
    setPaths([]);
  };

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
            {paths.map((p, i) => (
              <Path
                key={`path-${i}`}
                d={p
                  .map((point, j) =>
                    j === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
                  )
                  .join(' ')}
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
          style={[styles.button, !paths.length && styles.disabledButton]}
          onPress={handleClear}
          disabled={!paths.length}
        >
          <MaterialCommunityIcons
            name={paths.length ? 'delete-outline' : 'delete-off-outline'}
            size={20}
            color={paths.length ? Colors.textPrimary : Colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 16
  },
  canvasContainer: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  cross: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  crossLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 0,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  crossLineVertical: {
    position: 'absolute',
    width: 0,
    height: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  hint: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 20
  },
  canvas: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 30
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 12,
    borderRadius: '50%',
    backgroundColor: Colors.primary30
  },
  disabledButton: {
    backgroundColor: Colors.primary10
  }
});

export default KanaCanvas;
