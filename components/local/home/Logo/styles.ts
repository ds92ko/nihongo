import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoText: {
    fontFamily: 'Cafe24Meongi-B',
    ...Typography.display3
  },
  nihon: {
    color: Colors.textPrimary
  },
  go: {
    color: Colors.primary
  }
});
