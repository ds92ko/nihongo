import { useSettingContext } from '@/stores/useSettingStore';
import { useAudioPlayer } from 'expo-audio';
import { useCallback } from 'react';

const useFeedbackAudio = () => {
  const { soundEffectOff } = useSettingContext();
  const player = useAudioPlayer();

  const playFeedbackAudio = useCallback(
    (feedback: 'correct' | 'incorrect') => {
      if (soundEffectOff) return;

      const source = {
        correct: require('@/assets/audio/effects/correct.mp3'),
        incorrect: require('@/assets/audio/effects/incorrect.mp3')
      };

      try {
        player.replace(source[feedback]);
        player.play();
      } catch (err) {
        console.error(err);
      }
    },
    [player, soundEffectOff]
  );

  return { playFeedbackAudio };
};

export default useFeedbackAudio;
