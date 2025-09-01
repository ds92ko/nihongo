import { Button, IconButton, Text } from '@/components/common';
import { styles } from '@/components/local/review/QuizResult/styles';
import { getFeedbackImageSource } from '@/components/local/review/QuizResult/utils';
import useKanaAudio from '@/hooks/useKanaAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useMateContext } from '@/stores/useMateStore';
import { useQuizActions, useQuizContext } from '@/stores/useQuizStore';
import { Image, ScrollView, View } from 'react-native';

const QuizResult = () => {
  const { mate } = useMateContext();
  const { kanaType } = useKanaContext();
  const { type, progress } = useQuizContext();
  const { startQuiz } = useQuizActions();
  const { playKanaAudio, playing } = useKanaAudio();
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
                <IconButton
                  icon={{ type: 'material', name: `headset${playing ? '-off' : ''}` }}
                  onPress={() => playKanaAudio(character)}
                  disabled={playing}
                  size="small"
                />
                <IconButton
                  icon={{ type: 'material-community', name: 'lead-pencil' }}
                  href={{ pathname: '/practice/[kana]', params: { kana: character } }}
                  size="small"
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            if (!type) return;
            startQuiz(kanaType, type);
          }}
          active
          fill
        >
          복습하기
        </Button>
        <Button
          href="/review"
          active
          fill
        >
          퀴즈 종료
        </Button>
      </View>
    </View>
  );
};

export default QuizResult;
