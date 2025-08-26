import { mateImageMap } from '@/assets/images/mates';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import { useMateContext } from '@/stores/useMateStore';
import { useStudyContext } from '@/stores/useStudyStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

const StudyResult = () => {
  const { mate } = useMateContext();
  const { type, progress } = useStudyContext();
  const { playKanaAudio, kanaPlayerStatus } = useKanaAudio();
  const correctAnswers = progress.filter(
    ({ answer, character, pronunciation }) =>
      answer === (type === 'character' ? pronunciation : character)
  );
  const accuracy = parseFloat(((correctAnswers.length / progress.length) * 100).toFixed(1));

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.result}
        contentContainerStyle={{ gap: 16 }}
      >
        <View
          style={{
            borderRadius: 8,
            backgroundColor: Colors.primary10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ padding: 16, gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
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
                style={{ marginBottom: 6 }}
              >
                점
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                weight={700}
                variant="caption"
                color="success"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: Colors.successAlpha
                }}
              >
                정답 {correctAnswers.length}개
              </Text>
              <Text
                weight={700}
                variant="caption"
                color="error"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: Colors.errorAlpha
                }}
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
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingVertical: 12,
                  borderTopWidth: index === 0 ? 0 : 1,
                  borderColor: Colors.neutralLight
                }}
              >
                <Text
                  weight={500}
                  variant="caption"
                  style={{ width: 30, textAlign: 'center' }}
                >
                  {index + 1}.
                </Text>
                <Text
                  weight={700}
                  variant="small"
                  color={isCorrect ? 'success' : 'error'}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: isCorrect ? Colors.successAlpha : Colors.errorAlpha
                  }}
                >
                  {isCorrect ? '정답' : '오답'}
                </Text>
                <View style={{ flexDirection: 'row', flex: 1, gap: 4 }}>
                  <Text weight={700}>{character}</Text>
                  <Text color="textSecondary">[{pronunciation}]</Text>
                </View>
                <Pressable
                  style={[styles.button, kanaPlayerStatus.playing && styles.disabledButton]}
                  disabled={kanaPlayerStatus.playing}
                  onPress={() => playKanaAudio(character)}
                >
                  <MaterialIcons
                    name={kanaPlayerStatus.playing ? 'headset-off' : 'headset'}
                    size={20}
                    color={kanaPlayerStatus.playing ? Colors.textSecondary : Colors.textPrimary}
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
    paddingVertical: 24
  },
  feedbackImage: {
    width: FEEDBACK_IMAGE_SIZE,
    height: FEEDBACK_IMAGE_SIZE
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
  }
});

export default StudyResult;
