import Logo from '@/components/Logo';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Logo />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  }
});

export default HomeHeader;
