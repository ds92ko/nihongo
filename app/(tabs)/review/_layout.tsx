import { QuizHeader } from '@/components/local/review';
import { Stack } from 'expo-router';

export default function ReviewLayout() {
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
        name="quiz"
        options={{
          header: QuizHeader
        }}
      />
    </Stack>
  );
}
