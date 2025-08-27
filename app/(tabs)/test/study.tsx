import { mateImageMap } from '@/assets/images/mates';
import ProgressBar from '@/components/ProgressBar';
import StudyResult from '@/components/StudyResult';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import useFeedbackAudio from '@/hooks/useFeedbackAudio';
import useKanaAudio from '@/hooks/useKanaAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useMateContext } from '@/stores/useMateStore';
import { useStudyActions, useStudyContext } from '@/stores/useStudyStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const FEEDBACK_IMAGE_SIZE = width * 0.35;

const correctImage = ['blushing', 'excited', 'good', 'happy', 'love', 'ok', 'sing', 'yes'];
const incorrectImage = ['confused', 'huh', 'mocking', 'no', 'sad', 'shocked', 'shy', 'sick'];

export default function StudyScreen() {
  const { kanaType } = useKanaContext();
  const { type, progress, question } = useStudyContext();
  const { setProgress, setQuestion } = useStudyActions();
  const { playKanaAudio, playing } = useKanaAudio();
  const { playFeedbackAudio } = useFeedbackAudio();
  const { mate } = useMateContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const scales = useRef(question?.answers.map(() => new Animated.Value(1))).current ?? [];
  const shakes = useRef(question?.answers.map(() => new Animated.Value(0))).current ?? [];
  const correctAnswer = type === 'character' ? question?.pronunciation : question?.character;
  const feedbackImageArr = selectedAnswer === correctAnswer ? correctImage : incorrectImage;
  const feedbackImageName = feedbackImageArr[Math.floor(Math.random() * feedbackImageArr.length)];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    playFeedbackAudio(answer === correctAnswer ? 'correct' : 'incorrect');
    setSelectedAnswer(answer);

    const newProgress = progress.map(p =>
      p.character === question?.character ? { ...p, answer } : p
    );
    setProgress(newProgress);

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
                ? Colors.successAlpha
                : Colors.errorAlpha,
            borderColor: !selectedAnswer
              ? Colors.neutral
              : selectedAnswer === correctAnswer
                ? Colors.success
                : Colors.error
          }
        ]}
      >
        {type === 'pronunciation' && (
          <Pressable
            style={[
              styles.button,
              styles.questionButton,
              (playing || Boolean(selectedAnswer)) && styles.disabledButton
            ]}
            disabled={playing || Boolean(selectedAnswer)}
            onPress={() => playKanaAudio(question.character)}
          >
            <MaterialIcons
              name={playing || Boolean(selectedAnswer) ? 'headset-off' : 'headset'}
              size={20}
              color={playing || Boolean(selectedAnswer) ? Colors.textSecondary : Colors.textPrimary}
            />
          </Pressable>
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
                      (playing || Boolean(selectedAnswer)) && styles.disabledButton
                    ]}
                    disabled={playing || isCorrect || isIncorrect}
                    onPress={() => playKanaAudio(kana)}
                  >
                    <MaterialIcons
                      name={playing || Boolean(selectedAnswer) ? 'headset-off' : 'headset'}
                      size={20}
                      color={
                        playing || Boolean(selectedAnswer)
                          ? Colors.textSecondary
                          : Colors.textPrimary
                      }
                    />
                  </Pressable>
                )}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  ) : (
    <StudyResult />
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
    backgroundColor: 'transparent'
  },
  questionButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 12
  }
});
