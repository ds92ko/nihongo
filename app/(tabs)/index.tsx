import { Missions, SloganBanner, Streaks, Weekly } from '@/components/local/home';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SloganBanner />
        <Streaks />
        <Weekly />
        <Missions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  }
});
