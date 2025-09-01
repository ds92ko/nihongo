import { Text } from '@/components/common';
import { styles } from '@/components/local/setting/SettingHeader/styles';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text weight={700}>설정</Text>
      </View>
    </View>
  );
};
export default SettingHeader;
