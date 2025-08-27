import { mateImageMap } from '@/assets/images/mates';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { useMateContext } from '@/stores/useMateStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

interface InfoCardProps {
  tips: string[];
}

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width * 0.6;
const MATE_IMAGE_SIZE = width * 0.3;

const InfoCard = ({ tips }: InfoCardProps) => {
  const { mate } = useMateContext();
  const { playPopAudio } = usePopAudio();
  const progress = useSharedValue<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const [visible, setVisible] = useState(true);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const handleClose = () => {
    playPopAudio();
    setVisible(false);
  };

  const handleToggleAutoPlay = () => {
    playPopAudio();
    setAutoPlay(prev => !prev);
  };

  const handlePagination = (index: number) => {
    playPopAudio();
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true
    });
  };

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
          <Pressable onPress={handleClose}>
            <Ionicons
              name="close"
              size={24}
              color={Colors.textPrimary}
            />
          </Pressable>
        </View>
        <View style={styles.infoBody}>
          <View style={styles.infoContent}>
            <Carousel
              ref={carouselRef}
              loop
              snapEnabled
              pagingEnabled
              onProgressChange={progress}
              width={CAROUSEL_WIDTH}
              height={carouselHeight}
              autoPlay={autoPlay}
              autoPlayInterval={3000}
              data={tips}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxAdjacentItemScale: 0.8,
                parallaxScrollingOffset: 10
              }}
              renderItem={({ item, index }) => (
                <View
                  onLayout={e =>
                    setCarouselHeight(prev => Math.max(prev, e.nativeEvent.layout.height))
                  }
                  style={styles.carousel}
                >
                  <View style={styles.carouselNumber}>
                    <Text
                      weight={700}
                      variant="tiny"
                      color={Colors.white}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <Text variant="caption">{item}</Text>
                </View>
              )}
            />
            <View style={styles.pagination}>
              <Pressable onPress={handleToggleAutoPlay}>
                <Ionicons
                  name={autoPlay ? 'pause' : 'play'}
                  size={16}
                  color={Colors.info}
                />
              </Pressable>
              <Pagination.Custom
                progress={progress}
                data={tips}
                size={8}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                containerStyle={styles.pagination}
                horizontal
                onPress={handlePagination}
              />
            </View>
          </View>
          <Image
            source={mateImageMap[mate].hi}
            style={styles.mateImage}
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  infoCard: {
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.infoAlpha
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  infoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  infoBody: {
    position: 'relative'
  },
  infoContent: {
    width: CAROUSEL_WIDTH,
    gap: 12
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.white
  },
  carouselNumber: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 4,
    backgroundColor: Colors.info
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  dot: {
    backgroundColor: Colors.neutral,
    borderRadius: 4
  },
  activeDot: {
    overflow: 'hidden',
    backgroundColor: Colors.info,
    borderRadius: 5,
    width: 10,
    height: 10
  },
  mateImage: {
    position: 'absolute',
    bottom: -12,
    right: -6,
    width: MATE_IMAGE_SIZE,
    height: MATE_IMAGE_SIZE,
    zIndex: 10
  }
});

export default InfoCard;
