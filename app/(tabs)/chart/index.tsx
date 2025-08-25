import ChartScene from '@/components/ChartScene';
import TabBar from '@/components/TabBar';
import { useTabActions, useTabContext } from '@/stores/useTabStore';
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
  const { tabIndex, animationEnabled } = useTabContext();
  const { setTabIndex } = useTabActions();

  return (
    <TabView
      navigationState={{ index: tabIndex, routes }}
      renderScene={renderScene}
      onIndexChange={setTabIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={TabBar}
      animationEnabled={animationEnabled}
    />
  );
}
