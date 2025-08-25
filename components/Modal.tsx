import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Alert, Pressable, Modal as RNModal, ScrollView, StyleSheet, View } from 'react-native';

const Modal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>모달 열기</Text>
      </Pressable>
      <RNModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.title}>
                <Ionicons
                  name="bulb-outline"
                  size={20}
                  color={Colors.primary}
                />
                <Text
                  weight={700}
                  variant="body2"
                >
                  Tip!
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={Colors.textPrimary}
                />
              </Pressable>
            </View>
            <ScrollView style={styles.body}>
              <Text variant="body2">학습할 행을 선택하고 테스트를 시작하세요.</Text>
            </ScrollView>
            <View style={styles.footer}>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  weight={500}
                  variant="body2"
                >
                  닫기
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  weight={500}
                  variant="body2"
                >
                  닫기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.overlay
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
    flex: 1
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
