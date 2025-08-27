import InfoCard from '@/components/InfoCard';
import KanaList from '@/components/KanaList';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { KanaSoundType } from '@/types/kana';
import { ScrollView, StyleSheet, View } from 'react-native';

interface ChartSceneProps {
  chart: KanaSoundType;
}

const tips = {
  seion: ['청음은 맑은 소리로, 탁점이나 반탁점이 없는 기본 음절을 말해요.'],
  dakuon: [
    '탁음은 청음에 탁점(゛)을 붙여 유성음으로 발음하는 음절을 말해요.',
    '반탁음은 は행에 반탁점(゜)을 붙여 무성음으로 발음하는 음절을 말해요.'
  ],
  youon: ['요음은 い단에 반모음 ゃ, ゅ, ょ를 조합해 하나의 음절을 만드는 것을 말해요.']
};

const commonTips = [
  '원하는 문자를 눌러 연습을 시작해보세요.',
  '연습에서는 발음을 듣고 직접 따라 써볼 수 있어요.'
];

const ChartScene = ({ chart }: ChartSceneProps) => {
  const { kanaType } = useKanaContext();
  const data = KANA_TABS[kanaType].find(t => t.key === chart)?.rows ?? [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <InfoCard tips={[...tips[chart], ...commonTips]} />
        <KanaList data={data} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16
  }
});

export default ChartScene;
