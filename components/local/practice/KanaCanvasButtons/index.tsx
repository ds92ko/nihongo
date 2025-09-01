import { IconButton } from '@/components/common';
import {
  useAutoRestart,
  useKanaCanvasButtons
} from '@/components/local/practice/KanaCanvasButtons/hooks';
import { styles } from '@/components/local/practice/KanaCanvasButtons/styles';
import KanaPronunciationModal from '@/components/local/practice/KanaPronunciationModal';
import { View } from 'react-native';

const KanaCanvasButtons = () => {
  const { buttons, onRestart, isRecording } = useKanaCanvasButtons();
  useAutoRestart({ onRestart });

  return (
    <>
      <View style={styles.buttons}>
        {buttons.map(({ icon, ...props }) => (
          <IconButton
            key={`${icon.type}-${icon.name}`}
            icon={icon}
            {...props}
          />
        ))}
      </View>
      {isRecording && <KanaPronunciationModal />}
    </>
  );
};

export default KanaCanvasButtons;
