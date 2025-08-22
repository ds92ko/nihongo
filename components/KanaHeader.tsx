import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { audioMap } from '@/assets/audio';
import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { KanaType } from '@/types/kana';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';
import { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
interface Props extends NativeStackHeaderProps {
  type: KanaType;
}

const KanaHeader = ({ navigation, route, type }: Props) => {
  const { character } = route.params as { character: string };
  const [isPlaying, setIsPlaying] = useState(false);

  const onBackPress = () => navigation.navigate('index');

  const onSpeakPress = async () => {
    if (isPlaying) return;

    try {
      const romaji = KANA_TO_ROMAJI[type][character];
      const sound = new Audio.Sound();
      const source = audioMap[romaji];

      await sound.loadAsync(source);
      setIsPlaying(true);

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(status => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    } catch (err) {
      console.error(err);
      Alert.alert('오디오 파일을 찾을 수 없습니다.');
      setIsPlaying(false);
    }
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
            { backgroundColor: isPlaying ? Colors.neutralLight : Colors.white }
          ]}
          onPress={onSpeakPress}
          disabled={isPlaying}
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
