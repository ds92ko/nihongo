import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useCallback } from 'react';

const usePopAudio = () => {
  const { soundEffectOff } = useSettingContext();
  const source = require('@/assets/audio/effects/pop.mp3');
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  const playPopAudio = useCallback(() => {
    if (soundEffectOff) return;

    try {
      player.seekTo(0);
      player.play();
    } catch (err) {
      console.error(err);
    }
  }, [player, soundEffectOff]);

  return { playPopAudio, popPlayerStatus: status };
};

export default usePopAudio;
