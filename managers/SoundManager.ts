import useSettingStore from '@/stores/useSettingStore';
import { createAudioPlayer } from 'expo-audio';

class SoundManager {
  private static clickPlayer = createAudioPlayer(require('@/assets/audio/effects/click.mp3'));
  private static correctPlayer = createAudioPlayer(require('@/assets/audio/effects/correct.mp3'));
  private static incorrectPlayer = createAudioPlayer(
    require('@/assets/audio/effects/incorrect.mp3')
  );

  private static async play(player: ReturnType<typeof createAudioPlayer>) {
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
