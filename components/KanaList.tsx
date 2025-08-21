import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KanaRow, KanaType } from '@/types/kana';
import { Link } from 'expo-router';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface KanaListProps {
  data: KanaRow[];
  type: KanaType;
  character?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const KanaList = ({ data, type, character, contentContainerStyle }: KanaListProps) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={true}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={contentContainerStyle}
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
          {item.kana.map((kana, j) => (
            <Link
              key={j}
              style={[
                styles.cell,
                !kana && styles.emptyCell,
                kana === character && styles.activeCell
              ]}
              href={{ pathname: `/${type}/[character]`, params: { character: kana } }}
            >
              <Text
                weight={kana === character ? 700 : 500}
                variant="body2"
                color={kana === character ? 'textPrimary' : 'textSecondary'}
              >
                {kana}
              </Text>
            </Link>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
