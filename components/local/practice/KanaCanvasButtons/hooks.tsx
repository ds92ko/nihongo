import kanaMap from '@/assets/paths';
import { useKanaCanvasContext } from '@/components/local/practice/KanaCanvas/provider';
import { RECORDING_DURATION } from '@/components/local/practice/KanaCanvasButtons/constants';
import {
  UseAutoRestart,
  UseKanaCanvasButtons
} from '@/components/local/practice/KanaCanvasButtons/types';
import useVoiceAudio from '@/hooks/useVoiceAudio';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import { useStatsActions } from '@/stores/useStatsStore';
import { useCallback, useEffect } from 'react';

export const useKanaCanvasButtons = ({ autoDelete, setAutoDelete }: UseKanaCanvasButtons) => {
  const { kana, paths, setPaths, setRestartTrigger, playKanaAudio, playing } =
    useKanaCanvasContext();
  const { kanaType, isVisibleGrid } = useKanaContext();
  const { setIsVisibleGrid } = useKanaActions();
  const {
    audioRecorder,
    recorderState,
    playerStatus,
    startRecording,
    stopRecording,
    playVoice,
    pauseVoice
  } = useVoiceAudio(RECORDING_DURATION);
  const { setPracticeStats } = useStatsActions();

  const onRecord = () => {
    startRecording();
    setPracticeStats(kanaType, 'speaking', kana);
  };

  const onPlay = useCallback(() => {
    playKanaAudio(kana);
    setPracticeStats(kanaType, 'listening', kana);
  }, [kana, kanaType, playKanaAudio, setPracticeStats]);

  const onRestart = useCallback(() => {
    onPlay();
    setRestartTrigger(prev => prev + 1);
    setPaths([]);
    setPracticeStats(kanaType, 'reading', kana);
  }, [kana, kanaType, onPlay, setPaths, setPracticeStats, setRestartTrigger]);

  const buttons = [
    {
      icon: { type: 'material', name: `grid-${isVisibleGrid ? 'on' : 'off'}` },
      onPress: setIsVisibleGrid
    },
    {
      icon: { type: 'material', name: recorderState.isRecording ? 'record-voice-over' : 'mic' },
      onPress: recorderState.isRecording ? stopRecording : onRecord,
      disabled: playing || playerStatus.playing,
      effect: false
    },
    {
      icon: { type: 'material', name: playerStatus.playing ? 'multitrack-audio' : 'voicemail' },
      onPress: playerStatus.playing ? pauseVoice : playVoice,
      disabled: playing || !audioRecorder.uri || !playerStatus.isLoaded || recorderState.isRecording
    },
    {
      icon: { type: 'material', name: `headset${playing ? '-off' : ''}` },
      onPress: onPlay,
      disabled: playing || recorderState.isRecording || playerStatus.playing
    },
    {
      icon: { type: 'material', name: `play-${playing ? 'disabled' : 'arrow'}` },
      onPress: onRestart,
      disabled: playing || recorderState.isRecording || playerStatus.playing
    },
    {
      icon: {
        type: 'material-community',
        name: `delete-${autoDelete ? 'clock-outline' : paths.length ? 'outline' : 'off-outline'}`
      },
      onPress: () => {
        if (autoDelete) return setAutoDelete(false);
        if (!paths.length) return setAutoDelete(true);
        setPaths([]);
      }
    }
  ] as const;

  return { buttons, onRestart, isRecording: recorderState.isRecording };
};

export const useAutoRestart = ({ autoDelete, onRestart }: UseAutoRestart) => {
  const { kana, paths, panResponderEnded } = useKanaCanvasContext();
  const { kanaType } = useKanaContext();
  const { setPracticeStats } = useStatsActions();

  useEffect(() => {
    const pathLength = [...kana].flatMap(char => kanaMap[char] || []).length;

    if (pathLength !== paths.length) return;
    if (autoDelete && panResponderEnded) onRestart();
    setPracticeStats(kanaType, 'writing', kana);
  }, [autoDelete, kana, kanaType, onRestart, panResponderEnded, paths.length, setPracticeStats]);
};
