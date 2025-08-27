import Accordion from '@/components/Accordion';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useStudyActions, useStudyContext } from '@/stores/useStudyStore';
import { KanaSoundType } from '@/types/kana';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const ROWS_PADDING_TOP = 16;
const ROWS_GAP = 8;
const PER_ROW = 3;
const ROW_WIDTH = Math.floor((width - ROWS_PADDING_TOP * 2 - ROWS_GAP * (PER_ROW - 1)) / PER_ROW);
const ROW_HEIGHT = 36;

const StudyScene = () => {
  const { kanaType } = useKanaContext();
  const { target } = useStudyContext();
  const { startStudy, setTarget, resetTarget } = useStudyActions();
  const { playPopAudio } = usePopAudio();
  const disabled = Object.values(target).every(v => !v.length);

  const handleSelect = ({ key, value }: { key: KanaSoundType; value: string[] }) => {
    playPopAudio();
    setTarget({ [key]: value });
  };

  useEffect(() => resetTarget(), [kanaType, resetTarget]);

  return (
    <View style={styles.container}>
      <FlatList
        data={KANA_TABS[kanaType]}
        scrollEnabled={true}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.groups}
        renderItem={({ item, index }) => {
          const maxHeight =
            ROWS_PADDING_TOP +
            (Math.ceil(item.rows.length / PER_ROW) + 1) * (ROW_HEIGHT + ROWS_GAP) -
            ROWS_GAP;
          const totalRows = KANA_TABS[kanaType].find(tab => tab.key === item.key)?.rows.length;
          const totalSelected = target[item.key].length;
          const allSelected = totalSelected === totalRows;

          return (
            <View>
              <Accordion
                title={item.title}
                suffix={
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
                      {totalSelected}
                    </Text>
                    /{totalRows}
                  </Text>
                }
                maxHeight={maxHeight}
                defaultExpanded={index === 0}
              >
                <View style={styles.rows}>
                  <Pressable
                    style={[styles.row, allSelected && styles.activeRow, styles.allRow]}
                    onPress={() =>
                      handleSelect({
                        key: item.key,
                        value: allSelected ? [] : item.rows.map(row => row.label)
                      })
                    }
                  >
                    <View style={styles.checkbox}>
                      {allSelected && (
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
                      color={allSelected ? 'textPrimary' : 'textSecondary'}
                    >
                      {item.title} 전체
                    </Text>
                  </Pressable>
                  {item.rows.map((row, j) => {
                    const isSelected = target[item.key].includes(row.label);

                    return (
                      <Pressable
                        key={j}
                        style={[styles.row, isSelected && styles.activeRow]}
                        onPress={() => {
                          handleSelect({
                            key: item.key,
                            value: isSelected
                              ? target[item.key].filter(label => label !== row.label)
                              : [...target[item.key], row.label]
                          });
                        }}
                      >
                        <View style={styles.checkbox}>
                          {isSelected && (
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
                          color={isSelected ? 'textPrimary' : 'textSecondary'}
                        >
                          {row.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </Accordion>
            </View>
          );
        }}
      />
      <View style={styles.buttons}>
        <Link
          href="/test/study"
          style={[styles.button, disabled && styles.disabledButton]}
          onPress={() => {
            playPopAudio();
            startStudy(kanaType, 'character');
          }}
          disabled={disabled}
        >
          <Text
            weight={700}
            variant="body2"
            color="white"
          >
            읽기 테스트
          </Text>
        </Link>
        <Link
          href="/test/study"
          style={[styles.button, disabled && styles.disabledButton]}
          onPress={() => {
            playPopAudio();
            startStudy(kanaType, 'pronunciation');
          }}
          disabled={disabled}
        >
          <Text
            weight={700}
            variant="body2"
            color="white"
          >
            표기 테스트
          </Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  groups: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  rows: {
    paddingTop: ROWS_PADDING_TOP,
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
    paddingHorizontal: 16
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

export default StudyScene;
