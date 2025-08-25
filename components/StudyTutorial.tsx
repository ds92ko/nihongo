import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const modalContent = [
  '먼저, 테스트를 진행할 행을 선택합니다.',
  '문자 테스트는 제시된 문자의 발음을 맞히는 방식이고, 발음 테스트는 제시된 발음의 문자를 맞히는 방식입니다. 원하는 방식을 선택해 테스트를 진행하세요.'
];

const StudyTutorial = () => {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title={
        <>
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
        </>
      }
      buttons={[
        <Pressable
          key="close1"
          style={[styles.button]}
          onPress={() => setStep(prev => Math.max(prev - 1, 0))}
        >
          <Text
            weight={500}
            variant="body2"
          >
            이전
          </Text>
        </Pressable>,
        <Pressable
          key="close2"
          style={[styles.button]}
          onPress={() => setStep(prev => Math.min(prev + 1, modalContent.length - 1))}
        >
          <Text
            weight={500}
            variant="body2"
          >
            다음
          </Text>
        </Pressable>
      ]}
    >
      <Text variant="body2">{modalContent[step]}</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
  disabledButton: {
    backgroundColor: Colors.primary10
  }
});

export default StudyTutorial;
