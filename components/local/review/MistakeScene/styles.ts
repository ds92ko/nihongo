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
  }
});
