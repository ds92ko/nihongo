import { IconButton, Text } from '@/components/common';
import { styles } from '@/components/local/review/QuizHeader/styles';
import { useDialogActions } from '@/stores/useDialogStore';
import { useQuizContext } from '@/stores/useQuizStore';
import { QuizType } from '@/types/quiz';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuizHeader = ({ route, navigation }: NativeStackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { type } = route.params as { type: QuizType };
  const { progress } = useQuizContext();
  const { openDialog } = useDialogActions();

  const onPress = () => {
    const remaining = progress.filter(p => !p.answer).length;

    if (!remaining) {
      navigation.navigate('index');
      return;
    }

    openDialog({
      variant: 'warning',
      title: '아직 퀴즈가 끝나지 않았어요!',
      contents: [`${remaining}문제만 더 풀면 완주할 수 있어요.`, '힘내서 마지막까지 도전해볼까요?'],
      cancel: {
        label: '나가기',
        onPress: () => navigation.navigate('index')
      },
      confirm: {
        label: '계속하기'
      }
    });
  };

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <IconButton
          icon={{ type: 'material', name: 'keyboard-arrow-left' }}
          onPress={onPress}
          variant="white"
          shape="square"
          size="small"
        />
        <View style={styles.title}>
          <Text
            weight={700}
            variant="h4"
          >
            {type === 'character' ? '글자' : '발음'} 퀴즈
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuizHeader;
