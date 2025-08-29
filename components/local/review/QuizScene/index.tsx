import { Accordion, InfoCard, Text } from '@/components/common';
import {
  PER_ROW,
  ROW_HEIGHT,
  ROWS_GAP,
  ROWS_PADDING_TOP,
  tips
} from '@/components/local/review/QuizScene/constants';
import { styles } from '@/components/local/review/QuizScene/styles';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useQuizActions, useQuizContext } from '@/stores/useQuizStore';
import { KanaSoundType } from '@/types/kana';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

const QuizScene = () => {
  const { kanaType } = useKanaContext();
  const { target } = useQuizContext();
  const { startQuiz, setTarget, resetTarget } = useQuizActions();
  const { playPopAudio } = usePopAudio();
  const disabled = Object.values(target).every(v => !v.length);

  const handleSelect = ({ key, value }: { key: KanaSoundType; value: string[] }) => {
    playPopAudio();
    setTarget({ [key]: value });
  };

  useEffect(() => resetTarget(), [kanaType, resetTarget]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <InfoCard tips={tips} />
        <FlatList
          data={KANA_TABS[kanaType]}
          scrollEnabled={false}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.groups}
          renderItem={({ item }) => {
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
                    <View style={styles.suffix}>
                      <Text
                        weight={500}
                        variant="caption"
                        color="primary"
                      >
                        {totalSelected}
                      </Text>
                      <Text
                        variant="caption"
                        color="textSecondary"
                      >
                        /{totalRows}
                      </Text>
                    </View>
                  }
                  maxHeight={maxHeight}
                  defaultExpanded
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
      </ScrollView>
      <View style={styles.buttons}>
        <Link
          href="/review/quiz"
          style={[styles.button, disabled && styles.disabledButton]}
          onPress={() => {
            playPopAudio();
            startQuiz(kanaType, 'character');
          }}
          disabled={disabled}
        >
          <Text
            weight={700}
            variant="body2"
            color="white"
          >
            읽기 퀴즈
          </Text>
        </Link>
        <Link
          href="/review/quiz"
          style={[styles.button, disabled && styles.disabledButton]}
          onPress={() => {
            playPopAudio();
            startQuiz(kanaType, 'pronunciation');
          }}
          disabled={disabled}
        >
          <Text
            weight={700}
            variant="body2"
            color="white"
          >
            표기 퀴즈
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default QuizScene;
