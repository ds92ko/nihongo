import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { KanaSoundType, KanaTab } from '@/types/kana';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';

interface TestSceneProps {
  tab: 'study' | 'review';
}

type Selected = Record<KanaSoundType, string[]>;

const { width } = Dimensions.get('window');
const CONTAINER_PADDING = 16;
const ROWS_GAP = 8;
const PER_ROW = 3;
const ROW_WIDTH = (width - CONTAINER_PADDING * 2 - ROWS_GAP * (PER_ROW - 1)) / PER_ROW;
const ROW_HEIGHT = 36;

const TestScene = ({ tab }: TestSceneProps) => {
  const { kanaType } = useKanaContext();
  const [selected, setSelected] = useState<Selected>({
    seion: [],
    dakuon: [],
    youon: []
  });
  const [expandedKeys, setExpandedKeys] = useState<KanaSoundType[]>(['seion', 'dakuon', 'youon']);
  const disabled = Object.values(selected).every(v => !v.length);
  const animations = useRef<Record<KanaSoundType, Animated.Value>>({
    seion: new Animated.Value(1),
    dakuon: new Animated.Value(1),
    youon: new Animated.Value(1)
  }).current;

  const toggle = (key: KanaSoundType) => {
    const isExpanded = expandedKeys.includes(key);

    Animated.timing(animations[key], {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();

    setExpandedKeys(prev => (isExpanded ? prev.filter(k => k !== key) : [...prev, key]));
  };

  const height = (item: KanaTab) =>
    animations[item.key].interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        CONTAINER_PADDING +
          (Math.ceil(item.rows.length / PER_ROW) + 1) * (ROW_HEIGHT + ROWS_GAP) -
          ROWS_GAP
      ]
    });

  useEffect(() => {
    setSelected({ seion: [], dakuon: [], youon: [] });
  }, [kanaType]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={KANA_TABS[kanaType]}
          scrollEnabled={true}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.groups}
          renderItem={({ item }) => (
            <View>
              <Pressable
                style={styles.title}
                onPress={() => toggle(item.key)}
              >
                <View style={styles.titleText}>
                  <Text
                    weight={700}
                    variant="body2"
                  >
                    {item.title}
                  </Text>
                  <Text
                    weight={400}
                    variant="caption"
                    color="textSecondary"
                  >
                    <Text
                      weight={500}
                      variant="caption"
                      color="primary"
                    >
                      {selected[item.key].length}
                    </Text>
                    /{KANA_TABS[kanaType].find(tab => tab.key === item.key)?.rows.length}
                  </Text>
                </View>
                <Ionicons
                  name={expandedKeys.includes(item.key) ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={Colors.textPrimary}
                />
              </Pressable>
              <Animated.View
                style={[
                  styles.rows,
                  {
                    height: height(item)
                  }
                ]}
              >
                <View style={styles.rowList}>
                  <Pressable
                    style={[
                      styles.row,
                      selected[item.key].length ===
                        KANA_TABS[kanaType].find(tab => tab.key === item.key)?.rows.length &&
                        styles.activeRow,
                      styles.allRow
                    ]}
                    onPress={() => {
                      setSelected(prev => ({
                        ...prev,
                        [item.key]:
                          selected[item.key].length ===
                          KANA_TABS[kanaType].find(tab => tab.key === item.key)?.rows.length
                            ? []
                            : item.rows.map(row => row.label)
                      }));
                    }}
                  >
                    <View style={styles.checkbox}>
                      {selected[item.key].length ===
                        KANA_TABS[kanaType].find(tab => tab.key === item.key)?.rows.length && (
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={Colors.textPrimary}
                        />
                      )}
                    </View>
                    <Text
                      weight={500}
                      variant="caption"
                      color={
                        selected[item.key].length ===
                        KANA_TABS[kanaType].find(tab => tab.key === item.key)?.rows.length
                          ? 'textPrimary'
                          : 'textSecondary'
                      }
                    >
                      {item.title} 전체
                    </Text>
                  </Pressable>
                  {item.rows.map((row, j) => (
                    <Pressable
                      key={j}
                      style={[
                        styles.row,
                        selected[item.key].includes(row.label) && styles.activeRow
                      ]}
                      onPress={() => {
                        setSelected(prev => ({
                          ...prev,
                          [item.key]: selected[item.key].includes(row.label)
                            ? selected[item.key].filter(label => label !== row.label)
                            : [...selected[item.key], row.label]
                        }));
                      }}
                    >
                      <View style={styles.checkbox}>
                        {selected[item.key].includes(row.label) && (
                          <Ionicons
                            name="checkmark"
                            size={16}
                            color={Colors.textPrimary}
                          />
                        )}
                      </View>
                      <Text
                        weight={500}
                        variant="caption"
                        color={
                          selected[item.key].includes(row.label) ? 'textPrimary' : 'textSecondary'
                        }
                      >
                        {row.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </Animated.View>
            </View>
          )}
        />
        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, disabled && styles.disabledButton]}
            disabled={disabled}
          >
            <Text
              weight={700}
              variant="body2"
              color="white"
            >
              카나 테스트
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, disabled && styles.disabledButton]}
            disabled={disabled}
          >
            <Text
              weight={700}
              variant="body2"
              color="white"
            >
              발음 테스트
            </Text>
          </Pressable>
        </View>
      </View>
      <Modal />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  groups: {
    padding: CONTAINER_PADDING,
    gap: 16
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  titleText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4
  },
  rows: {
    overflow: 'hidden'
  },
  rowList: {
    paddingTop: CONTAINER_PADDING,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  row: {
    width: ROW_WIDTH,
    height: ROW_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary10
  },
  allRow: {
    width: '100%'
  },
  activeRow: {
    backgroundColor: Colors.primary30
  },
  checkbox: {
    backgroundColor: Colors.white,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 20
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: CONTAINER_PADDING
  },
  button: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary
  },
  disabledButton: {
    backgroundColor: Colors.neutral
  }
});

export default TestScene;
