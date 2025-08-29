import { FEEDBACK_IMAGE_SIZE } from '@/components/local/review/QuizResult/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  result: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  resultSummary: {
    borderRadius: 8,
    backgroundColor: Colors.primary10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  summaryText: {
    padding: 16,
    gap: 8
  },
  accuracy: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2
  },
  accuracyUnit: {
    marginBottom: 6
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  smallBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  correctBadge: {
    backgroundColor: Colors.successLight
  },
  incorrectBadge: {
    backgroundColor: Colors.errorLight
  },
  feedbackImage: {
    width: FEEDBACK_IMAGE_SIZE,
    height: FEEDBACK_IMAGE_SIZE
  },
  resultDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderColor: Colors.neutralLight
  },
  detailNumber: {
    width: 35,
    textAlign: 'center'
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  }
});
