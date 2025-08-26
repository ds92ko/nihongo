import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer } from 'expo-audio';
import { useCallback } from 'react';

const usePopAudio = () => {
  const { popSoundOff } = useSettingContext();
  const source = require('@/assets/audio/pop.mp3');
  const player = useAudioPlayer(source);

  const playPopAudio = useCallback(() => {
    if (popSoundOff) return;

    try {
      player.seekTo(0);
      player.play();
    } catch (err) {
      console.error(err);
    }
  }, [player, popSoundOff]);

  return { playPopAudio };
};

export default usePopAudio;
