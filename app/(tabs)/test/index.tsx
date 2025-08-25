import TabBar from '@/components/TabBar';
import TestScene from '@/components/TestScene';
import { useTabActions, useTabContext } from '@/stores/useTabStore';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

const renderScene = SceneMap({
  study: () => <TestScene tab="study" />,
  review: () => <TestScene tab="review" />
});

const routes = [
  { key: 'study', title: '문제풀이' },
  { key: 'review', title: '오답노트' }
];

export default function TestScreen() {
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
