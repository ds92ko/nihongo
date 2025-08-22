import KanaChartHeader from '@/components/KanaChartHeader';
import KanaHeader from '@/components/KanaHeader';
import { Stack } from 'expo-router';

export default function ChartLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <KanaChartHeader />
        }}
      />
      <Stack.Screen
        name="[kana]"
        options={{
          header: props => <KanaHeader {...props} />,
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
}
