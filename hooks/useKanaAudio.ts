import { audioMap } from '@/assets/audio';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import { Audio } from 'expo-av';
import { useCallback } from 'react';

const useKanaAudio = () => {
  const { kanaType, isPlayingAudio } = useKanaContext();
  const { setIsPlayingAudio } = useKanaActions();

  const playKanaAudio = useCallback(
    async (kana: string) => {
      if (isPlayingAudio) return;

      try {
        const romaji = KANA_TO_ROMAJI[kanaType][kana];
        const sound = new Audio.Sound();
        const source = audioMap[romaji];

        await sound.loadAsync(source);

        setIsPlayingAudio(true);
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate(status => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            setIsPlayingAudio(false);
            sound.unloadAsync();
          }
        });
      } catch (err) {
        console.error(err);
        setIsPlayingAudio(false);
      }
    },
    [kanaType, isPlayingAudio, setIsPlayingAudio]
  );

  return { playKanaAudio };
};

export default useKanaAudio;
