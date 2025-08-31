import { Modal, Text } from '@/components/common';
import { useKanaCanvasContext } from '@/components/local/practice/KanaCanvas/provider';
import { RECORDING_DURATION } from '@/components/local/practice/KanaCanvasButtons/constants';
import { styles } from '@/components/local/practice/KanaPronunciationModal/styles';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const KanaPronunciationModal = () => {
  const { kana } = useKanaCanvasContext();
  const animation = useRef(new Animated.Value(1)).current;
  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: RECORDING_DURATION,
      useNativeDriver: false
    }).start();
  }, [animation]);

  return (
    <Modal
      visible={true}
      title={
        <>
          <MaterialIcons
            name="record-voice-over"
            size={24}
            color={Colors.info}
          />
          <Text weight={700}>{kana} 음절을 발음해보세요.</Text>
        </>
      }
    >
      <View style={styles.bar}>
        <Animated.View style={[styles.progress, { width }]} />
      </View>
    </Modal>
  );
};

export default KanaPronunciationModal;
