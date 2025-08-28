import { Colors } from '@/constants/Colors';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

const WIDTH = 64;
const HEIGHT = 36;
const PADDING = 4;
const INNER_WIDTH = WIDTH - PADDING * 2;
const THUMB_SIZE = HEIGHT - PADDING * 2;

const KanaToggle = () => {
  const { kanaType } = useKanaContext();
  const { setKanaType } = useKanaActions();
  const { playPopAudio } = usePopAudio();
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
        playPopAudio();
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

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    padding: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    position: 'relative'
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    left: PADDING,
    top: PADDING,
    backgroundColor: Colors.white,
    zIndex: 10
  },
  icon: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 20
  }
});

export default KanaToggle;
