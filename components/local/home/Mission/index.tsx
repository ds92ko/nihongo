import { ProgressBar, Text } from '@/components/common';
import {
  PRACTICE_MISSION_DESCRIPTION_MAP,
  PRACTICE_MISSION_TITLE_MAP,
  QUIZ_MISSION_DESCRIPTION_MAP,
  QUIZ_MISSION_TITLE_MAP
} from '@/components/local/home/Mission/constants';
import { styles } from '@/components/local/home/Mission/styles';
import { MissionProps } from '@/components/local/home/Mission/types';
import { Colors } from '@/constants/Colors';
import { useStatsContext } from '@/stores/useStatsStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { View } from 'react-native';

const Mission = ({ category, type }: MissionProps) => {
  const { practice, quiz } = useStatsContext();
  const today = dayjs().format('YYYY-MM-DD');
  const stats = category === 'practice' ? practice[today]?.[type] : quiz[today]?.[type];
  const progress = (stats || []).length;
  const goal = 10;
  const title =
    category === 'practice'
      ? PRACTICE_MISSION_TITLE_MAP[type](goal)
      : QUIZ_MISSION_TITLE_MAP[type](goal);
  const description =
    category === 'practice'
      ? PRACTICE_MISSION_DESCRIPTION_MAP[type]
      : QUIZ_MISSION_DESCRIPTION_MAP[type];

  return (
    <View style={styles.mission}>
      <View style={styles.missionHeader}>
        <View style={styles.missionTitle}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={16}
            color={Colors[category]}
          />
          <Text
            weight={700}
            variant="caption"
          >
            {title}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="marker-check"
          size={28}
          color={progress >= goal ? Colors[category] : Colors.neutralLight}
          style={styles.completeCheck}
        />
      </View>
      <View style={styles.missionBody}>
        <View style={styles.missionContent}>
          <Text
            variant="caption"
            color="textSecondary"
          >
            {description}
          </Text>
          <ProgressBar
            progress={progress}
            max={goal}
            height={16}
            progressColor={Colors[category]}
            barColor={Colors[`${category}Light`]}
            text="none"
          />
        </View>
        <View style={styles.missionPercentage}>
          <Text
            weight={700}
            variant="h2"
            color={Colors[`text${category === 'practice' ? 'Practice' : 'Quiz'}`]}
          >
            {parseFloat(((Math.min(progress, goal) / goal) * 100).toFixed(1))}
          </Text>
          <Text
            weight={500}
            variant="caption"
            style={styles.unit}
            color={Colors.textSecondary}
          >
            %
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Mission;
