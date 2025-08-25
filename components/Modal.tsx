import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode } from 'react';
import {
  Pressable,
  Modal as RNModal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  buttons?: ReactNode[];
}

const Modal = ({ visible, setVisible, title, children, buttons }: ModalProps) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.title}>{title}</View>
              <Pressable onPress={() => setVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>
            <ScrollView style={styles.body}>{children}</ScrollView>
            {buttons && <View style={styles.footer}>{buttons}</View>}
          </View>
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.overlay
  },
  container: {
    flex: 1,
    padding: 32,
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
    gap: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  title: {
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
    backgroundColor: Colors.primary30
  }
});

export default Modal;
