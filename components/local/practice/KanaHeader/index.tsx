import { Text } from '@/components/common';
import { styles } from '@/components/local/practice/KanaHeader/styles';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useTabActions } from '@/stores/useTabStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

const KanaHeader = ({ route }: NativeStackHeaderProps) => {
  const { setTabIndex } = useTabActions();
  const { kanaType } = useKanaContext();
  const { playPopAudio } = usePopAudio();
  const { kana } = route.params as { kana: string };
  const currentTab = KANA_TABS[kanaType].find(tab => tab.rows.find(row => row.kana.includes(kana)));
  const currentTabIndex = KANA_TABS[kanaType].findIndex(({ key }) => key === currentTab?.key);
  const currentRowIndex = currentTab?.rows.findIndex(row => row.kana.includes(kana))!;
  const prevRow = currentTab?.rows?.[currentRowIndex - 1];
  const nextRow = currentTab?.rows?.[currentRowIndex + 1];

  const handleGoToPractice = () => {
    playPopAudio();
    setTabIndex(currentTabIndex);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Link
          style={styles.button}
          href="/practice"
          onPress={handleGoToPractice}
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
            style={[styles.button, !prevRow && styles.disabledButton]}
            href={{
              pathname: '/practice/[kana]',
              params: { kana: prevRow?.kana[0] || kana }
            }}
            onPress={playPopAudio}
            disabled={!prevRow}
          >
            <MaterialIcons
              name="keyboard-arrow-up"
              size={20}
              color={prevRow ? Colors.textPrimary : Colors.textSecondary}
            />
          </Link>
          <Link
            style={[styles.button, !nextRow && styles.disabledButton]}
            href={{
              pathname: '/practice/[kana]',
              params: { kana: nextRow?.kana[0] || kana }
            }}
            onPress={playPopAudio}
            disabled={!nextRow}
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

export default KanaHeader;
