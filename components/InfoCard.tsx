import { mateImageMap } from '@/assets/images/mates';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { useMateContext } from '@/stores/useMateStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const slides = [
  '테스트할 행을 선택한 뒤, 원하는 방식으로 테스트를 시작해보세요.',
  '읽기 테스트는 제시된 문자를 보고 발음을 맞히는 방식이에요.',
  '표기 테스트는 제시된 발음에 맞는 문자를 맞히는 방식이에요.'
];

const InfoCard = () => {
  const { mate } = useMateContext();
  const { playPopAudio } = usePopAudio();

  const progress = useSharedValue<number>(0);

  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true
    });
  };

  return (
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
          onPress={() => {
            playPopAudio();
          }}
        >
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
            ref={ref}
            loop={false}
            vertical={false}
            width={width * 0.6}
            height={100}
            onProgressChange={progress}
            snapEnabled
            pagingEnabled
            autoPlayInterval={1000}
            data={slides}
            renderItem={({ item }) => <Text variant="caption">{item}</Text>}
          />
          <Pagination.Custom
            progress={progress}
            data={slides}
            size={8}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.pagination}
            horizontal
            onPress={onPressPagination}
          />
        </View>
        <View style={styles.infoImage}>
          <View style={styles.infoImageBox}>
            <Image
              source={mateImageMap[mate].hi}
              style={styles.mateImage}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    gap: 16,
    borderRadius: 8,
    paddingRight: 8,
    backgroundColor: Colors.infoAlpha
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  infoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  infoBody: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoContent: {
    width: '70%',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  infoImage: {
    width: '30%',
    justifyContent: 'flex-end'
  },
  infoImageBox: {
    width: '100%',
    aspectRatio: 1
  },
  mateImage: {
    width: '100%',
    height: '100%'
  },

  pagination: {
    alignItems: 'center',
    gap: 16
  },
  dot: {
    backgroundColor: Colors.neutral,
    borderRadius: 4
    // borderRadius: '50%',
    // width: 12,
    // height: 12
  },
  activeDot: {
    overflow: 'hidden',
    backgroundColor: Colors.info,
    borderRadius: 5,
    width: 10,
    height: 10
    // borderRadius: '50%',
    // width: 12,
    // height: 12
  }
});

export default InfoCard;
