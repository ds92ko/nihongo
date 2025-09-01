import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1
  },
  toastContent: {
    flex: 1,
    gap: 4
  },
  success: {
    backgroundColor: Colors.successLight
  },
  error: {
    backgroundColor: Colors.errorLight
  },
  warning: {
    backgroundColor: Colors.warningLight
  },
  info: {
    backgroundColor: Colors.infoLight
  }
});
