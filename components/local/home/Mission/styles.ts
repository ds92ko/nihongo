import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mission: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    gap: 8
  },
  missionHeader: {
    position: 'relative'
  },
  missionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  completeCheck: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  missionBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8
  },
  missionContent: {
    flex: 1,
    gap: 8
  },
  missionPercentage: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 2,
    width: 75
  },
  unit: {
    marginBottom: 4
  }
});
