import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  missions: {
    padding: 16,
    backgroundColor: Colors.primary10,
    borderRadius: 8,
    gap: 12
  },
  missionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  missionsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  }
});
