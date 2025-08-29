import { KanaHeader } from '@/components/local/practice';
import { Stack } from 'expo-router';

export default function PracticeLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none'
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="[kana]"
        options={{
          header: props => <KanaHeader {...props} />
        }}
      />
    </Stack>
  );
}
