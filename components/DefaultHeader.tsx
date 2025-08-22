import Logo from '@/components/Logo';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const DefaultHeader = () => {
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
    padding: 16
  }
});

export default DefaultHeader;
