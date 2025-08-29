import { CAROUSEL_WIDTH, MATE_IMAGE_SIZE } from '@/components/common/InfoCard/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  infoCard: {
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.infoLight
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  infoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  infoBody: {
    position: 'relative'
  },
  infoContent: {
    width: CAROUSEL_WIDTH,
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
  },
  mateImage: {
    position: 'absolute',
    bottom: -12,
    right: -6,
    width: MATE_IMAGE_SIZE,
    height: MATE_IMAGE_SIZE,
    zIndex: 10
  }
});
