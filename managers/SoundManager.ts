import useSettingStore from '@/stores/useSettingStore';
import { createAudioPlayer } from 'expo-audio';

class SoundManager {
  private static clickPlayer =
    typeof window !== 'undefined'
      ? createAudioPlayer(require('@/assets/audio/effects/click.mp3'))
      : null;

  private static correctPlayer =
    typeof window !== 'undefined'
      ? createAudioPlayer(require('@/assets/audio/effects/correct.mp3'))
      : null;

  private static incorrectPlayer =
    typeof window !== 'undefined'
      ? createAudioPlayer(require('@/assets/audio/effects/incorrect.mp3'))
      : null;

  private static async play(player: ReturnType<typeof createAudioPlayer> | null) {
    if (!player) return;
    const soundEffectOff = useSettingStore.getState().context.soundEffectOff;
    if (soundEffectOff) return;

    await player.seekTo(0);
    player.play();
  }

  static playClick() {
    return this.play(this.clickPlayer);
  }

  static playCorrect() {
    return this.play(this.correctPlayer);
  }

  static playIncorrect() {
    return this.play(this.incorrectPlayer);
  }
}

export default SoundManager;
