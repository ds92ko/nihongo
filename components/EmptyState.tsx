import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface EmptyStateProps {
  children: ReactNode;
}

const EmptyState = ({ children }: EmptyStateProps) => {
  return (
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
};

const styles = StyleSheet.create({
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    borderRadius: 8,
    backgroundColor: Colors.warningAlpha
  }
});

export default EmptyState;
