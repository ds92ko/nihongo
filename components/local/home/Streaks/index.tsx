import Streak from '@/components/local/home/Streak';
import { styles } from '@/components/local/home/Streaks/styles';
import { View } from 'react-native';

const Streaks = () => {
  return (
    <View style={styles.streaks}>
      <Streak category="practice" />
      <Streak category="quiz" />
    </View>
  );
};

export default Streaks;
