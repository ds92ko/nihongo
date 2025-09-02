import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  streak: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    gap: 12
  },
  streakIcon: {
    backgroundColor: Colors.white,
    borderRadius: '50%',
    padding: 10
  },
  streakText: {
    gap: 2,
    alignItems: 'flex-end'
  },
  dateCount: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 2
  },
  unit: {
    marginBottom: 4
  }
});
