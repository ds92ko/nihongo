import Button from '@/components/common/Button';
import { DIALOG_ICON_MAP } from '@/components/common/Dialog/constants';
import { DialogProps } from '@/components/common/Dialog/types';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const Dialog = ({
  visible,
  setVisible,
  variant,
  title,
  contents,
  cancel,
  confirm
}: DialogProps) => {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      title={
        <>
          <Ionicons
            name={DIALOG_ICON_MAP[variant]}
            size={24}
            color={Colors[variant]}
          />
          <Text weight={700}>{title}</Text>
        </>
      }
      buttons={[
        confirm ? (
          <Button
            key="cancel"
            variant={'neutralLight'}
            onPress={() => setVisible(false)}
            fill
          >
            {cancel?.label || '취소'}
          </Button>
        ) : null,
        <Button
          key="confirm"
          variant={variant}
          onPress={() => {
            setVisible(false);
            confirm?.onPress();
          }}
          active
          fill
        >
          {confirm?.label || '확인'}
        </Button>
      ]}
    >
      {contents.map((content, index) => (
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
