import { Text } from '@/components/common';
import { styles } from '@/components/local/review/QuizHeader/styles';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { useQuizContext } from '@/stores/useQuizStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

const QuizHeader = () => {
  const { type } = useQuizContext();
  const { playPopAudio } = usePopAudio();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Link
          style={styles.button}
          href={'/review'}
          onPress={playPopAudio}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={20}
            color={Colors.textPrimary}
          />
        </Link>
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
