import { TabBar } from '@/components/common';
import { MistakeScene, QuizScene } from '@/components/local/review';
import { Colors } from '@/constants/Colors';
import { useTabActions, useTabContext } from '@/stores/useTabStore';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  quiz: () => <QuizScene />,
  mistake: () => <MistakeScene />
});

const routes = [
  { key: 'quiz', title: '문제 풀이' },
  { key: 'mistake', title: '오답 노트' }
];

export default function ReviewScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
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
        initialLayout={{ width }}
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
