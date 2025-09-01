import { ReactNode } from 'react';

export interface ModalProps {
  visible: boolean;
  closeModal?: () => void;
  title: ReactNode;
  children: ReactNode;
  buttons?: ReactNode[];
}
