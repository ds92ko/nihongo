import { IconButton, Text } from '@/components/common';
import { styles } from '@/components/local/review/QuizHeader/styles';
import usePopAudio from '@/hooks/usePopAudio';
import { useQuizContext } from '@/stores/useQuizStore';
import { SafeAreaView, View } from 'react-native';

const QuizHeader = () => {
  const { type } = useQuizContext();
  const { playPopAudio } = usePopAudio();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <IconButton
          icon={{ type: 'material', name: 'keyboard-arrow-left' }}
          href={'/review'}
          onPress={playPopAudio}
          variant="white"
          shape="square"
          size="small"
        />
        <View style={styles.title}>
          <Text
            weight={700}
            variant="h4"
          >
            {type === 'character' ? '읽기' : '표기'} 퀴즈
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizHeader;
