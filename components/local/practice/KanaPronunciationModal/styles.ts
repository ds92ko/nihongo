import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bar: {
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.infoLight,
    overflow: 'hidden'
  },
  progress: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: Colors.info
  }
});
