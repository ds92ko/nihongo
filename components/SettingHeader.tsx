import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const SettingHeader = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text weight={700}>설정</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  }
});

export default SettingHeader;
