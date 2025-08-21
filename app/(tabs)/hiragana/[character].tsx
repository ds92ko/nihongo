import KanaCanvas from '@/components/KanaCanvas';
import KanaList from '@/components/KanaList';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function KanaScreen() {
  const { character }: { character: string } = useLocalSearchParams();
  const row = KANA_TABS.hiragana.flatMap(tab => tab.rows).find(row => row.kana.includes(character));

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {row && (
          <KanaList
            data={[row]}
            type="hiragana"
            character={character}
          />
        )}
      </View>
      <KanaCanvas character={character} />
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
