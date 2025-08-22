import { audioMap } from '@/assets/audio';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import { useSettingContext } from '@/stores/useSettingStore';
import { Audio } from 'expo-av';
import { useCallback } from 'react';

const useKanaAudio = () => {
  const { popSoundOff, kanaSoundOff } = useSettingContext();
  const { kanaType, isPlayingAudio } = useKanaContext();
  const { setIsPlayingAudio } = useKanaActions();

  const playSound = useCallback(async (sound: Audio.Sound) => {
    return new Promise<void>((resolve, reject) => {
      sound.setOnPlaybackStatusUpdate(status => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          sound.unloadAsync().finally(() => resolve());
        }
      });
      sound.playAsync().catch(reject);
    });
  }, []);

  const playKanaAudio = useCallback(
    async (kana: string) => {
      if (isPlayingAudio) return;

      const romaji = KANA_TO_ROMAJI[kanaType][kana];
      const source = audioMap[romaji];

      try {
        setIsPlayingAudio(true);

        if (!popSoundOff) {
          const popSound = new Audio.Sound();
          await popSound.loadAsync(require('@/assets/audio/pop.mp3'));
          await playSound(popSound);
        }

        if (!kanaSoundOff) {
          const kanaSound = new Audio.Sound();
          await kanaSound.loadAsync(source);
          await playSound(kanaSound);
        }

        setIsPlayingAudio(false);
      } catch (err) {
        console.error(err);
        setIsPlayingAudio(false);
      }
    },
    [kanaType, isPlayingAudio, setIsPlayingAudio, playSound, popSoundOff, kanaSoundOff]
  );

  return { playKanaAudio };
};

export default useKanaAudio;
