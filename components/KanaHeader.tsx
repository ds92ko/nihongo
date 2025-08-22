import Text from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import useKanaAudio from '@/hooks/useKanaAudio';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const KanaHeader = ({ route }: NativeStackHeaderProps) => {
  const { kanaType } = useKanaContext();
  const { playKanaAudio } = useKanaAudio();
  const { playPopAudio } = usePopAudio();
  const { kana } = route.params as { kana: string };
  const currentTab = KANA_TABS[kanaType].find(tab => tab.rows.find(row => row.kana.includes(kana)));
  const currentRowIndex = currentTab?.rows.findIndex(row => row.kana.includes(kana))!;
  const prevRow = currentTab?.rows?.[currentRowIndex - 1];
  const nextRow = currentTab?.rows?.[currentRowIndex + 1];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Link
          dismissTo
          style={styles.button}
          href={'/chart'}
          onPress={playPopAudio}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={20}
            color={Colors.textPrimary}
          />
        </Link>
        <View style={styles.kana}>
          <Text
            weight={700}
            variant="h3"
          >
            {kana}
          </Text>
          <Text
            variant="body1"
            color="textSecondary"
          >
            [{KANA_TO_ROMAJI[kanaType][kana]}]
          </Text>
        </View>
        <View style={styles.buttons}>
          <Link
            style={[
              styles.button,
              { backgroundColor: prevRow ? Colors.white : Colors.neutralLight }
            ]}
            href={{
              pathname: '/chart/[kana]',
              params: { kana: prevRow?.kana[0] || kana }
            }}
            onPress={() => {
              playKanaAudio(prevRow?.kana[0] || kana);
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-up"
              size={20}
              color={prevRow ? Colors.textPrimary : Colors.textSecondary}
            />
          </Link>
          <Link
            style={[
              styles.button,
              { backgroundColor: nextRow ? Colors.white : Colors.neutralLight }
            ]}
            href={{
              pathname: '/chart/[kana]',
              params: { kana: nextRow?.kana[0] || kana }
            }}
            onPress={() => {
              playKanaAudio(nextRow?.kana[0] || kana);
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={nextRow ? Colors.textPrimary : Colors.textSecondary}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: Colors.primary30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  kana: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8
  }
});

export default KanaHeader;
