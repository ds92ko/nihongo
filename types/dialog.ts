import { Status } from '@/types/status';

interface Dialog {
  visible: boolean;
  variant: Status;
  title: string;
  contents: string[];
  cancel?: {
    label?: string;
    onPress?: () => void;
  };
  confirm?: {
    label?: string;
    onPress?: () => void;
  };
}

interface DialogContext {
  dialog: Dialog | null;
}

interface DialogActions {
  openDialog: (dialog: Omit<Dialog, 'visible'>) => void;
  closeDialog: () => void;
}

export interface DialogStore {
  context: DialogContext;
  actions: DialogActions;
}
