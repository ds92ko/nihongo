import { Logo } from '@/components/local/home';
import { styles } from '@/components/local/home/HomeHeader/styles';
import { SafeAreaView, View } from 'react-native';

const HomeHeader = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
      <Logo />
    </View>
  </SafeAreaView>
);

export default HomeHeader;
