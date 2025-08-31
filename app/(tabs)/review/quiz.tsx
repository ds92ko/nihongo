import { mateImageMap } from '@/assets/images/mates';
import { IconButton, ProgressBar, Text } from '@/components/common';
import { QuizResult } from '@/components/local/review';
import { Colors } from '@/constants/Colors';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import useHaptics from '@/hooks/useHaptic';
import useKanaAudio from '@/hooks/useKanaAudio';
import SoundManager from '@/managers/SoundManager';
import { useKanaContext } from '@/stores/useKanaStore';
import { useMateContext } from '@/stores/useMateStore';
import { useMistakeActions } from '@/stores/useMistakeStore';
import { useQuizActions, useQuizContext } from '@/stores/useQuizStore';
import { useStatsActions } from '@/stores/useStatsStore';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const FEEDBACK_IMAGE_SIZE = width * 0.35;

const correctImage = ['blushing', 'excited', 'good', 'happy', 'love', 'ok', 'sing', 'yes'];
const incorrectImage = ['confused', 'huh', 'mocking', 'no', 'sad', 'shocked', 'shy', 'sick'];

export default function QuizScreen() {
  const { hapticFeedback } = useHaptics();
  const { kanaType } = useKanaContext();
  const { type, progress, question } = useQuizContext();
  const { setProgress, setQuestion } = useQuizActions();
  const { playKanaAudio, playing } = useKanaAudio();
  const { mate } = useMateContext();
  const { addMistake, removeMistake } = useMistakeActions();
  const { setQuizStats } = useStatsActions();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const scales = useRef((question?.answers ?? []).map(() => new Animated.Value(1))).current;
  const shakes = useRef((question?.answers ?? []).map(() => new Animated.Value(0))).current;
  const correctAnswer = type === 'character' ? question?.pronunciation : question?.character;
  const feedbackImageArr = selectedAnswer === correctAnswer ? correctImage : incorrectImage;
  const feedbackImageName = feedbackImageArr[Math.floor(Math.random() * feedbackImageArr.length)];

  const onPressIn = () => hapticFeedback('medium');

  const onSelectAnswer = (answer: string) => {
    if (!question || selectedAnswer) return;

    SoundManager[answer === correctAnswer ? 'playCorrect' : 'playIncorrect']();
    setSelectedAnswer(answer);
    setProgress(progress.map(p => (p.character === question.character ? { ...p, answer } : p)));
    setQuizStats(
      kanaType,
      type === 'character' ? 'character' : 'pronunciation',
      question.character,
      answer === correctAnswer
    );

    if (answer === correctAnswer) {
      removeMistake(kanaType, question.character);
    } else {
      addMistake(kanaType, {
        character: question.character,
        pronunciation: question.pronunciation
      });
    }

    setTimeout(() => {
      setQuestion(kanaType);
      setSelectedAnswer('');
    }, 1000);
  };

  return question ? (
    <View style={styles.container}>
      <ProgressBar
        progress={progress.filter(p => p.answer).length}
        max={progress.length}
      />
      <View
        style={[
          styles.question,
          {
            backgroundColor: !selectedAnswer
              ? Colors.white
              : selectedAnswer === correctAnswer
                ? Colors.successLight
                : Colors.errorLight,
            borderColor: !selectedAnswer
              ? Colors.neutral
              : selectedAnswer === correctAnswer
                ? Colors.success
                : Colors.error
          }
        ]}
      >
        {type === 'pronunciation' && (
          <IconButton
            icon={{
              type: 'material',
              name: `headset${playing || Boolean(selectedAnswer) ? '-off' : ''}`
            }}
            style={styles.questionButton}
            onPress={() => playKanaAudio(question.character)}
            disabled={playing || Boolean(selectedAnswer)}
          />
        )}
        {selectedAnswer && (
          <Image
            source={mateImageMap[mate][feedbackImageName]}
            style={styles.feedbackImage}
          />
        )}
        <Text
          weight={700}
          variant="display1"
        >
          {type === 'character' ? question.character : `[${question.pronunciation}]`}
        </Text>
      </View>
      <View style={styles.answers}>
        {question.answers?.map((kana, index) => {
          const answer = type === 'character' ? KANA_TO_ROMAJI[kanaType][kana] : kana;
          const isCorrect = Boolean(selectedAnswer && answer === correctAnswer);
          const isIncorrect = Boolean(answer === selectedAnswer && answer !== correctAnswer);

          if (selectedAnswer) {
            if (isCorrect) {
              Animated.sequence([
                Animated.spring(scales[index], { toValue: 1.03, useNativeDriver: true }),
                Animated.spring(scales[index], { toValue: 1, useNativeDriver: true })
              ]).start();
            }
            if (isIncorrect) {
              Animated.sequence([
                Animated.timing(shakes[index], {
                  toValue: 10,
                  duration: 50,
                  useNativeDriver: true
                }),
                Animated.timing(shakes[index], {
                  toValue: -10,
                  duration: 50,
                  useNativeDriver: true
                }),
                Animated.timing(shakes[index], {
                  toValue: 5,
                  duration: 50,
                  useNativeDriver: true
                }),
                Animated.timing(shakes[index], {
                  toValue: -5,
                  duration: 50,
                  useNativeDriver: true
                }),
                Animated.timing(shakes[index], {
                  toValue: 0,
                  duration: 50,
                  useNativeDriver: true
                })
              ]).start();
            }
          }

          return (
            <Animated.View
              key={answer}
              style={{
                transform: [{ scale: scales[index] ?? 1 }, { translateX: shakes[index] ?? 0 }]
              }}
            >
              <Pressable
                style={[
                  styles.answer,
                  isCorrect && styles.correct,
                  isIncorrect && styles.incorrect
                ]}
                onPressIn={onPressIn}
                onPress={() => onSelectAnswer(answer)}
              >
                <Text
                  weight={isCorrect || isIncorrect ? 700 : 500}
                  color={isCorrect || isIncorrect ? 'white' : 'textSecondary'}
                  style={[styles.answerText, { paddingLeft: type === 'character' ? 44 : 0 }]}
                >
                  {type === 'pronunciation' ? answer : `[${answer}]`}
                </Text>
                {type === 'character' && (
                  <IconButton
                    icon={{
                      type: 'material',
                      name: `headset${playing || Boolean(selectedAnswer) ? '-off' : ''}`
                    }}
                    disabled={playing || isCorrect || isIncorrect}
                    onPress={() => playKanaAudio(kana)}
                    size="small"
                  />
                )}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  ) : (
    <QuizResult />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24
  },
  question: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1
  },
  feedbackImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: FEEDBACK_IMAGE_SIZE,
    height: FEEDBACK_IMAGE_SIZE,
    aspectRatio: 1,
    zIndex: 10
  },
  answers: {
    gap: 12
  },
  answer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    padding: 8,
    borderRadius: 26,
    textAlign: 'center',
    backgroundColor: Colors.primary10
  },
  correct: {
    backgroundColor: Colors.success
  },
  incorrect: {
    backgroundColor: Colors.error
  },
  answerText: {
    flex: 1,
    textAlign: 'center'
  },
  questionButton: {
    position: 'absolute',
    top: 12,
    right: 12
  }
});
