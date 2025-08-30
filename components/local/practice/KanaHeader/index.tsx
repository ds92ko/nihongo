import { IconButton, Text } from '@/components/common';
import { ICON_BUTTON_PROPS } from '@/components/local/practice/KanaHeader/constants';
import { styles } from '@/components/local/practice/KanaHeader/styles';
import { KANA_TABS } from '@/constants/KanaTabs';
import { KANA_TO_ROMAJI } from '@/constants/KanaToRomaji';
import usePopAudio from '@/hooks/usePopAudio';
import { useKanaContext } from '@/stores/useKanaStore';
import { useTabActions } from '@/stores/useTabStore';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
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
        <IconButton
          icon={{ type: 'material', name: 'keyboard-arrow-left' }}
          href="/practice"
          onPress={handleGoToPractice}
          {...ICON_BUTTON_PROPS}
        />
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
          <IconButton
            icon={{ type: 'material', name: 'keyboard-arrow-up' }}
            href={{
              pathname: '/practice/[kana]',
              params: { kana: prevRow?.kana[0] || kana }
            }}
            onPress={playPopAudio}
            disabled={!prevRow}
            {...ICON_BUTTON_PROPS}
          />
          <IconButton
            icon={{ type: 'material', name: 'keyboard-arrow-down' }}
            href={{
              pathname: '/practice/[kana]',
              params: { kana: nextRow?.kana[0] || kana }
            }}
            onPress={playPopAudio}
            disabled={!nextRow}
            {...ICON_BUTTON_PROPS}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KanaHeader;
