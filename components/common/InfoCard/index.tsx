import { mateImageMap } from '@/assets/images/mates';
import Carousel from '@/components/common/Carousel';
import { CAROUSEL_WIDTH } from '@/components/common/InfoCard/constants';
import { styles } from '@/components/common/InfoCard/styles';
import { InfoCardProps } from '@/components/common/InfoCard/types';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import { useMateContext } from '@/stores/useMateStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

const InfoCard = ({ tips }: InfoCardProps) => {
  const { hapticFeedback } = useHaptics();
  const { mate } = useMateContext();
  const [visible, setVisible] = useState(true);

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
  };

  const onPressClose = () => setVisible(false);

  return (
    visible && (
      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <View style={styles.infoTitle}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={24}
              color={Colors.info}
            />
            <Text
              weight={700}
              variant="body2"
            >
              Tip!
            </Text>
          </View>
          <Pressable
            onPressIn={onPressIn}
            onPress={onPressClose}
          >
            <Ionicons
              name="close"
              size={24}
              color={Colors.textPrimary}
            />
          </Pressable>
        </View>
        <View style={styles.infoBody}>
          <Carousel
            data={tips}
            width={CAROUSEL_WIDTH}
          />
          <Image
            source={mateImageMap[mate].hi}
            style={styles.mateImage}
          />
        </View>
      </View>
    )
  );
};

export default InfoCard;
