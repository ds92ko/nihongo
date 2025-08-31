import KanaToggle from '@/components/common/KanaToggle';
import { styles } from '@/components/common/TabBar/styles';
import { TabBarProps } from '@/components/common/TabBar/types';
import Text from '@/components/common/Text';
import SoundManager from '@/managers/SoundManager';
import { Pressable, SafeAreaView, View } from 'react-native';
import { Route } from 'react-native-tab-view';

const TabBar = <T extends Route>({ navigationState, jumpTo }: TabBarProps<T>) => {
  const { index } = navigationState;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          {navigationState.routes.map((route, idx) => (
            <Pressable
              key={route.key}
              onPress={() => {
                SoundManager.playClick();
                jumpTo(route.key);
              }}
              style={[styles.tab, idx === index && styles.activeTab]}
            >
              <Text
                weight={idx === index ? 700 : 500}
                variant="body2"
                color={idx === index ? 'primary' : 'textSecondary'}
              >
                {route.title}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.toggleBar}>
          <KanaToggle />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
