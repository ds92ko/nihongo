import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  tabBar: {
    flexDirection: 'row',
    gap: 2
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.primary10
  },
  activeTab: {
    backgroundColor: Colors.white
  },
  toggleBar: {
    marginBottom: 16
  }
});
