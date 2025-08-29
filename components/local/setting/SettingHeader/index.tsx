import { Text } from '@/components/common';
import { styles } from '@/components/local/setting/SettingHeader/styles';
import { SafeAreaView, View } from 'react-native';

const SettingHeader = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
      <Text weight={700}>설정</Text>
    </View>
  </SafeAreaView>
);

export default SettingHeader;
