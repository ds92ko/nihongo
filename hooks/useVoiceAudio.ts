import {
  AudioModule,
  AudioStatus,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState
} from 'expo-audio';
import { Alert, Linking } from 'react-native';

const useVoiceAudio = ({
  playPopAudio,
  popPlayerStatus
}: {
  playPopAudio: () => void;
  popPlayerStatus: AudioStatus;
}) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const audioPlayer = useAudioPlayer();
  const playerStatus = useAudioPlayerStatus(audioPlayer);

  const checkPermissions = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync();

    if (!status.granted) {
      Alert.alert('권한 필요', '녹음을 위해 마이크 접근 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        {
          text: '앱 설정 열기',
          onPress: () => {
            Linking.openSettings();
          }
        }
      ]);
      return false;
    }
    return true;
  };

  const recording = async () => {
    const hasPermission = await checkPermissions();
    if (!hasPermission) return;

    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true
    });
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const startRecording = () => {
    playPopAudio();
    setTimeout(recording, popPlayerStatus.duration * 5000);
  };

  const stopRecording = async () => {
    playPopAudio();
    await audioRecorder.stop();
    setAudioModeAsync({
      playsInSilentMode: false,
      allowsRecording: false
    });
    audioPlayer.replace(audioRecorder.uri);
  };

  const playVoice = () => {
    playPopAudio();
    audioPlayer.seekTo(0);
    audioPlayer.play();
  };

  const pauseVoice = () => {
    playPopAudio();
    audioPlayer.pause();
  };

  return {
    audioRecorder,
    recorderState,
    playerStatus,
    startRecording,
    stopRecording,
    playVoice,
    pauseVoice
  };
};

export default useVoiceAudio;
