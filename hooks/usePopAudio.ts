import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useCallback } from 'react';

const usePopAudio = () => {
  const { popSoundOff } = useSettingContext();
  const source = require('@/assets/audio/effects/pop.mp3');
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  const playPopAudio = useCallback(() => {
    if (popSoundOff) return;

    try {
      player.seekTo(0);
      player.play();
    } catch (err) {
      console.error(err);
    }
  }, [player, popSoundOff]);

  return { playPopAudio, popPlayerStatus: status };
};

export default usePopAudio;
