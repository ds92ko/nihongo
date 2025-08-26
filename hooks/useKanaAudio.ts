import { kanaAudioMap } from '@/assets/audio/kana';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useCallback } from 'react';

const useKanaAudio = () => {
  const { playPopAudio } = usePopAudio();
  const { kanaSoundOff } = useSettingContext();
  const { kanaType } = useKanaContext();
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const playKanaAudio = useCallback(
    async (kana: string, auto?: boolean) => {
      if (status.playing) return;

      const romaji = KANA_TO_ROMAJI[kanaType][kana];
      const source = kanaAudioMap[romaji];

      try {
        if (!auto) playPopAudio();

        if (!kanaSoundOff) {
          player.replace(source);
          player.play();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [kanaType, playPopAudio, kanaSoundOff, player, status]
  );

  return { playKanaAudio, kanaPlayerStatus: status };
};

export default useKanaAudio;
