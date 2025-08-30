import kanaMap from '@/assets/paths';
import { IconButton } from '@/components/common';
import { styles } from '@/components/local/practice/KanaCanvas/styles';
import { KanaCanvasProps, Paths } from '@/components/local/practice/KanaCanvas/types';
import KanaSvg from '@/components/local/practice/KanaSvg';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import useVoiceAudio from '@/hooks/useVoiceAudio';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import { useStatsActions } from '@/stores/useStatsStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const KanaCanvas = ({ kana }: KanaCanvasProps) => {
  const { kanaType, isVisibleGrid } = useKanaContext();
  const { setIsVisibleGrid } = useKanaActions();
  const { playKanaAudio, playing } = useKanaAudio();
  const { playPopAudio, popPlayerStatus } = usePopAudio();
  const {
    audioRecorder,
    recorderState,
    playerStatus,
    startRecording,
    stopRecording,
    playVoice,
    pauseVoice
  } = useVoiceAudio({
    playPopAudio,
    popPlayerStatus
  });
  const { setPracticeStats } = useStatsActions();
  const firstRender = useRef(true);
  const [restartTrigger, setRestartTrigger] = useState(0);
  const [paths, setPaths] = useState<Paths>([]);
  const [panResponderEnded, setPanResponderEnded] = useState(false);
  const [autoDelete, setAutoDelete] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => {
        const { locationX, locationY } = e.nativeEvent;
        setPaths(prev => [...prev, [{ x: locationX, y: locationY }]]);
      },
      onPanResponderMove: e => {
        const { locationX, locationY } = e.nativeEvent;
        setPaths(prev => {
          const lastPath = prev.at(-1);
          if (lastPath) {
            lastPath.push({ x: locationX, y: locationY });
            return [...prev.slice(0, -1), lastPath];
          }
          return prev;
        });
      },
      onPanResponderStart: () => setPanResponderEnded(false),
      onPanResponderEnd: () => setPanResponderEnded(true)
    })
  ).current;

  const handlePlay = useCallback(() => {
    playKanaAudio(kana);
    setPracticeStats(kanaType, 'listening', kana);
  }, [kana, kanaType, playKanaAudio, setPracticeStats]);

  const handleRestart = useCallback(() => {
    handlePlay();
    setRestartTrigger(prev => prev + 1);
    setPaths([]);
  }, [handlePlay]);

  const buttons = [
    {
      icon: { type: 'material', name: `grid-${isVisibleGrid ? 'on' : 'off'}` },
      onPress: () => {
        playPopAudio();
        setIsVisibleGrid();
      }
    },
    {
      icon: { type: 'material', name: recorderState.isRecording ? 'record-voice-over' : 'mic' },
      onPress: recorderState.isRecording ? stopRecording : startRecording,
      disabled: playing || playerStatus.playing
    },
    {
      icon: { type: 'material', name: playerStatus.playing ? 'multitrack-audio' : 'voicemail' },
      onPress: playerStatus.playing ? pauseVoice : playVoice,
      disabled: playing || !audioRecorder.uri || !playerStatus.isLoaded || recorderState.isRecording
    },
    {
      icon: { type: 'material', name: `headset${playing ? '-off' : ''}` },
      onPress: handlePlay,
      disabled: playing || recorderState.isRecording || playerStatus.playing
    },
    {
      icon: { type: 'material', name: `play-${playing ? 'disabled' : 'arrow'}` },
      onPress: handleRestart,
      disabled: playing || recorderState.isRecording || playerStatus.playing
    },
    {
      icon: {
        type: 'material-community',
        name: `delete-${autoDelete ? 'clock-outline' : paths.length ? 'outline' : 'off-outline'}`
      },
      onPress: () => {
        if (autoDelete) {
          setAutoDelete(false);
          return;
        }
        if (!paths.length) {
          setAutoDelete(true);
          return;
        }
        playPopAudio();
        setPaths([]);
      }
    }
  ] as const;

  useEffect(() => {
    const pathLength = [...kana].flatMap(char => kanaMap[char] || []).length;

    if (pathLength !== paths.length) return;
    if (autoDelete && panResponderEnded) handleRestart();
    setPracticeStats(kanaType, 'writing', kana);
  }, [
    kanaType,
    kana,
    paths.length,
    setPracticeStats,
    autoDelete,
    playPopAudio,
    panResponderEnded,
    handlePlay,
    handleRestart
  ]);

  useEffect(() => {
    if (firstRender.current) {
      playKanaAudio(kana, true);
      firstRender.current = false;
    }
  }, [kana, playKanaAudio]);

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <View
          style={[
            styles.cross,
            {
              opacity: isVisibleGrid ? 1 : 0
            }
          ]}
        >
          <View style={styles.crossLineHorizontal} />
          <View style={styles.crossLineVertical} />
        </View>
        <View style={styles.hint}>
          <KanaSvg
            kana={kana}
            restartTrigger={restartTrigger}
          />
        </View>
        <View
          style={styles.canvas}
          {...panResponder.panHandlers}
        >
          <Svg
            width="100%"
            height="100%"
          >
            {paths.map((p, i) => {
              const d = p
                .map((point, j) =>
                  j === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
                )
                .join(' ');

              return (
                <Path
                  key={`path-${i}`}
                  d={d}
                  stroke={Colors.textPrimary}
                  strokeWidth={15}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              );
            })}
          </Svg>
        </View>
      </View>
      <View style={styles.buttons}>
        {buttons.map(({ icon, ...props }) => (
          <IconButton
            key={`${icon.type}-${icon.name}`}
            icon={icon}
            {...props}
          />
        ))}
      </View>
    </View>
  );
};

export default KanaCanvas;
