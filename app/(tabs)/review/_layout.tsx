import QuizHeader from '@/components/QuizHeader';
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
          header: () => <QuizHeader />
        }}
      />
    </Stack>
  );
}
