import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({
    'PyeojinGothic-Regular': require('@/assets/fonts/PyeojinGothic-Regular.ttf'),
    'PyeojinGothic-Medium': require('@/assets/fonts/PyeojinGothic-Medium.ttf'),
    'PyeojinGothic-Bold': require('@/assets/fonts/PyeojinGothic-Bold.ttf'),
    'Cafe24Meongi-B': require('@/assets/fonts/Cafe24Meongi-B.ttf')
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
