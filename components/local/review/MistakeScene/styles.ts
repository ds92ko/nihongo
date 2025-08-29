import {
  MISTAKE_HEIGHT,
  MISTAKES_GAP,
  MISTAKES_PADDING_TOP
} from '@/components/local/review/MistakeScene/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary10
  },
  activeButton: {
    backgroundColor: Colors.primary30
  },
  disabledButton: {
    backgroundColor: Colors.neutralLight
  },
  groups: {
    gap: 16
  },
  suffix: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mistakes: {
    paddingTop: MISTAKES_PADDING_TOP,
    gap: MISTAKES_GAP
  },
  mistake: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    minHeight: MISTAKE_HEIGHT,
    padding: 8,
    borderRadius: 26,
    backgroundColor: Colors.primary10
  },
  mistakeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 16
  },
  mistakeControl: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 8,
    borderRadius: '50%',
    backgroundColor: Colors.primary30
  },
  disabledIconButton: {
    backgroundColor: Colors.primary10
  }
});
