import { styles } from '@/components/local/home/Logo/styles';
import { Text, View } from 'react-native';

const Logo = () => (
  <View style={styles.logo}>
    <Text style={[styles.logoText, styles.nihon]}>Nihon</Text>
    <Text style={[styles.logoText, styles.go]}>GO!</Text>
  </View>
);

export default Logo;
