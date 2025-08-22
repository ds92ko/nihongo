import KanaCanvas from '@/components/KanaCanvas';
import KanaList from '@/components/KanaList';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { KanaTabType } from '@/types/kana';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function KanaScreen() {
  const { kanaType } = useKanaContext();
  const { chart, kana } = useLocalSearchParams<{ chart: KanaTabType; kana: string }>();
  const row = KANA_TABS[kanaType].flatMap(tab => tab.rows).find(row => row.kana.includes(kana));

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {row && (
          <KanaList
            data={[row]}
            chart={chart}
            kana={kana}
          />
        )}
      </View>
      <KanaCanvas kana={kana} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    gap: 16
  },
  rowContent: {
    gap: 8
  }
});
