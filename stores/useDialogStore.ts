import { Status } from '@/types/status';
import { create } from 'zustand';

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

interface DialogStore {
  context: DialogContext;
  actions: DialogActions;
}

const useDialogStore = create<DialogStore>(set => ({
  context: {
    dialog: null
  },
  actions: {
    openDialog: dialog => set({ context: { dialog: { ...dialog, visible: true } } }),
    closeDialog: () => set({ context: { dialog: null } })
  }
}));

export const useDialogContext = () => useDialogStore(({ context }) => context);
export const useDialogActions = () => useDialogStore(({ actions }) => actions);
