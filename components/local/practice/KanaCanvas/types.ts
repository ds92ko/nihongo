import { ReactNode, SetStateAction } from 'react';

export type Point = { x: number; y: number };

export type Paths = Point[][];

export interface KanaCanvasProps {
  kana: string;
}

export interface KanaCanvasContextType {
  kana: string;
  playKanaAudio: (kana: string) => void;
  playing: boolean;
  paths: Paths;
  setPaths: (paths: SetStateAction<Paths>) => void;
  panResponderEnded: boolean;
  setPanResponderEnded: (ended: SetStateAction<boolean>) => void;
  restartTrigger: number;
  setRestartTrigger: (trigger: SetStateAction<number>) => void;
}

export interface KanaCanvasProviderProps {
  kana: string;
  playKanaAudio: (kana: string) => void;
  playing: boolean;
  children: ReactNode;
}
