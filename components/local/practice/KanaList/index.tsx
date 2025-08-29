import { Text } from '@/components/common';
import { styles } from '@/components/local/practice/KanaList/styles';
import { KanaListProps } from '@/components/local/practice/KanaList/types';
import usePopAudio from '@/hooks/usePopAudio';
import { Link } from 'expo-router';
import { FlatList, View } from 'react-native';

const KanaList = ({ data, kana }: KanaListProps) => {
  const { playPopAudio } = usePopAudio();

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
            <Link
              key={j}
              style={[styles.cell, !k && styles.emptyCell, k === kana && styles.activeCell]}
              href={{ pathname: '/practice/[kana]', params: { kana: k } }}
              onPress={playPopAudio}
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

export default KanaList;
