import {
  MATE_IMAGE_SIZE,
  SLOGAN_IMAGE_HEIGHT,
  SLOGAN_IMAGE_WIDTH
} from '@/components/local/home/SloganBanner/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: Colors.primary10,
    borderRadius: 8
  },
  sloganContainer: {
    padding: 16,
    paddingTop: 8
  },
  slogan: {
    width: SLOGAN_IMAGE_WIDTH,
    height: SLOGAN_IMAGE_HEIGHT
  },
  mate: {
    width: MATE_IMAGE_SIZE,
    height: MATE_IMAGE_SIZE
  }
});
