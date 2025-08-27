import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { useStudyContext } from '@/stores/useStudyStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const StudyHeader = () => {
  const { type } = useStudyContext();
  const { playPopAudio } = usePopAudio();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Link
          style={styles.button}
          href={'/test'}
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
            {type === 'character' ? '읽기' : '표기'} 테스트
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 36
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8
  }
});

export default StudyHeader;
