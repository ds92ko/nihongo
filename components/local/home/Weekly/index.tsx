import { mateImageMap } from '@/assets/images/mates';
import { Text } from '@/components/common';
import { WEEKLY_IMAGES } from '@/components/local/home/Weekly/constants';
import { styles } from '@/components/local/home/Weekly/styles';
import { getWeekly } from '@/components/local/home/Weekly/utils';
import { Colors } from '@/constants/Colors';
import { useMateContext } from '@/stores/useMateStore';
import { useStatsContext } from '@/stores/useStatsStore';
import { Entypo } from '@expo/vector-icons';
import { Image, View } from 'react-native';

const Weekly = () => {
  const { mate } = useMateContext();
  const { practice, quiz } = useStatsContext();
  const practiceDates = [...Object.keys(practice)];
  const quizDates = [...Object.keys(quiz)];
  const { weekly, streak } = getWeekly({ practiceDates, quizDates });

  return (
    <View style={styles.weekly}>
      <View style={styles.weekdays}>
        {weekly.map(({ day, practice, quiz }) => (
          <View
            key={day}
            style={styles.weekday}
          >
            <Text
              weight={700}
              variant="small"
              color={Colors.textSecondary}
            >
              {day}
            </Text>
            <View style={styles.stamp}>
              <Entypo
                name="pencil"
                size={18}
                color={practice ? Colors.practice : Colors.neutralLight}
              />
            </View>
            <View style={styles.stamp}>
              <Entypo
                name="open-book"
                size={18}
                color={quiz ? Colors.quiz : Colors.neutralLight}
              />
            </View>
          </View>
        ))}
      </View>
      <Image
        source={mateImageMap[mate][WEEKLY_IMAGES[streak]]}
        style={styles.weeklyImage}
      />
    </View>
  );
};

export default Weekly;
