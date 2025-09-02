import {
  WEEKDAYS_GAP,
  WEEKLY_IMAGE_SIZE,
  WEEKLY_PADDING,
  WEEKLY_STAMP_SIZE
} from '@/components/local/home/Weekly/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  weekly: {
    position: 'relative',
    borderRadius: 8,
    padding: WEEKLY_PADDING,
    gap: 12,
    backgroundColor: Colors.infoLight
  },
  weekdays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WEEKDAYS_GAP
  },
  weekday: {
    alignItems: 'center',
    gap: WEEKDAYS_GAP
  },
  weeklyImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: WEEKLY_IMAGE_SIZE,
    height: WEEKLY_IMAGE_SIZE,
    zIndex: 10
  },
  stamp: {
    width: WEEKLY_STAMP_SIZE,
    height: WEEKLY_STAMP_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.white
  }
});
