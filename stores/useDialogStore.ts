import { DialogStore } from '@/types/dialog';
import { create } from 'zustand';

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
