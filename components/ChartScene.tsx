import KanaList from '@/components/KanaList';
import { Colors } from '@/constants/Colors';
import { KANA_TABS } from '@/constants/KanaTabs';
import { useKanaContext } from '@/stores/useKanaStore';
import { KanaSoundType } from '@/types/kana';
import { StyleSheet, View } from 'react-native';

interface ChartSceneProps {
  chart: KanaSoundType;
}

const ChartScene = ({ chart }: ChartSceneProps) => {
  const { kanaType } = useKanaContext();
  const data = KANA_TABS[kanaType].find(t => t.key === chart)?.rows ?? [];

  return (
    <View style={styles.container}>
      <KanaList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
});

export default ChartScene;
