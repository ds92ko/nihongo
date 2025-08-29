import {
  ROW_HEIGHT,
  ROW_WIDTH,
  ROWS_PADDING_TOP
} from '@/components/local/review/QuizScene/constants';
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
  groups: {
    gap: 16
  },
  suffix: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rows: {
    paddingTop: ROWS_PADDING_TOP,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  row: {
    width: ROW_WIDTH,
    height: ROW_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary10
  },
  allRow: {
    width: '100%'
  },
  activeRow: {
    backgroundColor: Colors.primary30
  },
  checkbox: {
    backgroundColor: Colors.white,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 20
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  button: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary
  },
  disabledButton: {
    backgroundColor: Colors.neutral
  }
});
