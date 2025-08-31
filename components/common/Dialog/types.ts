export interface DialogContext {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  contents: string[];
  cancel?: {
    label?: string;
  };
  confirm?: {
    label?: string;
    onPress: () => void;
  };
}

export interface DialogProps extends DialogContext {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
