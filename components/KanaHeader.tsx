import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { KanaType } from '@/types/kana';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';

interface Props extends NativeStackHeaderProps {
  type: KanaType;
}

const KanaHeader = ({ navigation, route, type }: Props) => {
  const { character } = route.params as { character: string };
  const [isSpeaking, setIsSpeaking] = useState(false);

  const onBackPress = () => navigation.navigate('index');

  const onSpeakPress = () => {
    if (isSpeaking) return;

    setIsSpeaking(true);
    Speech.speak(character, {
      language: 'ja-JP',
      voice: 'Google 日本語',
      pitch: 1.0,
      rate: 1.0,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable
          style={styles.button}
          onPress={onBackPress}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={Colors.textPrimary}
          />
        </Pressable>
        <View style={styles.character}>
          <Text
            weight={700}
            variant="h3"
          >
            {character}
          </Text>
          <Text
            variant="body1"
            color="textSecondary"
          >
            [{KANA_TO_ROMAJI[type][character]}]
          </Text>
        </View>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: isSpeaking ? Colors.neutralLight : Colors.white }
          ]}
          onPress={onSpeakPress}
          disabled={isSpeaking}
        >
          <Ionicons
            name="volume-medium"
            size={20}
            color={Colors.textPrimary}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: 16
  },
  character: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8
  }
});

export default KanaHeader;
