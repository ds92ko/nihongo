import KanaHeader from '@/components/KanaHeader';
import { Stack } from 'expo-router';

export default function KatakanaLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[character]"
        options={{
          header: props => (
            <KanaHeader
              {...props}
              type="katakana"
            />
          ),
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
}
