import { Text } from '@/components/common';
import { styles } from '@/components/local/review/QuizResult/styles';
import { getFeedbackImageSource } from '@/components/local/review/QuizResult/utils';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useMateContext } from '@/stores/useMateStore';
import { useQuizActions, useQuizContext } from '@/stores/useQuizStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, View } from 'react-native';

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
            source={getFeedbackImageSource(mate, accuracy)}
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
                    borderTopWidth: Number(!!index)
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
                  href={{ pathname: '/practice/[kana]', params: { kana: character } }}
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
          href="/review"
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

export default QuizResult;
