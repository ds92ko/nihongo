import { mateImageMap } from '@/assets/images/mates';
import { Colors } from '@/constants/Colors';
import { useMateContext } from '@/stores/useMateStore';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const CONTAINER_PADDING_HORIZONTAL = 16;
const BANNER_INNER_WIDTH = width - CONTAINER_PADDING_HORIZONTAL * 4;
const SLOGAN_IMAGE_WIDTH = BANNER_INNER_WIDTH * 0.7;
const SLOGAN_IMAGE_HEIGHT = SLOGAN_IMAGE_WIDTH * 0.383;
const MATE_IMAGE_SIZE = BANNER_INNER_WIDTH * 0.3;

const SloganBanner = () => {
  const { mate } = useMateContext();

  return (
    <View style={styles.banner}>
      <View style={styles.sloganContainer}>
        <Image
          source={require('@/assets/images/slogan.png')}
          style={styles.slogan}
        />
      </View>
      <Image
        source={mateImageMap[mate].sing}
        style={styles.mate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: Colors.primary10,
    borderRadius: 8
  },
  sloganContainer: {
    padding: 16,
    paddingTop: 8
  },
  slogan: {
    width: SLOGAN_IMAGE_WIDTH,
    height: SLOGAN_IMAGE_HEIGHT
  },
  mate: {
    width: MATE_IMAGE_SIZE,
    height: MATE_IMAGE_SIZE
  }
});

export default SloganBanner;
