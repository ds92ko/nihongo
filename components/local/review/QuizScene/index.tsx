import { Accordion, Button, InfoCard, Text } from '@/components/common';
import {
  PER_ROW,
  ROW_HEIGHT,
  ROWS_GAP,
  ROWS_PADDING_TOP,
  tips
} from '@/components/local/review/QuizScene/constants';
import { styles } from '@/components/local/review/QuizScene/styles';
import { OnSelectRows } from '@/components/local/review/QuizScene/types';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import { useKanaContext } from '@/stores/useKanaStore';
import { useQuizActions, useQuizContext } from '@/stores/useQuizStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';

const QuizScene = () => {
  const { hapticFeedback } = useHaptics();
  const { kanaType } = useKanaContext();
  const { target } = useQuizContext();
  const { startQuiz, setTarget, resetTarget } = useQuizActions();
  const disabled = Object.values(target).every(v => !v.length);

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
  };

  const onSelect: OnSelectRows = ({ key, value }) => setTarget({ [key]: value });

  const onStartCharacterQuiz = () => startQuiz(kanaType, 'character');

  const onStartPronunciationQuiz = () => startQuiz(kanaType, 'pronunciation');

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
                      onPressIn={onPressIn}
                      onPress={() =>
                        onSelect({
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
                          onPressIn={onPressIn}
                          onPress={() => {
                            onSelect({
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
        <Button
          href={{ pathname: '/review/quiz', params: { type: 'character' } }}
          onPress={onStartCharacterQuiz}
          disabled={disabled}
          active
          fill
        >
          글자 퀴즈
        </Button>
        <Button
          href={{ pathname: '/review/quiz', params: { type: 'pronunciation' } }}
          onPress={onStartPronunciationQuiz}
          disabled={disabled}
          active
          fill
        >
          발음 퀴즈
        </Button>
      </View>
    </View>
  );
};

export default QuizScene;
