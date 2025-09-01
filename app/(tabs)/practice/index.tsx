import { TabBar } from '@/components/common';
import { PracticeScene } from '@/components/local/practice';
import { Colors } from '@/constants/Colors';
import { useTabActions, useTabContext } from '@/stores/useTabStore';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  seion: () => <PracticeScene type="seion" />,
  dakuon: () => <PracticeScene type="dakuon" />,
  youon: () => <PracticeScene type="youon" />
});

const routes = [
  { key: 'seion', title: '청음' },
  { key: 'dakuon', title: '탁음/반탁음' },
  { key: 'youon', title: '요음' }
];

export default function PracticeScreen() {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const { tabIndex, animationEnabled } = useTabContext();
  const { setTabIndex } = useTabActions();

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.primary30
  }
});
