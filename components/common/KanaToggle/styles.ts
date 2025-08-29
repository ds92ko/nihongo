import { HEIGHT, PADDING, THUMB_SIZE, WIDTH } from '@/components/common/KanaToggle/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    padding: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    position: 'relative'
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    backgroundColor: Colors.white,
    zIndex: 10
  },
  icon: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 20
  }
});
