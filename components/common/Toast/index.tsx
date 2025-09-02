import Text from '@/components/common/Text';
import { TOAST_TOP_OFFSET, TOAST_VARIANTS, TOAST_WIDTH } from '@/components/common/Toast/constants';
import { styles } from '@/components/common/Toast/styles';
import { Colors } from '@/constants/Colors';
import { STATUS_ICON_MAP } from '@/constants/Status';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNToast, { ToastConfig } from 'react-native-toast-message';

const Toast = () => {
  const insets = useSafeAreaInsets();
  const config = TOAST_VARIANTS.reduce<ToastConfig>((acc, variant) => {
    acc[variant] = ({ text1, text2 }) => (
      <View
        style={[
          styles.toast,
          styles[variant],
          { width: TOAST_WIDTH, borderColor: Colors[variant] }
        ]}
      >
        <Ionicons
          name={STATUS_ICON_MAP[variant]}
          size={30}
          color={Colors[variant]}
        />
        <View>
          <Text
            weight={700}
            variant="caption"
          >
            {text1}
          </Text>
          <Text
            variant="caption"
            color="textSecondary"
          >
            {text2}
          </Text>
        </View>
      </View>
    );

    return acc;
  }, {});

  return (
    <RNToast
      config={config}
      topOffset={insets.top + TOAST_TOP_OFFSET}
    />
  );
};

export default Toast;
