import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer } from 'expo-audio';
import { useCallback } from 'react';

const useFeedbackAudio = () => {
  const { popSoundOff } = useSettingContext();
  const player = useAudioPlayer();

  const playFeedbackAudio = useCallback(
    (feedback: 'correct' | 'incorrect') => {
      if (popSoundOff) return;

      const source = {
        correct: require('@/assets/audio/correct.mp3'),
        incorrect: require('@/assets/audio/incorrect.mp3')
      };

      try {
        player.replace(source[feedback]);
        player.play();
      } catch (err) {
        console.error(err);
      }
    },
    [player, popSoundOff]
  );

  return { playFeedbackAudio };
};

export default useFeedbackAudio;
