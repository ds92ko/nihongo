import KanaList from '@/components/KanaList';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { KanaTabType } from '@/types/kana';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function ChartScreen() {
  const { kanaType } = useKanaContext();
  const { chart } = useLocalSearchParams<{ chart: KanaTabType }>();

  const data = KANA_TABS[kanaType].find(t => t.key === chart)?.rows ?? [];

  return (
    <View style={styles.container}>
      <KanaList
        data={data}
        chart={chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
});
