import StudyHeader from '@/components/StudyHeader';
import { Stack } from 'expo-router';

export default function TestLayout() {
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
        name="study"
        options={{
          header: () => <StudyHeader />
        }}
      />
    </Stack>
  );
}
