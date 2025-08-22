import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaActions, useKanaContext } from '@/stores/useKanaStore';
import { KanaTabType } from '@/types/kana';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const KanaChartHeader = () => {
  const { chart } = useLocalSearchParams<{ chart: KanaTabType }>();
  const { kanaType } = useKanaContext();
  const { setKanaType } = useKanaActions();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {KANA_TABS[kanaType].map(tab => (
          <Link
            key={tab.key}
            href={{ pathname: '/[chart]', params: { chart: tab.key } }}
            style={[
              styles.tab,
              {
                backgroundColor: tab.key === chart ? Colors.white : Colors.primary10
              }
            ]}
          >
            <Text
              weight={tab.key === chart ? 700 : 500}
              variant="body2"
              color={tab.key === chart ? 'primary' : 'textSecondary'}
            >
              {tab.title}
            </Text>
          </Link>
        ))}
      </View>
      <Pressable
        style={styles.toggleButton}
        onPress={() => setKanaType()}
      >
        <MaterialCommunityIcons
          style={[
            styles.kanaIcon,
            {
              backgroundColor: kanaType === 'hiragana' ? Colors.white : Colors.primary10
            }
          ]}
          name="syllabary-hiragana"
          size={20}
          color={kanaType === 'hiragana' ? Colors.primary : Colors.textSecondary}
        />
        <MaterialCommunityIcons
          style={[
            styles.kanaIcon,
            {
              backgroundColor: kanaType === 'katakana' ? Colors.white : Colors.primary10
            }
          ]}
          name="syllabary-katakana"
          size={20}
          color={kanaType === 'katakana' ? Colors.primary : Colors.textSecondary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  tabBar: {
    flexDirection: 'row',
    gap: 2
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16
  },
  kanaIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    padding: 8
  }
});

export default KanaChartHeader;
