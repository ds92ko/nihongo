import { styles } from '@/components/common/Carousel/styles';
import { CarouselProps } from '@/components/common/Carousel/types';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import RNRCCarousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const Carousel = ({ data, width }: CarouselProps) => {
  const { hapticFeedback } = useHaptics();
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [height, setHeight] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHeight(prev => Math.max(prev, height));
  };

  const onToggleAutoPlay = () => {
    setAutoPlay(prev => !prev);
  };

  const onPressPagination = (index: number) => {
    onPressIn();
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true
    });
  };

  return (
    <View style={[styles.container, { width }]}>
      <RNRCCarousel
        ref={carouselRef}
        loop
        snapEnabled
        pagingEnabled
        onProgressChange={progress}
        width={width}
        height={height}
        autoPlay={autoPlay}
        autoPlayInterval={3000}
        data={data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.8,
          parallaxScrollingOffset: 10
        }}
        renderItem={({ item, index }) => (
          <View
            onLayout={onLayout}
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
            <Text
              variant="caption"
              style={styles.carouselText}
            >
              {item}
            </Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Pressable
          onPressIn={onPressIn}
          onPress={onToggleAutoPlay}
        >
          <Ionicons
            name={autoPlay ? 'pause' : 'play'}
            size={16}
            color={Colors.info}
          />
        </Pressable>
        <Pagination.Custom
          progress={progress}
          data={data}
          size={8}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.pagination}
          horizontal
          onPress={onPressPagination}
        />
      </View>
    </View>
  );
};

export default Carousel;
