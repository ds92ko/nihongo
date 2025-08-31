import { KanaCanvasProvider } from '@/components/local/practice/KanaCanvas/provider';
import { styles } from '@/components/local/practice/KanaCanvas/styles';
import { KanaCanvasProps } from '@/components/local/practice/KanaCanvas/types';
import KanaCanvasButtons from '@/components/local/practice/KanaCanvasButtons';
import KanaDrawPad from '@/components/local/practice/KanaDrawPad';
import useKanaAudio from '@/hooks/useKanaAudio';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

const KanaCanvas = ({ kana }: KanaCanvasProps) => {
  const { playKanaAudio, playing } = useKanaAudio();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      playKanaAudio(kana);
      firstRender.current = false;
    }
  }, [kana, playKanaAudio]);

  return (
    <KanaCanvasProvider
      kana={kana}
      playKanaAudio={playKanaAudio}
      playing={playing}
    >
      <View style={styles.container}>
        <KanaDrawPad />
        <KanaCanvasButtons />
      </View>
    </KanaCanvasProvider>
  );
};

export default KanaCanvas;
