import ChartScene from '@/components/ChartScene';
import ChartTabBar from '@/components/ChartTabBar';
import { useChartTabActions, useChartTabContext } from '@/stores/useChartTabStore';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  seion: () => <ChartScene chart="seion" />,
  dakuon: () => <ChartScene chart="dakuon" />,
  youon: () => <ChartScene chart="youon" />
});

const routes = [
  { key: 'seion', title: '청음' },
  { key: 'dakuon', title: '탁음/반탁음' },
  { key: 'youon', title: '요음' }
];

export default function ChartScreen() {
  const layout = useWindowDimensions();
  const { tabIndex, animationEnabled } = useChartTabContext();
  const { setTabIndex } = useChartTabActions();

  return (
    <TabView
      navigationState={{ index: tabIndex, routes }}
      renderScene={renderScene}
      onIndexChange={setTabIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={ChartTabBar}
      animationEnabled={animationEnabled}
    />
  );
}
