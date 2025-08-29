import { InfoCard } from '@/components/common';
import { KanaList } from '@/components/local/practice';
import { tips } from '@/components/local/practice/PracticeScene/constants';
import { styles } from '@/components/local/practice/PracticeScene/styles';
import { PracticeSceneProps } from '@/components/local/practice/PracticeScene/types';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { ScrollView, View } from 'react-native';

const PracticeScene = ({ type }: PracticeSceneProps) => {
  const { kanaType } = useKanaContext();
  const data = KANA_TABS[kanaType].find(t => t.key === type)?.rows ?? [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <InfoCard tips={tips[type]} />
        <KanaList data={data} />
      </ScrollView>
    </View>
  );
};

export default PracticeScene;
