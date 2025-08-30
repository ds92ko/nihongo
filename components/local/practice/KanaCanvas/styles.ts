import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 16
  },
  canvasContainer: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  cross: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  crossLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 0,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  crossLineVertical: {
    position: 'absolute',
    width: 0,
    height: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.neutral
  },
  hint: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 20
  },
  canvas: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 30
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8
  }
});
