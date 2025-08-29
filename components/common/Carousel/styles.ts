import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.white
  },
  carouselNumber: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 4,
    backgroundColor: Colors.info
  },
  carouselText: {
    flexShrink: 1
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  dot: {
    backgroundColor: Colors.neutral,
    borderRadius: 4
  },
  activeDot: {
    overflow: 'hidden',
    backgroundColor: Colors.info,
    borderRadius: 5,
    width: 10,
    height: 10
  }
});
