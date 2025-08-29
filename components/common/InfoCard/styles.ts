import { MATE_IMAGE_SIZE } from '@/components/common/InfoCard/constants';
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
  mateImage: {
    position: 'absolute',
    bottom: -12,
    right: -6,
    width: MATE_IMAGE_SIZE,
    height: MATE_IMAGE_SIZE,
    zIndex: 10
  }
});
