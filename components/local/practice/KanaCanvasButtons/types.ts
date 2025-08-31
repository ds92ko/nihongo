import { SetStateAction } from 'react';

export interface UseKanaCanvasButtons {
  autoDelete: boolean;
  setAutoDelete: (auto: SetStateAction<boolean>) => void;
}

export interface UseAutoRestart {
  autoDelete: boolean;
  onRestart: () => void;
}
