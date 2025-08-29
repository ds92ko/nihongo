import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  bar: {
    flexGrow: 1,
    backgroundColor: Colors.neutralLight,
    overflow: 'hidden'
  },
  progress: {
    height: '100%'
  },
  progressText: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
