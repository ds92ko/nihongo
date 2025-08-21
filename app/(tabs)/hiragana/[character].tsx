import KanaList from '@/components/KanaList';
import KanaSvg from '@/components/KanaSvg';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Point = { x: number; y: number };

export default function KanaScreen() {
  const { character }: { character: string } = useLocalSearchParams();
  const row = KANA_TABS.hiragana.flatMap(tab => tab.rows).find(row => row.kana.includes(character));
  const [visibleGrid, setVisibleGrid] = useState(true);
  const [visibleHint, setVisibleHint] = useState(true);
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

  const handleToggleGrid = () => setVisibleGrid(prev => !prev);
  const handleToggleHint = () => setVisibleHint(prev => !prev);
  const handleRestart = () => {
    setVisibleHint(true);
    setRestartTrigger(prev => prev + 1);
    setPaths([]);
  };
  const handleUndo = () => setPaths(prev => prev.slice(0, -1));
  const handleClear = () => setPaths([]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {row && (
          <KanaList
            data={[row]}
            type="hiragana"
            character={character}
          />
        )}
      </View>
      <View style={styles.canvasContainer}>
        <View
          style={[
            styles.cross,
            {
              opacity: visibleGrid ? 1 : 0
            }
          ]}
        >
          <View style={styles.crossLineHorizontal} />
          <View style={styles.crossLineVertical} />
        </View>
        <View
          style={styles.canvasContent}
          {...panResponder.panHandlers}
        >
          <View
            style={[
              styles.hint,
              {
                opacity: visibleHint ? 1 : 0
              }
            ]}
          >
            <KanaSvg
              character={character}
              restartTrigger={restartTrigger}
            />
          </View>
          <View
            style={styles.canvas}
            pointerEvents="box-none"
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
              name={visibleGrid ? 'grid-off' : 'grid-on'}
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleToggleHint}
          >
            <Ionicons
              name={visibleHint ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleRestart}
          >
            <Ionicons
              name="play-outline"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleUndo}
          >
            <Ionicons
              name="return-up-back"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleClear}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={Colors.textPrimary}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    gap: 16
  },
  rowContent: {
    gap: 8
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
  canvasContent: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 20
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
    zIndex: 10
  },
  canvas: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 20
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 8,
    right: 8,
    gap: 8,
    zIndex: 30
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 12,
    borderRadius: '50%',
    backgroundColor: Colors.primary30
  }
});
