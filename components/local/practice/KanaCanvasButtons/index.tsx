import { IconButton } from '@/components/common';
import {
  useAutoRestart,
  useKanaCanvasButtons
} from '@/components/local/practice/KanaCanvasButtons/hooks';
import { styles } from '@/components/local/practice/KanaCanvasButtons/styles';
import { useState } from 'react';
import { View } from 'react-native';

const KanaCanvasButtons = () => {
  const [autoDelete, setAutoDelete] = useState(true);
  const { buttons, onRestart } = useKanaCanvasButtons({ autoDelete, setAutoDelete });

  useAutoRestart({ autoDelete, onRestart });

  return (
    <View style={styles.buttons}>
      {buttons.map(({ icon, ...props }) => (
        <IconButton
          key={`${icon.type}-${icon.name}`}
          icon={icon}
          {...props}
        />
      ))}
    </View>
  );
};

export default KanaCanvasButtons;
