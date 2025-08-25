import { Stack } from 'expo-router';

export default function TestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
