import ChartScene from '@/components/ChartScene';
import TabBar from '@/components/TabBar';
import { Colors } from '@/constants/Colors';
import { useTabActions, useTabContext } from '@/stores/useTabStore';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
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
    <SafeAreaView style={styles.safe}>
      <TabView
        lazy
        swipeEnabled
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={TabBar}
        animationEnabled={animationEnabled}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.primary30
  }
});
