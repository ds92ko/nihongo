import { kanaAudioMap } from '@/assets/audio/kana';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import { useKanaContext } from '@/stores/useKanaStore';
import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useCallback } from 'react';

const useKanaAudio = () => {
  const { kanaSoundOff } = useSettingContext();
  const { kanaType } = useKanaContext();
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const playKanaAudio = useCallback(
    async (kana: string) => {
      if (status.playing) return;

      const romaji = KANA_TO_ROMAJI[kanaType][kana];
      const source = kanaAudioMap[romaji];

      try {
        if (!kanaSoundOff) {
          player.replace(source);
          player.play();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [status.playing, kanaType, kanaSoundOff, player]
  );

  return { playKanaAudio, playing: status.playing };
};

export default useKanaAudio;
