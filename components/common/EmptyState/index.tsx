import { styles } from '@/components/common/EmptyState/styles';
import { EmptyStateProps } from '@/components/common/EmptyState/types';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View } from 'react-native';

const EmptyState = ({ children }: EmptyStateProps) => (
  <View style={styles.emptyState}>
    <MaterialIcons
      name="search-off"
      size={56}
      color={Colors.warning}
    />
    <View>
      <Text>{children}</Text>
    </View>
  </View>
);

export default EmptyState;
