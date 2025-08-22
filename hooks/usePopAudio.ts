import { useSettingContext } from '@/stores/useSettingStore';
import { Audio } from 'expo-av';
import { useCallback } from 'react';

const usePopAudio = () => {
  const { popSoundOff } = useSettingContext();
  const playPopAudio = useCallback(async () => {
    if (popSoundOff) return;

    const sound = new Audio.Sound();

    try {
      await sound.loadAsync(require('@/assets/audio/pop.mp3'));
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(status => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  }, [popSoundOff]);

  return { playPopAudio };
};

export default usePopAudio;
