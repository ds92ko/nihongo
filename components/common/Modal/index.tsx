import { MODAL_CONTAINER_PADDING } from '@/components/common/Modal/constants';
import { styles } from '@/components/common/Modal/styles';
import { ModalProps } from '@/components/common/Modal/types';
import { Colors } from '@/constants/Colors';
import useHaptics from '@/hooks/useHaptic';
import SoundManager from '@/managers/SoundManager';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Modal as RNModal, SafeAreaView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Modal = ({ visible, closeModal, title, children, buttons }: ModalProps) => {
  const insets = useSafeAreaInsets();
  const { hapticFeedback } = useHaptics();

  const onPressIn = () => {
    hapticFeedback();
    SoundManager.playClick();
  };

  const onPressClose = () => closeModal?.();

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <SafeAreaView style={styles.safe}>
        <View
          style={[
            styles.container,
            {
              paddingTop: MODAL_CONTAINER_PADDING + insets.top,
              paddingBottom: MODAL_CONTAINER_PADDING + insets.bottom
            }
          ]}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.title}>{title}</View>
              {closeModal && (
                <Pressable
                  onPressIn={onPressIn}
                  onPress={onPressClose}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={Colors.textPrimary}
                  />
                </Pressable>
              )}
            </View>
            <ScrollView style={styles.body}>{children}</ScrollView>
            {buttons && <View style={styles.footer}>{buttons}</View>}
          </View>
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
