import { Button, Text } from '@/components/common';
import { styles } from '@/components/local/practice/KanaList/styles';
import { KanaListProps } from '@/components/local/practice/KanaList/types';
import { FlatList, View } from 'react-native';

const KanaList = ({ data, kana }: KanaListProps) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
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
            <Button
              key={j}
              href={{ pathname: '/practice/[kana]', params: { kana: k } }}
              disabled={!k}
              style={!k && styles.emptyCell}
              variant="primary10"
              active={k === kana}
              fill
            >
              {k}
            </Button>
          ))}
        </View>
      )}
    />
  );
};

export default KanaList;
