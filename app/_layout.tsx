import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({
    'PyeojinGothic-Light': require('@/assets/fonts/PyeojinGothic-Light.ttf'),
    'PyeojinGothic-Regular': require('@/assets/fonts/PyeojinGothic-Regular.ttf'),
    'PyeojinGothic-Medium': require('@/assets/fonts/PyeojinGothic-Medium.ttf'),
    'PyeojinGothic-Bold': require('@/assets/fonts/PyeojinGothic-Bold.ttf'),
    'Cafe24Meongi-B': require('@/assets/fonts/Cafe24Meongi-B.ttf'),
    'Cafe24Meongi-W': require('@/assets/fonts/Cafe24Meongi-W.ttf')
  });

  if (!loaded) return null;

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
