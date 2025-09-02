import { Text } from '@/components/common';
import { styles } from '@/components/local/home/Streak/styles';
import { StreakProps } from '@/components/local/home/Streak/types';
import { getStreak } from '@/components/local/home/Streak/utils';
import { Colors } from '@/constants/Colors';
import { useStatsContext } from '@/stores/useStatsStore';
import { Entypo } from '@expo/vector-icons';
import { View } from 'react-native';

const Streak = ({ category }: StreakProps) => {
  const { practice, quiz } = useStatsContext();
  const stats = category === 'practice' ? practice : quiz;
  const dates = [...Object.keys(stats)];
  const streak = getStreak(dates);

  return (
    <View style={[styles.streak, { backgroundColor: Colors[`${category}Light`] }]}>
      <View style={styles.streakIcon}>
        <Entypo
          name={category === 'practice' ? 'pencil' : 'open-book'}
          size={32}
          color={Colors[category]}
        />
      </View>
      <View style={styles.streakText}>
        <Text
          weight={700}
          variant="caption"
        >
          연속 {category === 'practice' ? '연습' : '퀴즈'}
        </Text>
        <View style={styles.dateCount}>
          <Text
            weight={700}
            variant="h3"
            color={Colors[`text${category === 'practice' ? 'Practice' : 'Quiz'}`]}
          >
            {streak}
          </Text>
          <Text
            weight={500}
            variant="caption"
            style={styles.unit}
            color={Colors.textSecondary}
          >
            일
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Streak;
