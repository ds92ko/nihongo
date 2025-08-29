import { KanaCanvas, KanaList } from '@/components/local/practice';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function KanaScreen() {
  const { kanaType } = useKanaContext();
  const { kana } = useLocalSearchParams<{ kana: string }>();
  const row = KANA_TABS[kanaType].flatMap(tab => tab.rows).find(row => row.kana.includes(kana));

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {row && (
          <KanaList
            data={[row]}
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  rowContent: {
    gap: 8
  }
});
