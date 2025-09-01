import { Text } from '@/components/common';
import Dialog from '@/components/common/Dialog';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const [loaded] = useFonts({
    'PyeojinGothic-Regular': require('@/assets/fonts/PyeojinGothic-Regular.ttf'),
    'PyeojinGothic-Medium': require('@/assets/fonts/PyeojinGothic-Medium.ttf'),
    'PyeojinGothic-Bold': require('@/assets/fonts/PyeojinGothic-Bold.ttf'),
    'Cafe24Meongi-B': require('@/assets/fonts/Cafe24Meongi-B.ttf')
  });

  if (!loaded) return null;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <Dialog />
      <Toast
        config={{
          success: ({ text1, text2 }) => (
            <View style={[styles.toast, styles.success]}>
              <Ionicons
                name="checkmark-circle-outline"
                size={30}
                color={Colors.success}
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
          ),
          error: ({ text1, text2 }) => (
            <View style={[styles.toast, styles.error]}>
              <Ionicons
                name="close-circle-outline"
                size={30}
                color={Colors.error}
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
          ),
          warning: ({ text1, text2 }) => (
            <View style={[styles.toast, styles.warning]}>
              <Text
                weight={700}
                variant="caption"
                color="warning"
              >
                {text1}
              </Text>
              <Text variant="caption">{text2}</Text>
            </View>
          ),
          info: ({ text1, text2 }) => (
            <View style={[styles.toast, styles.info]}>
              <Text
                weight={700}
                variant="caption"
                color="info"
              >
                {text1}
              </Text>
              <Text variant="caption">{text2}</Text>
            </View>
          )
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  toast: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 6
  },
  toastContent: {
    flex: 1,
    gap: 4
  },
  success: {
    backgroundColor: Colors.successLight
  },
  error: {
    backgroundColor: Colors.errorLight
  },
  warning: {
    backgroundColor: Colors.warningLight
  },
  info: {
    backgroundColor: Colors.infoLight
  }
});
