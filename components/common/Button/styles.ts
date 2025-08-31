import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    textAlign: 'center'
  },
  fill: {
    flex: 1
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  primary: {
    backgroundColor: Colors.primary
  },
  primaryActive: {
    backgroundColor: Colors.primary
  },
  primary10: {
    backgroundColor: Colors.primary10
  },
  primary10Active: {
    backgroundColor: Colors.primary30
  },
  neutralLight: {
    backgroundColor: Colors.neutralLight
  },
  neutralLightActive: {
    backgroundColor: Colors.neutralLight
  },
  success: {
    backgroundColor: Colors.success
  },
  successActive: {
    backgroundColor: Colors.success
  },
  error: {
    backgroundColor: Colors.error
  },
  errorActive: {
    backgroundColor: Colors.error
  },
  warning: {
    backgroundColor: Colors.warning
  },
  warningActive: {
    backgroundColor: Colors.warning
  },
  info: {
    backgroundColor: Colors.info
  },
  infoActive: {
    backgroundColor: Colors.info
  },
  disabled: {
    backgroundColor: Colors.neutral
  }
});
