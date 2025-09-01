import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import { STATUS_ICON_MAP } from '@/constants/Status';
import { useDialogActions, useDialogContext } from '@/stores/useDialogStore';
import { Ionicons } from '@expo/vector-icons';

const Dialog = () => {
  const { dialog } = useDialogContext();
  const { closeDialog } = useDialogActions();

  if (!dialog) return null;

  return (
    <Modal
      visible={dialog.visible}
      closeModal={closeDialog}
      title={
        <>
          <Ionicons
            name={STATUS_ICON_MAP[dialog.variant]}
            size={24}
            color={Colors[dialog.variant]}
          />
          <Text weight={700}>{dialog.title}</Text>
        </>
      }
      buttons={[
        dialog.confirm ? (
          <Button
            key="cancel"
            variant={'neutralLight'}
            onPress={() => {
              closeDialog();
              dialog.cancel?.onPress?.();
            }}
            fill
          >
            {dialog.cancel?.label || '취소'}
          </Button>
        ) : null,
        <Button
          key="confirm"
          variant={dialog.variant}
          onPress={() => {
            closeDialog();
            dialog.confirm?.onPress?.();
          }}
          active
          fill
        >
          {dialog.confirm?.label || '확인'}
        </Button>
      ]}
    >
      {dialog.contents.map((content, index) => (
        <Text
          key={index}
          variant="body2"
        >
          {content}
        </Text>
      ))}
    </Modal>
  );
};

export default Dialog;
