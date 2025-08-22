import KanaHeader from '@/components/KanaHeader';
import { Stack } from 'expo-router';

export default function ChartLayout() {
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
