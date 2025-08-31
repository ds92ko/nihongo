import {
  KanaCanvasContextType,
  KanaCanvasProviderProps,
  Paths
} from '@/components/local/practice/KanaCanvas/types';
import { createContext, useContext, useState } from 'react';

const KanaCanvasContext = createContext<KanaCanvasContextType | undefined>(undefined);

export const KanaCanvasProvider = ({
  kana,
  playKanaAudio,
  playing,
  children
}: KanaCanvasProviderProps) => {
  const [paths, setPaths] = useState<Paths>([]);
  const [panResponderEnded, setPanResponderEnded] = useState(false);
  const [restartTrigger, setRestartTrigger] = useState(0);

  return (
    <KanaCanvasContext.Provider
      value={{
        kana,
        playKanaAudio,
        playing,
        paths,
        setPaths,
        panResponderEnded,
        setPanResponderEnded,
        restartTrigger,
        setRestartTrigger
      }}
    >
      {children}
    </KanaCanvasContext.Provider>
  );
};

export const useKanaCanvasContext = () => {
  const context = useContext(KanaCanvasContext);
  if (!context) throw new Error('useKanaCanvasContext must be used within KanaCanvasProvider');
  return context;
};
