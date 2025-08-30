import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1
  },
  small: {
    padding: 8
  },
  medium: {
    padding: 12
  },
  large: {
    padding: 16
  },
  rounded: {
    borderRadius: '50%'
  },
  square: {
    borderRadius: 8
  },
  primary: {
    backgroundColor: Colors.primary30
  },
  white: {
    backgroundColor: Colors.white
  },
  disabledPrimary: {
    backgroundColor: Colors.primary10
  },
  disabledWhite: {
    backgroundColor: Colors.neutralLight
  }
});
