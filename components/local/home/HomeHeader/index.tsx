import { styles } from '@/components/local/home/HomeHeader/styles';
import Logo from '@/components/local/home/Logo';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Logo />
      </View>
    </View>
  );
};

export default HomeHeader;
