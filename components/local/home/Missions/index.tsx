import { Button, Text } from '@/components/common';
import Mission from '@/components/local/home/Mission';
import { MISSIONS } from '@/components/local/home/Missions/constants';
import { styles } from '@/components/local/home/Missions/styles';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const Missions = () => {
  return (
    <View style={styles.missions}>
      <View style={styles.missionsHeader}>
        <View style={styles.missionsTitle}>
          <MaterialIcons
            name="assignment"
            size={20}
            color={Colors.primary}
          />
          <Text
            weight={700}
            variant="body2"
          >
            오늘의 숙제
          </Text>
        </View>
        <Button
          size="small"
          active
        >
          목표 설정
        </Button>
      </View>
      {MISSIONS.map(mission => (
        <Mission
          key={`${mission.category}-${mission.type}`}
          {...mission}
        />
      ))}
    </View>
  );
};

export default Missions;
