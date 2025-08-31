import { INNER_WIDTH, THUMB_SIZE } from '@/components/common/KanaToggle/constants';
import { styles } from '@/components/common/KanaToggle/styles';
import { Colors } from '@/constants/Colors';
import SoundManager from '@/managers/SoundManager';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

const KanaToggle = () => {
  const { kanaType } = useKanaContext();
  const { setKanaType } = useKanaActions();
  const [animValue] = useState(new Animated.Value(kanaType === 'hiragana' ? 0 : 1));

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, INNER_WIDTH - THUMB_SIZE],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: kanaType === 'hiragana' ? 0 : 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [kanaType, animValue]);

  return (
    <Pressable
      style={styles.track}
      onPress={() => {
        SoundManager.playClick();
        setKanaType();
      }}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }]
          }
        ]}
      />
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="syllabary-hiragana"
          size={20}
          color={kanaType === 'hiragana' ? Colors.primary : Colors.white}
        />
      </View>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="syllabary-katakana"
          size={20}
          color={kanaType === 'katakana' ? Colors.primary : Colors.white}
        />
      </View>
    </Pressable>
  );
};

export default KanaToggle;
