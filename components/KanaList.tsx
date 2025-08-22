import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import useKanaAudio from '@/hooks/useKanaAudio';
import { KanaRow } from '@/types/kana';
import { Link } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

interface KanaListProps {
  data: KanaRow[];
  kana?: string;
}

const KanaList = ({ data, kana }: KanaListProps) => {
  const { playKanaAudio } = useKanaAudio();

  return (
    <FlatList
      data={data}
      scrollEnabled={data.length > 1}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={data.length > 1 && styles.rows}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.labelCell}>
            <Text
              weight={700}
              variant="caption"
            >
              {item.label}
            </Text>
          </View>
          {item.kana.map((k, j) => (
            <Link
              key={j}
              style={[styles.cell, !k && styles.emptyCell, k === kana && styles.activeCell]}
              href={{ pathname: '/chart/[kana]', params: { kana: k } }}
              onPress={() => playKanaAudio(k)}
            >
              <Text
                weight={k === kana ? 700 : 500}
                variant="body2"
                color={k === kana ? 'textPrimary' : 'textSecondary'}
              >
                {k}
              </Text>
            </Link>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  rows: {
    padding: 16,
    backgroundColor: Colors.white,
    gap: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  labelCell: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cell: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: Colors.primary10
  },
  activeCell: {
    backgroundColor: Colors.primary30
  },
  emptyCell: {
    backgroundColor: Colors.white
  }
});

export default KanaList;
