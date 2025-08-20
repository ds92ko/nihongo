import KanaSvg from '@/components/KanaSvg';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Point = { x: number; y: number };

export default function KanaScreen() {
  const { character }: { character: string } = useLocalSearchParams();
  const row = KANA_TABS.hiragana.flatMap(tab => tab.rows).find(row => row.kana.includes(character));
  const [visibleHint, setVisibleHint] = useState(true);
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

  const handleToggleHint = () => setVisibleHint(prev => !prev);
  const handleUndo = () => setPaths(prev => prev.slice(0, -1));
  const handleClear = () => setPaths([]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {row && (
          <FlatList
            data={[row]}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.labelCell}>
                  <Text
                    weight={700}
                    variant="caption"
                  >
                    {item.label}
                  </Text>
                </View>
                {item.kana.map((kana, j) => (
                  <Link
                    key={j}
                    style={[
                      styles.cell,
                      !kana && styles.emptyCell,
                      kana === character && styles.activeCell
                    ]}
                    href={{ pathname: `/hiragana/[character]`, params: { character: kana } }}
                  >
                    <Text
                      weight={kana === character ? 700 : 500}
                      variant="body2"
                      color={kana === character ? 'textPrimary' : 'textSecondary'}
                    >
                      {kana}
                    </Text>
                  </Link>
                ))}
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.canvasContainer}>
        <View
          style={styles.canvasContent}
          {...panResponder.panHandlers}
        >
          {visibleHint && (
            <View style={styles.hint}>
              {[...character].map((char, index) => (
                <KanaSvg
                  key={index}
                  character={char}
                />
              ))}
            </View>
          )}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  labelCell: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary10
  },
  activeCell: {
    backgroundColor: Colors.primary30
  },
  emptyCell: {
    backgroundColor: Colors.white
  },
  canvasContainer: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  canvasContent: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden'
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
  hintText: {
    fontSize: 150,
    lineHeight: 150,
    letterSpacing: -10
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
