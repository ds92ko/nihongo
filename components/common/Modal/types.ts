import { ReactNode } from 'react';

export interface ModalProps {
  visible: boolean;
  setVisible?: (visible: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  buttons?: ReactNode[];
}
