import ProgressBar from '@/components/ProgressBar';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import useFeedbackAudio from '@/hooks/useFeedbackAudio';
import useKanaAudio from '@/hooks/useKanaAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { Progress, useStudyActions, useStudyContext } from '@/stores/useStudyStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

const ANSWERS_LENGTH = 5;

export default function StudyScreen() {
  const { kanaType } = useKanaContext();
  const { type, progress } = useStudyContext();
  const { setProgress } = useStudyActions();
  const { playKanaAudio, kanaPlayerStatus } = useKanaAudio();
  const { playFeedbackAudio } = useFeedbackAudio();

  const getQuestion = (progress: Progress[]) => {
    const unsolved = progress.filter(p => !p.answer);
    if (!unsolved.length) return null;

    const random = Math.floor(Math.random() * unsolved.length);
    const current = unsolved[random];

    const rows = KANA_TABS[kanaType]
      .find(tab => tab.rows.find(row => row.kana.includes(current?.character)))
      ?.rows.map(({ kana }) => kana.filter(Boolean));

    if (!rows) return null;

    const rowIndex = rows.findIndex(kana => kana.includes(current?.character));
    const answers = [...rows[rowIndex]];

    if (answers.length < ANSWERS_LENGTH) {
      const otherRows = rows.filter((_, i) => i !== rowIndex).flat();
      const remaining = ANSWERS_LENGTH - answers.length;
      const otherAnswers = [...otherRows].sort(() => 0.5 - Math.random()).slice(0, remaining);

      answers.push(...otherAnswers);
    }

    answers.sort(() => 0.5 - Math.random());

    return unsolved.length ? { ...current, answers } : null;
  };

  const [question, setQuestion] = useState(() => getQuestion(progress));
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const scales = useRef(question?.answers.map(() => new Animated.Value(1))).current ?? [];
  const shakes = useRef(question?.answers.map(() => new Animated.Value(0))).current ?? [];

  if (!question) return null;

  const correctAnswer = type === 'character' ? question.pronunciation : question.character;

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    playFeedbackAudio(answer === correctAnswer ? 'correct' : 'incorrect');
    setSelectedAnswer(answer);

    const newProgress = progress.map(p =>
      p.character === question.character ? { ...p, answer } : p
    );
    setProgress(newProgress);

    setTimeout(() => {
      setQuestion(getQuestion(newProgress));
      setSelectedAnswer('');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress.filter(p => p.answer).length}
        max={progress.length}
      />
      <View style={styles.question}>
        {type === 'pronunciation' && (
          <Pressable
            style={[
              styles.button,
              styles.questionButton,
              kanaPlayerStatus.playing && styles.disabledButton
            ]}
            onPress={() => playKanaAudio(question.character)}
          >
            <MaterialIcons
              name={kanaPlayerStatus.playing ? 'headset-off' : 'headset'}
              size={20}
              color={kanaPlayerStatus.playing ? Colors.textSecondary : Colors.textPrimary}
            />
          </Pressable>
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
                Animated.timing(shakes[index], { toValue: 5, duration: 50, useNativeDriver: true }),
                Animated.timing(shakes[index], {
                  toValue: -5,
                  duration: 50,
                  useNativeDriver: true
                }),
                Animated.timing(shakes[index], { toValue: 0, duration: 50, useNativeDriver: true })
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
                onPress={() => handleAnswer(answer)}
              >
                <Text
                  weight={isCorrect || isIncorrect ? 700 : 500}
                  color={isCorrect || isIncorrect ? 'white' : 'textSecondary'}
                  style={[styles.answerText, { paddingLeft: type === 'character' ? 44 : 0 }]}
                >
                  {type === 'pronunciation' ? answer : `[${answer}]`}
                </Text>
                {type === 'character' && (
                  <Pressable
                    style={[
                      styles.button,
                      kanaPlayerStatus.playing && styles.disabledButton,
                      (isCorrect || isIncorrect) && styles.selectedButton
                    ]}
                    disabled={kanaPlayerStatus.playing || isCorrect || isIncorrect}
                    onPress={() => playKanaAudio(kana)}
                  >
                    <MaterialIcons
                      name={kanaPlayerStatus.playing ? 'headset-off' : 'headset'}
                      size={20}
                      color={kanaPlayerStatus.playing ? Colors.textSecondary : Colors.textPrimary}
                    />
                  </Pressable>
                )}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
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
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  answers: {
    display: 'flex',
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
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 8,
    borderRadius: '50%',
    backgroundColor: Colors.primary30
  },
  disabledButton: {
    backgroundColor: Colors.primary10
  },
  selectedButton: {
    backgroundColor: Colors.white
  },
  questionButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 12
  }
});
