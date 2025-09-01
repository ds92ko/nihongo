import { MODAL_CONTAINER_PADDING } from '@/components/common/Modal/constants';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.overlay
  },
  container: {
    flex: 1,
    paddingHorizontal: MODAL_CONTAINER_PADDING,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    maxHeight: '100%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    gap: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8
  },
  title: {
    flexShrink: 1,
    flexDirection: 'row',
    gap: 4
  },
  body: {
    flexGrow: 0
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  }
});
