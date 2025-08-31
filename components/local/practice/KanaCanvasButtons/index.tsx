import { IconButton } from '@/components/common';
import {
  useAutoRestart,
  useKanaCanvasButtons
} from '@/components/local/practice/KanaCanvasButtons/hooks';
import { styles } from '@/components/local/practice/KanaCanvasButtons/styles';
import KanaPronunciationModal from '@/components/local/practice/KanaPronunciationModal';
import { useState } from 'react';
import { View } from 'react-native';

const KanaCanvasButtons = () => {
  const [autoDelete, setAutoDelete] = useState(true);
  const { buttons, onRestart, isRecording } = useKanaCanvasButtons({
    autoDelete,
    setAutoDelete
  });

  useAutoRestart({ autoDelete, onRestart });

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
