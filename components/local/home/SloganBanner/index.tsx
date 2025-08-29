import { mateImageMap } from '@/assets/images/mates';
import { styles } from '@/components/local/home/SloganBanner/styles';
import { useMateContext } from '@/stores/useMateStore';
import { Image, View } from 'react-native';

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

export default SloganBanner;
