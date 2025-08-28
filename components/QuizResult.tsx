import { mateImageMap } from '@/assets/images/mates';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useMateContext } from '@/stores/useMateStore';
import { useQuizActions, useQuizContext } from '@/stores/useQuizStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const FEEDBACK_IMAGE_SIZE = width * 0.35;

const getFeedbackImageName = (accuracy: number) => {
  if (accuracy === 100) return 'excited';
  if (accuracy >= 90) return 'blushing';
  if (accuracy >= 80) return 'happy';
  if (accuracy >= 70) return 'good';
  if (accuracy >= 60) return 'yes';
  if (accuracy >= 50) return 'ok';
  if (accuracy >= 40) return 'shy';
  if (accuracy >= 30) return 'sad';
  if (accuracy >= 20) return 'no';
  if (accuracy >= 10) return 'mocking';
  return 'shocked';
};

const QuizResult = () => {
  const { mate } = useMateContext();
  const { kanaType } = useKanaContext();
  const { type, progress } = useQuizContext();
  const { startQuiz } = useQuizActions();
  const { playKanaAudio, playing } = useKanaAudio();
  const { playPopAudio } = usePopAudio();
  const correctAnswers = progress.filter(
    ({ answer, character, pronunciation }) =>
      answer === (type === 'character' ? pronunciation : character)
  );
  const accuracy = parseFloat(((correctAnswers.length / progress.length) * 100).toFixed(1));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.result}>
        <View style={styles.resultSummary}>
          <View style={styles.summaryText}>
            <View style={styles.accuracy}>
              <Text
                weight={700}
                variant="display2"
              >
                {accuracy}
              </Text>
              <Text
                weight={700}
                variant="h4"
                color="textSecondary"
                style={styles.accuracyUnit}
              >
                점
              </Text>
            </View>
            <View style={styles.badges}>
              <Text
                weight={700}
                variant="caption"
                color="success"
                style={[styles.badge, styles.correctBadge]}
              >
                정답 {correctAnswers.length}개
              </Text>
              <Text
                weight={700}
                variant="caption"
                color="error"
                style={[styles.badge, styles.incorrectBadge]}
              >
                오답 {progress.length - correctAnswers.length}개
              </Text>
            </View>
          </View>
          <Image
            source={mateImageMap[mate][getFeedbackImageName(accuracy)]}
            style={styles.feedbackImage}
          />
        </View>
        <View>
          {progress.map(({ answer, character, pronunciation }, index) => {
            const isCorrect = answer === (type === 'character' ? pronunciation : character);

            return (
              <View
                key={`${character}-${pronunciation}`}
                style={[
                  styles.resultDetail,
                  {
                    borderTopWidth: index === 0 ? 0 : 1
                  }
                ]}
              >
                <Text
                  weight={500}
                  variant="body2"
                  style={styles.detailNumber}
                >
                  {index + 1}.
                </Text>
                <Text
                  weight={700}
                  variant="small"
                  color={isCorrect ? 'success' : 'error'}
                  style={[
                    styles.badge,
                    styles.smallBadge,
                    isCorrect ? styles.correctBadge : styles.incorrectBadge
                  ]}
                >
                  {isCorrect ? '정답' : '오답'}
                </Text>
                <View style={styles.answer}>
                  <Text weight={700}>{character}</Text>
                  <Text
                    variant="body2"
                    color="textSecondary"
                  >
                    [{pronunciation}]
                  </Text>
                </View>
                <Pressable
                  style={[styles.iconButton, playing && styles.disabledIconButton]}
                  disabled={playing}
                  onPress={() => playKanaAudio(character)}
                >
                  <MaterialIcons
                    name={playing ? 'headset-off' : 'headset'}
                    size={20}
                    color={playing ? Colors.textSecondary : Colors.textPrimary}
                  />
                </Pressable>
                <Link
                  href={{ pathname: '/chart/[kana]', params: { kana: character } }}
                  style={styles.iconButton}
                  onPress={playPopAudio}
                >
                  <MaterialCommunityIcons
                    name="lead-pencil"
                    size={20}
                    color={Colors.textPrimary}
                  />
                </Link>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (!type) return;
            playPopAudio();
            startQuiz(kanaType, type);
          }}
        >
          <Text
            weight={700}
            variant="body2"
            color="white"
          >
            복습하기
          </Text>
        </Pressable>
        <Link
          href="/test"
          style={styles.button}
          onPress={playPopAudio}
        >
          <Text
            weight={700}
            variant="body2"
            color="white"
          >
            퀴즈 종료
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
  result: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  resultSummary: {
    borderRadius: 8,
    backgroundColor: Colors.primary10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  summaryText: {
    padding: 16,
    gap: 8
  },
  accuracy: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2
  },
  accuracyUnit: {
    marginBottom: 6
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  smallBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  correctBadge: {
    backgroundColor: Colors.successAlpha
  },
  incorrectBadge: {
    backgroundColor: Colors.errorAlpha
  },
  feedbackImage: {
    width: FEEDBACK_IMAGE_SIZE,
    height: FEEDBACK_IMAGE_SIZE
  },
  resultDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderColor: Colors.neutralLight
  },
  detailNumber: {
    width: 35,
    textAlign: 'center'
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 8,
    borderRadius: '50%',
    backgroundColor: Colors.primary30
  },
  disabledIconButton: {
    backgroundColor: Colors.primary10
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
  }
});

export default QuizResult;
