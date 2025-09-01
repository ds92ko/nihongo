import { KanaCanvas, KanaList } from '@/components/local/practice';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function KanaScreen() {
  const insets = useSafeAreaInsets();
  const { kanaType } = useKanaContext();
  const { kana } = useLocalSearchParams<{ kana: string }>();
  const row = KANA_TABS[kanaType].flatMap(tab => tab.rows).find(row => row.kana.includes(kana));

  return (
    <View style={[styles.safe, { paddingBottom: insets.bottom }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  },
  rowContent: {
    gap: 8
  }
});
