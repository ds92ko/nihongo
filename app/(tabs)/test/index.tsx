import MistakeScene from '@/components/MistakeScene';
import QuizScreen from '@/components/QuizScene';
import TabBar from '@/components/TabBar';
import { Colors } from '@/constants/Colors';
import { useTabActions, useTabContext } from '@/stores/useTabStore';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  quiz: () => <QuizScreen />,
  mistake: () => <MistakeScene />
});

const routes = [
  { key: 'quiz', title: '문제풀이' },
  { key: 'mistake', title: '오답노트' }
];

export default function TestScreen() {
  const { width } = useWindowDimensions();
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
        initialLayout={{ width }}
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
